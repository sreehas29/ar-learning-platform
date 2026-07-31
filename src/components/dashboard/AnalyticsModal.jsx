import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  Button,
  LinearProgress,
  Grid,
  Paper,
  Chip,
  Divider,
  Stack,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import CalculateIcon from "@mui/icons-material/Calculate";
import ScienceIcon from "@mui/icons-material/Science";
import SchoolIcon from "@mui/icons-material/School";
import PrintIcon from "@mui/icons-material/Print";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { useApp } from "../../context/AppContext";
import { activitiesData } from "../../utils/activityData";

export default function AnalyticsModal({ open, onClose }) {
  const { completedActivities } = useApp();

  const totalNCERT = activitiesData.length;
  const completedCount = completedActivities?.length || 0;
  const progressPercent = Math.min(Math.round((completedCount / totalNCERT) * 100), 100);

  // Subject Breakdown
  const mathCompleted = completedActivities.filter((act) => act.id.startsWith("math")).length;
  const sciCompleted = completedActivities.filter((act) => act.id.startsWith("sci")).length;

  const mathTotal = activitiesData.filter((act) => act.subject === "math").length;
  const sciTotal = activitiesData.filter((act) => act.subject === "science").length;

  const mathPercent = mathTotal > 0 ? Math.round((mathCompleted / mathTotal) * 100) : 0;
  const sciPercent = sciTotal > 0 ? Math.round((sciCompleted / sciTotal) * 100) : 0;

  // Grade Breakdown (Grades 6 to 10)
  const gradeBreakdown = [6, 7, 8, 9, 10].map((g) => {
    const count = completedActivities.filter((act) => {
      const matchInDataset = activitiesData.find((item) => item.id === act.id);
      return matchInDataset ? matchInDataset.grade === g : false;
    }).length;
    return { grade: g, count };
  });

  const handlePrint = () => {
    window.print();
  };

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
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              p: 1,
              borderRadius: 3,
              backgroundColor: "#FEF3C7",
              color: "#D97706",
            }}
          >
            <EmojiEventsIcon fontSize="medium" />
          </Box>
          <Box>
            <Typography variant="h5" fontWeight={800} color="primary">
              Classroom Progress & Performance Report
            </Typography>
            <Typography variant="caption" color="text.secondary">
              NCERT School Kits & 3D WebAR Learning Analytics
            </Typography>
          </Box>
        </Box>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <Divider />

      <DialogContent sx={{ py: 3 }}>
        {/* Overall Curriculum Progress Header */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            mb: 3,
            borderRadius: 4,
            background: "linear-gradient(135deg, #1565C0 0%, #0D47A1 100%)",
            color: "#FFFFFF",
            boxShadow: "0 10px 24px rgba(21, 101, 192, 0.3)",
          }}
        >
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} sm={8}>
              <Typography variant="subtitle2" fontWeight={700} sx={{ opacity: 0.9 }}>
                OVERALL NCERT CURRICULUM COMPLETION
              </Typography>
              <Typography variant="h3" fontWeight={900} my={0.5}>
                {progressPercent}%
              </Typography>
              <Box sx={{ width: "100%", mr: 1, my: 1.5 }}>
                <LinearProgress
                  variant="determinate"
                  value={progressPercent}
                  sx={{
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                    "& .MuiLinearProgress-bar": {
                      backgroundColor: "#38BDF8",
                      borderRadius: 5,
                    },
                  }}
                />
              </Box>
              <Typography variant="caption" sx={{ opacity: 0.85 }}>
                {completedCount} of {totalNCERT} NCERT 3D WebAR Modules Completed
              </Typography>
            </Grid>

            <Grid item xs={12} sm={4} textAlign={{ sm: "right" }}>
              <Chip
                icon={<CheckCircleIcon style={{ color: "#10B981" }} />}
                label={completedCount > 0 ? "Active Learning" : "Ready to Begin"}
                sx={{
                  backgroundColor: "#FFFFFF",
                  color: "#0F172A",
                  fontWeight: 800,
                  fontSize: "0.85rem",
                  py: 2,
                }}
              />
            </Grid>
          </Grid>
        </Paper>

        {/* Subject Mastery Grid */}
        <Grid container spacing={2.5} mb={3}>
          <Grid item xs={12} sm={6}>
            <Paper
              variant="outlined"
              sx={{
                p: 2.5,
                borderRadius: 4,
                borderColor: "#1565C0",
                backgroundColor: "#F0F7FF",
              }}
            >
              <Box display="flex" alignItems="center" gap={1} mb={1}>
                <CalculateIcon color="primary" fontSize="small" />
                <Typography variant="subtitle1" fontWeight={700} color="primary">
                  Mathematics Mastery
                </Typography>
              </Box>
              <Typography variant="h5" fontWeight={800} gutterBottom>
                {mathPercent}%
              </Typography>
              <LinearProgress
                variant="determinate"
                value={mathPercent}
                color="primary"
                sx={{ height: 8, borderRadius: 4, mb: 1 }}
              />
              <Typography variant="caption" color="text.secondary">
                {mathCompleted} / {mathTotal} Math Kits Completed
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Paper
              variant="outlined"
              sx={{
                p: 2.5,
                borderRadius: 4,
                borderColor: "#00897B",
                backgroundColor: "#E0F2F1",
              }}
            >
              <Box display="flex" alignItems="center" gap={1} mb={1}>
                <ScienceIcon style={{ color: "#00897B" }} fontSize="small" />
                <Typography variant="subtitle1" fontWeight={700} style={{ color: "#00695C" }}>
                  Science Mastery
                </Typography>
              </Box>
              <Typography variant="h5" fontWeight={800} gutterBottom style={{ color: "#004D40" }}>
                {sciPercent}%
              </Typography>
              <LinearProgress
                variant="determinate"
                value={sciPercent}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  mb: 1,
                  backgroundColor: "rgba(0, 137, 123, 0.2)",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: "#00897B",
                  },
                }}
              />
              <Typography variant="caption" style={{ color: "#004D40" }}>
                {sciCompleted} / {sciTotal} Science Kits Completed
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Grade Breakdown Pills */}
        <Typography variant="subtitle2" fontWeight={700} mb={1.5} color="text.secondary">
          GRADE LEVEL ACTIVITY BREAKDOWN:
        </Typography>
        <Stack direction="row" spacing={1.5} flexWrap="wrap" useFlexGap mb={3}>
          {gradeBreakdown.map((item) => (
            <Chip
              key={item.grade}
              icon={<SchoolIcon fontSize="small" />}
              label={`Grade ${item.grade}: ${item.count} Done`}
              variant={item.count > 0 ? "filled" : "outlined"}
              color={item.count > 0 ? "info" : "default"}
              sx={{ fontWeight: 600 }}
            />
          ))}
        </Stack>

        {/* Recent Achievements Log */}
        <Typography variant="subtitle2" fontWeight={700} mb={1.5} color="text.secondary">
          RECENTLY COMPLETED WEBAR MODULES:
        </Typography>

        {completedActivities.length > 0 ? (
          <Stack spacing={1.5}>
            {completedActivities.slice(-4).reverse().map((item) => {
              const datasetItem = activitiesData.find((d) => d.id === item.id);
              const title = datasetItem ? datasetItem.title : item.id;
              const ncertCode = datasetItem ? datasetItem.ncertCode : null;

              return (
                <Paper
                  key={item.id}
                  variant="outlined"
                  sx={{
                    p: 2,
                    borderRadius: 3,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    backgroundColor: "#F8FAFC",
                  }}
                >
                  <Box display="flex" alignItems="center" gap={1.5}>
                    <CheckCircleIcon color="success" fontSize="small" />
                    <Box>
                      <Typography variant="subtitle2" fontWeight={700}>
                        {title}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Completed on {new Date(item.completedAt).toLocaleDateString()}
                      </Typography>
                    </Box>
                  </Box>

                  <Stack direction="row" spacing={1} alignItems="center">
                    {ncertCode && (
                      <Chip label={ncertCode} size="small" color="primary" variant="outlined" sx={{ fontWeight: 700 }} />
                    )}
                    <Chip label={`Score: ${item.score || "100%"}`} size="small" color="success" sx={{ fontWeight: 700 }} />
                  </Stack>
                </Paper>
              );
            })}
          </Stack>
        ) : (
          <Paper variant="outlined" sx={{ p: 3, textAlign: "center", borderRadius: 3, backgroundColor: "#F8FAFC" }}>
            <Typography variant="body2" color="text.secondary">
              No completed activities yet. Select a subject and grade on the home page to complete your first WebAR module!
            </Typography>
          </Paper>
        )}
      </DialogContent>

      <Divider />

      <DialogActions sx={{ p: 2.5, justifyContent: "space-between" }}>
        <Button
          startIcon={<PrintIcon />}
          onClick={handlePrint}
          sx={{ textTransform: "none", fontWeight: 700, color: "text.secondary" }}
        >
          Print Progress Report
        </Button>
        <Button variant="contained" onClick={onClose} sx={{ px: 4, borderRadius: 3, fontWeight: 700 }}>
          Close Analytics
        </Button>
      </DialogActions>
    </Dialog>
  );
}
