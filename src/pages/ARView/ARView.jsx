import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Chip,
  Paper,
  Stack,
  Tooltip,
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import RotateRightIcon from "@mui/icons-material/RotateRight";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import InfoIcon from "@mui/icons-material/Info";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";

import { useApp } from "../../context/AppContext";

export default function ARView() {
  const navigate = useNavigate();
  const { selectedSubject, selectedGrade, selectedActivity } = useApp();

  const [rotation, setRotation] = useState(0);
  const [scale, setScale] = useState(1);
  const [showLabels, setShowLabels] = useState(true);
  const [snapshotTaken, setSnapshotTaken] = useState(false);

  const handleExit = () => {
    navigate("/instructions");
  };

  const handleRotateLeft = () => setRotation((prev) => prev - 45);
  const handleRotateRight = () => setRotation((prev) => prev + 45);
  const handleZoomIn = () => setScale((prev) => Math.min(prev + 0.2, 2.5));
  const handleZoomOut = () => setScale((prev) => Math.max(prev - 0.2, 0.5));
  const handleReset = () => {
    setRotation(0);
    setScale(1);
  };

  const handleSnapshot = () => {
    setSnapshotTaken(true);
    setTimeout(() => setSnapshotTaken(false), 3000);
  };

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "#0A0E17",
        color: "#FFFFFF",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        zIndex: 9999,
        overflow: "hidden",
        fontFamily: "Inter, Roboto, sans-serif",
      }}
    >
      {/* Top Overlay Bar */}
      <Box
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "rgba(15, 23, 42, 0.75)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <Stack direction="row" spacing={1.5} alignItems="center">
          <IconButton color="inherit" onClick={handleExit} size="large">
            <CloseIcon />
          </IconButton>

          <Box>
            <Typography variant="h6" fontWeight={700} sx={{ color: "#38BDF8" }}>
              {selectedActivity?.title || "AR Experience Placeholder"}
            </Typography>
            <Typography variant="caption" sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
              {selectedSubject ? selectedSubject.toUpperCase() : "GENERAL"} • Grade{" "}
              {selectedGrade || "6-10"}
            </Typography>
          </Box>
        </Stack>

        <Stack direction="row" spacing={1} alignItems="center">
          <Chip
            icon={<CheckCircleOutlinedIcon style={{ color: "#4ADE80" }} />}
            label="Tracking: Surface Active"
            size="small"
            sx={{
              backgroundColor: "rgba(74, 222, 128, 0.15)",
              color: "#4ADE80",
              border: "1px solid rgba(74, 222, 128, 0.3)",
              fontWeight: 600,
            }}
          />
          <Button
            variant="outlined"
            size="small"
            onClick={handleExit}
            sx={{
              color: "#FFFFFF",
              borderColor: "rgba(255, 255, 255, 0.3)",
              textTransform: "none",
            }}
          >
            Exit AR
          </Button>
        </Stack>
      </Box>

      {/* Main 3D Viewport Placeholder Container */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          background:
            "radial-gradient(circle at center, rgba(30, 58, 138, 0.3) 0%, rgba(10, 14, 23, 1) 70%)",
        }}
      >
        {/* Snapshot Notification Feedback */}
        {snapshotTaken && (
          <Alert
            severity="success"
            sx={{
              position: "absolute",
              top: 20,
              zIndex: 10,
              backgroundColor: "rgba(34, 197, 94, 0.9)",
              color: "#FFFFFF",
            }}
          >
            AR View Snapshot captured!
          </Alert>
        )}

        {/* 3D Model Graphic Container */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            transform: `rotate(${rotation}deg) scale(${scale})`,
            transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            cursor: "grab",
          }}
        >
          <Box
            sx={{
              width: 220,
              height: 220,
              borderRadius: "50%",
              border: "2px dashed #38BDF8",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 50px rgba(56, 189, 248, 0.25)",
              backgroundColor: "rgba(56, 189, 248, 0.05)",
            }}
          >
            <ViewInArIcon
              sx={{
                fontSize: 110,
                color: "#38BDF8",
                filter: "drop-shadow(0 0 15px rgba(56, 189, 248, 0.6))",
              }}
            />
          </Box>

          {showLabels && (
            <Paper
              sx={{
                mt: 3,
                px: 2.5,
                py: 1,
                borderRadius: 3,
                backgroundColor: "rgba(15, 23, 42, 0.85)",
                border: "1px solid rgba(56, 189, 248, 0.4)",
                textAlign: "center",
              }}
            >
              <Typography variant="subtitle2" fontWeight={600} color="#38BDF8">
                {selectedActivity?.arType || "3D Educational AR Model"}
              </Typography>
              <Typography variant="caption" color="rgba(255, 255, 255, 0.7)">
                Rotation: {rotation}° | Scale: {(scale * 100).toFixed(0)}%
              </Typography>
            </Paper>
          )}
        </Box>

        {/* Surface Grid Graphic Overlay */}
        <Box
          sx={{
            position: "absolute",
            bottom: 40,
            width: "80%",
            height: 120,
            borderRadius: 4,
            border: "1px dashed rgba(255, 255, 255, 0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          <Typography variant="caption" color="rgba(255, 255, 255, 0.4)">
            [ Simulated Surface Anchor • Ready for MindAR / Three.js Canvas ]
          </Typography>
        </Box>
      </Box>

      {/* Bottom Floating Control Bar */}
      <Box
        sx={{
          p: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "rgba(15, 23, 42, 0.85)",
          backdropFilter: "blur(12px)",
          borderTop: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <Paper
          elevation={0}
          sx={{
            px: 3,
            py: 1,
            borderRadius: 5,
            backgroundColor: "rgba(30, 41, 59, 0.8)",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            display: "flex",
            gap: 1.5,
            alignItems: "center",
          }}
        >
          <Tooltip title="Rotate Left">
            <IconButton color="info" onClick={handleRotateLeft}>
              <RotateLeftIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Rotate Right">
            <IconButton color="info" onClick={handleRotateRight}>
              <RotateRightIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Zoom In">
            <IconButton color="info" onClick={handleZoomIn}>
              <ZoomInIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Zoom Out">
            <IconButton color="info" onClick={handleZoomOut}>
              <ZoomOutIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Reset Model Transformation">
            <IconButton color="warning" onClick={handleReset}>
              <RestartAltIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Capture AR Snapshot">
            <IconButton color="success" onClick={handleSnapshot}>
              <CameraAltIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Toggle 3D Labels">
            <IconButton
              color={showLabels ? "primary" : "default"}
              onClick={() => setShowLabels(!showLabels)}
            >
              <InfoIcon />
            </IconButton>
          </Tooltip>
        </Paper>
      </Box>
    </Box>
  );
}