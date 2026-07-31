import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Chip,
  Stack,
  IconButton,
  Tooltip,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import HomeIcon from "@mui/icons-material/Home";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import { useNavigate, useLocation } from "react-router-dom";
import { useApp } from "../../context/AppContext";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    selectedSubject,
    selectedGrade,
    completedActivities,
    resetSelection,
    isAudioMuted,
    toggleAudioMute,
  } = useApp();

  const handleReset = () => {
    resetSelection();
    navigate("/");
  };

  return (
    <AppBar
      position="sticky"
      elevation={2}
      sx={{
        backgroundColor: "#FFFFFF",
        color: "text.primary",
        borderBottom: "1px solid #E2E8F0",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", py: 0.5 }}>
        {/* Brand Logo & Name */}
        <Box
          display="flex"
          alignItems="center"
          gap={1.5}
          onClick={() => navigate("/")}
          sx={{ cursor: "pointer" }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              p: 1,
              borderRadius: 2.5,
              backgroundColor: "#1565C0",
              color: "#FFFFFF",
            }}
          >
            <ViewInArIcon fontSize="medium" />
          </Box>

          <Box>
            <Typography variant="h6" fontWeight={800} color="primary" sx={{ lineHeight: 1.1 }}>
              AR EduPlatform
            </Typography>
            <Typography variant="caption" color="text.secondary" fontWeight={500}>
              Interactive 3D WebAR Learning
            </Typography>
          </Box>
        </Box>

        {/* Center Breadcrumbs / Active Context Badge */}
        <Stack direction="row" spacing={1} alignItems="center" display={{ xs: "none", md: "flex" }}>
          {selectedSubject && (
            <Chip
              label={`Subject: ${selectedSubject.toUpperCase()}`}
              size="small"
              color="primary"
              variant="outlined"
              sx={{ fontWeight: 600 }}
            />
          )}

          {selectedGrade && (
            <Chip
              icon={<SchoolIcon fontSize="small" />}
              label={`Grade ${selectedGrade}`}
              size="small"
              color="info"
              variant="outlined"
              sx={{ fontWeight: 600 }}
            />
          )}
        </Stack>

        {/* Right Actions: Audio Mute + Completed Counter + Home + Reset */}
        <Stack direction="row" spacing={1.2} alignItems="center">
          <Tooltip title={isAudioMuted ? "Unmute Voice Narration" : "Mute Voice Narration"}>
            <IconButton
              color={isAudioMuted ? "default" : "primary"}
              onClick={toggleAudioMute}
              size="small"
            >
              {isAudioMuted ? <VolumeOffIcon /> : <VolumeUpIcon />}
            </IconButton>
          </Tooltip>

          <Chip
            icon={<EmojiEventsIcon style={{ color: "#D97706" }} />}
            label={`${completedActivities.length} Completed`}
            size="small"
            sx={{
              backgroundColor: "#FEF3C7",
              color: "#92400E",
              fontWeight: 700,
              px: 0.5,
            }}
          />

          {location.pathname !== "/" && (
            <Tooltip title="Go to Home">
              <IconButton color="primary" onClick={() => navigate("/")} size="small">
                <HomeIcon />
              </IconButton>
            </Tooltip>
          )}

          {(selectedSubject || selectedGrade) && (
            <Tooltip title="Reset Selections">
              <IconButton color="secondary" onClick={handleReset} size="small">
                <RestartAltIcon />
              </IconButton>
            </Tooltip>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
