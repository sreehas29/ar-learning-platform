const { Pool } = require('pg');
require('dotenv').config();

const connectionConfig = process.env.DATABASE_URL
  ? { connectionString: process.env.DATABASE_URL }
  : {
      host: process.env.PGHOST || 'localhost',
      port: parseInt(process.env.PGPORT || '5432', 10),
      user: process.env.PGUSER || 'postgres',
      password: process.env.PGPASSWORD || 'postgres',
      database: process.env.PGDATABASE || 'sanjana_omr_db',
    };

const pool = new Pool({
  ...connectionConfig,
  connectionTimeoutMillis: 3000,
});

let isConnected = false;

// Initialize database tables if connected
async function initDb() {
  try {
    const client = await pool.connect();
    isConnected = true;
    console.log('✅ Connected to PostgreSQL database successfully.');

    await client.query(`
      CREATE TABLE IF NOT EXISTS tests (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          date VARCHAR(50) NOT NULL,
          template_folder VARCHAR(255) NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS test_results (
          id SERIAL PRIMARY KEY,
          test_id INT REFERENCES tests(id) ON DELETE CASCADE,
          test_name VARCHAR(255),
          data JSONB NOT NULL,
          uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    client.release();
    console.log('✅ PostgreSQL database tables verified/created.');
  } catch (err) {
    isConnected = false;
    console.warn('⚠️ Could not connect to PostgreSQL database:', err.message);
    console.warn('⚠️ Server will operate with Fallback Memory/Mock database until PostgreSQL connection is available.');
  }
}

initDb();

// In-Memory Fallback Storage (in case PostgreSQL service is not yet running)
const memoryStore = {
  tests: [
    { id: 1, name: "Sample Physics Test", date: "2026-08-01", template_folder: "physics_template_v1", created_at: new Date().toISOString() },
    { id: 2, name: "Sample Chemistry Test", date: "2026-08-02", template_folder: "chem_template_v1", created_at: new Date().toISOString() }
  ],
  test_results: []
};
let nextTestId = 3;
let nextResultId = 1;

module.exports = {
  pool,
  query: (text, params) => pool.query(text, params),
  isDbConnected: () => isConnected,
  memoryStore,
  getNextTestId: () => nextTestId++,
  getNextResultId: () => nextResultId++
};
