import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  Button,
  IconButton,
  Chip,
  Stack,
  Slider,
  Tooltip,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import FunctionsIcon from "@mui/icons-material/Functions";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import * as THREE from "three";

import Navbar from "../../components/Layout/Navbar";
import { exportCanvasSnapshot } from "../../services/arService";

export default function ARSandbox() {
  const navigate = useNavigate();
  const mountRef = useRef(null);

  // Array of spawned 3D objects
  const [spawnedObjects, setSpawnedObjects] = useState([
    { id: "obj-1", type: "cube", name: "Cube A", color: "#38BDF8", size: 1.2, pos: [ -1.0, 0, 0 ] },
    { id: "obj-2", type: "sphere", name: "Sphere B", color: "#10B981", size: 1.0, pos: [ 1.0, 0, 0 ] },
  ]);

  const [selectedId, setSelectedId] = useState("obj-1");
  const [snapshotTaken, setSnapshotTaken] = useState(false);

  const colorsList = ["#38BDF8", "#10B981", "#F59E0B", "#A855F7", "#EF4444", "#06B6D4"];

  const handleSpawn = (type) => {
    const count = spawnedObjects.length + 1;
    const typeNames = {
      cube: "Cube",
      sphere: "Sphere",
      cylinder: "Cylinder",
      cone: "Cone",
      torus: "Torus",
    };

    const newObj = {
      id: `obj-${Date.now()}`,
      type,
      name: `${typeNames[type] || "Solid"} ${count}`,
      color: colorsList[count % colorsList.length],
      size: 1.0,
      pos: [(Math.random() - 0.5) * 2, 0, (Math.random() - 0.5) * 2],
    };

    setSpawnedObjects((prev) => [...prev, newObj]);
    setSelectedId(newObj.id);
  };

  const handleDeleteSelected = () => {
    setSpawnedObjects((prev) => prev.filter((o) => o.id !== selectedId));
    if (spawnedObjects.length > 1) {
      const remaining = spawnedObjects.filter((o) => o.id !== selectedId);
      setSelectedId(remaining[0]?.id || null);
    } else {
      setSelectedId(null);
    }
  };

  const handleUpdateProperty = (prop, value) => {
    setSpawnedObjects((prev) =>
      prev.map((obj) => (obj.id === selectedId ? { ...obj, [prop]: value } : obj))
    );
  };

  const handleClearAll = () => {
    setSpawnedObjects([]);
    setSelectedId(null);
  };

  const handleSnapshot = () => {
    exportCanvasSnapshot(`3D-Sandbox-Blueprint-${Date.now()}.png`);
    setSnapshotTaken(true);
    setTimeout(() => setSnapshotTaken(false), 3000);
  };

  // Calculate Composite Volume and Surface Area
  const computeCompositeStats = () => {
    let totalVolume = 0;
    let totalArea = 0;

    spawnedObjects.forEach((obj) => {
      const r = obj.size / 2;
      const s = obj.size;
      const h = obj.size * 1.5;

      if (obj.type === "cube") {
        totalVolume += Math.pow(s, 3);
        totalArea += 6 * Math.pow(s, 2);
      } else if (obj.type === "sphere") {
        totalVolume += (4 / 3) * Math.PI * Math.pow(r, 3);
        totalArea += 4 * Math.PI * Math.pow(r, 2);
      } else if (obj.type === "cylinder") {
        totalVolume += Math.PI * Math.pow(r, 2) * h;
        totalArea += 2 * Math.PI * r * (r + h);
      } else if (obj.type === "cone") {
        totalVolume += (1 / 3) * Math.PI * Math.pow(r, 2) * h;
        totalArea += Math.PI * r * (r + Math.sqrt(r * r + h * h));
      } else {
        totalVolume += Math.pow(s, 3) * 0.8;
        totalArea += 6 * Math.pow(s, 2) * 0.8;
      }
    });

    return {
      volume: totalVolume.toFixed(2),
      area: totalArea.toFixed(2),
    };
  };

  const stats = computeCompositeStats();
  const selectedObj = spawnedObjects.find((o) => o.id === selectedId);

  // Three.js Multi-Object WebGL Renderer
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(3, 4, 6);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, preserveDrawingBuffer: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.8);
    dirLight.position.set(5, 10, 7);
    scene.add(ambientLight);
    scene.add(dirLight);

    // Grid Floor
    const gridHelper = new THREE.GridHelper(10, 20, 0x38bdf8, 0x1e293b);
    gridHelper.position.y = -1;
    scene.add(gridHelper);

    const group = new THREE.Group();
    scene.add(group);

    // Build 3D Meshes for spawnedObjects
    spawnedObjects.forEach((obj) => {
      let geo;
      const size = obj.size || 1;

      if (obj.type === "sphere") {
        geo = new THREE.SphereGeometry(size / 2, 32, 32);
      } else if (obj.type === "cylinder") {
        geo = new THREE.CylinderGeometry(size / 2, size / 2, size * 1.5, 32);
      } else if (obj.type === "cone") {
        geo = new THREE.ConeGeometry(size / 2, size * 1.5, 32);
      } else if (obj.type === "torus") {
        geo = new THREE.TorusGeometry(size / 2, 0.2, 16, 100);
      } else {
        geo = new THREE.BoxGeometry(size, size, size);
      }

      const mat = new THREE.MeshStandardMaterial({
        color: obj.color || 0x38bdf8,
        roughness: 0.3,
        metalness: 0.2,
      });

      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(obj.pos[0], obj.pos[1], obj.pos[2]);

      // Highlight selected object with bounding box
      if (obj.id === selectedId) {
        const bbox = new THREE.BoxHelper(mesh, 0x4ade80);
        group.add(bbox);
      }

      group.add(mesh);
    });

    // Animation Loop
    let animId;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      group.rotation.y += 0.003;
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [spawnedObjects, selectedId]);

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#0F172A", color: "#FFFFFF", position: "relative" }}>
      <Navbar />

      {/* Top Header & Telemetry Bar */}
      <Box
        sx={{
          p: 2,
          px: { xs: 2, md: 4 },
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "rgba(30, 41, 59, 0.85)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.15)",
          zIndex: 20,
          position: "relative",
          flexWrap: "wrap",
          gap: 1.5,
        }}
      >
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/")}
            sx={{ color: "rgba(255, 255, 255, 0.8)", textTransform: "none", fontWeight: 700 }}
          >
            Exit Sandbox
          </Button>

          <Chip
            icon={<ViewInArIcon style={{ color: "#38BDF8" }} fontSize="small" />}
            label="Freeform 3D AR Geometry Canvas"
            color="primary"
            variant="outlined"
            sx={{ fontWeight: 800, color: "#38BDF8", borderColor: "rgba(56, 189, 248, 0.5)" }}
          />
        </Stack>

        {/* Real-Time Composite Calculation Telemetry */}
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Chip
            icon={<FunctionsIcon style={{ color: "#4ADE80" }} />}
            label={`Composite Vol V = ${stats.volume} u³`}
            sx={{ backgroundColor: "rgba(74, 222, 128, 0.15)", color: "#4ADE80", fontWeight: 800, border: "1px solid rgba(74, 222, 128, 0.4)" }}
          />
          <Chip
            icon={<FunctionsIcon style={{ color: "#F59E0B" }} />}
            label={`Surface Area A = ${stats.area} u²`}
            sx={{ backgroundColor: "rgba(245, 158, 11, 0.15)", color: "#F59E0B", fontWeight: 800, border: "1px solid rgba(245, 158, 11, 0.4)" }}
          />

          <Tooltip title="Take HD Blueprint Snapshot">
            <IconButton color="primary" onClick={handleSnapshot} sx={{ backgroundColor: "rgba(56, 189, 248, 0.15)" }}>
              <CameraAltIcon />
            </IconButton>
          </Tooltip>

          <IconButton color="secondary" onClick={handleClearAll} title="Clear All 3D Objects">
            <RestartAltIcon />
          </IconButton>
        </Stack>
      </Box>

      {/* Main 3D WebGL Canvas Box */}
      <Box
        ref={mountRef}
        sx={{
          width: "100%",
          height: "calc(100vh - 140px)",
          position: "relative",
          backgroundColor: "#0A0E17",
        }}
      />

      {/* Floating 3D Object Spawn Bar (Bottom Center) */}
      <Paper
        elevation={12}
        sx={{
          position: "absolute",
          bottom: 25,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 30,
          p: 1.5,
          borderRadius: 4,
          backgroundColor: "rgba(15, 23, 42, 0.9)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(56, 189, 248, 0.4)",
          boxShadow: "0 12px 36px rgba(0, 0, 0, 0.6)",
        }}
      >
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography variant="caption" fontWeight={800} color="#38BDF8" sx={{ px: 1 }}>
            SPAWN 3D SOLID:
          </Typography>
          <Button size="small" variant="contained" onClick={() => handleSpawn("cube")} startIcon={<AddIcon />} sx={{ borderRadius: 2.5, fontWeight: 800 }}>
            Cube
          </Button>
          <Button size="small" variant="contained" color="secondary" onClick={() => handleSpawn("sphere")} startIcon={<AddIcon />} sx={{ borderRadius: 2.5, fontWeight: 800 }}>
            Sphere
          </Button>
          <Button size="small" variant="contained" color="info" onClick={() => handleSpawn("cylinder")} startIcon={<AddIcon />} sx={{ borderRadius: 2.5, fontWeight: 800 }}>
            Cylinder
          </Button>
          <Button size="small" variant="contained" color="warning" onClick={() => handleSpawn("cone")} startIcon={<AddIcon />} sx={{ borderRadius: 2.5, fontWeight: 800 }}>
            Cone
          </Button>
          <Button size="small" variant="contained" color="success" onClick={() => handleSpawn("torus")} startIcon={<AddIcon />} sx={{ borderRadius: 2.5, fontWeight: 800 }}>
            Torus
          </Button>
        </Stack>
      </Paper>

      {/* Floating Spatial Object Inspector Panel (Right Side) */}
      <Paper
        elevation={12}
        sx={{
          position: "absolute",
          top: 90,
          right: 25,
          zIndex: 30,
          width: 300,
          p: 2.5,
          borderRadius: 4,
          backgroundColor: "rgba(15, 23, 42, 0.9)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.15)",
          color: "#FFFFFF",
        }}
      >
        <Typography variant="h6" fontWeight={900} color="#38BDF8" gutterBottom>
          3D Spatial Inspector
        </Typography>

        <Divider sx={{ mb: 2, borderColor: "rgba(255, 255, 255, 0.1)" }} />

        {/* List of Active Spawned Objects */}
        <Typography variant="caption" fontWeight={700} color="rgba(255, 255, 255, 0.7)" display="block" mb={1}>
          SCENE SOLIDS ({spawnedObjects.length}):
        </Typography>

        <List dense sx={{ maxHeight: 140, overflowY: "auto", mb: 2, backgroundColor: "rgba(30, 41, 59, 0.6)", borderRadius: 2 }}>
          {spawnedObjects.map((obj) => (
            <ListItem
              key={obj.id}
              onClick={() => setSelectedId(obj.id)}
              sx={{
                cursor: "pointer",
                borderRadius: 2,
                backgroundColor: obj.id === selectedId ? "rgba(56, 189, 248, 0.25)" : "transparent",
                "&:hover": { backgroundColor: "rgba(56, 189, 248, 0.15)" },
              }}
            >
              <ListItemText
                primary={<Typography fontWeight={800} color={obj.color}>{obj.name}</Typography>}
                secondary={<Typography variant="caption" color="rgba(255, 255, 255, 0.6)">Type: {obj.type}</Typography>}
              />
            </ListItem>
          ))}
        </List>

        {/* Controls for Selected Object */}
        {selectedObj ? (
          <Box>
            <Typography variant="subtitle2" fontWeight={800} color="#FFFFFF" mb={1.5}>
              Selected: {selectedObj.name}
            </Typography>

            <Box mb={2}>
              <Typography variant="caption" fontWeight={700} color="rgba(255, 255, 255, 0.7)" display="block" mb={0.5}>
                SCALE SIZE: {selectedObj.size.toFixed(1)}u
              </Typography>
              <Slider
                value={selectedObj.size}
                min={0.5}
                max={2.5}
                step={0.1}
                onChange={(e, val) => handleUpdateProperty("size", val)}
                sx={{ color: "#38BDF8" }}
              />
            </Box>

            <Box mb={2}>
              <Typography variant="caption" fontWeight={700} color="rgba(255, 255, 255, 0.7)" display="block" mb={1}>
                COLOR PALETTE:
              </Typography>
              <Stack direction="row" spacing={1}>
                {colorsList.map((col) => (
                  <Box
                    key={col}
                    onClick={() => handleUpdateProperty("color", col)}
                    sx={{
                      width: 24,
                      height: 24,
                      borderRadius: "50%",
                      backgroundColor: col,
                      cursor: "pointer",
                      border: selectedObj.color === col ? "2px solid #FFFFFF" : "none",
                    }}
                  />
                ))}
              </Stack>
            </Box>

            <Button
              fullWidth
              variant="outlined"
              color="error"
              size="small"
              startIcon={<DeleteIcon />}
              onClick={handleDeleteSelected}
              sx={{ borderRadius: 2.5, fontWeight: 800 }}
            >
              Delete Selected Solid
            </Button>
          </Box>
        ) : (
          <Typography variant="caption" color="rgba(255, 255, 255, 0.5)">
            No 3D solid selected. Click a shape from the list above.
          </Typography>
        )}
      </Paper>
    </Box>
  );
}
