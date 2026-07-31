import { useNavigate } from "react-router-dom";
import {
  Box,
  Paper,
  Typography,
  Button,
  Chip,
  Alert,
  Divider,
  Grid,
  Stack,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import TouchAppIcon from "@mui/icons-material/TouchApp";
import CenterFocusStrongIcon from "@mui/icons-material/CenterFocusStrong";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import BuildCircleIcon from "@mui/icons-material/BuildCircle";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";

import { useApp } from "../../context/AppContext";
import Navbar from "../../components/Layout/Navbar";
import { speakText } from "../../services/audioService";

export default function Instructions() {
  const navigate = useNavigate();
  const { selectedSubject, selectedGrade, selectedActivity, isAudioMuted } = useApp();

  const handleLaunchAR = () => {
    navigate("/ar");
  };

  const handleBackToActivities = () => {
    navigate("/activity");
  };

  const handleListenObjective = () => {
    if (!selectedActivity) return;
    const textToSpeak = `Lesson Activity: ${selectedActivity.title}. ${selectedActivity.description}. ${
      selectedActivity.ncertObjective ? `NCERT Objective: ${selectedActivity.ncertObjective}` : ""
    }`;
    speakText(textToSpeak, isAudioMuted);
  };

  const setupSteps = [
    {
      icon: <CameraAltIcon color="primary" />,
      title: "Grant Camera Permission",
      description: "Ensure camera permissions are enabled in your browser when prompted.",
    },
    {
      icon: <WbSunnyIcon color="primary" />,
      title: "Prepare Your Environment",
      description: "Use a well-lit room and clear a flat surface (table or floor).",
    },
    {
      icon: <CenterFocusStrongIcon color="primary" />,
      title: "Align Camera to Surface",
      description: "Point your camera downward at the flat surface or target marker.",
    },
    {
      icon: <TouchAppIcon color="primary" />,
      title: "Interact in 3D Space",
      description: "Drag to rotate, pinch to scale, and tap key hot-spots for interactive labels.",
    },
  ];

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#F8FAFC" }}>
      <Navbar />

      <Box
        sx={{
          minHeight: "calc(100vh - 70px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "radial-gradient(circle at 50% 0%, #E3F2FD 0%, #F8FAFC 70%)",
          p: { xs: 2, md: 4 },
        }}
      >
        <Paper
          elevation={8}
          sx={{
            width: "100%",
            maxWidth: 1050,
            p: { xs: 3, sm: 5, md: 6 },
            borderRadius: 6,
            backgroundColor: "#FFFFFF",
            boxShadow: "0 20px 50px rgba(15, 23, 42, 0.08)",
            border: "1px solid rgba(226, 232, 240, 0.8)",
          }}
        >
          {/* Navigation & Header */}
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            mb={3}
            flexWrap="wrap"
            gap={2}
          >
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={handleBackToActivities}
              sx={{ color: "text.secondary", textTransform: "none", fontWeight: 600 }}
            >
              Back to Activity Selection
            </Button>

            <Stack direction="row" spacing={1.5} alignItems="center">
              {selectedSubject && (
                <Chip
                  label={`Subject: ${selectedSubject.toUpperCase()}`}
                  color="primary"
                  variant="outlined"
                  sx={{ fontWeight: 700 }}
                />
              )}
              {selectedGrade && (
                <Chip
                  label={`Grade ${selectedGrade}`}
                  color="info"
                  variant="outlined"
                  sx={{ fontWeight: 700 }}
                />
              )}
            </Stack>
          </Box>

          <Divider sx={{ mb: 4 }} />

          {/* Guard Alert */}
          {!selectedActivity ? (
            <Alert
              severity="warning"
              sx={{ mb: 4 }}
              action={
                <Button color="inherit" size="small" onClick={handleBackToActivities}>
                  Select Activity
                </Button>
              }
            >
              No activity selected. Please choose an activity from the activity list first.
            </Alert>
          ) : (
            <>
              {/* Activity Summary Banner */}
              <Paper
                variant="outlined"
                sx={{
                  p: 3.5,
                  mb: 4,
                  borderRadius: 5,
                  backgroundColor: "#F8FAFC",
                  borderColor: "#1565C0",
                  boxShadow: "0 8px 24px rgba(21, 101, 192, 0.08)",
                }}
              >
                <Grid container spacing={3} alignItems="center">
                  <Grid item xs={12} md={8}>
                    <Box display="flex" alignItems="center" gap={1.5} mb={1}>
                      <ViewInArIcon color="primary" sx={{ fontSize: 36 }} />
                      <Typography variant="h4" fontWeight={800} color="primary">
                        {selectedActivity.title}
                      </Typography>
                    </Box>
                    <Typography variant="body1" color="text.secondary" paragraph sx={{ fontSize: "1rem", lineHeight: 1.6 }}>
                      {selectedActivity.description}
                    </Typography>

                    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap mb={2.5}>
                      {selectedActivity.topics?.map((topic) => (
                        <Chip
                          key={topic}
                          label={topic}
                          size="small"
                          sx={{ fontWeight: 600, backgroundColor: "#E2E8F0" }}
                        />
                      ))}
                    </Stack>

                    <Button
                      size="small"
                      variant="outlined"
                      color="primary"
                      startIcon={<VolumeUpIcon />}
                      onClick={handleListenObjective}
                      sx={{ borderRadius: 3, textTransform: "none", fontWeight: 700, px: 2 }}
                    >
                      Listen to Voice Guidance
                    </Button>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <Stack spacing={1.5} sx={{ pl: { md: 2 } }}>
                      {selectedActivity.ncertCode && (
                        <Chip
                          icon={<MenuBookIcon fontSize="small" style={{ color: "#FFFFFF" }} />}
                          label={selectedActivity.ncertCode}
                          color="primary"
                          sx={{ fontWeight: 800, py: 2, fontSize: "0.875rem" }}
                        />
                      )}
                      <Box display="flex" alignItems="center" gap={1}>
                        <AccessTimeIcon fontSize="small" color="action" />
                        <Typography variant="body2" fontWeight={500}>
                          Duration: <strong>{selectedActivity.duration}</strong>
                        </Typography>
                      </Box>
                      <Box display="flex" alignItems="center" gap={1}>
                        <Chip
                          label={`Difficulty: ${selectedActivity.difficulty}`}
                          size="small"
                          color="info"
                          sx={{ fontWeight: 600 }}
                        />
                        <Chip
                          label={selectedActivity.arType}
                          size="small"
                          color="secondary"
                          variant="outlined"
                          sx={{ fontWeight: 700 }}
                        />
                      </Box>
                    </Stack>
                  </Grid>
                </Grid>
              </Paper>

              {/* NCERT Lab Manual & Apparatus Reference Card */}
              {selectedActivity.ncertKitName && (
                <Paper
                  elevation={0}
                  sx={{
                    p: 3.5,
                    mb: 4,
                    borderRadius: 5,
                    backgroundColor: "#FEFCE8",
                    border: "1.5px solid #FDE047",
                    boxShadow: "0 6px 20px rgba(234, 179, 8, 0.12)",
                  }}
                >
                  <Box display="flex" alignItems="center" gap={1} mb={1.5}>
                    <BuildCircleIcon style={{ color: "#CA8A04", fontSize: 28 }} />
                    <Typography variant="h6" fontWeight={800} color="#854D0E">
                      Official NCERT Lab Manual & School Kit Reference
                    </Typography>
                  </Box>

                  <Typography variant="subtitle1" fontWeight={700} color="#A16207" gutterBottom>
                    NCERT Kit Standard: {selectedActivity.ncertKitName} ({selectedActivity.ncertCode})
                  </Typography>

                  <Typography variant="body1" color="#713F12" paragraph sx={{ fontSize: "0.95rem" }}>
                    <strong>NCERT Objective:</strong> {selectedActivity.ncertObjective}
                  </Typography>

                  <Typography variant="caption" fontWeight={800} color="#854D0E" display="block" mb={1} sx={{ fontSize: "0.75rem", letterSpacing: 0.5 }}>
                    PHYSICAL KIT APPARATUS ITEMS SIMULATED IN WEBAR:
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    {selectedActivity.ncertApparatus?.map((item) => (
                      <Chip
                        key={item}
                        label={item}
                        size="small"
                        sx={{ backgroundColor: "#FEF08A", color: "#713F12", fontWeight: 700, fontSize: "0.75rem" }}
                      />
                    ))}
                  </Stack>
                </Paper>
              )}

              {/* Preparation Steps */}
              <Typography variant="h5" fontWeight={800} mb={2.5}>
                Classroom & AR Setup Guidelines
              </Typography>

              <Grid container spacing={2.5} mb={4}>
                {setupSteps.map((step, idx) => (
                  <Grid item xs={12} sm={6} key={step.title}>
                    <Paper
                      elevation={1}
                      sx={{
                        p: 3,
                        height: "100%",
                        borderRadius: 4,
                        display: "flex",
                        gap: 2,
                        alignItems: "flex-start",
                        border: "1px solid #E2E8F0",
                        transition: "transform 0.2s ease, boxShadow 0.2s ease",
                        "&:hover": {
                          transform: "translateY(-4px)",
                          boxShadow: "0 10px 24px rgba(0, 0, 0, 0.08)",
                        },
                      }}
                    >
                      <Box
                        sx={{
                          p: 1.5,
                          borderRadius: 3,
                          backgroundColor: "#E3F2FD",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {step.icon}
                      </Box>
                      <Box>
                        <Typography variant="subtitle1" fontWeight={700} gutterBottom color="primary">
                          {idx + 1}. {step.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.85rem", lineHeight: 1.5 }}>
                          {step.description}
                        </Typography>
                      </Box>
                    </Paper>
                  </Grid>
                ))}
              </Grid>

              {/* Launch Action */}
              <Box textAlign="center" mt={5}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  startIcon={<PlayArrowIcon fontSize="large" />}
                  onClick={handleLaunchAR}
                  sx={{
                    px: 7,
                    py: 2,
                    fontSize: "1.2rem",
                    fontWeight: 800,
                    borderRadius: 4,
                    boxShadow: "0 12px 32px rgba(21, 101, 192, 0.4)",
                    textTransform: "none",
                    "&:hover": {
                      boxShadow: "0 16px 36px rgba(21, 101, 192, 0.5)",
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  Launch AR Experience
                </Button>
              </Box>
            </>
          )}
        </Paper>
      </Box>
    </Box>
  );
}