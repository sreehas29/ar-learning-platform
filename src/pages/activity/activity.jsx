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
  const [ncertFilter, setNcertFilter] = useState("all"); // "all" | "ncert-math" | "ncert-sci" | "custom"

  const defaultActivities = getActivitiesBySubjectAndGrade(
    selectedSubject,
    selectedGrade
  );

  const matchingCustom = customActivities.filter(
    (act) => act.subject === selectedSubject && act.grade === Number(selectedGrade)
  );

  const allActivities = [...matchingCustom, ...defaultActivities];

  // Apply NCERT Filter
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
    <Box sx={{ minHeight: "100vh", backgroundColor: "#F5F7FA" }}>
      <Navbar />

      <Box
        sx={{
          minHeight: "calc(100vh - 70px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #F5F7FA 0%, #E3F2FD 100%)",
          p: 3,
        }}
      >
        <Paper
          elevation={6}
          sx={{
            width: "100%",
            maxWidth: 1000,
            p: { xs: 3, md: 5 },
            borderRadius: 5,
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
              sx={{ color: "text.secondary" }}
            >
              Back to Dashboard
            </Button>

            <Stack direction="row" spacing={1.5} alignItems="center">
              {currentSubject && (
                <Chip
                  icon={currentSubject.icon}
                  label={currentSubject.name}
                  color={currentSubject.color}
                  variant="outlined"
                  sx={{ fontWeight: 600 }}
                />
              )}
              {selectedGrade && (
                <Chip
                  icon={<SchoolIcon fontSize="small" />}
                  label={`Grade ${selectedGrade}`}
                  color="info"
                  variant="outlined"
                  sx={{ fontWeight: 600 }}
                />
              )}
            </Stack>
          </Box>

          <Divider sx={{ mb: 4 }} />

          {/* Title Section */}
          <Box textAlign="center" mb={3}>
            <Box display="inline-flex" alignItems="center" gap={1} mb={1}>
              <ViewInArIcon color="primary" sx={{ fontSize: 36 }} />
              <Typography variant="h4" component="h1" color="primary" fontWeight={700}>
                AR Activity Selection
              </Typography>
            </Box>
            <Typography variant="body1" color="text.secondary" paragraph>
              Aligned with NCERT School Kits (UPMK, SMK, UPSK, SSK) & Science Lab Manuals
            </Typography>

            <Stack direction="row" spacing={1} justifyContent="center" flexWrap="wrap" useFlexGap sx={{ mb: 2 }}>
              <Chip
                icon={<MenuBookIcon fontSize="small" />}
                label="All Modules"
                color={ncertFilter === "all" ? "primary" : "default"}
                onClick={() => setNcertFilter("all")}
                sx={{ fontWeight: 600 }}
              />
              <Chip
                label="NCERT Math Kits (UPMK/SMK)"
                color={ncertFilter === "ncert-math" ? "primary" : "default"}
                onClick={() => setNcertFilter("ncert-math")}
                sx={{ fontWeight: 600 }}
              />
              <Chip
                label="NCERT Science Kits (UPSK/SSK)"
                color={ncertFilter === "ncert-sci" ? "secondary" : "default"}
                onClick={() => setNcertFilter("ncert-sci")}
                sx={{ fontWeight: 600 }}
              />
              <Chip
                label="Teacher Custom Modules"
                color={ncertFilter === "custom" ? "info" : "default"}
                onClick={() => setNcertFilter("custom")}
                sx={{ fontWeight: 600 }}
              />
            </Stack>

            <Button
              variant="outlined"
              color="primary"
              startIcon={<AddCircleOutlinedIcon />}
              onClick={() => setShowBuilderModal(true)}
              sx={{ borderRadius: 3, fontWeight: 700, mt: 1 }}
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
            <Box my={3}>
              <ActivityGrid
                activities={filteredActivities}
                selectedActivity={localActivity}
                onSelectActivity={handleSelectActivity}
              />
            </Box>
          ) : (
            selectedSubject && selectedGrade && (
              <Alert severity="info" sx={{ my: 3 }}>
                No activities match this NCERT filter. Switch filter or click "Create Custom Activity"!
              </Alert>
            )
          )}

          {/* Bottom Actions */}
          <Box mt={5} textAlign="center">
            <Button
              variant="contained"
              size="large"
              disabled={!localActivity}
              endIcon={<ArrowForwardIcon />}
              onClick={handleContinue}
              sx={{
                px: 6,
                py: 1.5,
                fontSize: "1.1rem",
                borderRadius: 3,
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