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
import CalculateIcon from "@mui/icons-material/Calculate";
import ScienceIcon from "@mui/icons-material/Science";
import SchoolIcon from "@mui/icons-material/School";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import VerifiedIcon from "@mui/icons-material/Verified";

import { useApp } from "../../context/AppContext";
import GradeGrid from "../../components/dashboard/GradeGrid";
import Navbar from "../../components/Layout/Navbar";

export default function Dashboard() {
  const navigate = useNavigate();
  const { selectedSubject, selectedGrade, setSelectedGrade } = useApp();

  const [localGrade, setLocalGrade] = useState(selectedGrade || null);

  useEffect(() => {
    if (selectedGrade) {
      setLocalGrade(selectedGrade);
    }
  }, [selectedGrade]);

  const handleSelectGrade = (grade) => {
    setLocalGrade(grade);
  };

  const handleContinue = () => {
    if (localGrade) {
      setSelectedGrade(localGrade);
      navigate("/activity");
    }
  };

  const handleBackToHome = () => {
    navigate("/");
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
          {/* Navigation / Header Bar */}
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
              onClick={handleBackToHome}
              sx={{ color: "text.secondary", textTransform: "none", fontWeight: 600 }}
            >
              Change Subject
            </Button>

            {currentSubject ? (
              <Chip
                icon={currentSubject.icon}
                label={`Active Subject: ${currentSubject.name}`}
                color={currentSubject.color}
                variant="outlined"
                sx={{ fontWeight: 700, fontSize: "0.95rem", py: 2, px: 1 }}
              />
            ) : (
              <Chip
                icon={<SchoolIcon fontSize="small" />}
                label="No Subject Selected"
                color="warning"
                variant="outlined"
                sx={{ fontWeight: 700 }}
              />
            )}
          </Box>

          <Divider sx={{ mb: 4 }} />

          {/* Title Section */}
          <Box textAlign="center" mb={4}>
            <Chip
              icon={<VerifiedIcon style={{ color: "#1565C0" }} />}
              label="Grade-Specific Curriculum Customization"
              color="primary"
              variant="outlined"
              sx={{ fontWeight: 700, mb: 1.5, fontSize: "0.8rem" }}
            />

            <Typography
              variant="h3"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 900,
                fontSize: { xs: "2rem", sm: "2.5rem" },
                background: "linear-gradient(135deg, #0F172A 0%, #1565C0 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Teacher Dashboard
            </Typography>

            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 650, mx: "auto" }}>
              Select a target grade level (Grades 6–10) to customize AR curriculum activities and NCERT kits.
            </Typography>
          </Box>

          {/* Missing Subject Guard */}
          {!selectedSubject && (
            <Alert severity="warning" sx={{ mb: 4 }} action={
              <Button color="inherit" size="small" onClick={handleBackToHome}>
                Select Subject
              </Button>
            }>
              Please select a subject first on the Home page to proceed with grade selection.
            </Alert>
          )}

          {/* Reusable Grade Selection Grid */}
          <Box my={4}>
            <GradeGrid
              selectedGrade={localGrade}
              onSelectGrade={handleSelectGrade}
            />
          </Box>

          {/* Continue Action */}
          <Box mt={6} textAlign="center">
            <Button
              variant="contained"
              size="large"
              disabled={!localGrade || !selectedSubject}
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
              Continue to Activity Selection
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}