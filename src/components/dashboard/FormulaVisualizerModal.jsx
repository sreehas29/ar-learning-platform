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
  Slider,
  Tabs,
  Tab,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FunctionsIcon from "@mui/icons-material/Functions";
import CalculateIcon from "@mui/icons-material/Calculate";
import ScienceIcon from "@mui/icons-material/Science";
import ViewInArIcon from "@mui/icons-material/ViewInAr";

export default function FormulaVisualizerModal({ open, onClose, activityId }) {
  const [activeTab, setActiveTab] = useState(0);

  // Pythagoras variables
  const [legA, setLegA] = useState(3);
  const [legB, setLegB] = useState(4);
  const hypotenuse = Math.sqrt(legA * legA + legB * legB).toFixed(2);

  // Mensuration variables
  const [radius, setRadius] = useState(3);
  const [height, setHeight] = useState(6);
  const volCylinder = (Math.PI * Math.pow(radius, 2) * height).toFixed(2);
  const volCone = ((1 / 3) * Math.PI * Math.pow(radius, 2) * height).toFixed(2);

  // Snell's Law variables
  const [laserAngle, setLaserAngle] = useState(45);
  const [refIndex, setRefIndex] = useState(1.5);
  const sinTheta2 = (Math.sin((laserAngle * Math.PI) / 180) / refIndex).toFixed(3);
  const angle2Deg = ((Math.asin(Math.min(1, Math.sin((laserAngle * Math.PI) / 180) / refIndex)) * 180) / Math.PI).toFixed(1);

  // Bohr Atom variables
  const [shellN, setShellN] = useState(2);
  const bohrRadius = (Math.pow(shellN, 2) * 0.529).toFixed(3);

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
          <FunctionsIcon style={{ color: "#38BDF8" }} fontSize="large" />
          <Typography variant="h5" fontWeight={900} color="#38BDF8">
            Interactive 3D STEM Formula Visualizer
          </Typography>
        </Box>
        <IconButton onClick={onClose} sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.1)" }} />

      <DialogContent sx={{ py: 3 }}>
        {/* Formula Category Tabs */}
        <Tabs
          value={activeTab}
          onChange={(e, v) => setActiveTab(v)}
          textColor="inherit"
          indicatorColor="primary"
          sx={{ mb: 3, "& .MuiTab-root": { fontWeight: 800, fontSize: "0.95rem" } }}
        >
          <Tab icon={<CalculateIcon />} iconPosition="start" label="Pythagoras Theorem" />
          <Tab icon={<ViewInArIcon />} iconPosition="start" label="1/3 Volume Ratio" />
          <Tab icon={<ScienceIcon />} iconPosition="start" label="Snell's Law (Optics)" />
          <Tab icon={<ScienceIcon />} iconPosition="start" label="Bohr Atomic Radius" />
        </Tabs>

        {/* TAB 0: PYTHAGORAS THEOREM */}
        {activeTab === 0 && (
          <Paper sx={{ p: 4, borderRadius: 4, backgroundColor: "rgba(30, 41, 59, 0.8)", border: "1px solid rgba(255, 255, 255, 0.15)" }}>
            <Box textAlign="center" mb={3}>
              <Chip label="NCERT Math Standard: a² + b² = c²" color="primary" sx={{ fontWeight: 900, fontSize: "1rem", py: 2, mb: 1.5 }} />
              <Typography variant="h3" fontWeight={900} color="#4ADE80" letterSpacing={1}>
                c = √({legA}² + {legB}²) = {hypotenuse}
              </Typography>
            </Box>

            <Grid container spacing={3} mb={3}>
              <Grid item xs={12} sm={6}>
                <Typography variant="caption" fontWeight={700} color="rgba(255, 255, 255, 0.7)" display="block" mb={0.5}>
                  BASE LEG (a): {legA} units
                </Typography>
                <Slider value={legA} min={1} max={10} onChange={(e, v) => setLegA(v)} sx={{ color: "#38BDF8" }} />
                <Typography variant="caption" color="#38BDF8">Square Area a² = {legA * legA} u²</Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="caption" fontWeight={700} color="rgba(255, 255, 255, 0.7)" display="block" mb={0.5}>
                  HEIGHT LEG (b): {legB} units
                </Typography>
                <Slider value={legB} min={1} max={10} onChange={(e, v) => setLegB(v)} sx={{ color: "#A855F7" }} />
                <Typography variant="caption" color="#A855F7">Square Area b² = {legB * legB} u²</Typography>
              </Grid>
            </Grid>

            {/* Step-by-Step Derivation Box */}
            <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 3, backgroundColor: "#0F172A", border: "1px solid rgba(56, 189, 248, 0.3)" }}>
              <Typography variant="subtitle2" fontWeight={800} color="#38BDF8" mb={1}>
                Step-by-Step Substitution:
              </Typography>
              <Typography variant="body2" color="rgba(255, 255, 255, 0.9)">
                1. Calculate Area a² = {legA}² = <strong>{legA * legA}</strong>
              </Typography>
              <Typography variant="body2" color="rgba(255, 255, 255, 0.9)">
                2. Calculate Area b² = {legB}² = <strong>{legB * legB}</strong>
              </Typography>
              <Typography variant="body2" color="rgba(255, 255, 255, 0.9)">
                3. Total Sum a² + b² = {legA * legA} + {legB * legB} = <strong>{legA * legA + legB * legB}</strong>
              </Typography>
              <Typography variant="body2" color="#4ADE80" fontWeight={700}>
                4. Hypotenuse c = √({legA * legA + legB * legB}) = {hypotenuse} units
              </Typography>
            </Paper>
          </Paper>
        )}

        {/* TAB 1: 1/3 CONE-CYLINDER VOLUME RATIO */}
        {activeTab === 1 && (
          <Paper sx={{ p: 4, borderRadius: 4, backgroundColor: "rgba(30, 41, 59, 0.8)", border: "1px solid rgba(255, 255, 255, 0.15)" }}>
            <Box textAlign="center" mb={3}>
              <Chip label="NCERT Volume Ratio: V_cone = (1/3) • V_cylinder" color="secondary" sx={{ fontWeight: 900, fontSize: "1rem", py: 2, mb: 1.5 }} />
              <Typography variant="h4" fontWeight={900} color="#38BDF8">
                Cylinder Vol: {volCylinder} u³ | Cone Vol: {volCone} u³
              </Typography>
            </Box>

            <Grid container spacing={3} mb={3}>
              <Grid item xs={12} sm={6}>
                <Typography variant="caption" fontWeight={700} color="rgba(255, 255, 255, 0.7)" display="block" mb={0.5}>
                  RADIUS (r): {radius} units
                </Typography>
                <Slider value={radius} min={1} max={6} onChange={(e, v) => setRadius(v)} sx={{ color: "#38BDF8" }} />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="caption" fontWeight={700} color="rgba(255, 255, 255, 0.7)" display="block" mb={0.5}>
                  HEIGHT (h): {height} units
                </Typography>
                <Slider value={height} min={1} max={10} onChange={(e, v) => setHeight(v)} sx={{ color: "#F59E0B" }} />
              </Grid>
            </Grid>

            <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 3, backgroundColor: "#0F172A", border: "1px solid rgba(245, 158, 11, 0.3)" }}>
              <Typography variant="subtitle2" fontWeight={800} color="#F59E0B" mb={1}>
                Empirical Volume Proof:
              </Typography>
              <Typography variant="body2" color="rgba(255, 255, 255, 0.9)">
                • Cylinder Volume V = π • {radius}² • {height} = <strong>{volCylinder} u³</strong>
              </Typography>
              <Typography variant="body2" color="rgba(255, 255, 255, 0.9)">
                • Cone Volume V = (1/3) • π • {radius}² • {height} = <strong>{volCone} u³</strong>
              </Typography>
              <Typography variant="body2" color="#4ADE80" fontWeight={700} mt={1}>
                Exact Ratio: ({volCylinder} / {volCone}) = 3.00 (It takes exactly 3 full cones of liquid to fill 1 cylinder!)
              </Typography>
            </Paper>
          </Paper>
        )}

        {/* TAB 2: SNELL'S LAW OF REFRACTION */}
        {activeTab === 2 && (
          <Paper sx={{ p: 4, borderRadius: 4, backgroundColor: "rgba(30, 41, 59, 0.8)", border: "1px solid rgba(255, 255, 255, 0.15)" }}>
            <Box textAlign="center" mb={3}>
              <Chip label="Snell's Law: n₁ • sin(θ₁) = n₂ • sin(θ₂)" color="warning" sx={{ fontWeight: 900, fontSize: "1rem", py: 2, mb: 1.5 }} />
              <Typography variant="h4" fontWeight={900} color="#F59E0B">
                Refracted Angle θ₂ = {angle2Deg}°
              </Typography>
            </Box>

            <Grid container spacing={3} mb={3}>
              <Grid item xs={12} sm={6}>
                <Typography variant="caption" fontWeight={700} color="rgba(255, 255, 255, 0.7)" display="block" mb={0.5}>
                  INCIDENT LASER ANGLE (θ₁): {laserAngle}°
                </Typography>
                <Slider value={laserAngle} min={10} max={80} step={5} onChange={(e, v) => setLaserAngle(v)} sx={{ color: "#10B981" }} />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="caption" fontWeight={700} color="rgba(255, 255, 255, 0.7)" display="block" mb={0.5}>
                  PRISM REFRACTIVE INDEX (n₂): {refIndex.toFixed(2)}
                </Typography>
                <Slider value={refIndex} min={1.0} max={2.0} step={0.05} onChange={(e, v) => setRefIndex(v)} sx={{ color: "#F59E0B" }} />
              </Grid>
            </Grid>

            <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 3, backgroundColor: "#0F172A", border: "1px solid rgba(16, 185, 129, 0.3)" }}>
              <Typography variant="subtitle2" fontWeight={800} color="#10B981" mb={1}>
                Optics Refraction Step:
              </Typography>
              <Typography variant="body2" color="rgba(255, 255, 255, 0.9)">
                • Air Medium n₁ = 1.00, Incident Angle θ₁ = {laserAngle}°
              </Typography>
              <Typography variant="body2" color="rgba(255, 255, 255, 0.9)">
                • sin(θ₂) = sin({laserAngle}°) / {refIndex.toFixed(2)} = <strong>{sinTheta2}</strong>
              </Typography>
              <Typography variant="body2" color="#4ADE80" fontWeight={700}>
                • Refracted Angle θ₂ = arcsin({sinTheta2}) = {angle2Deg}° inside the glass prism
              </Typography>
            </Paper>
          </Paper>
        )}

        {/* TAB 3: BOHR ATOMIC RADIUS */}
        {activeTab === 3 && (
          <Paper sx={{ p: 4, borderRadius: 4, backgroundColor: "rgba(30, 41, 59, 0.8)", border: "1px solid rgba(255, 255, 255, 0.15)" }}>
            <Box textAlign="center" mb={3}>
              <Chip label="Bohr Atomic Radius: r_n = n² • a₀ (a₀ = 0.529 Å)" color="info" sx={{ fontWeight: 900, fontSize: "1rem", py: 2, mb: 1.5 }} />
              <Typography variant="h4" fontWeight={900} color="#A855F7">
                Shell n = {shellN} Radius r_{shellN} = {bohrRadius} Å
              </Typography>
            </Box>

            <Box maxWidth={400} mx="auto" mb={3}>
              <Typography variant="caption" fontWeight={700} color="rgba(255, 255, 255, 0.7)" display="block" mb={0.5}>
                QUANTUM ELECTRON ORBITAL SHELL (n):
              </Typography>
              <Slider value={shellN} min={1} max={4} step={1} marks onChange={(e, v) => setShellN(v)} sx={{ color: "#A855F7" }} />
            </Box>

            <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 3, backgroundColor: "#0F172A", border: "1px solid rgba(168, 85, 247, 0.3)" }}>
              <Typography variant="subtitle2" fontWeight={800} color="#A855F7" mb={1}>
                Atomic Orbital Radius Derivation:
              </Typography>
              <Typography variant="body2" color="rgba(255, 255, 255, 0.9)">
                • Principal Quantum Number n = {shellN}
              </Typography>
              <Typography variant="body2" color="rgba(255, 255, 255, 0.9)">
                • r_{shellN} = ({shellN}²) • 0.529 Å = {shellN * shellN} • 0.529 Å
              </Typography>
              <Typography variant="body2" color="#4ADE80" fontWeight={700}>
                • Calculated Radius = {bohrRadius} Angstroms (0.{bohrRadius} nm)
              </Typography>
            </Paper>
          </Paper>
        )}
      </DialogContent>

      <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.1)" }} />

      <DialogActions sx={{ p: 2.5, justifyContent: "space-between" }}>
        <Typography variant="caption" color="rgba(255, 255, 255, 0.5)">
          NCERT STEM Formula Visualizer Engine
        </Typography>
        <Button onClick={onClose} variant="outlined" sx={{ color: "#FFFFFF", borderColor: "rgba(255, 255, 255, 0.3)", borderRadius: 3 }}>
          Close Visualizer
        </Button>
      </DialogActions>
    </Dialog>
  );
}
