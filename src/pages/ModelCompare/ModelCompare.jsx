import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Paper,
  Typography,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Chip,
  Divider,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import CompareIcon from "@mui/icons-material/Compare";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SyncIcon from "@mui/icons-material/Sync";

import Navbar from "../../components/Layout/Navbar";
import ARSceneCanvas from "../../modules/Scene/ARSceneCanvas";
import { activitiesData } from "../../utils/activityData";
import { getModelConfigForActivity } from "../../registry/modelRegistry";
import { useApp } from "../../context/AppContext";

export default function ModelCompare() {
  const navigate = useNavigate();
  const { setSelectedActivity } = useApp();

  const [modelAId, setModelAId] = useState("math-6-2"); // Cylinder Surface Area
  const [modelBId, setModelBId] = useState("math-8-1"); // Pythagoras Proof
  const [isSyncRotation, setIsSyncRotation] = useState(true);
  const [sharedRotation, setSharedRotation] = useState(0);

  const activityA = activitiesData.find((a) => a.id === modelAId) || activitiesData[0];
  const activityB = activitiesData.find((a) => a.id === modelBId) || activitiesData[1];

  const configA = getModelConfigForActivity(activityA.id);
  const configB = getModelConfigForActivity(activityB.id);

  const handleLaunchA = () => {
    setSelectedActivity(activityA);
    navigate("/ar");
  };

  const handleLaunchB = () => {
    setSelectedActivity(activityB);
    navigate("/ar");
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#0F172A", color: "#FFFFFF" }}>
      <Navbar />

      <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1400, mx: "auto" }}>
        {/* Navigation & Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3} flexWrap="wrap" gap={2}>
          <Box display="flex" alignItems="center" gap={1.5}>
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate("/models")}
              sx={{ color: "rgba(255, 255, 255, 0.7)", textTransform: "none", fontWeight: 700 }}
            >
              Back to 3D Library
            </Button>
            <Typography variant="h5" fontWeight={900} color="#38BDF8" display="flex" alignItems="center" gap={1}>
              <CompareIcon fontSize="large" /> Dual 3D STEM Side-by-Side Comparison Explorer
            </Typography>
          </Box>

          <FormControlLabel
            control={
              <Checkbox
                checked={isSyncRotation}
                onChange={(e) => setIsSyncRotation(e.target.checked)}
                sx={{ color: "#38BDF8", "&.Mui-checked": { color: "#38BDF8" } }}
              />
            }
            label={
              <Typography variant="subtitle2" fontWeight={700} color="#38BDF8" display="flex" alignItems="center" gap={0.5}>
                <SyncIcon fontSize="small" /> Synchronize 3D Orbit Controls
              </Typography>
            }
          />
        </Box>

        <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.1)", mb: 4 }} />

        {/* Dual 3D WebGL Canvas Grid */}
        <Grid container spacing={3} mb={5}>
          {/* MODEL A (LEFT CANVAS) */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={8}
              sx={{
                p: 3,
                borderRadius: 5,
                backgroundColor: "rgba(30, 41, 59, 0.8)",
                border: "2px solid #1565C0",
                boxShadow: "0 12px 36px rgba(21, 101, 192, 0.25)",
              }}
            >
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <FormControl size="small" sx={{ minWidth: 260 }}>
                  <InputLabel sx={{ color: "#38BDF8", fontWeight: 700 }}>Select Model A</InputLabel>
                  <Select
                    value={modelAId}
                    onChange={(e) => setModelAId(e.target.value)}
                    label="Select Model A"
                    sx={{ color: "#FFFFFF", fontWeight: 700, ".MuiOutlinedInput-notchedOutline": { borderColor: "#1565C0" } }}
                  >
                    {activitiesData.map((act) => (
                      <MenuItem key={act.id} value={act.id}>
                        {act.ncertCode || "NCERT"} • {act.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  startIcon={<ViewInArIcon />}
                  onClick={handleLaunchA}
                  sx={{ borderRadius: 2.5, fontWeight: 800, textTransform: "none" }}
                >
                  Launch AR
                </Button>
              </Box>

              {/* 3D Canvas A */}
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: 380,
                  borderRadius: 4,
                  overflow: "hidden",
                  backgroundColor: "#090D16",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                }}
              >
                <ARSceneCanvas activity={activityA} manualRotation={isSyncRotation ? sharedRotation : 0} />
              </Box>

              <Box mt={2}>
                <Typography variant="subtitle1" fontWeight={800} color="#38BDF8">
                  {activityA.title}
                </Typography>
                <Typography variant="body2" color="rgba(255, 255, 255, 0.8)" sx={{ fontSize: "0.85rem" }}>
                  {activityA.description}
                </Typography>
              </Box>
            </Paper>
          </Grid>

          {/* MODEL B (RIGHT CANVAS) */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={8}
              sx={{
                p: 3,
                borderRadius: 5,
                backgroundColor: "rgba(30, 41, 59, 0.8)",
                border: "2px solid #F59E0B",
                boxShadow: "0 12px 36px rgba(245, 158, 11, 0.25)",
              }}
            >
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <FormControl size="small" sx={{ minWidth: 260 }}>
                  <InputLabel sx={{ color: "#F59E0B", fontWeight: 700 }}>Select Model B</InputLabel>
                  <Select
                    value={modelBId}
                    onChange={(e) => setModelBId(e.target.value)}
                    label="Select Model B"
                    sx={{ color: "#FFFFFF", fontWeight: 700, ".MuiOutlinedInput-notchedOutline": { borderColor: "#F59E0B" } }}
                  >
                    {activitiesData.map((act) => (
                      <MenuItem key={act.id} value={act.id}>
                        {act.ncertCode || "NCERT"} • {act.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <Button
                  variant="contained"
                  color="warning"
                  size="small"
                  startIcon={<ViewInArIcon />}
                  onClick={handleLaunchB}
                  sx={{ borderRadius: 2.5, fontWeight: 800, textTransform: "none" }}
                >
                  Launch AR
                </Button>
              </Box>

              {/* 3D Canvas B */}
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: 380,
                  borderRadius: 4,
                  overflow: "hidden",
                  backgroundColor: "#090D16",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                }}
              >
                <ARSceneCanvas activity={activityB} manualRotation={isSyncRotation ? sharedRotation : 0} />
              </Box>

              <Box mt={2}>
                <Typography variant="subtitle1" fontWeight={800} color="#F59E0B">
                  {activityB.title}
                </Typography>
                <Typography variant="body2" color="rgba(255, 255, 255, 0.8)" sx={{ fontSize: "0.85rem" }}>
                  {activityB.description}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {/* Real-Time Comparative Telemetry Table */}
        <Typography variant="h6" fontWeight={900} color="#FFFFFF" mb={2}>
          Comparative STEM Telemetry Matrix
        </Typography>

        <TableContainer
          component={Paper}
          elevation={4}
          sx={{
            borderRadius: 4,
            backgroundColor: "rgba(30, 41, 59, 0.9)",
            border: "1px solid rgba(255, 255, 255, 0.15)",
          }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "rgba(15, 23, 42, 0.9)" }}>
                <TableCell sx={{ color: "#38BDF8", fontWeight: 800 }}>Comparison Attribute</TableCell>
                <TableCell sx={{ color: "#1565C0", fontWeight: 800 }}>Model A: {activityA.title}</TableCell>
                <TableCell sx={{ color: "#F59E0B", fontWeight: 800 }}>Model B: {activityB.title}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell sx={{ color: "rgba(255, 255, 255, 0.7)", fontWeight: 700 }}>NCERT Kit Standard</TableCell>
                <TableCell sx={{ color: "#FFFFFF", fontWeight: 700 }}>{activityA.ncertCode || "NCERT-UPMK-01"}</TableCell>
                <TableCell sx={{ color: "#FFFFFF", fontWeight: 700 }}>{activityB.ncertCode || "NCERT-SSK-01"}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell sx={{ color: "rgba(255, 255, 255, 0.7)", fontWeight: 700 }}>Geometry Mesh Type</TableCell>
                <TableCell sx={{ color: "#38BDF8", fontWeight: 800 }}>{configA?.geometryType?.toUpperCase() || "MESH"}</TableCell>
                <TableCell sx={{ color: "#F59E0B", fontWeight: 800 }}>{configB?.geometryType?.toUpperCase() || "MESH"}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell sx={{ color: "rgba(255, 255, 255, 0.7)", fontWeight: 700 }}>3D Inspection Hotspots</TableCell>
                <TableCell sx={{ color: "#FFFFFF" }}>{configA?.hotspots?.length || 2} Active Inspection Nodes</TableCell>
                <TableCell sx={{ color: "#FFFFFF" }}>{configB?.hotspots?.length || 2} Active Inspection Nodes</TableCell>
              </TableRow>

              <TableRow>
                <TableCell sx={{ color: "rgba(255, 255, 255, 0.7)", fontWeight: 700 }}>Subject & Target Grade</TableCell>
                <TableCell sx={{ color: "#FFFFFF" }}>{activityA.subject?.toUpperCase()} (Grade {activityA.grade})</TableCell>
                <TableCell sx={{ color: "#FFFFFF" }}>{activityB.subject?.toUpperCase()} (Grade {activityB.grade})</TableCell>
              </TableRow>

              <TableRow>
                <TableCell sx={{ color: "rgba(255, 255, 255, 0.7)", fontWeight: 700 }}>NCERT Learning Objective</TableCell>
                <TableCell sx={{ color: "rgba(255, 255, 255, 0.9)", fontSize: "0.85rem" }}>{activityA.ncertObjective || activityA.description}</TableCell>
                <TableCell sx={{ color: "rgba(255, 255, 255, 0.9)", fontSize: "0.85rem" }}>{activityB.ncertObjective || activityB.description}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
