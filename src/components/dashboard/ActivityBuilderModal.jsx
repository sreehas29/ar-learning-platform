import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Box,
  Typography,
  Chip,
} from "@mui/material";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import { useApp } from "../../context/AppContext";

export default function ActivityBuilderModal({ open, onClose }) {
  const { addCustomActivity, selectedSubject, selectedGrade } = useApp();

  const [formData, setFormData] = useState({
    title: "",
    subject: selectedSubject || "math",
    grade: selectedGrade || 8,
    difficulty: "Medium",
    duration: "20 mins",
    description: "",
    topics: "",
    arType: "3D Custom WebGL",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title) return;

    const topicsArray = formData.topics
      ? formData.topics.split(",").map((t) => t.trim()).filter(Boolean)
      : ["Custom Lesson", "3D AR"];

    const newActivity = {
      id: `custom-${formData.subject}-${formData.grade}-${Date.now()}`,
      title: formData.title,
      subject: formData.subject,
      grade: Number(formData.grade),
      difficulty: formData.difficulty,
      duration: formData.duration,
      description: formData.description || "Teacher-created interactive 3D WebAR lesson module.",
      topics: topicsArray,
      arType: formData.arType,
    };

    addCustomActivity(newActivity);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 4, p: 1 },
      }}
    >
      <DialogTitle textAlign="center">
        <Box display="flex" alignItems="center" justifyContent="center" gap={1} mb={0.5}>
          <AddCircleOutlinedIcon color="primary" sx={{ fontSize: 32 }} />
          <Typography variant="h5" fontWeight={700} color="primary">
            Create Custom AR Activity
          </Typography>
        </Box>
        <Typography variant="caption" color="text.secondary">
          Design a custom 3D WebAR lesson module for your students
        </Typography>
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent dividers sx={{ px: { xs: 2, sm: 4 }, py: 3 }}>
          <Grid container spacing={2.5}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Activity Title"
                name="title"
                placeholder="e.g. 3D Convex Lenses & Light Focus"
                value={formData.title}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Subject</InputLabel>
                <Select
                  name="subject"
                  value={formData.subject}
                  label="Subject"
                  onChange={handleChange}
                >
                  <MenuItem value="math">Mathematics</MenuItem>
                  <MenuItem value="science">Science</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Grade Level</InputLabel>
                <Select
                  name="grade"
                  value={formData.grade}
                  label="Grade Level"
                  onChange={handleChange}
                >
                  {[6, 7, 8, 9, 10].map((g) => (
                    <MenuItem key={g} value={g}>
                      Grade {g}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Difficulty</InputLabel>
                <Select
                  name="difficulty"
                  value={formData.difficulty}
                  label="Difficulty"
                  onChange={handleChange}
                >
                  <MenuItem value="Easy">Easy</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="Hard">Hard</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Estimated Duration"
                name="duration"
                placeholder="e.g. 15 mins"
                value={formData.duration}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Activity Description"
                name="description"
                placeholder="Describe the 3D AR learning objective..."
                value={formData.description}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Topics & Tags (Comma Separated)"
                name="topics"
                placeholder="e.g. Optics, Lenses, Refraction"
                value={formData.topics}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ p: 3, justifyContent: "space-between" }}>
          <Button onClick={onClose} color="inherit">
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            startIcon={<ViewInArIcon />}
            sx={{ px: 4, borderRadius: 3, fontWeight: 700 }}
          >
            Create & Add Activity
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
