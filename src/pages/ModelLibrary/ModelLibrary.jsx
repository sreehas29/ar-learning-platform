import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Chip,
  Button,
  Stack,
  TextField,
  InputAdornment,
} from "@mui/material";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import SearchIcon from "@mui/icons-material/Search";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import CalculateIcon from "@mui/icons-material/Calculate";
import ScienceIcon from "@mui/icons-material/Science";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import VerifiedIcon from "@mui/icons-material/Verified";

import Navbar from "../../components/Layout/Navbar";
import { useApp } from "../../context/AppContext";
import { activitiesData } from "../../utils/activityData";
import { modelRegistry } from "../../registry/modelRegistry";
import ARSceneCanvas from "../../modules/Scene/ARSceneCanvas";

export default function ModelLibrary() {
  const navigate = useNavigate();
  const { setSelectedActivity, setSelectedSubject, setSelectedGrade } = useApp();

  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const handleLaunchAR = (activity) => {
    setSelectedActivity(activity);
    setSelectedSubject(activity.subject);
    setSelectedGrade(activity.grade);
    navigate("/ar");
  };

  const filteredActivities = activitiesData.filter((act) => {
    const matchesCategory =
      activeCategory === "all" ||
      (activeCategory === "math" && act.subject === "math") ||
      (activeCategory === "physics" && (act.id.includes("sci-7") || act.id.includes("sci-8") || act.id.includes("sci-10"))) ||
      (activeCategory === "biology" && (act.id.includes("sci-6") || act.id.includes("sci-9-2") || act.id.includes("sci-10-2"))) ||
      (activeCategory === "chemistry" && act.id.includes("sci-9-1"));

    const matchesSearch =
      !searchQuery.trim() ||
      act.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      act.ncertCode?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      act.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#0F172A", color: "#FFFFFF" }}>
      <Navbar />

      <Box
        sx={{
          minHeight: "calc(100vh - 70px)",
          p: { xs: 2, sm: 4, md: 6 },
          maxWidth: 1300,
          mx: "auto",
        }}
      >
        {/* Header Section */}
        <Box textAlign="center" mb={5}>
          <Chip
            icon={<VerifiedIcon style={{ color: "#38BDF8" }} />}
            label="✨ 3D WebGL Spatial Model Library"
            variant="outlined"
            sx={{
              fontWeight: 800,
              mb: 2,
              py: 2,
              px: 1.5,
              fontSize: "0.9rem",
              color: "#38BDF8",
              borderColor: "rgba(56, 189, 248, 0.4)",
              backgroundColor: "rgba(56, 189, 248, 0.1)",
            }}
          />

          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 900,
              fontSize: { xs: "2.2rem", sm: "3rem" },
              background: "linear-gradient(135deg, #FFFFFF 0%, #38BDF8 60%, #818CF8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            3D STEM Geometry & Model Explorer
          </Typography>

          <Typography variant="body1" color="rgba(255, 255, 255, 0.8)" sx={{ maxWidth: 700, mx: "auto", mb: 4 }}>
            Explore interactive 3D WebGL models, polyhedra specifications, and NCERT school kit standards across Mathematics and Science.
          </Typography>

          {/* Search Bar & Category Filter Chips */}
          <Stack spacing={3} alignItems="center" maxWidth={750} mx="auto">
            <TextField
              fullWidth
              placeholder="Search 3D models (e.g. 'Pythagoras', 'Prism', 'Cell', 'NCERT-UPMK-01')..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "#38BDF8" }} />
                  </InputAdornment>
                ),
                sx: {
                  borderRadius: 4,
                  backgroundColor: "rgba(30, 41, 59, 0.8)",
                  color: "#FFFFFF",
                  fontSize: "1rem",
                  border: "1px solid rgba(56, 189, 248, 0.3)",
                  "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                },
              }}
            />

            <Stack direction="row" spacing={1} flexWrap="wrap" justifyContent="center" useFlexGap>
              <Chip
                label="All 3D Models"
                onClick={() => setActiveCategory("all")}
                color={activeCategory === "all" ? "primary" : "default"}
                sx={{ fontWeight: 800, py: 2, px: 1, backgroundColor: activeCategory === "all" ? "#1565C0" : "rgba(255, 255, 255, 0.08)", color: "#FFFFFF" }}
              />
              <Chip
                icon={<CalculateIcon style={{ color: "#38BDF8" }} fontSize="small" />}
                label="Mathematics (UPMK / SMK)"
                onClick={() => setActiveCategory("math")}
                sx={{ fontWeight: 800, py: 2, px: 1, backgroundColor: activeCategory === "math" ? "#0284C7" : "rgba(255, 255, 255, 0.08)", color: "#FFFFFF" }}
              />
              <Chip
                icon={<ScienceIcon style={{ color: "#F59E0B" }} fontSize="small" />}
                label="Physics (Optics & Fields)"
                onClick={() => setActiveCategory("physics")}
                sx={{ fontWeight: 800, py: 2, px: 1, backgroundColor: activeCategory === "physics" ? "#D97706" : "rgba(255, 255, 255, 0.08)", color: "#FFFFFF" }}
              />
              <Chip
                icon={<ScienceIcon style={{ color: "#10B981" }} fontSize="small" />}
                label="Biology (Cells & Anatomy)"
                onClick={() => setActiveCategory("biology")}
                sx={{ fontWeight: 800, py: 2, px: 1, backgroundColor: activeCategory === "biology" ? "#059669" : "rgba(255, 255, 255, 0.08)", color: "#FFFFFF" }}
              />
            </Stack>
          </Stack>
        </Box>

        {/* 3D Model Cards Grid */}
        <Grid container spacing={3.5}>
          {filteredActivities.map((act) => {
            const config = modelRegistry[act.id] || { geometryType: "box", color: 0x1565c0 };
            return (
              <Grid item xs={12} sm={6} md={4} key={act.id}>
                <Paper
                  elevation={8}
                  sx={{
                    borderRadius: 5,
                    overflow: "hidden",
                    backgroundColor: "rgba(30, 41, 59, 0.85)",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    backdropFilter: "blur(16px)",
                    transition: "all 0.3s ease-in-out",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    "&:hover": {
                      transform: "translateY(-6px)",
                      borderColor: "#38BDF8",
                      boxShadow: "0 16px 40px rgba(56, 189, 248, 0.25)",
                    },
                  }}
                >
                  {/* Mini Interactive 3D WebGL Canvas Box */}
                  <Box
                    sx={{
                      height: 200,
                      width: "100%",
                      position: "relative",
                      backgroundColor: "#0A0E17",
                      borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                    }}
                  >
                    <ARSceneCanvas activity={act} isWireframe={false} scaleFactor={0.8} />

                    <Box position="absolute" top={12} left={12} zIndex={15}>
                      <Chip
                        label={`Grade ${act.grade}`}
                        size="small"
                        color="primary"
                        sx={{ fontWeight: 800 }}
                      />
                    </Box>

                    {act.ncertCode && (
                      <Box position="absolute" top={12} right={12} zIndex={15}>
                        <Chip
                          icon={<MenuBookIcon fontSize="small" style={{ color: "#FFFFFF" }} />}
                          label={act.ncertCode}
                          size="small"
                          sx={{ fontWeight: 800, backgroundColor: "rgba(15, 23, 42, 0.8)", color: "#38BDF8", border: "1px solid rgba(56, 189, 248, 0.4)" }}
                        />
                      </Box>
                    )}
                  </Box>

                  {/* Model Meta Information */}
                  <Box p={3} flexGrow={1}>
                    <Typography variant="h6" fontWeight={800} color="#FFFFFF" gutterBottom>
                      {act.title}
                    </Typography>

                    <Typography variant="body2" color="rgba(255, 255, 255, 0.7)" paragraph sx={{ fontSize: "0.9rem", lineHeight: 1.5 }}>
                      {act.description}
                    </Typography>

                    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap mb={2}>
                      <Chip
                        label={`Geometry: ${config.geometryType || "Mesh"}`}
                        size="small"
                        sx={{ backgroundColor: "rgba(56, 189, 248, 0.15)", color: "#38BDF8", fontWeight: 700 }}
                      />
                      <Chip
                        label={act.subject.toUpperCase()}
                        size="small"
                        color="info"
                        variant="outlined"
                        sx={{ fontWeight: 700 }}
                      />
                    </Stack>
                  </Box>

                  {/* Action Button */}
                  <Box p={2.5} pt={0}>
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      startIcon={<PlayArrowIcon />}
                      onClick={() => handleLaunchAR(act)}
                      sx={{
                        py: 1.4,
                        borderRadius: 3,
                        fontWeight: 800,
                        fontSize: "0.95rem",
                        background: "linear-gradient(135deg, #1565C0 0%, #0284C7 100%)",
                        boxShadow: "0 6px 20px rgba(2, 132, 199, 0.3)",
                        "&:hover": {
                          boxShadow: "0 10px 28px rgba(2, 132, 199, 0.5)",
                        },
                      }}
                    >
                      Launch Full WebAR Experience
                    </Button>
                  </Box>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Box>
  );
}
