import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  Button,
  Paper,
  Chip,
  Divider,
  Stack,
} from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import VerifiedIcon from "@mui/icons-material/Verified";
import PrintIcon from "@mui/icons-material/Print";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ViewListIcon from "@mui/icons-material/ViewList";
import { useNavigate } from "react-router-dom";

export default function CompletionModal({
  open,
  onClose,
  activity,
  subject,
  grade,
  score,
}) {
  const navigate = useNavigate();

  if (!activity) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleGoActivities = () => {
    onClose();
    navigate("/activity");
  };

  const handleGoDashboard = () => {
    onClose();
    navigate("/dashboard");
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
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 5,
          p: 1,
          background: "linear-gradient(135deg, #FFFFFF 0%, #F0F7FF 100%)",
        },
      }}
    >
      <DialogTitle textAlign="center" sx={{ pt: 3, pb: 1 }}>
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 70,
            height: 70,
            borderRadius: "50%",
            backgroundColor: "#FEF3C7",
            color: "#D97706",
            mb: 1.5,
            boxShadow: "0 8px 20px rgba(217, 119, 6, 0.2)",
          }}
        >
          <EmojiEventsIcon sx={{ fontSize: 44 }} />
        </Box>

        <Typography variant="h4" fontWeight={800} color="primary" gutterBottom>
          Lesson Accomplished!
        </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          Official AR Educational Platform Certificate of Achievement
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ px: { xs: 2, sm: 4 }, py: 2 }}>
        {/* Certificate Frame Card */}
        <Paper
          variant="outlined"
          sx={{
            p: 3,
            borderRadius: 4,
            borderColor: "#1565C0",
            backgroundColor: "#FFFFFF",
            position: "relative",
            textAlign: "center",
            boxShadow: "0 4px 16px rgba(21, 101, 192, 0.08)",
          }}
        >
          <Box display="flex" justifyContent="center" gap={1} mb={2}>
            <Chip
              icon={<VerifiedIcon style={{ color: "#1565C0" }} />}
              label="3D AR WebGL Certified"
              color="primary"
              variant="outlined"
              sx={{ fontWeight: 700 }}
            />
          </Box>

          <Typography variant="body2" color="text.secondary" gutterBottom>
            This certifies that the student has successfully completed the interactive 3D WebAR lesson:
          </Typography>

          <Typography variant="h5" fontWeight={700} color="primary" sx={{ my: 1.5 }}>
            {activity.title}
          </Typography>

          <Stack direction="row" spacing={1} justifyContent="center" mb={2}>
            <Chip
              label={`Subject: ${subject ? subject.toUpperCase() : "GENERAL"}`}
              color="primary"
              size="small"
            />
            <Chip label={`Grade Level: ${grade || "6"}`} color="info" size="small" />
            <Chip label={activity.arType || "3D Mesh AR"} color="secondary" size="small" />
          </Stack>

          <Divider sx={{ my: 2 }} />

          {/* Performance Summary Metrics */}
          <Stack direction="row" spacing={2} justifyContent="space-around">
            <Box>
              <Typography variant="caption" color="text.secondary" display="block">
                Classroom Quiz Result
              </Typography>
              <Typography variant="h6" fontWeight={700} color="success.main">
                {score || "100% Passed"}
              </Typography>
            </Box>

            <Box>
              <Typography variant="caption" color="text.secondary" display="block">
                3D Model Inspection
              </Typography>
              <Typography variant="h6" fontWeight={700} color="primary.main">
                Verified
              </Typography>
            </Box>

            <Box>
              <Typography variant="caption" color="text.secondary" display="block">
                Date Completed
              </Typography>
              <Typography variant="subtitle2" fontWeight={600} mt={0.5}>
                {currentDate}
              </Typography>
            </Box>
          </Stack>
        </Paper>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 1, justifyContent: "space-between", flexWrap: "wrap", gap: 1.5 }}>
        <Button
          variant="outlined"
          startIcon={<PrintIcon />}
          onClick={handlePrint}
          sx={{ borderRadius: 3, textTransform: "none" }}
        >
          Print Certificate
        </Button>

        <Stack direction="row" spacing={1.5}>
          <Button
            variant="outlined"
            startIcon={<ViewListIcon />}
            onClick={handleGoActivities}
            sx={{ borderRadius: 3, textTransform: "none" }}
          >
            More Activities
          </Button>

          <Button
            variant="contained"
            color="primary"
            startIcon={<DashboardIcon />}
            onClick={handleGoDashboard}
            sx={{ borderRadius: 3, px: 3, textTransform: "none", fontWeight: 700 }}
          >
            Dashboard
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
}
