import { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  Chip,
  Button,
  Stack,
  IconButton,
  Tooltip,
} from "@mui/material";
import TargetIcon from "@mui/icons-material/CenterFocusStrong";
import LayersIcon from "@mui/icons-material/Layers";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";

export default function MarkerTracker({ trackingMode, onToggleMode }) {
  const [signalStrength, setSignalStrength] = useState(98);
  const [isLocked, setIsLocked] = useState(true);

  // Simulate dynamic optical tracking pulse signals
  useEffect(() => {
    const interval = setInterval(() => {
      const variation = Math.floor(Math.random() * 5) - 2;
      setSignalStrength((prev) => Math.min(Math.max(prev + variation, 92), 100));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        p: 2,
      }}
    >
      {/* Top Status Bar Indicator */}
      <Box
        sx={{
          mt: 9,
          pointerEvents: "auto",
          display: "flex",
          gap: 1.5,
          alignItems: "center",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <Paper
          elevation={0}
          sx={{
            px: 2,
            py: 0.8,
            borderRadius: 4,
            backgroundColor: "rgba(15, 23, 42, 0.85)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(56, 189, 248, 0.3)",
            display: "flex",
            alignItems: "center",
            gap: 1.5,
          }}
        >
          <Box display="flex" alignItems="center" gap={0.8}>
            {trackingMode === "marker" ? (
              <QrCodeScannerIcon color="info" fontSize="small" />
            ) : (
              <LayersIcon color="info" fontSize="small" />
            )}
            <Typography variant="caption" fontWeight={700} color="#38BDF8">
              {trackingMode === "marker"
                ? "Target Marker Tracking (HIRO / AR Code)"
                : "Surface Tracking (Tabletop / Plane)"}
            </Typography>
          </Box>

          <Chip
            icon={<SignalCellularAltIcon style={{ color: "#4ADE80" }} />}
            label={`${signalStrength}% Optical Lock`}
            size="small"
            sx={{
              backgroundColor: "rgba(74, 222, 128, 0.15)",
              color: "#4ADE80",
              fontWeight: 600,
              fontSize: "0.725rem",
              height: 22,
            }}
          />

          <Button
            size="small"
            variant="contained"
            color="primary"
            onClick={onToggleMode}
            sx={{
              fontSize: "0.725rem",
              py: 0.2,
              px: 1.2,
              borderRadius: 3,
              textTransform: "none",
            }}
          >
            Switch to {trackingMode === "marker" ? "Surface Plane" : "Target Marker"}
          </Button>
        </Paper>
      </Box>

      {/* Optical Reticle Scanner Frame */}
      {trackingMode === "marker" && (
        <Box
          sx={{
            position: "relative",
            width: 260,
            height: 260,
            borderRadius: 4,
            border: "2px solid rgba(56, 189, 248, 0.4)",
            boxShadow: "0 0 30px rgba(56, 189, 248, 0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            my: "auto",
          }}
        >
          {/* Animated Scanning Line */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "2px",
              backgroundColor: "#38BDF8",
              boxShadow: "0 0 15px #38BDF8",
              animation: "scanLine 2.5s ease-in-out infinite alternate",
              "@keyframes scanLine": {
                "0%": { top: "5%" },
                "100%": { top: "95%" },
              },
            }}
          />

          {/* Corner Framing Brackets */}
          <Box
            sx={{
              position: "absolute",
              top: -6,
              left: -6,
              width: 24,
              height: 24,
              borderTop: "3px solid #38BDF8",
              borderLeft: "3px solid #38BDF8",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              top: -6,
              right: -6,
              width: 24,
              height: 24,
              borderTop: "3px solid #38BDF8",
              borderRight: "3px solid #38BDF8",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: -6,
              left: -6,
              width: 24,
              height: 24,
              borderBottom: "3px solid #38BDF8",
              borderLeft: "3px solid #38BDF8",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: -6,
              right: -6,
              width: 24,
              height: 24,
              borderBottom: "3px solid #38BDF8",
              borderRight: "3px solid #38BDF8",
            }}
          />

          <Typography variant="caption" sx={{ color: "rgba(255, 255, 255, 0.6)", textAlign: "center" }}>
            Align Camera to Marker Pattern
          </Typography>
        </Box>
      )}
    </Box>
  );
}
