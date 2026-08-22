import { useState } from "react";
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
import QuizIcon from "@mui/icons-material/Quiz";
import GroupsIcon from "@mui/icons-material/Groups";
import BuildIcon from "@mui/icons-material/Build";
import { useNavigate, useLocation } from "react-router-dom";

import { useApp } from "../../context/AppContext";
import AnalyticsModal from "../dashboard/AnalyticsModal";
import ClassroomSessionModal from "../../modules/Classroom/ClassroomSessionModal";

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

  const [showAnalyticsModal, setShowAnalyticsModal] = useState(false);
  const [showClassroomModal, setShowClassroomModal] = useState(false);

  const handleReset = () => {
    resetSelection();
    navigate("/");
  };

  return (
    <>
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

          {/* Right Actions: 3D Sandbox + 3D Models + Live AR Room + Quiz Hub + Audio Mute + Analytics Badge + Home + Reset */}
          <Stack direction="row" spacing={1.2} alignItems="center">
            <Tooltip title="Freeform 3D AR Geometry Sandbox">
              <Chip
                icon={<BuildIcon style={{ color: "#10B981" }} fontSize="small" />}
                label="3D Sandbox"
                size="small"
                onClick={() => navigate("/sandbox")}
                sx={{
                  backgroundColor: "rgba(16, 185, 129, 0.12)",
                  color: "#059669",
                  border: "1px solid rgba(16, 185, 129, 0.4)",
                  fontWeight: 700,
                  px: 0.5,
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "rgba(16, 185, 129, 0.22)",
                  },
                }}
              />
            </Tooltip>

            <Tooltip title="Explore 3D WebGL Model Library">
              <Chip
                icon={<ViewInArIcon style={{ color: "#1565C0" }} fontSize="small" />}
                label="3D Models"
                size="small"
                onClick={() => navigate("/models")}
                sx={{
                  backgroundColor: "rgba(21, 101, 192, 0.12)",
                  color: "#1565C0",
                  border: "1px solid rgba(21, 101, 192, 0.4)",
                  fontWeight: 700,
                  px: 0.5,
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "rgba(21, 101, 192, 0.22)",
                  },
                }}
              />
            </Tooltip>

            <Tooltip title="Host or Join Live AR Classroom Session">
              <Chip
                icon={<GroupsIcon style={{ color: "#0284C7" }} fontSize="small" />}
                label="Live AR Room"
                size="small"
                onClick={() => setShowClassroomModal(true)}
                sx={{
                  backgroundColor: "rgba(2, 132, 199, 0.15)",
                  color: "#0369A1",
                  border: "1px solid rgba(2, 132, 199, 0.4)",
                  fontWeight: 700,
                  px: 0.5,
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "rgba(2, 132, 199, 0.25)",
                  },
                }}
              />
            </Tooltip>

            <Tooltip title="Open NCERT Practice Quiz Hub">
              <Chip
                icon={<QuizIcon style={{ color: "#D97706" }} fontSize="small" />}
                label="Quiz Hub"
                size="small"
                onClick={() => navigate("/quiz-hub")}
                sx={{
                  backgroundColor: "rgba(245, 158, 11, 0.15)",
                  color: "#B45309",
                  border: "1px solid rgba(245, 158, 11, 0.4)",
                  fontWeight: 700,
                  px: 0.5,
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "rgba(245, 158, 11, 0.25)",
                  },
                }}
              />
            </Tooltip>

            <Tooltip title={isAudioMuted ? "Unmute Voice Narration" : "Mute Voice Narration"}>
              <IconButton
                color={isAudioMuted ? "default" : "primary"}
                onClick={toggleAudioMute}
                size="small"
              >
                {isAudioMuted ? <VolumeOffIcon /> : <VolumeUpIcon />}
              </IconButton>
            </Tooltip>

            <Tooltip title="View Performance & NCERT Progress Analytics">
              <Chip
                icon={<EmojiEventsIcon style={{ color: "#D97706" }} />}
                label={`${completedActivities?.length || 0} Completed`}
                size="small"
                onClick={() => setShowAnalyticsModal(true)}
                sx={{
                  backgroundColor: "#FEF3C7",
                  color: "#92400E",
                  fontWeight: 700,
                  px: 0.5,
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "#FDE68A",
                  },
                }}
              />
            </Tooltip>

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

      {/* Classroom Progress Analytics Modal */}
      <AnalyticsModal
        open={showAnalyticsModal}
        onClose={() => setShowAnalyticsModal(false)}
      />

      {/* Multi-User AR Smart Classroom Suite Modal */}
      <ClassroomSessionModal
        open={showClassroomModal}
        onClose={() => setShowClassroomModal(false)}
      />
    </>
  );
}
