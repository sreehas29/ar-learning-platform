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
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import GridViewIcon from "@mui/icons-material/GridView";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";

import { useApp } from "../../context/AppContext";
import CameraFeed from "../../modules/Camera/CameraFeed";
import ARSceneCanvas from "../../modules/Scene/ARSceneCanvas";
import ARHUDOverlay from "../../modules/Overlays/ARHUDOverlay";
import ARToolbar from "../../modules/Overlays/ARToolbar";
import MarkerTracker from "../../modules/Tracking/MarkerTracker";
import { exportCanvasSnapshot } from "../../services/arService";
import { playSnapshotSound } from "../../services/audioService";

export default function ARView() {
  const navigate = useNavigate();
  const { selectedSubject, selectedGrade, selectedActivity, isAudioMuted } = useApp();

  const [rotation, setRotation] = useState(0);
  const [scale, setScale] = useState(1);
  const [isWireframe, setIsWireframe] = useState(false);
  const [isCameraEnabled, setIsCameraEnabled] = useState(true);
  const [trackingMode, setTrackingMode] = useState("marker"); // "marker" | "surface"
  const [snapshotTaken, setSnapshotTaken] = useState(false);

  // Advanced 3D Scene Controls
  const [lightingPreset, setLightingPreset] = useState("studio"); // "studio" | "contrast" | "sunlight" | "cyber"
  const [cameraView, setCameraView] = useState("isometric"); // "isometric" | "top" | "front"
  const [isAnimPaused, setIsAnimPaused] = useState(false);
  const [animSpeed, setAnimSpeed] = useState(1.0);

  const handleExit = () => {
    navigate("/instructions");
  };

  const handleRotateLeft = () => setRotation((prev) => prev - 45);
  const handleRotateRight = () => setRotation((prev) => prev + 45);
  const handleZoomIn = () => setScale((prev) => Math.min(prev + 0.25, 2.5));
  const handleZoomOut = () => setScale((prev) => Math.max(prev - 0.25, 0.5));
  const handleReset = () => {
    setRotation(0);
    setScale(1);
    setIsWireframe(false);
    setLightingPreset("studio");
    setCameraView("isometric");
    setIsAnimPaused(false);
    setAnimSpeed(1.0);
  };

  const handleToggleTrackingMode = () => {
    setTrackingMode((prev) => (prev === "marker" ? "surface" : "marker"));
  };

  const handleSnapshot = () => {
    playSnapshotSound(isAudioMuted);
    exportCanvasSnapshot(`AR-Lesson-${selectedActivity?.id || "snapshot"}.png`);
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
      {/* 1. Live Camera Passthrough Feed */}
      <CameraFeed isCameraEnabled={isCameraEnabled} />

      {/* 2. Three.js 3D WebGL Scene Engine */}
      <ARSceneCanvas
        activity={selectedActivity}
        isWireframe={isWireframe}
        manualRotation={rotation}
        scaleFactor={scale}
        lightingPreset={lightingPreset}
        cameraView={cameraView}
        isAnimPaused={isAnimPaused}
        animSpeed={animSpeed}
      />

      {/* 3. Optical Marker Tracking System Overlay */}
      <MarkerTracker
        trackingMode={trackingMode}
        onToggleMode={handleToggleTrackingMode}
      />

      {/* 4. Educational AR Analytics & Quiz Overlay */}
      <ARHUDOverlay activity={selectedActivity} />

      {/* 5. 3D WebAR Interactive Toolbar */}
      <ARToolbar
        isWireframe={isWireframe}
        onToggleWireframe={() => setIsWireframe(!isWireframe)}
        lightingPreset={lightingPreset}
        onChangeLightingPreset={setLightingPreset}
        cameraView={cameraView}
        onChangeCameraView={setCameraView}
        isAnimPaused={isAnimPaused}
        onToggleAnimPause={() => setIsAnimPaused(!isAnimPaused)}
        animSpeed={animSpeed}
        onChangeAnimSpeed={setAnimSpeed}
      />

      {/* 6. Top Navigation Header Bar */}
      <Box
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "rgba(15, 23, 42, 0.75)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
          zIndex: 10,
        }}
      >
        <Stack direction="row" spacing={1.5} alignItems="center">
          <IconButton color="inherit" onClick={handleExit} size="large">
            <CloseIcon />
          </IconButton>

          <Box>
            <Typography variant="h6" fontWeight={700} sx={{ color: "#38BDF8" }}>
              {selectedActivity?.title || "WebAR 3D Interactive Scene"}
            </Typography>
            <Typography variant="caption" sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
              {selectedSubject ? selectedSubject.toUpperCase() : "MATHEMATICS"} • Grade{" "}
              {selectedGrade || "6"}
            </Typography>
          </Box>
        </Stack>

        <Stack direction="row" spacing={1} alignItems="center">
          <Chip
            icon={<CheckCircleOutlinedIcon style={{ color: "#4ADE80" }} />}
            label="Three.js WebGL Active"
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

      {/* Snapshot Download Alert */}
      {snapshotTaken && (
        <Alert
          severity="success"
          sx={{
            position: "absolute",
            top: 80,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 20,
            backgroundColor: "rgba(34, 197, 94, 0.95)",
            color: "#FFFFFF",
          }}
        >
          AR 3D Lesson Snapshot Downloaded!
        </Alert>
      )}

      {/* 7. Bottom Quick Action Controls Bar */}
      <Box
        sx={{
          p: 1.5,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "rgba(15, 23, 42, 0.85)",
          backdropFilter: "blur(12px)",
          borderTop: "1px solid rgba(255, 255, 255, 0.1)",
          zIndex: 9,
        }}
      >
        <Paper
          elevation={0}
          sx={{
            px: 2.5,
            py: 0.5,
            borderRadius: 5,
            backgroundColor: "rgba(30, 41, 59, 0.85)",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            display: "flex",
            gap: 1.5,
            alignItems: "center",
          }}
        >
          <Tooltip title="Rotate 3D Mesh Left">
            <IconButton color="info" onClick={handleRotateLeft} size="small">
              <RotateLeftIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Rotate 3D Mesh Right">
            <IconButton color="info" onClick={handleRotateRight} size="small">
              <RotateRightIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Zoom In Mesh">
            <IconButton color="info" onClick={handleZoomIn} size="small">
              <ZoomInIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Zoom Out Mesh">
            <IconButton color="info" onClick={handleZoomOut} size="small">
              <ZoomOutIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Toggle Wireframe View Mode">
            <IconButton
              color={isWireframe ? "warning" : "default"}
              onClick={() => setIsWireframe(!isWireframe)}
              size="small"
            >
              <GridViewIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title={isCameraEnabled ? "Switch to AR Studio Mode" : "Enable Live Camera Feed"}>
            <IconButton
              color={isCameraEnabled ? "success" : "default"}
              onClick={() => setIsCameraEnabled(!isCameraEnabled)}
              size="small"
            >
              {isCameraEnabled ? <VideocamIcon /> : <VideocamOffIcon />}
            </IconButton>
          </Tooltip>

          <Tooltip title="Reset Transformations">
            <IconButton color="secondary" onClick={handleReset} size="small">
              <RestartAltIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Capture AR Lesson Snapshot">
            <IconButton color="success" onClick={handleSnapshot} size="small">
              <CameraAltIcon />
            </IconButton>
          </Tooltip>
        </Paper>
      </Box>
    </Box>
  );
}