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
  IconButton,
  Grid,
  LinearProgress,
  Avatar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import VerifiedIcon from "@mui/icons-material/Verified";
import SchoolIcon from "@mui/icons-material/School";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import StarsIcon from "@mui/icons-material/Stars";

export default function GamificationModal({ open, onClose, completedCount = 2 }) {
  const totalXp = completedCount * 150 + 250; // e.g. 550 XP
  const currentLevel = Math.floor(totalXp / 200) + 1;
  const xpInCurrentLevel = totalXp % 200;
  const progressPercent = (xpInCurrentLevel / 200) * 100;

  const levelTitles = {
    1: "Novice Explorer",
    2: "STEM Scholar",
    3: "WebAR Pioneer",
    4: "NCERT Master",
  };

  const levelTitle = levelTitles[Math.min(currentLevel, 4)] || "NCERT Master";

  const badges = [
    {
      id: "b1",
      icon: "📐",
      title: "Polyhedra Explorer",
      desc: "Complete 3 Geometry 3D lessons",
      unlocked: completedCount >= 1,
      color: "#38BDF8",
    },
    {
      id: "b2",
      icon: "🔬",
      title: "Optics Specialist",
      desc: "Master Prism Refraction & Snell's Law",
      unlocked: completedCount >= 2,
      color: "#F59E0B",
    },
    {
      id: "b3",
      icon: "⚛️",
      title: "Sub-Atomic Constructor",
      desc: "Build Bohr Atoms & Hydrocarbon molecules",
      unlocked: true,
      color: "#10B981",
    },
    {
      id: "b4",
      icon: "🏫",
      title: "Classroom Leader",
      desc: "Join or Host a Live AR Room Session",
      unlocked: true,
      color: "#0284C7",
    },
    {
      id: "b5",
      icon: "📝",
      title: "Lab Assistant",
      desc: "Generate an NCERT Lab Experiment Worksheet",
      unlocked: true,
      color: "#7C3AED",
    },
    {
      id: "b6",
      icon: "🏆",
      title: "NCERT STEM Master",
      desc: "Complete 10 curriculum activities",
      unlocked: completedCount >= 10,
      color: "#EF4444",
    },
  ];

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
          backgroundColor: "#0F172A",
          color: "#FFFFFF",
          border: "1px solid rgba(245, 158, 11, 0.4)",
        },
      }}
    >
      <DialogTitle display="flex" justifyContent="space-between" alignItems="center">
        <Box display="flex" alignItems="center" gap={1.5}>
          <EmojiEventsIcon style={{ color: "#F59E0B" }} fontSize="large" />
          <Typography variant="h5" fontWeight={900} color="#F59E0B">
            Student STEM XP & Badge Showcase
          </Typography>
        </Box>
        <IconButton onClick={onClose} sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.1)" }} />

      <DialogContent sx={{ py: 3 }}>
        {/* XP Level Header Banner */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            mb: 4,
            borderRadius: 4,
            backgroundColor: "rgba(30, 41, 59, 0.8)",
            border: "1.5px solid rgba(245, 158, 11, 0.4)",
            boxShadow: "0 12px 32px rgba(245, 158, 11, 0.15)",
          }}
        >
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} sm={8}>
              <Box display="flex" alignItems="center" gap={1.5} mb={1}>
                <StarsIcon style={{ color: "#F59E0B", fontSize: 36 }} />
                <Box>
                  <Typography variant="h4" fontWeight={900} color="#FFFFFF">
                    {totalXp} STEM XP
                  </Typography>
                  <Typography variant="subtitle1" fontWeight={800} color="#F59E0B">
                    Level {currentLevel}: {levelTitle}
                  </Typography>
                </Box>
              </Box>

              <Box mt={2}>
                <Box display="flex" justifyContent="space-between" mb={0.5}>
                  <Typography variant="caption" fontWeight={700} color="rgba(255, 255, 255, 0.7)">
                    Progress to Level {currentLevel + 1}
                  </Typography>
                  <Typography variant="caption" fontWeight={800} color="#38BDF8">
                    {xpInCurrentLevel} / 200 XP
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={progressPercent}
                  sx={{
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    "& .MuiLinearProgress-bar": { backgroundColor: "#F59E0B" },
                  }}
                />
              </Box>
            </Grid>

            <Grid item xs={12} sm={4} textAlign={{ sm: "right" }}>
              <Chip
                icon={<VerifiedIcon style={{ color: "#4ADE80" }} />}
                label={`${completedCount} Completed Lessons`}
                sx={{ backgroundColor: "rgba(74, 222, 128, 0.15)", color: "#4ADE80", fontWeight: 800, py: 2, fontSize: "0.9rem" }}
              />
            </Grid>
          </Grid>
        </Paper>

        {/* Achievement Badge Showcase Grid */}
        <Typography variant="h6" fontWeight={900} color="#FFFFFF" mb={2.5}>
          Unlocked Achievement Badges ({badges.filter((b) => b.unlocked).length} / {badges.length}):
        </Typography>

        <Grid container spacing={2.5}>
          {badges.map((badge) => (
            <Grid item xs={12} sm={6} md={4} key={badge.id}>
              <Paper
                elevation={0}
                sx={{
                  p: 2.5,
                  borderRadius: 4,
                  height: "100%",
                  backgroundColor: badge.unlocked ? "rgba(30, 41, 59, 0.85)" : "rgba(15, 23, 42, 0.6)",
                  border: `1.5px solid ${badge.unlocked ? badge.color : "rgba(255, 255, 255, 0.1)"}`,
                  opacity: badge.unlocked ? 1 : 0.5,
                  transition: "all 0.2s ease-in-out",
                  "&:hover": {
                    transform: badge.unlocked ? "translateY(-4px)" : "none",
                    boxShadow: badge.unlocked ? `0 10px 24px ${badge.color}33` : "none",
                  },
                }}
              >
                <Box display="flex" alignItems="center" gap={1.5} mb={1}>
                  <Avatar sx={{ backgroundColor: `${badge.color}22`, fontSize: "1.5rem", border: `1px solid ${badge.color}` }}>
                    {badge.icon}
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle2" fontWeight={800} color={badge.unlocked ? "#FFFFFF" : "rgba(255, 255, 255, 0.5)"}>
                      {badge.title}
                    </Typography>
                    <Chip
                      label={badge.unlocked ? "UNLOCKED" : "LOCKED"}
                      size="small"
                      sx={{
                        height: 18,
                        fontSize: "0.65rem",
                        fontWeight: 900,
                        backgroundColor: badge.unlocked ? `${badge.color}33` : "rgba(255, 255, 255, 0.1)",
                        color: badge.unlocked ? badge.color : "rgba(255, 255, 255, 0.4)",
                      }}
                    />
                  </Box>
                </Box>

                <Typography variant="body2" color="rgba(255, 255, 255, 0.7)" sx={{ fontSize: "0.85rem", lineHeight: 1.4 }}>
                  {badge.desc}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </DialogContent>

      <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.1)" }} />

      <DialogActions sx={{ p: 2.5, justifyContent: "space-between" }}>
        <Typography variant="caption" color="rgba(255, 255, 255, 0.5)">
          WebAR STEM Gamification Engine • NCERT Badge Certified
        </Typography>
        <Button onClick={onClose} variant="outlined" sx={{ color: "#FFFFFF", borderColor: "rgba(255, 255, 255, 0.3)", borderRadius: 3 }}>
          Close Showcase
        </Button>
      </DialogActions>
    </Dialog>
  );
}
