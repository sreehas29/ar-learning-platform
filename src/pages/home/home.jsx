import { useNavigate } from "react-router-dom";
import { Box, Typography, Button, Paper } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";

import SubjectGrid from "../../components/dashboard/SubjectGrid";
import { useApp } from "../../context/AppContext";
import Navbar from "../../components/Layout/Navbar";

export default function Home() {
  const navigate = useNavigate();
  const { selectedSubject, setSelectedSubject } = useApp();

  const handleContinue = () => {
    navigate("/dashboard");
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#F5F7FA" }}>
      <Navbar />

      <Box
        sx={{
          minHeight: "calc(100vh - 70px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg,#F5F7FA,#E3F2FD)",
          p: 3,
        }}
      >
        <Paper
          elevation={6}
          sx={{
            width: "100%",
            maxWidth: 1000,
            borderRadius: 5,
            p: { xs: 3, md: 5 },
          }}
        >
          <Box textAlign="center" mb={5}>
            <SchoolIcon
              color="primary"
              sx={{
                fontSize: 70,
                mb: 2,
              }}
            />

            <Typography variant="h3" gutterBottom sx={{ fontWeight: 700 }}>
              AR Educational Platform
            </Typography>

            <Typography variant="h6" color="text.secondary">
              Interactive Mathematics & Science Learning
            </Typography>

            <Typography color="text.secondary" mt={1}>
              Choose a subject to begin your Augmented Reality learning experience.
            </Typography>
          </Box>

          <SubjectGrid
            selected={selectedSubject}
            setSelected={setSelectedSubject}
          />

          <Box textAlign="center" mt={5}>
            <Button
              variant="contained"
              size="large"
              disabled={!selectedSubject}
              onClick={handleContinue}
              sx={{
                px: 6,
                py: 1.5,
                borderRadius: 3,
                fontSize: "1.1rem",
              }}
            >
              Continue →
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}