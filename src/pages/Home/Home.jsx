import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Paper,
  Chip,
  Stack,
  TextField,
  InputAdornment,
  Grid,
} from "@mui/material";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import VerifiedIcon from "@mui/icons-material/Verified";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import SearchIcon from "@mui/icons-material/Search";
import QuizIcon from "@mui/icons-material/Quiz";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

import SubjectGrid from "../../components/dashboard/SubjectGrid";
import { useApp } from "../../context/AppContext";
import Navbar from "../../components/Layout/Navbar";
import { activitiesData } from "../../utils/activityData";

export default function Home() {
  const navigate = useNavigate();
  const { selectedSubject, setSelectedSubject, setSelectedActivity } = useApp();
  const [searchQuery, setSearchQuery] = useState("");

  const handleContinue = () => {
    navigate("/dashboard");
  };

  const filteredSearchActivities = searchQuery.trim()
    ? activitiesData.filter(
        (act) =>
          act.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          act.ncertCode?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          act.topics?.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
      ).slice(0, 4)
    : [];

  const handleSelectSearchActivity = (act) => {
    setSelectedActivity(act);
    setSelectedSubject(act.subject);
    navigate("/instructions");
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#0F172A", color: "#FFFFFF" }}>
      <Navbar />

      <Box
        sx={{
          minHeight: "calc(100vh - 70px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "radial-gradient(circle at 50% 0%, #1E293B 0%, #0F172A 80%)",
          p: { xs: 2, md: 4 },
        }}
      >
        <Paper
          elevation={12}
          sx={{
            width: "100%",
            maxWidth: 1100,
            borderRadius: 6,
            p: { xs: 3, sm: 5, md: 6 },
            backgroundColor: "rgba(30, 41, 59, 0.85)",
            backdropFilter: "blur(20px)",
            boxShadow: "0 24px 60px rgba(0, 0, 0, 0.5)",
            border: "1px solid rgba(255, 255, 255, 0.15)",
          }}
        >
          {/* Hero Header Section */}
          <Box textAlign="center" mb={5}>
            <Chip
              icon={<VerifiedIcon style={{ color: "#38BDF8" }} />}
              label="✨ Official NCERT 3D WebAR Learning Platform"
              variant="outlined"
              sx={{
                fontWeight: 800,
                mb: 2.5,
                py: 2,
                px: 1.5,
                fontSize: "0.9rem",
                color: "#38BDF8",
                borderColor: "rgba(56, 189, 248, 0.4)",
                backgroundColor: "rgba(56, 189, 248, 0.1)",
              }}
            />

            <Typography
              variant="h2"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 900,
                fontSize: { xs: "2.4rem", sm: "3.2rem", md: "3.8rem" },
                background: "linear-gradient(135deg, #FFFFFF 0%, #38BDF8 60%, #818CF8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                letterSpacing: "-0.02em",
              }}
            >
              Interactive 3D WebAR Learning
            </Typography>

            <Typography
              variant="h6"
              sx={{ color: "rgba(255, 255, 255, 0.8)", fontWeight: 500, maxWidth: 750, mx: "auto", mb: 3 }}
            >
              Comprehensive Mathematics & Science curriculum for Grades 6–10 mapped directly to NCERT School Kits (UPMK, SMK, UPSK, SSK)
            </Typography>

            {/* Platform Stats Badges */}
            <Stack
              direction="row"
              spacing={2}
              justifyContent="center"
              flexWrap="wrap"
              useFlexGap
              mb={4}
            >
              <Chip
                icon={<MenuBookIcon style={{ color: "#38BDF8" }} fontSize="small" />}
                label="40 NCERT Curriculum Modules"
                sx={{ backgroundColor: "rgba(255, 255, 255, 0.08)", color: "#FFFFFF", fontWeight: 700 }}
              />
              <Chip
                icon={<ViewInArIcon style={{ color: "#10B981" }} fontSize="small" />}
                label="3D WebGL & Wireframe Nets"
                sx={{ backgroundColor: "rgba(255, 255, 255, 0.08)", color: "#FFFFFF", fontWeight: 700 }}
              />
              <Chip
                icon={<CameraAltIcon style={{ color: "#F59E0B" }} fontSize="small" />}
                label="Live Camera Passthrough AR"
                sx={{ backgroundColor: "rgba(255, 255, 255, 0.08)", color: "#FFFFFF", fontWeight: 700 }}
              />
              <Chip
                icon={<EmojiEventsIcon style={{ color: "#A855F7" }} fontSize="small" />}
                label="Printable NCERT Certificates"
                sx={{ backgroundColor: "rgba(255, 255, 255, 0.08)", color: "#FFFFFF", fontWeight: 700 }}
              />
            </Stack>

            {/* NCERT Kit Search & Instant Filter Bar */}
            <Box maxWidth={650} mx="auto" position="relative">
              <TextField
                fullWidth
                placeholder="Quick search 40 NCERT modules (e.g. 'NCERT-UPMK-01', 'Pythagoras', 'Heart')..."
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
                    backgroundColor: "rgba(15, 23, 42, 0.8)",
                    color: "#FFFFFF",
                    fontSize: "0.95rem",
                    border: "1px solid rgba(56, 189, 248, 0.3)",
                    "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                  },
                }}
              />

              {/* Instant Search Results Dropdown */}
              {filteredSearchActivities.length > 0 && (
                <Paper
                  elevation={8}
                  sx={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    right: 0,
                    mt: 1,
                    zIndex: 20,
                    backgroundColor: "#0F172A",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    borderRadius: 3,
                    overflow: "hidden",
                  }}
                >
                  {filteredSearchActivities.map((act) => (
                    <Box
                      key={act.id}
                      onClick={() => handleSelectSearchActivity(act)}
                      sx={{
                        p: 1.5,
                        px: 2.5,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        cursor: "pointer",
                        borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                        "&:hover": { backgroundColor: "rgba(56, 189, 248, 0.2)" },
                      }}
                    >
                      <Box textAlig="left">
                        <Typography variant="subtitle2" fontWeight={700} color="#38BDF8">
                          {act.title}
                        </Typography>
                        <Typography variant="caption" color="rgba(255, 255, 255, 0.7)">
                          {act.ncertCode} • Grade {act.grade} {act.subject.toUpperCase()}
                        </Typography>
                      </Box>
                      <Chip label="Launch AR" size="small" color="primary" sx={{ fontWeight: 700 }} />
                    </Box>
                  ))}
                </Paper>
              )}
            </Box>
          </Box>

          {/* Elevated Subject Grid */}
          <Box my={4}>
            <SubjectGrid selected={selectedSubject} setSelected={setSelectedSubject} />
          </Box>

          {/* Quick Action Navigation Buttons */}
          <Stack direction="row" spacing={2} justifyContent="center" flexWrap="wrap" useFlexGap mt={6}>
            <Button
              variant="contained"
              size="large"
              disabled={!selectedSubject}
              endIcon={<ArrowForwardIcon />}
              onClick={handleContinue}
              sx={{
                px: 6,
                py: 1.8,
                borderRadius: 4,
                fontSize: "1.1rem",
                fontWeight: 800,
                background: "linear-gradient(135deg, #1565C0 0%, #0284C7 100%)",
                boxShadow: "0 10px 28px rgba(2, 132, 199, 0.4)",
                textTransform: "none",
                "&:hover": {
                  boxShadow: "0 14px 34px rgba(2, 132, 199, 0.6)",
                  transform: "translateY(-2px)",
                },
              }}
            >
              Continue to Dashboard
            </Button>

            <Button
              variant="outlined"
              size="large"
              startIcon={<QuizIcon style={{ color: "#F59E0B" }} />}
              onClick={() => navigate("/quiz-hub")}
              sx={{
                px: 4,
                py: 1.8,
                borderRadius: 4,
                fontSize: "1.05rem",
                fontWeight: 700,
                color: "#FFFFFF",
                borderColor: "rgba(255, 255, 255, 0.3)",
                textTransform: "none",
                "&:hover": {
                  borderColor: "#F59E0B",
                  backgroundColor: "rgba(245, 158, 11, 0.15)",
                  transform: "translateY(-2px)",
                },
              }}
            >
              Practice Quiz Hub
            </Button>
          </Stack>
        </Paper>
      </Box>
    </Box>
  );
}