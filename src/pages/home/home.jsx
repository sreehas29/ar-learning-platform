import { useNavigate } from "react";
import { Box, Typography, Button, Paper, Chip, Stack } from "@mui/material";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import VerifiedIcon from "@mui/icons-material/Verified";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import MenuBookIcon from "@mui/icons-material/MenuBook";

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
    <Box sx={{ minHeight: "100vh", backgroundColor: "#F8FAFC" }}>
      <Navbar />

      <Box
        sx={{
          minHeight: "calc(100vh - 70px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "radial-gradient(circle at 50% 0%, #E3F2FD 0%, #F8FAFC 70%)",
          p: { xs: 2, md: 4 },
        }}
      >
        <Paper
          elevation={8}
          sx={{
            width: "100%",
            maxWidth: 1050,
            borderRadius: 6,
            p: { xs: 3, sm: 5, md: 6 },
            backgroundColor: "#FFFFFF",
            boxShadow: "0 20px 50px rgba(15, 23, 42, 0.08)",
            border: "1px solid rgba(226, 232, 240, 0.8)",
          }}
        >
          {/* Hero Header Section */}
          <Box textAlign="center" mb={5}>
            <Chip
              icon={<VerifiedIcon style={{ color: "#1565C0" }} />}
              label="✨ Next-Gen WebAR Educational Platform"
              color="primary"
              variant="outlined"
              sx={{ fontWeight: 700, mb: 2.5, py: 1.8, px: 1, fontSize: "0.875rem" }}
            />

            <Typography
              variant="h2"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 900,
                fontSize: { xs: "2.2rem", sm: "3rem", md: "3.5rem" },
                background: "linear-gradient(135deg, #0F172A 0%, #1565C0 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                letterSpacing: "-0.02em",
              }}
            >
              AR Educational Platform
            </Typography>

            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ fontWeight: 500, maxWidth: 700, mx: "auto", mb: 3 }}
            >
              Immersive 3D Mathematics & Science Learning for Upper Primary & High School
            </Typography>

            {/* Platform Feature Stats Bar */}
            <Stack
              direction="row"
              spacing={2}
              justifyContent="center"
              flexWrap="wrap"
              useFlexGap
            >
              <Chip
                icon={<ViewInArIcon color="primary" fontSize="small" />}
                label="3D WebGL Models"
                sx={{ backgroundColor: "#F1F5F9", fontWeight: 600 }}
              />
              <Chip
                icon={<CameraAltIcon color="primary" fontSize="small" />}
                label="Live Camera AR"
                sx={{ backgroundColor: "#F1F5F9", fontWeight: 600 }}
              />
              <Chip
                icon={<MenuBookIcon color="primary" fontSize="small" />}
                label="NCERT Kit Standards"
                sx={{ backgroundColor: "#F1F5F9", fontWeight: 600 }}
              />
            </Stack>
          </Box>

          {/* Elevated Subject Grid */}
          <Box my={4}>
            <SubjectGrid
              selected={selectedSubject}
              setSelected={setSelectedSubject}
            />
          </Box>

          {/* Continue Action */}
          <Box textAlign="center" mt={6}>
            <Button
              variant="contained"
              size="large"
              disabled={!selectedSubject}
              endIcon={<ArrowForwardIcon />}
              onClick={handleContinue}
              sx={{
                px: 7,
                py: 1.8,
                borderRadius: 4,
                fontSize: "1.15rem",
                fontWeight: 800,
                boxShadow: "0 10px 28px rgba(21, 101, 192, 0.35)",
                textTransform: "none",
                "&:hover": {
                  boxShadow: "0 14px 34px rgba(21, 101, 192, 0.45)",
                  transform: "translateY(-2px)",
                },
              }}
            >
              Continue to Teacher Dashboard
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}