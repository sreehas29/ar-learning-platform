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
import SimulationControls from "../../modules/Overlays/SimulationControls";
import { exportCanvasSnapshot } from "../../services/arService";
import { playSnapshotSound } from "../../services/audioService";
import { getModelConfigForActivity } from "../../registry/modelRegistry";

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
  const [isExploded, setIsExploded] = useState(false);
  const [showDimensions, setShowDimensions] = useState(false);

  // Live STEM Simulation Parameters
  const [simParams, setSimParams] = useState({
    atomicNumber: 6,
    refractiveIndex: 1.5,
    laserAngle: 45,
    legA: 3,
    legB: 4,
    orbitSpeed: 1.0,
  });

  const handleParamChange = (key, value) => {
    setSimParams((prev) => ({ ...prev, [key]: value }));
  };

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
    setIsExploded(false);
    setShowDimensions(false);
    setSimParams({
      atomicNumber: 6,
      refractiveIndex: 1.5,
      laserAngle: 45,
      legA: 3,
      legB: 4,
      orbitSpeed: 1.0,
    });
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

  const modelConfig = getModelConfigForActivity(selectedActivity?.id);

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
        isExploded={isExploded}
        showDimensions={showDimensions}
        simParams={simParams}
      />

      {/* 3. Optical Marker Tracking System Overlay */}
      <MarkerTracker
        trackingMode={trackingMode}
        onToggleMode={handleToggleTrackingMode}
      />

      {/* 4. Educational AR Analytics & Quiz Overlay */}
      <ARHUDOverlay activity={selectedActivity} />

      {/* 5. Live STEM Simulation Controls & Sliders Overlay */}
      <SimulationControls
        activityId={selectedActivity?.id}
        geometryType={modelConfig?.geometryType}
        simParams={simParams}
        onParamChange={handleParamChange}
      />

      {/* 6. 3D WebAR Interactive Toolbar */}
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
        isExploded={isExploded}
        onToggleExploded={() => setIsExploded(!isExploded)}
        showDimensions={showDimensions}
        onToggleDimensions={() => setShowDimensions(!showDimensions)}
      />

      {/* 7. Top Navigation Header Bar */}
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
          <Chip
            icon={<GridViewIcon fontSize="small" style={{ color: "#38BDF8" }} />}
            label={selectedActivity ? selectedActivity.title : "3D WebAR Interactive Mode"}
            color="primary"
            variant="outlined"
            sx={{ fontWeight: 700, fontSize: "0.9rem", color: "#FFFFFF" }}
          />

          {selectedGrade && (
            <Chip
              label={`Grade ${selectedGrade}`}
              size="small"
              sx={{ backgroundColor: "rgba(255, 255, 255, 0.15)", color: "#FFFFFF", fontWeight: 600 }}
            />
          )}

          {snapshotTaken && (
            <Chip
              icon={<CheckCircleOutlinedIcon style={{ color: "#4ADE80" }} />}
              label="HD Snapshot Saved!"
              color="success"
              size="small"
              sx={{ fontWeight: 700 }}
            />
          )}
        </Stack>

        <Stack direction="row" spacing={1}>
          <Tooltip title={isCameraEnabled ? "Switch to 3D Grid Canvas" : "Enable Live Camera Passthrough"}>
            <Button
              size="small"
              variant={isCameraEnabled ? "contained" : "outlined"}
              color={isCameraEnabled ? "primary" : "inherit"}
              startIcon={isCameraEnabled ? <VideocamIcon /> : <VideocamOffIcon />}
              onClick={() => setIsCameraEnabled(!isCameraEnabled)}
              sx={{ borderRadius: 2.5, textTransform: "none", fontWeight: 600 }}
            >
              {isCameraEnabled ? "Camera Active" : "3D Studio Grid"}
            </Button>
          </Tooltip>

          <Tooltip title="Take HD Canvas Snapshot">
            <IconButton color="primary" onClick={handleSnapshot} sx={{ backgroundColor: "rgba(56, 189, 248, 0.15)" }}>
              <CameraAltIcon />
            </IconButton>
          </Tooltip>

          <Button
            variant="outlined"
            color="error"
            size="small"
            startIcon={<CloseIcon />}
            onClick={handleExit}
            sx={{ borderRadius: 2.5, textTransform: "none", fontWeight: 700 }}
          >
            Exit AR
          </Button>
        </Stack>
      </Box>

      {/* 8. Bottom floating 3D Quick Controls */}
      <Paper
        elevation={8}
        sx={{
          position: "absolute",
          bottom: 20,
          right: 20,
          zIndex: 10,
          p: 1,
          borderRadius: 3,
          backgroundColor: "rgba(15, 23, 42, 0.75)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <Stack direction="row" spacing={1}>
          <Tooltip title="Rotate 3D Model Left">
            <IconButton color="primary" size="small" onClick={handleRotateLeft}>
              <RotateLeftIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Rotate 3D Model Right">
            <IconButton color="primary" size="small" onClick={handleRotateRight}>
              <RotateRightIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Zoom In 3D Model">
            <IconButton color="primary" size="small" onClick={handleZoomIn}>
              <ZoomInIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Zoom Out 3D Model">
            <IconButton color="primary" size="small" onClick={handleZoomOut}>
              <ZoomOutIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Reset 3D Model Position & Scale">
            <IconButton color="secondary" size="small" onClick={handleReset}>
              <RestartAltIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      </Paper>
    </Box>
  );
}