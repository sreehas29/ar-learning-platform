import { useEffect, useRef, useState } from "react";
import { Box, Typography, Button, Alert } from "@mui/material";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";

export default function CameraFeed({ isCameraEnabled = true }) {
  const videoRef = useRef(null);
  const [streamActive, setStreamActive] = useState(false);
  const [permissionError, setPermissionError] = useState(null);

  useEffect(() => {
    let currentStream = null;

    async function startCamera() {
      if (!isCameraEnabled) {
        setStreamActive(false);
        return;
      }

      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setPermissionError("Camera API not supported on this browser.");
        return;
      }

      try {
        setPermissionError(null);
        let stream;
        try {
          // 1. Try environment (rear) camera first for mobile/AR markers
          stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: "environment", width: { ideal: 1280 }, height: { ideal: 720 } },
            audio: false,
          });
        } catch (err) {
          console.log("Rear camera unavailable, falling back to default webcam:", err);
          // 2. Fallback to default webcam (laptops/desktops)
          stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false,
          });
        }

        currentStream = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play().catch(() => {});
        }
        setStreamActive(true);
      } catch (err) {
        console.warn("Camera access fallback:", err);
        setPermissionError("Camera permission denied or unavailable. Rendering in 3D AR Studio Mode.");
        setStreamActive(false);
      }
    }

    startCamera();

    return () => {
      if (currentStream) {
        currentStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [isCameraEnabled]);

  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        overflow: "hidden",
        backgroundColor: "#0A0E17",
      }}
    >
      {/* Real Video Stream Passthrough */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: streamActive ? "block" : "none",
        }}
      />

      {/* Fallback AR Studio Background Grid */}
      {!streamActive && (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background:
              "radial-gradient(circle at 50% 50%, rgba(15, 23, 42, 0.9) 0%, rgba(10, 14, 23, 1) 100%)",
            position: "relative",
          }}
        >
          {/* Decorative Grid Lines */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              opacity: 0.15,
              backgroundImage:
                "linear-gradient(rgba(56, 189, 248, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(56, 189, 248, 0.4) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
              pointerEvents: "none",
            }}
          />

          {permissionError && (
            <Alert
              severity="info"
              sx={{
                position: "absolute",
                top: 80,
                zIndex: 2,
                backgroundColor: "rgba(15, 23, 42, 0.85)",
                color: "#94A3B8",
                border: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              {permissionError}
            </Alert>
          )}
        </Box>
      )}
    </Box>
  );
}
