import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  Button,
  Paper,
  Chip,
  Divider,
  Stack,
  IconButton,
  Grid,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Switch,
  FormControlLabel,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";
import UploadIcon from "@mui/icons-material/Upload";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import ViewInArIcon from "@mui/icons-material/ViewInAr";

import { activitiesData } from "../../utils/activityData";
import { speakText } from "../../services/audioService";
import { useApp } from "../../context/AppContext";

export default function TourCreatorModal({ open, onClose }) {
  const { isAudioMuted, setSelectedActivity } = useApp();
  const [selectedActivityId, setSelectedActivityId] = useState("math-8-1");
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [isPlayingPresentation, setIsPlayingPresentation] = useState(false);

  const [slides, setSlides] = useState([
    {
      id: 1,
      title: "1. ENGAGE: 3D Spatial Overview",
      cameraView: "isometric",
      isExploded: false,
      lectureNotes: "Welcome class! Today we examine the 3D volume proof of the Pythagorean Theorem using interactive WebAR geometry.",
    },
    {
      id: 2,
      title: "2. EXPLORE: Exploded Net Deconstruction",
      cameraView: "top",
      isExploded: true,
      lectureNotes: "Observe how the 3D volume blocks decompose into 2D face nets, demonstrating that a² + b² = c².",
    },
    {
      id: 3,
      title: "3. EVALUATION: Interactive AR Quiz",
      cameraView: "front",
      isExploded: false,
      lectureNotes: "Students will now calculate the hypotenuse length given base legs a = 3 and b = 4.",
    },
  ]);

  const activeActivity = activitiesData.find((a) => a.id === selectedActivityId) || activitiesData[0];

  const handleAddSlide = () => {
    const newSlide = {
      id: Date.now(),
      title: `${slides.length + 1}. New Presentation Slide`,
      cameraView: "isometric",
      isExploded: false,
      lectureNotes: "Teacher lecture script for this 3D presentation slide.",
    };
    setSlides([...slides, newSlide]);
    setActiveSlideIndex(slides.length);
  };

  const handleDeleteSlide = (index) => {
    if (slides.length <= 1) return;
    const updated = slides.filter((_, i) => i !== index);
    setSlides(updated);
    setActiveSlideIndex(Math.max(0, index - 1));
  };

  const handleUpdateSlide = (field, val) => {
    const updated = [...slides];
    updated[activeSlideIndex][field] = val;
    setSlides(updated);
  };

  const handleExportJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ activityId: selectedActivityId, slides }, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `NCERT_3D_Presentation_${selectedActivityId}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleSpeakNotes = () => {
    const currentSlide = slides[activeSlideIndex];
    if (currentSlide?.lectureNotes) {
      speakText(currentSlide.lectureNotes, isAudioMuted);
    }
  };

  const handleLaunchPresentation = () => {
    setSelectedActivity(activeActivity);
    setIsPlayingPresentation(true);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 5,
          p: 1,
          backgroundColor: "#0F172A",
          color: "#FFFFFF",
          border: "1px solid rgba(56, 189, 248, 0.4)",
        },
      }}
    >
      <DialogTitle display="flex" justifyContent="space-between" alignItems="center">
        <Box display="flex" alignItems="center" gap={1.5}>
          <SlideshowIcon style={{ color: "#38BDF8" }} fontSize="large" />
          <Typography variant="h5" fontWeight={900} color="#38BDF8">
            Teacher 3D Presentation Deck & Tour Creator
          </Typography>
        </Box>
        <IconButton onClick={onClose} sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.1)" }} />

      <DialogContent sx={{ py: 3 }}>
        {!isPlayingPresentation ? (
          <>
            {/* Top Toolbar: Activity Selector + Export/Import */}
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3} flexWrap="wrap" gap={2}>
              <FormControl size="small" sx={{ minWidth: 300 }}>
                <InputLabel sx={{ color: "#38BDF8", fontWeight: 700 }}>Select Lesson Activity</InputLabel>
                <Select
                  value={selectedActivityId}
                  onChange={(e) => setSelectedActivityId(e.target.value)}
                  label="Select Lesson Activity"
                  sx={{ color: "#FFFFFF", fontWeight: 700, ".MuiOutlinedInput-notchedOutline": { borderColor: "#38BDF8" } }}
                >
                  {activitiesData.map((act) => (
                    <MenuItem key={act.id} value={act.id}>
                      {act.ncertCode || "NCERT"} • {act.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Stack direction="row" spacing={1.5}>
                <Button
                  variant="outlined"
                  color="info"
                  size="small"
                  startIcon={<DownloadIcon />}
                  onClick={handleExportJson}
                  sx={{ borderRadius: 2.5, fontWeight: 800, textTransform: "none" }}
                >
                  Export JSON Deck
                </Button>

                <Button
                  variant="contained"
                  color="success"
                  size="small"
                  startIcon={<PlayArrowIcon />}
                  onClick={handleLaunchPresentation}
                  sx={{ borderRadius: 2.5, fontWeight: 900, textTransform: "none", px: 2.5 }}
                >
                  Start Presentation Mode
                </Button>
              </Stack>
            </Box>

            {/* Slide Navigation List & Editor Grid */}
            <Grid container spacing={3}>
              {/* Left Column: Slide List */}
              <Grid item xs={12} sm={4}>
                <Paper variant="outlined" sx={{ p: 2, borderRadius: 4, backgroundColor: "rgba(30, 41, 59, 0.8)", borderColor: "rgba(255, 255, 255, 0.15)", height: "100%" }}>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="subtitle2" fontWeight={800} color="#38BDF8">
                      Slides Deck ({slides.length})
                    </Typography>
                    <IconButton size="small" onClick={handleAddSlide} sx={{ color: "#38BDF8" }}>
                      <AddIcon />
                    </IconButton>
                  </Box>

                  <Stack spacing={1.5}>
                    {slides.map((slide, idx) => (
                      <Paper
                        key={slide.id}
                        onClick={() => setActiveSlideIndex(idx)}
                        sx={{
                          p: 1.5,
                          borderRadius: 3,
                          cursor: "pointer",
                          backgroundColor: activeSlideIndex === idx ? "rgba(56, 189, 248, 0.2)" : "rgba(15, 23, 42, 0.6)",
                          border: `1.5px solid ${activeSlideIndex === idx ? "#38BDF8" : "rgba(255, 255, 255, 0.1)"}`,
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Box>
                          <Typography variant="caption" fontWeight={800} color="#38BDF8" display="block">
                            Slide {idx + 1}
                          </Typography>
                          <Typography variant="body2" fontWeight={700} color="#FFFFFF" noWrap sx={{ maxWidth: 160 }}>
                            {slide.title}
                          </Typography>
                        </Box>

                        {slides.length > 1 && (
                          <IconButton
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteSlide(idx);
                            }}
                            sx={{ color: "rgba(255, 255, 255, 0.4)", "&:hover": { color: "#EF4444" } }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        )}
                      </Paper>
                    ))}
                  </Stack>
                </Paper>
              </Grid>

              {/* Right Column: Active Slide Editor */}
              <Grid item xs={12} sm={8}>
                <Paper variant="outlined" sx={{ p: 3, borderRadius: 4, backgroundColor: "rgba(30, 41, 59, 0.8)", borderColor: "rgba(255, 255, 255, 0.15)" }}>
                  <Typography variant="subtitle1" fontWeight={800} color="#38BDF8" mb={2}>
                    Edit Slide {activeSlideIndex + 1} Configuration
                  </Typography>

                  <Stack spacing={2.5}>
                    <TextField
                      label="Slide Title & Phase Header"
                      fullWidth
                      size="small"
                      value={slides[activeSlideIndex]?.title || ""}
                      onChange={(e) => handleUpdateSlide("title", e.target.value)}
                      sx={{ input: { color: "#FFFFFF", fontWeight: 700 }, label: { color: "rgba(255, 255, 255, 0.7)" } }}
                    />

                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <FormControl fullWidth size="small">
                          <InputLabel sx={{ color: "rgba(255, 255, 255, 0.7)" }}>3D Camera View</InputLabel>
                          <Select
                            value={slides[activeSlideIndex]?.cameraView || "isometric"}
                            onChange={(e) => handleUpdateSlide("cameraView", e.target.value)}
                            label="3D Camera View"
                            sx={{ color: "#FFFFFF", fontWeight: 700 }}
                          >
                            <MenuItem value="isometric">Isometric Angle (3D)</MenuItem>
                            <MenuItem value="top">Top View (2D Net)</MenuItem>
                            <MenuItem value="front">Front View</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>

                      <Grid item xs={6}>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={slides[activeSlideIndex]?.isExploded || false}
                              onChange={(e) => handleUpdateSlide("isExploded", e.target.checked)}
                              color="info"
                            />
                          }
                          label={<Typography variant="caption" fontWeight={700}>3D Exploded Net Mode</Typography>}
                        />
                      </Grid>
                    </Grid>

                    <TextField
                      label="Teacher Lecture Script & Audio Prompt"
                      fullWidth
                      multiline
                      rows={3}
                      value={slides[activeSlideIndex]?.lectureNotes || ""}
                      onChange={(e) => handleUpdateSlide("lectureNotes", e.target.value)}
                      sx={{ textarea: { color: "#FFFFFF" }, label: { color: "rgba(255, 255, 255, 0.7)" } }}
                    />

                    <Button
                      size="small"
                      variant="outlined"
                      color="info"
                      startIcon={<VolumeUpIcon />}
                      onClick={handleSpeakNotes}
                      sx={{ width: "fit-content", textTransform: "none", fontWeight: 700, borderRadius: 2 }}
                    >
                      Test Voice Narration Script
                    </Button>
                  </Stack>
                </Paper>
              </Grid>
            </Grid>
          </>
        ) : (
          /* Live Full-Screen Presentation Viewer */
          <Box textTransform="center" py={2}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6" fontWeight={900} color="#38BDF8">
                {slides[activeSlideIndex]?.title}
              </Typography>
              <Chip
                icon={<SlideshowIcon style={{ color: "#4ADE80" }} />}
                label={`Slide ${activeSlideIndex + 1} of ${slides.length}`}
                sx={{ backgroundColor: "rgba(74, 222, 128, 0.15)", color: "#4ADE80", fontWeight: 800 }}
              />
            </Box>

            <Paper variant="outlined" sx={{ p: 4, borderRadius: 4, backgroundColor: "#090D16", mb: 3, border: "2px solid #38BDF8" }}>
              <Typography variant="subtitle1" fontWeight={800} color="#38BDF8" gutterBottom display="flex" alignItems="center" gap={1}>
                <VolumeUpIcon fontSize="small" /> Teacher Lecture Script:
              </Typography>
              <Typography variant="body1" color="rgba(255, 255, 255, 0.9)" sx={{ fontSize: "1.1rem", lineHeight: 1.6 }}>
                "{slides[activeSlideIndex]?.lectureNotes}"
              </Typography>
            </Paper>

            <Stack direction="row" spacing={2} justifyContent="center">
              <Button
                disabled={activeSlideIndex === 0}
                onClick={() => setActiveSlideIndex((prev) => prev - 1)}
                variant="outlined"
                sx={{ color: "#FFFFFF", borderColor: "rgba(255, 255, 255, 0.3)", borderRadius: 3 }}
              >
                Previous Slide
              </Button>

              <Button
                disabled={activeSlideIndex === slides.length - 1}
                onClick={() => setActiveSlideIndex((prev) => prev + 1)}
                variant="contained"
                color="primary"
                sx={{ borderRadius: 3, fontWeight: 800, px: 3 }}
              >
                Next Slide
              </Button>

              <Button
                onClick={() => setIsPlayingPresentation(false)}
                variant="outlined"
                color="error"
                sx={{ borderRadius: 3 }}
              >
                Exit Presentation
              </Button>
            </Stack>
          </Box>
        )}
      </DialogContent>

      <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.1)" }} />

      <DialogActions sx={{ p: 2.5, justifyContent: "space-between" }}>
        <Typography variant="caption" color="rgba(255, 255, 255, 0.5)">
          NCERT 3D Smart Classroom Presentation Creator Suite
        </Typography>
        <Button onClick={onClose} variant="outlined" sx={{ color: "#FFFFFF", borderColor: "rgba(255, 255, 255, 0.3)", borderRadius: 3 }}>
          Close Creator
        </Button>
      </DialogActions>
    </Dialog>
  );
}
