import { Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MainLayout from "../../components/layout/MainLayout";

export default function Home() {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <Box
        sx={{
          minHeight: "80vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          gap: 3,
        }}
      >
        <Typography variant="h3" fontWeight="bold">
          AR Educational Learning Platform
        </Typography>

        <Typography variant="h6">
          Interactive Mathematics & Science Learning
        </Typography>

        <Typography color="text.secondary">
          Learn with Augmented Reality using physical learning kits.
        </Typography>

        <Button
          variant="contained"
          size="large"
          onClick={() => navigate("/dashboard")}
        >
          Get Started
        </Button>
      </Box>
    </MainLayout>
  );
}