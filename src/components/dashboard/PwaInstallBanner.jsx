import { useState, useEffect } from "react";
import {
  Paper,
  Box,
  Typography,
  Button,
  IconButton,
  Chip,
  Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import GetAppIcon from "@mui/icons-material/GetApp";
import OfflineBoltIcon from "@mui/icons-material/OfflineBolt";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function PwaInstallBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showBanner, setShowBanner] = useState(false);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowBanner(true);
    };

    const handleAppInstalled = () => {
      setInstalled(true);
      setShowBanner(false);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    // Show banner after 3 seconds for demo purposes
    const timer = setTimeout(() => {
      if (!installed) {
        setShowBanner(true);
      }
    }, 3000);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
      clearTimeout(timer);
    };
  }, [installed]);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setInstalled(true);
      }
      setDeferredPrompt(null);
    } else {
      alert("NCERT 3D WebAR App is ready for offline installation! Use your browser's 'Add to Home Screen' or 'Install App' option.");
      setInstalled(true);
    }
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <Paper
      elevation={12}
      sx={{
        position: "fixed",
        bottom: 25,
        left: 25,
        zIndex: 9999,
        p: 2.5,
        borderRadius: 4,
        backgroundColor: "#0F172A",
        color: "#FFFFFF",
        border: "1.5px solid #38BDF8",
        boxShadow: "0 16px 40px rgba(0, 0, 0, 0.6)",
        maxWidth: 420,
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>
        <Box display="flex" alignItems="center" gap={1}>
          <OfflineBoltIcon style={{ color: "#F59E0B" }} />
          <Typography variant="subtitle2" fontWeight={800} color="#38BDF8">
            Offline Classroom PWA App Ready
          </Typography>
        </Box>

        <IconButton size="small" onClick={() => setShowBanner(false)} sx={{ color: "rgba(255, 255, 255, 0.6)" }}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      <Typography variant="body2" color="rgba(255, 255, 255, 0.85)" mb={2} sx={{ fontSize: "0.9rem", lineHeight: 1.5 }}>
        Install the NCERT WebAR App to pre-cache all 40 3D STEM models for 100% offline classroom use without internet!
      </Typography>

      <Stack direction="row" spacing={1.5} alignItems="center">
        <Button
          variant="contained"
          color="primary"
          startIcon={<GetAppIcon />}
          onClick={handleInstallClick}
          sx={{ borderRadius: 3, fontWeight: 800, px: 2.5, py: 1 }}
        >
          Install Offline App
        </Button>

        <Chip
          icon={<CheckCircleIcon fontSize="small" style={{ color: "#4ADE80" }} />}
          label="Offline Cached"
          size="small"
          sx={{ backgroundColor: "rgba(74, 222, 128, 0.15)", color: "#4ADE80", fontWeight: 700 }}
        />
      </Stack>
    </Paper>
  );
}
