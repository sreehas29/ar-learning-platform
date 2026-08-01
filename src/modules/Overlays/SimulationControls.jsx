import { useState } from "react";
import {
  Paper,
  Typography,
  Box,
  Slider,
  Stack,
  IconButton,
  Chip,
  Collapse,
} from "@mui/material";
import TuneIcon from "@mui/icons-material/Tune";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ScienceIcon from "@mui/icons-material/Science";

export default function SimulationControls({
  activityId,
  geometryType,
  simParams = {},
  onParamChange,
}) {
  const [expanded, setExpanded] = useState(true);

  const elementsMap = {
    1: { symbol: "H", name: "Hydrogen", electrons: 1, color: "#EF4444" },
    2: { symbol: "He", name: "Helium", electrons: 2, color: "#F59E0B" },
    3: { symbol: "Li", name: "Lithium", electrons: 3, color: "#10B981" },
    4: { symbol: "Be", name: "Beryllium", electrons: 4, color: "#06B6D4" },
    5: { symbol: "B", name: "Boron", electrons: 5, color: "#3B82F6" },
    6: { symbol: "C", name: "Carbon", electrons: 6, color: "#8B5CF6" },
  };

  const atomicNum = simParams.atomicNumber || 6;
  const currentElem = elementsMap[atomicNum] || elementsMap[6];

  const legA = simParams.legA || 3;
  const legB = simParams.legB || 4;
  const hypotenuse = Math.sqrt(legA * legA + legB * legB).toFixed(2);

  const refIndex = simParams.refractiveIndex || 1.5;
  const laserAngle = simParams.laserAngle || 45;
  const orbitSpeed = simParams.orbitSpeed || 1.0;

  return (
    <Paper
      elevation={12}
      sx={{
        position: "absolute",
        bottom: { xs: 85, sm: 95 },
        left: 20,
        zIndex: 20,
        width: { xs: 280, sm: 320 },
        p: 2,
        borderRadius: 4,
        backgroundColor: "rgba(15, 23, 42, 0.88)",
        backdropFilter: "blur(16px)",
        border: "1px solid rgba(56, 189, 248, 0.4)",
        boxShadow: "0 12px 36px rgba(0, 0, 0, 0.5)",
        color: "#FFFFFF",
        transition: "all 0.3s ease-in-out",
      }}
    >
      {/* Header Bar */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        onClick={() => setExpanded(!expanded)}
        sx={{ cursor: "pointer" }}
      >
        <Box display="flex" alignItems="center" gap={1}>
          <TuneIcon style={{ color: "#38BDF8" }} fontSize="small" />
          <Typography variant="subtitle2" fontWeight={800} color="#38BDF8">
            Interactive STEM Simulator
          </Typography>
        </Box>

        <IconButton size="small" sx={{ color: "#FFFFFF" }}>
          {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Box>

      {/* Collapsible Sliders Body */}
      <Collapse in={expanded}>
        <Box pt={2}>
          {/* CONTROL SET 1: Bohr Atom Constructor / Chemical Element */}
          {(geometryType === "hydrocarbon" || activityId?.includes("sci-9") || activityId?.includes("atom")) && (
            <Box mb={2}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <Typography variant="caption" fontWeight={700} color="rgba(255, 255, 255, 0.8)">
                  ATOMIC NUMBER / PROTONS:
                </Typography>
                <Chip
                  icon={<ScienceIcon style={{ color: "#FFFFFF" }} fontSize="small" />}
                  label={`${currentElem.symbol} - ${currentElem.name}`}
                  size="small"
                  sx={{ backgroundColor: currentElem.color, color: "#FFFFFF", fontWeight: 800 }}
                />
              </Box>
              <Slider
                value={atomicNum}
                min={1}
                max={6}
                step={1}
                marks
                onChange={(e, val) => onParamChange("atomicNumber", val)}
                sx={{ color: "#38BDF8" }}
              />
            </Box>
          )}

          {/* CONTROL SET 2: Optics Prism & Laser Angle */}
          {(geometryType === "prism-refraction" || activityId?.includes("sci-10") || activityId?.includes("prism")) && (
            <Box mb={2}>
              <Box display="flex" justifyContent="space-between" mb={0.5}>
                <Typography variant="caption" fontWeight={700} color="rgba(255, 255, 255, 0.8)">
                  REFRACTIVE INDEX (n):
                </Typography>
                <Typography variant="caption" fontWeight={800} color="#38BDF8">
                  n = {refIndex.toFixed(2)}
                </Typography>
              </Box>
              <Slider
                value={refIndex}
                min={1.0}
                max={1.8}
                step={0.05}
                onChange={(e, val) => onParamChange("refractiveIndex", val)}
                sx={{ color: "#F59E0B" }}
              />

              <Box display="flex" justifyContent="space-between" mt={1} mb={0.5}>
                <Typography variant="caption" fontWeight={700} color="rgba(255, 255, 255, 0.8)">
                  INCIDENT LASER ANGLE:
                </Typography>
                <Typography variant="caption" fontWeight={800} color="#38BDF8">
                  {laserAngle}°
                </Typography>
              </Box>
              <Slider
                value={laserAngle}
                min={10}
                max={70}
                step={5}
                onChange={(e, val) => onParamChange("laserAngle", val)}
                sx={{ color: "#10B981" }}
              />
            </Box>
          )}

          {/* CONTROL SET 3: Pythagoras Right Triangle Dimensions */}
          {(geometryType === "pythagoras" || activityId?.includes("math-8") || activityId?.includes("pythagoras")) && (
            <Box mb={2}>
              <Box display="flex" justifyContent="space-between" mb={0.5}>
                <Typography variant="caption" fontWeight={700} color="rgba(255, 255, 255, 0.8)">
                  BASE LEG (a):
                </Typography>
                <Typography variant="caption" fontWeight={800} color="#38BDF8">
                  a = {legA} units
                </Typography>
              </Box>
              <Slider
                value={legA}
                min={1}
                max={5}
                step={1}
                onChange={(e, val) => onParamChange("legA", val)}
                sx={{ color: "#38BDF8" }}
              />

              <Box display="flex" justifyContent="space-between" mt={1} mb={0.5}>
                <Typography variant="caption" fontWeight={700} color="rgba(255, 255, 255, 0.8)">
                  HEIGHT LEG (b):
                </Typography>
                <Typography variant="caption" fontWeight={800} color="#38BDF8">
                  b = {legB} units
                </Typography>
              </Box>
              <Slider
                value={legB}
                min={1}
                max={5}
                step={1}
                onChange={(e, val) => onParamChange("legB", val)}
                sx={{ color: "#A855F7" }}
              />

              <Box mt={1} p={1} borderRadius={2} backgroundColor="rgba(56, 189, 248, 0.15)" textAlign="center">
                <Typography variant="caption" fontWeight={800} color="#4ADE80">
                  Hypotenuse c = √({legA}² + {legB}²) = {hypotenuse}
                </Typography>
              </Box>
            </Box>
          )}

          {/* CONTROL SET 4: General Animation Speed / Orbit Multiplier */}
          <Box mt={1}>
            <Box display="flex" justifyContent="space-between" mb={0.5}>
              <Typography variant="caption" fontWeight={700} color="rgba(255, 255, 255, 0.8)">
                ORBIT & ANIMATION SPEED:
              </Typography>
              <Typography variant="caption" fontWeight={800} color="#38BDF8">
                {orbitSpeed.toFixed(1)}x
              </Typography>
            </Box>
            <Slider
              value={orbitSpeed}
              min={0.2}
              max={3.0}
              step={0.2}
              onChange={(e, val) => onParamChange("orbitSpeed", val)}
              sx={{ color: "#38BDF8" }}
            />
          </Box>
        </Box>
      </Collapse>
    </Paper>
  );
}
