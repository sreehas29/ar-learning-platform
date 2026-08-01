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
  Avatar,
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
import VerifiedIcon from "@mui/icons-material/Verified";

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
      icon: <CameraAltIcon style={{ color: "#1565C0" }} />,
      title: "Grant Camera Permission",
      description: "Ensure camera permissions are enabled in your browser when prompted for live video passthrough.",
    },
    {
      icon: <WbSunnyIcon style={{ color: "#D97706" }} />,
      title: "Prepare Your Environment",
      description: "Use a well-lit classroom or room and clear a flat surface (table or desk).",
    },
    {
      icon: <CenterFocusStrongIcon style={{ color: "#059669" }} />,
      title: "Align Camera to Surface",
      description: "Point your device camera downward at the flat surface or target marker ring.",
    },
    {
      icon: <TouchAppIcon style={{ color: "#7C3AED" }} />,
      title: "Interact in 3D Space",
      description: "Click and drag to rotate in 3D, pinch to zoom, and tap 3D hotspot inspection nodes for voice explanations.",
    },
  ];

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#F8FAFC", color: "#0F172A" }}>
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
            border: "1px solid #E2E8F0",
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
              sx={{ color: "#475569", textTransform: "none", fontWeight: 700, fontSize: "0.95rem" }}
            >
              Back to Activity Selection
            </Button>

            <Stack direction="row" spacing={1.5} alignItems="center">
              {selectedSubject && (
                <Chip
                  label={`Subject: ${selectedSubject.toUpperCase()}`}
                  color="primary"
                  variant="outlined"
                  sx={{ fontWeight: 800, fontSize: "0.85rem", color: "#1565C0", borderColor: "#1565C0" }}
                />
              )}
              {selectedGrade && (
                <Chip
                  label={`Grade ${selectedGrade}`}
                  color="info"
                  variant="outlined"
                  sx={{ fontWeight: 800, fontSize: "0.85rem", color: "#0284C7", borderColor: "#0284C7" }}
                />
              )}
            </Stack>
          </Box>

          <Divider sx={{ mb: 4, borderColor: "#E2E8F0" }} />

          {/* Guard Alert */}
          {!selectedActivity ? (
            <Alert
              severity="warning"
              sx={{ mb: 4, borderRadius: 3 }}
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
              {/* High-Visibility Light Activity Summary Card */}
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 3, sm: 4 },
                  mb: 4,
                  borderRadius: 5,
                  backgroundColor: "#F0F9FF",
                  border: "2px solid #0284C7",
                  boxShadow: "0 8px 24px rgba(2, 132, 199, 0.1)",
                }}
              >
                <Grid container spacing={3} alignItems="center">
                  <Grid item xs={12} md={8}>
                    <Box display="flex" alignItems="center" gap={1.5} mb={1.5}>
                      <ViewInArIcon sx={{ color: "#1565C0", fontSize: 40 }} />
                      <Typography variant="h4" fontWeight={900} color="#0F172A">
                        {selectedActivity.title}
                      </Typography>
                    </Box>

                    <Typography variant="body1" color="#334155" paragraph sx={{ fontSize: "1.1rem", lineHeight: 1.6, fontWeight: 500 }}>
                      {selectedActivity.description}
                    </Typography>

                    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap mb={3}>
                      {selectedActivity.topics?.map((topic) => (
                        <Chip
                          key={topic}
                          label={topic}
                          size="small"
                          sx={{ fontWeight: 700, backgroundColor: "#E0F2FE", color: "#0369A1" }}
                        />
                      ))}
                    </Stack>

                    {/* High-Visibility Voice Guidance Narrator Button */}
                    <Button
                      size="medium"
                      variant="contained"
                      startIcon={<VolumeUpIcon />}
                      onClick={handleListenObjective}
                      sx={{
                        borderRadius: 3,
                        textTransform: "none",
                        fontWeight: 800,
                        px: 3,
                        py: 1.2,
                        fontSize: "0.95rem",
                        backgroundColor: "#1565C0",
                        color: "#FFFFFF",
                        boxShadow: "0 6px 18px rgba(21, 101, 192, 0.3)",
                        "&:hover": { backgroundColor: "#0D47A1" },
                      }}
                    >
                      Listen to Voice Guidance Narrator
                    </Button>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <Stack spacing={2} sx={{ pl: { md: 2 } }}>
                      {selectedActivity.ncertCode && (
                        <Chip
                          icon={<MenuBookIcon fontSize="small" style={{ color: "#FFFFFF" }} />}
                          label={selectedActivity.ncertCode}
                          color="primary"
                          sx={{ fontWeight: 900, py: 2.2, fontSize: "0.95rem", backgroundColor: "#1565C0", color: "#FFFFFF" }}
                        />
                      )}
                      <Box display="flex" alignItems="center" gap={1}>
                        <AccessTimeIcon fontSize="small" sx={{ color: "#0284C7" }} />
                        <Typography variant="body1" color="#1E293B">
                          Duration: <strong style={{ color: "#0F172A" }}>{selectedActivity.duration}</strong>
                        </Typography>
                      </Box>
                      <Box display="flex" alignItems="center" gap={1}>
                        <Chip
                          label={`Difficulty: ${selectedActivity.difficulty}`}
                          size="small"
                          sx={{ fontWeight: 700, backgroundColor: "#FEF3C7", color: "#92400E" }}
                        />
                        <Chip
                          label={selectedActivity.arType}
                          size="small"
                          sx={{ fontWeight: 800, backgroundColor: "#D1FAE5", color: "#065F46" }}
                        />
                      </Box>
                    </Stack>
                  </Grid>
                </Grid>
              </Paper>

              {/* High-Contrast Light NCERT Lab Manual Reference Card */}
              {selectedActivity.ncertKitName && (
                <Paper
                  elevation={0}
                  sx={{
                    p: { xs: 3, sm: 4 },
                    mb: 4,
                    borderRadius: 5,
                    backgroundColor: "#FFFDF5",
                    border: "2px solid #D97706",
                    boxShadow: "0 8px 24px rgba(217, 119, 6, 0.12)",
                  }}
                >
                  <Box display="flex" alignItems="center" gap={1.5} mb={1.5}>
                    <BuildCircleIcon style={{ color: "#D97706", fontSize: 32 }} />
                    <Typography variant="h6" fontWeight={900} color="#92400E">
                      Official NCERT Lab Manual & School Kit Reference
                    </Typography>
                  </Box>

                  <Typography variant="subtitle1" fontWeight={800} color="#B45309" gutterBottom sx={{ fontSize: "1.05rem" }}>
                    NCERT Kit Standard: {selectedActivity.ncertKitName} ({selectedActivity.ncertCode})
                  </Typography>

                  <Typography variant="body1" color="#78350F" paragraph sx={{ fontSize: "1.05rem", lineHeight: 1.6, fontWeight: 500 }}>
                    <strong style={{ color: "#92400E" }}>NCERT Objective:</strong> {selectedActivity.ncertObjective}
                  </Typography>

                  <Typography variant="caption" fontWeight={900} color="#92400E" display="block" mb={1} sx={{ fontSize: "0.8rem", letterSpacing: 1 }}>
                    PHYSICAL KIT APPARATUS ITEMS SIMULATED IN WEBAR:
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    {selectedActivity.ncertApparatus?.map((item) => (
                      <Chip
                        key={item}
                        label={item}
                        size="medium"
                        sx={{ backgroundColor: "#FEF3C7", color: "#78350F", fontWeight: 800, fontSize: "0.85rem", border: "1px solid #FDE68A" }}
                      />
                    ))}
                  </Stack>
                </Paper>
              )}

              {/* Numbered Setup Guidelines Header */}
              <Box display="flex" alignItems="center" gap={1.5} mb={3}>
                <VerifiedIcon sx={{ color: "#10B981", fontSize: 28 }} />
                <Typography variant="h5" fontWeight={900} color="#0F172A">
                  Classroom & WebAR Setup Guidelines
                </Typography>
              </Box>

              {/* High-Contrast Light Setup Step Cards */}
              <Grid container spacing={2.5} mb={5}>
                {setupSteps.map((step, idx) => (
                  <Grid item xs={12} sm={6} key={step.title}>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 3,
                        height: "100%",
                        borderRadius: 4,
                        display: "flex",
                        gap: 2,
                        alignItems: "flex-start",
                        backgroundColor: "#F8FAFC",
                        border: "1.5px solid #CBD5E1",
                        transition: "all 0.2s ease-in-out",
                        "&:hover": {
                          borderColor: "#1565C0",
                          backgroundColor: "#F0F9FF",
                          transform: "translateY(-3px)",
                          boxShadow: "0 10px 24px rgba(21, 101, 192, 0.12)",
                        },
                      }}
                    >
                      <Avatar
                        sx={{
                          width: 44,
                          height: 44,
                          backgroundColor: "#1565C0",
                          color: "#FFFFFF",
                          fontWeight: 900,
                          fontSize: "1.2rem",
                          boxShadow: "0 4px 12px rgba(21, 101, 192, 0.3)",
                        }}
                      >
                        {idx + 1}
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle1" fontWeight={800} gutterBottom color="#1565C0" sx={{ fontSize: "1.05rem" }}>
                          {step.title}
                        </Typography>
                        <Typography variant="body2" color="#334155" sx={{ fontSize: "0.95rem", lineHeight: 1.5, fontWeight: 500 }}>
                          {step.description}
                        </Typography>
                      </Box>
                    </Paper>
                  </Grid>
                ))}
              </Grid>

              {/* High-Visibility Launch AR Action Button */}
              <Box textAlign="center" mt={5}>
                <Button
                  variant="contained"
                  color="success"
                  size="large"
                  startIcon={<PlayArrowIcon sx={{ fontSize: 36 }} />}
                  onClick={handleLaunchAR}
                  sx={{
                    px: 8,
                    py: 2.2,
                    fontSize: "1.25rem",
                    fontWeight: 900,
                    borderRadius: 4,
                    backgroundColor: "#10B981",
                    color: "#FFFFFF",
                    boxShadow: "0 12px 36px rgba(16, 185, 129, 0.4)",
                    textTransform: "none",
                    "&:hover": {
                      backgroundColor: "#059669",
                      boxShadow: "0 16px 42px rgba(16, 185, 129, 0.55)",
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  Launch Interactive 3D WebAR Scene
                </Button>
              </Box>
            </>
          )}
        </Paper>
      </Box>
    </Box>
  );
}