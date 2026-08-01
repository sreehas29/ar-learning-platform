import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  Button,
  TextField,
  Paper,
  Chip,
  Divider,
  Stack,
  IconButton,
  Grid,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import PrintIcon from "@mui/icons-material/Print";
import VerifiedIcon from "@mui/icons-material/Verified";
import SchoolIcon from "@mui/icons-material/School";
import QrCode2Icon from "@mui/icons-material/QrCode2";

export default function CertificateModal({
  open,
  onClose,
  activity,
  subject,
  grade,
  score,
}) {
  const [studentName, setStudentName] = useState("Alex Johnson");

  const handlePrint = () => {
    window.print();
  };

  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 5,
          p: 1,
        },
      }}
    >
      <DialogTitle display="flex" justifyContent="space-between" alignItems="center">
        <Box display="flex" alignItems="center" gap={1.5}>
          <VerifiedIcon color="primary" fontSize="medium" />
          <Typography variant="h6" fontWeight={800} color="primary">
            Official NCERT Printable Completion Certificate
          </Typography>
        </Box>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <Divider />

      <DialogContent sx={{ py: 3 }}>
        {/* Name Personalization Input */}
        <Box mb={3}>
          <TextField
            fullWidth
            label="Student / Learner Full Name"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            helperText="Enter your name to personalize your official NCERT STEM Achievement Certificate"
            variant="outlined"
            size="small"
            sx={{ maxWidth: 450 }}
          />
        </Box>

        {/* Printable Certificate Frame */}
        <Paper
          elevation={4}
          sx={{
            p: { xs: 3, sm: 5 },
            borderRadius: 4,
            backgroundColor: "#FFFDF5",
            border: "6px double #D97706",
            boxShadow: "0 12px 36px rgba(217, 119, 6, 0.15)",
            position: "relative",
            textAlign: "center",
          }}
        >
          {/* Gold Seal Header */}
          <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
            <Box
              sx={{
                width: 72,
                height: 72,
                borderRadius: "50%",
                backgroundColor: "#FEF3C7",
                border: "3px solid #D97706",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#D97706",
                boxShadow: "0 6px 18px rgba(217, 119, 6, 0.25)",
              }}
            >
              <EmojiEventsIcon sx={{ fontSize: 42 }} />
            </Box>
          </Box>

          <Typography variant="caption" fontWeight={800} color="#B45309" letterSpacing={2} display="block">
            NATIONAL COUNCIL OF EDUCATIONAL RESEARCH & TRAINING
          </Typography>

          <Typography
            variant="h4"
            fontWeight={900}
            color="#78350F"
            sx={{ my: 1, fontFamily: "Georgia, serif" }}
          >
            Certificate of WebAR STEM Achievement
          </Typography>

          <Typography variant="body2" color="#92400E" sx={{ mb: 3 }}>
            This certificate is proudly awarded for demonstrating excellence in 3D WebAR Learning
          </Typography>

          <Divider sx={{ borderColor: "#FDE68A", width: "80%", mx: "auto", my: 2 }} />

          <Typography variant="body1" color="text.secondary">
            PROUDLY PRESENTED TO
          </Typography>

          <Typography
            variant="h3"
            fontWeight={800}
            color="#1565C0"
            sx={{ my: 1.5, fontFamily: "Georgia, serif" }}
          >
            {studentName || "Learner Name"}
          </Typography>

          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: "auto", mb: 3 }}>
            for successfully mastering the interactive 3D WebAR lesson module{" "}
            <strong>"{activity?.title || "3D Geometry & Science Module"}"</strong> aligned with NCERT Kit Standard{" "}
            <strong>{activity?.ncertCode || "NCERT-UPMK-01"}</strong> ({activity?.ncertKitName || "Upper Primary Kit"}).
          </Typography>

          <Stack direction="row" spacing={2} justifyContent="center" flexWrap="wrap" useFlexGap mb={4}>
            <Chip
              icon={<SchoolIcon fontSize="small" />}
              label={`Grade Level: ${grade || "6"}`}
              sx={{ backgroundColor: "#FEF3C7", color: "#78350F", fontWeight: 700 }}
            />
            <Chip
              label={`Subject: ${subject ? subject.toUpperCase() : "MATHEMATICS"}`}
              sx={{ backgroundColor: "#FEF3C7", color: "#78350F", fontWeight: 700 }}
            />
            <Chip
              label={`Quiz Score: ${score || "100% (Passed)"}`}
              sx={{ backgroundColor: "#D1FAE5", color: "#065F46", fontWeight: 700 }}
            />
          </Stack>

          {/* Certificate Footer Signatures */}
          <Grid container spacing={2} alignItems="center" pt={2} sx={{ borderTop: "1px solid #FDE68A" }}>
            <Grid item xs={4} textAlign="left">
              <Typography variant="caption" color="text.secondary" display="block">
                Date Awarded:
              </Typography>
              <Typography variant="body2" fontWeight={700} color="#78350F">
                {currentDate}
              </Typography>
            </Grid>

            <Grid item xs={4} textAlign="center">
              <QrCode2Icon sx={{ fontSize: 48, color: "#B45309" }} />
              <Typography variant="caption" display="block" color="text.secondary">
                Verified WebAR ID: #{Math.floor(100000 + Math.random() * 900000)}
              </Typography>
            </Grid>

            <Grid item xs={4} textAlign="right">
              <Typography variant="caption" color="text.secondary" display="block">
                Verified Signature:
              </Typography>
              <Typography variant="body2" fontWeight={800} color="#1565C0" sx={{ fontFamily: "Georgia, serif" }}>
                NCERT AR EduPlatform
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </DialogContent>

      <Divider />

      <DialogActions sx={{ p: 2.5, justifyContent: "space-between" }}>
        <Button
          startIcon={<PrintIcon />}
          onClick={handlePrint}
          variant="contained"
          color="primary"
          sx={{ borderRadius: 3, fontWeight: 700, px: 3 }}
        >
          Print / Save PDF Certificate
        </Button>
        <Button onClick={onClose} variant="outlined" sx={{ borderRadius: 3, fontWeight: 600 }}>
          Close Certificate
        </Button>
      </DialogActions>
    </Dialog>
  );
}
