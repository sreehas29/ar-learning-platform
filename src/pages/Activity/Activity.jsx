  import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Paper,
  Typography,
  Button,
  Chip,
  Alert,
  Divider,
  Stack,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CalculateIcon from "@mui/icons-material/Calculate";
import ScienceIcon from "@mui/icons-material/Science";
import SchoolIcon from "@mui/icons-material/School";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import VerifiedIcon from "@mui/icons-material/Verified";

import { useApp } from "../../context/AppContext";
import ActivityGrid from "../../modules/Activities/ActivityGrid";
import { getActivitiesBySubjectAndGrade } from "../../utils/activityData";
import Navbar from "../../components/Layout/Navbar";
import ActivityBuilderModal from "../../components/dashboard/ActivityBuilderModal";

export default function Activity() {
  const navigate = useNavigate();
  const {
    selectedSubject,
    selectedGrade,
    selectedActivity,
    setSelectedActivity,
    customActivities,
  } = useApp();

  const [localActivity, setLocalActivity] = useState(selectedActivity || null);
  const [showBuilderModal, setShowBuilderModal] = useState(false);
  const [ncertFilter, setNcertFilter] = useState("all");

  const defaultActivities = getActivitiesBySubjectAndGrade(
    selectedSubject,
    selectedGrade
  );

  const matchingCustom = customActivities.filter(
    (act) => act.subject === selectedSubject && act.grade === Number(selectedGrade)
  );

  const allActivities = [...matchingCustom, ...defaultActivities];

  const filteredActivities = allActivities.filter((act) => {
    if (ncertFilter === "ncert-math") return act.ncertCode && act.subject === "math";
    if (ncertFilter === "ncert-sci") return act.ncertCode && act.subject === "science";
    if (ncertFilter === "custom") return act.id.startsWith("custom");
    return true;
  });

  useEffect(() => {
    if (selectedActivity) {
      setLocalActivity(selectedActivity);
    }
  }, [selectedActivity]);

  const handleSelectActivity = (act) => {
    setLocalActivity(act);
  };

  const handleContinue = () => {
    if (localActivity) {
      setSelectedActivity(localActivity);
      navigate("/instructions");
    }
  };

  const handleBackToDashboard = () => {
    navigate("/dashboard");
  };

  const subjectMeta = {
    math: {
      name: "Mathematics",
      icon: <CalculateIcon fontSize="small" />,
      color: "primary",
    },
    science: {
      name: "Science",
      icon: <ScienceIcon fontSize="small" />,
      color: "secondary",
    },
  };

  const currentSubject = selectedSubject ? subjectMeta[selectedSubject] : null;

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#F8FAFC" }}>
      <Navbar />

      <Box
        sx={{
          minHeight: "calc(100vh - 70px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "radial-gradient(circle at 50% 0%, #E3F2FD 0%, #F8FAFC 70%)",
          p: { xs: 2, md: 4 },
        }}
      >
        <Paper
          elevation={8}
          sx={{
            width: "100%",
            maxWidth: 1050,
            p: { xs: 3, sm: 5, md: 6 },
            borderRadius: 6,
            backgroundColor: "#FFFFFF",
            boxShadow: "0 20px 50px rgba(15, 23, 42, 0.08)",
            border: "1px solid rgba(226, 232, 240, 0.8)",
          }}
        >
          {/* Navigation & Header Status Bar */}
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            mb={3}
            flexWrap="wrap"
            gap={2}
          >
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={handleBackToDashboard}
              sx={{ color: "text.secondary", textTransform: "none", fontWeight: 600 }}
            >
              Back to Teacher Dashboard
            </Button>

            <Stack direction="row" spacing={1.5} alignItems="center">
              {currentSubject && (
                <Chip
                  icon={currentSubject.icon}
                  label={currentSubject.name}
                  color={currentSubject.color}
                  variant="outlined"
                  sx={{ fontWeight: 700 }}
                />
              )}
              {selectedGrade && (
                <Chip
                  icon={<SchoolIcon fontSize="small" />}
                  label={`Grade ${selectedGrade}`}
                  color="info"
                  variant="outlined"
                  sx={{ fontWeight: 700 }}
                />
              )}
            </Stack>
          </Box>

          <Divider sx={{ mb: 4 }} />

          {/* Title Section */}
          <Box textAlign="center" mb={4}>
            <Chip
              icon={<VerifiedIcon style={{ color: "#1565C0" }} />}
              label="NCERT School Kits (UPMK, SMK, UPSK, SSK) & Lab Manual Aligned"
              color="primary"
              variant="outlined"
              sx={{ fontWeight: 700, mb: 1.5, fontSize: "0.8rem" }}
            />

            <Box display="inline-flex" alignItems="center" justify-content="center" gap={1.5} mb={1}>
              <ViewInArIcon color="primary" sx={{ fontSize: 40 }} />
              <Typography
                variant="h3"
                component="h1"
                sx={{
                  fontWeight: 900,
                  fontSize: { xs: "2rem", sm: "2.5rem" },
                  background: "linear-gradient(135deg, #0F172A 0%, #1565C0 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                AR Activity Selection
              </Typography>
            </Box>

            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 650, mx: "auto", mb: 3 }}>
              Select an interactive 3D WebAR lesson module to launch in your classroom.
            </Typography>

            {/* Filter Chips Bar */}
            <Stack direction="row" spacing={1} justifyContent="center" flexWrap="wrap" useFlexGap sx={{ mb: 2.5 }}>
              <Chip
                icon={<MenuBookIcon fontSize="small" />}
                label="All Modules"
                color={ncertFilter === "all" ? "primary" : "default"}
                onClick={() => setNcertFilter("all")}
                sx={{ fontWeight: 700, px: 0.5 }}
              />
              <Chip
                label="NCERT Math Kits (UPMK/SMK)"
                color={ncertFilter === "ncert-math" ? "primary" : "default"}
                onClick={() => setNcertFilter("ncert-math")}
                sx={{ fontWeight: 700, px: 0.5 }}
              />
              <Chip
                label="NCERT Science Kits (UPSK/SSK)"
                color={ncertFilter === "ncert-sci" ? "secondary" : "default"}
                onClick={() => setNcertFilter("ncert-sci")}
                sx={{ fontWeight: 700, px: 0.5 }}
              />
              <Chip
                label="Teacher Custom Modules"
                color={ncertFilter === "custom" ? "info" : "default"}
                onClick={() => setNcertFilter("custom")}
                sx={{ fontWeight: 700, px: 0.5 }}
              />
            </Stack>

            <Button
              variant="outlined"
              color="primary"
              startIcon={<AddCircleOutlinedIcon />}
              onClick={() => setShowBuilderModal(true)}
              sx={{ borderRadius: 3, fontWeight: 700, textTransform: "none", py: 0.8, px: 2.5 }}
            >
              Create Custom Activity
            </Button>
          </Box>

          {/* Missing Guard Alert */}
          {(!selectedSubject || !selectedGrade) && (
            <Alert
              severity="warning"
              sx={{ mb: 4 }}
              action={
                <Button color="inherit" size="small" onClick={handleBackToDashboard}>
                  Go to Dashboard
                </Button>
              }
            >
              Subject or grade is not selected. Please complete setup in the Teacher Dashboard.
            </Alert>
          )}

          {/* Activity Grid */}
          {filteredActivities.length > 0 ? (
            <Box my={4}>
              <ActivityGrid
                activities={filteredActivities}
                selectedActivity={localActivity}
                onSelectActivity={handleSelectActivity}
              />
            </Box>
          ) : (
            selectedSubject && selectedGrade && (
              <Alert severity="info" sx={{ my: 4 }}>
                No activities match this NCERT filter. Switch filter or click "Create Custom Activity"!
              </Alert>
            )
          )}

          {/* Bottom Actions */}
          <Box mt={6} textAlign="center">
            <Button
              variant="contained"
              size="large"
              disabled={!localActivity}
              endIcon={<ArrowForwardIcon />}
              onClick={handleContinue}
              sx={{
                px: 7,
                py: 1.8,
                fontSize: "1.15rem",
                borderRadius: 4,
                fontWeight: 800,
                boxShadow: "0 10px 28px rgba(21, 101, 192, 0.35)",
                textTransform: "none",
                "&:hover": {
                  boxShadow: "0 14px 34px rgba(21, 101, 192, 0.45)",
                  transform: "translateY(-2px)",
                },
              }}
            >
              View Activity Instructions
            </Button>
          </Box>
        </Paper>
      </Box>

      {/* Teacher Custom Activity Builder Dialog */}
      <ActivityBuilderModal
        open={showBuilderModal}
        onClose={() => setShowBuilderModal(false)}
      />
    </Box>
  );
}