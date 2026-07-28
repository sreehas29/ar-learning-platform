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
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CalculateIcon from "@mui/icons-material/Calculate";
import ScienceIcon from "@mui/icons-material/Science";
import SchoolIcon from "@mui/icons-material/School";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { useApp } from "../../context/AppContext";
import GradeGrid from "../../components/dashboard/GradeGrid";

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
    <Box
      sx={{
        minHeight: "100vh",
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
            sx={{ color: "text.secondary" }}
          >
            Back to Home
          </Button>

          {currentSubject ? (
            <Chip
              icon={currentSubject.icon}
              label={`Subject: ${currentSubject.name}`}
              color={currentSubject.color}
              variant="outlined"
              sx={{ fontWeight: 600, fontSize: "0.95rem", py: 2, px: 1 }}
            />
          ) : (
            <Chip
              icon={<SchoolIcon fontSize="small" />}
              label="No Subject Selected"
              color="warning"
              variant="outlined"
            />
          )}
        </Box>

        <Divider sx={{ mb: 4 }} />

        {/* Title Section */}
        <Box textAlign="center" mb={4}>
          <Typography variant="h4" component="h1" gutterBottom color="primary">
            Teacher Dashboard
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Select a grade level (6–10) to customize AR curriculum activities.
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
        <Box my={3}>
          <GradeGrid
            selectedGrade={localGrade}
            onSelectGrade={handleSelectGrade}
          />
        </Box>

        {/* Continue Action */}
        <Box mt={5} textAlign="center">
          <Button
            variant="contained"
            size="large"
            disabled={!localGrade || !selectedSubject}
            endIcon={<ArrowForwardIcon />}
            onClick={handleContinue}
            sx={{
              px: 6,
              py: 1.5,
              fontSize: "1.1rem",
              borderRadius: 3,
            }}
          >
            Continue to Activities
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}