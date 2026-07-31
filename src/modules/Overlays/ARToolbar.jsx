import { useState } from "react";
import {
  Box,
  Paper,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Chip,
} from "@mui/material";
import GridOnIcon from "@mui/icons-material/GridOn";
import GridOffIcon from "@mui/icons-material/GridOff";
import LightModeIcon from "@mui/icons-material/LightMode";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import CenterFocusStrongIcon from "@mui/icons-material/CenterFocusStrong";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VerticalAlignTopIcon from "@mui/icons-material/VerticalAlignTop";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import SpeedIcon from "@mui/icons-material/Speed";

export default function ARToolbar({
  isWireframe,
  onToggleWireframe,
  lightingPreset,
  onChangeLightingPreset,
  cameraView,
  onChangeCameraView,
  isAnimPaused,
  onToggleAnimPause,
  animSpeed,
  onChangeAnimSpeed,
}) {
  const [lightAnchor, setLightAnchor] = useState(null);
  const [cameraAnchor, setCameraAnchor] = useState(null);

  const handleLightClick = (e) => setLightAnchor(e.currentTarget);
  const handleLightClose = (preset) => {
    if (preset) onChangeLightingPreset(preset);
    setLightAnchor(null);
  };

  const handleCameraClick = (e) => setCameraAnchor(e.currentTarget);
  const handleCameraClose = (view) => {
    if (view) onChangeCameraView(view);
    setCameraAnchor(null);
  };

  const cycleSpeed = () => {
    const speeds = [0.5, 1.0, 2.0];
    const currentIndex = speeds.indexOf(animSpeed);
    const nextSpeed = speeds[(currentIndex + 1) % speeds.length];
    onChangeAnimSpeed(nextSpeed);
  };

  return (
    <Box
      sx={{
        position: "absolute",
        bottom: 24,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 10,
        pointerEvents: "auto",
      }}
    >
      <Paper
        elevation={8}
        sx={{
          px: 2,
          py: 1,
          borderRadius: 5,
          backgroundColor: "rgba(15, 23, 42, 0.85)",
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          boxShadow: "0 12px 32px rgba(0, 0, 0, 0.4)",
        }}
      >
        {/* 1. Wireframe Mode Toggle */}
        <Tooltip title={isWireframe ? "Switch to Shaded 3D Mesh" : "Switch to Polygon Wireframe"}>
          <IconButton
            onClick={onToggleWireframe}
            size="small"
            sx={{
              color: isWireframe ? "#38BDF8" : "rgba(255, 255, 255, 0.75)",
              backgroundColor: isWireframe ? "rgba(56, 189, 248, 0.2)" : "transparent",
              "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" },
            }}
          >
            {isWireframe ? <GridOnIcon fontSize="small" /> : <GridOffIcon fontSize="small" />}
          </IconButton>
        </Tooltip>

        <Divider orientation="vertical" flexItem sx={{ borderColor: "rgba(255, 255, 255, 0.15)" }} />

        {/* 2. Lighting Studio Presets */}
        <Tooltip title="Classroom 3D Lighting Presets">
          <IconButton
            onClick={handleLightClick}
            size="small"
            sx={{
              color: "rgba(255, 255, 255, 0.75)",
              "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" },
            }}
          >
            <LightModeIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        <Menu
          anchorEl={lightAnchor}
          open={Boolean(lightAnchor)}
          onClose={() => handleLightClose(null)}
          PaperProps={{
            sx: {
              backgroundColor: "#0F172A",
              color: "#FFFFFF",
              borderRadius: 3,
              border: "1px solid rgba(255, 255, 255, 0.15)",
            },
          }}
        >
          <MenuItem onClick={() => handleLightClose("studio")} selected={lightingPreset === "studio"}>
            <ListItemIcon sx={{ color: "#38BDF8" }}>
              <LightModeIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Studio Daylight" />
          </MenuItem>
          <MenuItem onClick={() => handleLightClose("contrast")} selected={lightingPreset === "contrast"}>
            <ListItemIcon sx={{ color: "#F59E0B" }}>
              <Brightness4Icon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="High Contrast Shadows" />
          </MenuItem>
          <MenuItem onClick={() => handleLightClose("sunlight")} selected={lightingPreset === "sunlight"}>
            <ListItemIcon sx={{ color: "#EAB308" }}>
              <WbSunnyIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Warm Sunlight" />
          </MenuItem>
          <MenuItem onClick={() => handleLightClose("cyber")} selected={lightingPreset === "cyber"}>
            <ListItemIcon sx={{ color: "#A855F7" }}>
              <AutoAwesomeIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Cyber Ambient Glow" />
          </MenuItem>
        </Menu>

        <Divider orientation="vertical" flexItem sx={{ borderColor: "rgba(255, 255, 255, 0.15)" }} />

        {/* 3. Camera View Shortcuts */}
        <Tooltip title="Orthogonal Camera View Shortcuts">
          <IconButton
            onClick={handleCameraClick}
            size="small"
            sx={{
              color: "rgba(255, 255, 255, 0.75)",
              "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" },
            }}
          >
            <CenterFocusStrongIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        <Menu
          anchorEl={cameraAnchor}
          open={Boolean(cameraAnchor)}
          onClose={() => handleCameraClose(null)}
          PaperProps={{
            sx: {
              backgroundColor: "#0F172A",
              color: "#FFFFFF",
              borderRadius: 3,
              border: "1px solid rgba(255, 255, 255, 0.15)",
            },
          }}
        >
          <MenuItem onClick={() => handleCameraClose("isometric")} selected={cameraView === "isometric"}>
            <ListItemIcon sx={{ color: "#38BDF8" }}>
              <CenterFocusStrongIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Isometric 45° View" />
          </MenuItem>
          <MenuItem onClick={() => handleCameraClose("top")} selected={cameraView === "top"}>
            <ListItemIcon sx={{ color: "#10B981" }}>
              <VerticalAlignTopIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Top Plan View" />
          </MenuItem>
          <MenuItem onClick={() => handleCameraClose("front")} selected={cameraView === "front"}>
            <ListItemIcon sx={{ color: "#F59E0B" }}>
              <VisibilityIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Front Elevation View" />
          </MenuItem>
        </Menu>

        <Divider orientation="vertical" flexItem sx={{ borderColor: "rgba(255, 255, 255, 0.15)" }} />

        {/* 4. Animation Pause / Play */}
        <Tooltip title={isAnimPaused ? "Resume 3D Rotation" : "Pause 3D Rotation"}>
          <IconButton
            onClick={onToggleAnimPause}
            size="small"
            sx={{
              color: isAnimPaused ? "#F59E0B" : "#10B981",
              "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" },
            }}
          >
            {isAnimPaused ? <PlayArrowIcon fontSize="small" /> : <PauseIcon fontSize="small" />}
          </IconButton>
        </Tooltip>

        {/* 5. Animation Speed Chip */}
        <Tooltip title="Cycle Animation Speed (0.5x, 1x, 2x)">
          <Chip
            icon={<SpeedIcon style={{ color: "#38BDF8" }} fontSize="small" />}
            label={`${animSpeed}x`}
            size="small"
            onClick={cycleSpeed}
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              color: "#FFFFFF",
              fontWeight: 700,
              cursor: "pointer",
              "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.2)" },
            }}
          />
        </Tooltip>
      </Paper>
    </Box>
  );
}
