const express = require('express');
const router = express.Router();
const db = require('../db/db');

// ==========================================
// TEST METADATA ENDPOINTS
// ==========================================

// GET /api/tests - Get all tests
router.get('/tests', async (req, res) => {
  try {
    if (db.isDbConnected()) {
      const result = await db.query(
        'SELECT id, name, date, template_folder, created_at FROM tests ORDER BY id DESC'
      );
      return res.json({ success: true, count: result.rows.length, data: result.rows });
    } else {
      // Fallback
      return res.json({ success: true, count: db.memoryStore.tests.length, data: db.memoryStore.tests, source: 'fallback' });
    }
  } catch (err) {
    console.error('Error fetching tests:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/tests/:id - Get single test by ID
router.get('/tests/:id', async (req, res) => {
  const testId = parseInt(req.params.id, 10);
  try {
    if (db.isDbConnected()) {
      const result = await db.query(
        'SELECT id, name, date, template_folder, created_at FROM tests WHERE id = $1',
        [testId]
      );
      if (result.rows.length === 0) {
        return res.status(404).json({ success: false, error: 'Test not found' });
      }
      return res.json({ success: true, data: result.rows[0] });
    } else {
      const test = db.memoryStore.tests.find(t => t.id === testId);
      if (!test) {
        return res.status(404).json({ success: false, error: 'Test not found' });
      }
      return res.json({ success: true, data: test, source: 'fallback' });
    }
  } catch (err) {
    console.error(`Error fetching test ${testId}:`, err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/tests - Create a new test in PostgreSQL
router.post('/tests', async (req, res) => {
  const { name, date, template_folder } = req.body;

  if (!name || !date || !template_folder) {
    return res.status(400).json({
      success: false,
      error: 'Missing required fields: name, date, template_folder are required.'
    });
  }

  try {
    if (db.isDbConnected()) {
      const result = await db.query(
        'INSERT INTO tests (name, date, template_folder) VALUES ($1, $2, $3) RETURNING id, name, date, template_folder, created_at',
        [name, date, template_folder]
      );
      const newTest = result.rows[0];
      console.log(`✅ Test created in PostgreSQL DB: ID ${newTest.id} - ${newTest.name}`);
      return res.status(201).json({ success: true, message: 'Test created successfully', data: newTest });
    } else {
      const newTest = {
        id: db.getNextTestId(),
        name,
        date,
        template_folder,
        created_at: new Date().toISOString()
      };
      db.memoryStore.tests.unshift(newTest);
      console.log(`✅ Test created in Memory Store: ID ${newTest.id} - ${newTest.name}`);
      return res.status(201).json({ success: true, message: 'Test created successfully (fallback mode)', data: newTest, source: 'fallback' });
    }
  } catch (err) {
    console.error('Error creating test:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// PUT /api/tests/:id - Update an existing test
router.put('/tests/:id', async (req, res) => {
  const testId = parseInt(req.params.id, 10);
  const { name, date, template_folder } = req.body;

  if (!name || !date || !template_folder) {
    return res.status(400).json({
      success: false,
      error: 'Missing required fields: name, date, template_folder are required.'
    });
  }

  try {
    if (db.isDbConnected()) {
      const result = await db.query(
        'UPDATE tests SET name = $1, date = $2, template_folder = $3, updated_at = CURRENT_TIMESTAMP WHERE id = $4 RETURNING id, name, date, template_folder, created_at',
        [name, date, template_folder, testId]
      );
      if (result.rows.length === 0) {
        return res.status(404).json({ success: false, error: 'Test not found' });
      }
      return res.json({ success: true, message: 'Test updated successfully', data: result.rows[0] });
    } else {
      const index = db.memoryStore.tests.findIndex(t => t.id === testId);
      if (index === -1) {
        return res.status(404).json({ success: false, error: 'Test not found' });
      }
      db.memoryStore.tests[index] = {
        ...db.memoryStore.tests[index],
        name,
        date,
        template_folder,
        updated_at: new Date().toISOString()
      };
      return res.json({ success: true, message: 'Test updated successfully (fallback mode)', data: db.memoryStore.tests[index], source: 'fallback' });
    }
  } catch (err) {
    console.error(`Error updating test ${testId}:`, err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE /api/tests/:id - Delete a test
router.delete('/tests/:id', async (req, res) => {
  const testId = parseInt(req.params.id, 10);
  try {
    if (db.isDbConnected()) {
      const result = await db.query('DELETE FROM tests WHERE id = $1 RETURNING id', [testId]);
      if (result.rows.length === 0) {
        return res.status(404).json({ success: false, error: 'Test not found' });
      }
      return res.json({ success: true, message: `Test ${testId} deleted successfully` });
    } else {
      const index = db.memoryStore.tests.findIndex(t => t.id === testId);
      if (index === -1) {
        return res.status(404).json({ success: false, error: 'Test not found' });
      }
      db.memoryStore.tests.splice(index, 1);
      return res.json({ success: true, message: `Test ${testId} deleted successfully (fallback mode)`, source: 'fallback' });
    }
  } catch (err) {
    console.error(`Error deleting test ${testId}:`, err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ==========================================
// TEST RESULTS ENDPOINTS (OMR CSV Data)
// ==========================================

// POST /api/tests/:id/results - Push OMR CSV rows for a test into PostgreSQL
router.post('/tests/:id/results', async (req, res) => {
  const testId = parseInt(req.params.id, 10);
  const { test_name, rows } = req.body;

  if (!rows || !Array.isArray(rows) || rows.length === 0) {
    return res.status(400).json({
      success: false,
      error: 'Invalid payload: "rows" array containing result objects is required.'
    });
  }

  try {
    let insertedCount = 0;
    if (db.isDbConnected()) {
      for (const row of rows) {
        await db.query(
          'INSERT INTO test_results (test_id, test_name, data) VALUES ($1, $2, $3)',
          [testId, test_name || 'OMR Test', JSON.stringify(row)]
        );
        insertedCount++;
      }
      console.log(`✅ Uploaded ${insertedCount} OMR result rows for test ID ${testId} to PostgreSQL DB.`);
      return res.status(201).json({
        success: true,
        message: `Successfully pushed ${insertedCount} test result rows to PostgreSQL database.`,
        inserted_count: insertedCount,
        test_id: testId
      });
    } else {
      for (const row of rows) {
        db.memoryStore.test_results.push({
          id: db.getNextResultId(),
          test_id: testId,
          test_name: test_name || 'OMR Test',
          data: row,
          uploaded_at: new Date().toISOString()
        });
        insertedCount++;
      }
      console.log(`✅ Uploaded ${insertedCount} OMR result rows to Memory Store.`);
      return res.status(201).json({
        success: true,
        message: `Successfully pushed ${insertedCount} test result rows to database (fallback mode).`,
        inserted_count: insertedCount,
        test_id: testId,
        source: 'fallback'
      });
    }
  } catch (err) {
    console.error(`Error pushing results for test ${testId}:`, err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/results - General push results endpoint (replacing Firestore batch upload)
router.post('/results', async (req, res) => {
  const { collection, test_id, test_name, rows } = req.body;

  if (!rows || !Array.isArray(rows) || rows.length === 0) {
    return res.status(400).json({
      success: false,
      error: 'Invalid payload: "rows" array is required.'
    });
  }

  try {
    let insertedCount = 0;
    const targetTestId = test_id ? parseInt(test_id, 10) : null;
    const targetTestName = test_name || collection || 'OMR Test Results';

    if (db.isDbConnected()) {
      for (const row of rows) {
        await db.query(
          'INSERT INTO test_results (test_id, test_name, data) VALUES ($1, $2, $3)',
          [targetTestId, targetTestName, JSON.stringify(row)]
        );
        insertedCount++;
      }
      console.log(`✅ Uploaded ${insertedCount} OMR result rows to PostgreSQL DB.`);
      return res.status(201).json({
        success: true,
        message: `Uploaded ${insertedCount} rows to PostgreSQL database.`,
        inserted_count: insertedCount
      });
    } else {
      for (const row of rows) {
        db.memoryStore.test_results.push({
          id: db.getNextResultId(),
          test_id: targetTestId,
          test_name: targetTestName,
          data: row,
          uploaded_at: new Date().toISOString()
        });
        insertedCount++;
      }
      return res.status(201).json({
        success: true,
        message: `Uploaded ${insertedCount} rows to database (fallback mode).`,
        inserted_count: insertedCount,
        source: 'fallback'
      });
    }
  } catch (err) {
    console.error('Error pushing results:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/tests/:id/results - Get test results for a test
router.get('/tests/:id/results', async (req, res) => {
  const testId = parseInt(req.params.id, 10);
  try {
    if (db.isDbConnected()) {
      const result = await db.query(
        'SELECT id, test_id, test_name, data, uploaded_at FROM test_results WHERE test_id = $1 ORDER BY id ASC',
        [testId]
      );
      return res.json({ success: true, count: result.rows.length, data: result.rows });
    } else {
      const results = db.memoryStore.test_results.filter(r => r.test_id === testId);
      return res.json({ success: true, count: results.length, data: results, source: 'fallback' });
    }
  } catch (err) {
    console.error(`Error fetching results for test ${testId}:`, err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/results - Get all test results
router.get('/results', async (req, res) => {
  try {
    if (db.isDbConnected()) {
      const result = await db.query(
        'SELECT id, test_id, test_name, data, uploaded_at FROM test_results ORDER BY id DESC LIMIT 500'
      );
      return res.json({ success: true, count: result.rows.length, data: result.rows });
    } else {
      return res.json({ success: true, count: db.memoryStore.test_results.length, data: db.memoryStore.test_results, source: 'fallback' });
    }
  } catch (err) {
    console.error('Error fetching results:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
