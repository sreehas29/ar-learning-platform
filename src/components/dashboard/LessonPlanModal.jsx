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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PrintIcon from "@mui/icons-material/Print";
import SchoolIcon from "@mui/icons-material/School";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import BuildCircleIcon from "@mui/icons-material/BuildCircle";
import PsychologyIcon from "@mui/icons-material/Psychology";
import DescriptionIcon from "@mui/icons-material/Description";

export default function LessonPlanModal({ open, onClose, activity, subject, grade }) {
  if (!activity) return null;

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
          backgroundColor: "#FFFFFF",
          color: "#0F172A",
        },
      }}
    >
      <DialogTitle display="flex" justifyContent="space-between" alignItems="center">
        <Box display="flex" alignItems="center" gap={1.5}>
          <DescriptionIcon color="primary" fontSize="large" />
          <Typography variant="h6" fontWeight={800} color="#1565C0">
            NCERT 5E Model STEM Classroom Lesson Plan
          </Typography>
        </Box>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <Divider />

      <DialogContent sx={{ py: 3 }}>
        {/* Printable Lesson Plan Paper Container */}
        <Paper
          elevation={3}
          sx={{
            p: { xs: 3, sm: 4 },
            borderRadius: 4,
            backgroundColor: "#FFFFFF",
            border: "2px solid #1565C0",
            boxShadow: "0 8px 32px rgba(21, 101, 192, 0.1)",
          }}
        >
          {/* Header Banner */}
          <Box borderBottom="2px solid #1565C0" pb={2} mb={3}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={8}>
                <Typography variant="caption" fontWeight={800} color="#1565C0" letterSpacing={1.5} display="block">
                  NATIONAL COUNCIL OF EDUCATIONAL RESEARCH & TRAINING (NCERT)
                </Typography>
                <Typography variant="h4" fontWeight={900} color="#0F172A" sx={{ fontFamily: "Georgia, serif", my: 0.5 }}>
                  5E Model STEM Lesson Plan
                </Typography>
                <Typography variant="subtitle1" color="#1565C0" fontWeight={800}>
                  {activity.title} ({activity.ncertCode || "NCERT-UPMK-01"})
                </Typography>
              </Grid>

              <Grid item xs={12} sm={4} textAlign={{ sm: "right" }}>
                <Chip
                  icon={<SchoolIcon fontSize="small" style={{ color: "#FFFFFF" }} />}
                  label={`Grade ${grade || "8"} • ${subject ? subject.toUpperCase() : "MATHEMATICS"}`}
                  color="primary"
                  sx={{ fontWeight: 800, mb: 1 }}
                />
                <Typography variant="caption" display="block" color="text.secondary">
                  Duration: {activity.duration || "45 Mins"}
                </Typography>
                <Typography variant="caption" display="block" color="text.secondary">
                  Date: {currentDate}
                </Typography>
              </Grid>
            </Grid>
          </Box>

          {/* Section 1: Bloom's Taxonomy Learning Outcomes */}
          <Box mb={3}>
            <Typography variant="subtitle1" fontWeight={800} color="#1565C0" gutterBottom display="flex" alignItems="center" gap={1}>
              <PsychologyIcon fontSize="small" /> 1. Bloom's Taxonomy Learning Objectives
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Paper variant="outlined" sx={{ p: 2, borderRadius: 3, backgroundColor: "#F0F9FF", borderColor: "#0284C7", height: "100%" }}>
                  <Typography variant="caption" fontWeight={900} color="#0369A1" display="block" mb={0.5}>
                    KNOWLEDGE & RECALL:
                  </Typography>
                  <Typography variant="body2" color="#334155" sx={{ fontSize: "0.85rem" }}>
                    Identify 3D polyhedra vertices, faces, electron orbits, or Snell's law refraction angles.
                  </Typography>
                </Paper>
              </Grid>

              <Grid item xs={12} sm={4}>
                <Paper variant="outlined" sx={{ p: 2, borderRadius: 3, backgroundColor: "#FEF3C7", borderColor: "#D97706", height: "100%" }}>
                  <Typography variant="caption" fontWeight={900} color="#92400E" display="block" mb={0.5}>
                    SPATIAL UNDERSTANDING:
                  </Typography>
                  <Typography variant="body2" color="#78350F" sx={{ fontSize: "0.85rem" }}>
                    Conceptualize 3D exploded net deconstruction and dimensional proportions in WebAR space.
                  </Typography>
                </Paper>
              </Grid>

              <Grid item xs={12} sm={4}>
                <Paper variant="outlined" sx={{ p: 2, borderRadius: 3, backgroundColor: "#D1FAE5", borderColor: "#059669", height: "100%" }}>
                  <Typography variant="caption" fontWeight={900} color="#065F46" display="block" mb={0.5}>
                    PRACTICAL APPLICATION:
                  </Typography>
                  <Typography variant="body2" color="#064E3B" sx={{ fontSize: "0.85rem" }}>
                    Manipulate live parameter simulation sliders to empirically model physical laws.
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Section 2: NCERT Kit Apparatus Requirements */}
          <Box mb={3}>
            <Typography variant="subtitle1" fontWeight={800} color="#1565C0" gutterBottom display="flex" alignItems="center" gap={1}>
              <BuildCircleIcon fontSize="small" /> 2. NCERT Kit & WebAR Digital Twin Apparatus
            </Typography>

            <Paper variant="outlined" sx={{ p: 2, borderRadius: 3, backgroundColor: "#F8FAFC" }}>
              <Typography variant="caption" fontWeight={800} color="#1565C0" display="block" mb={1}>
                PHYSICAL KIT ITEMS & WEBAR DIGITAL TWIN EQUIVALENTS:
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {activity.ncertApparatus?.map((item) => (
                  <Chip
                    key={item}
                    label={item}
                    size="small"
                    sx={{ backgroundColor: "#E2E8F0", color: "#0F172A", fontWeight: 700 }}
                  />
                ))}
              </Stack>
            </Paper>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Section 3: The 5E Instructional Model Procedure */}
          <Box mb={4}>
            <Typography variant="subtitle1" fontWeight={800} color="#1565C0" gutterBottom display="flex" alignItems="center" gap={1}>
              <MenuBookIcon fontSize="small" /> 3. The 5E Instructional Model Procedure
            </Typography>

            <Stack spacing={2}>
              <Paper variant="outlined" sx={{ p: 2, borderRadius: 3, borderLeft: "4px solid #1565C0" }}>
                <Typography variant="subtitle2" fontWeight={800} color="#1565C0">
                  1. ENGAGE (5 Mins):
                </Typography>
                <Typography variant="body2" color="#334155">
                  Teacher introduces real-world phenomenon and presents physical NCERT Kit item. Question: <em>"How does 3D spatial geometry model volume or light refraction?"</em>
                </Typography>
              </Paper>

              <Paper variant="outlined" sx={{ p: 2, borderRadius: 3, borderLeft: "4px solid #0284C7" }}>
                <Typography variant="subtitle2" fontWeight={800} color="#0284C7">
                  2. EXPLORE (15 Mins):
                </Typography>
                <Typography variant="body2" color="#334155">
                  Students launch 3D WebAR View (`/ar`) on devices, rotate 3D models using pointer gestures, and trigger 3D Exploded View deconstruction to inspect underlying nets.
                </Typography>
              </Paper>

              <Paper variant="outlined" sx={{ p: 2, borderRadius: 3, borderLeft: "4px solid #D97706" }}>
                <Typography variant="subtitle2" fontWeight={800} color="#D97706">
                  3. EXPLAIN (10 Mins):
                </Typography>
                <Typography variant="body2" color="#334155">
                  Teacher uses Guided Audio Tour Mode to systematically inspect 3D hotspot nodes while Web Speech API voice synthesis narrates scientific explanations aloud.
                </Typography>
              </Paper>

              <Paper variant="outlined" sx={{ p: 2, borderRadius: 3, borderLeft: "4px solid #059669" }}>
                <Typography variant="subtitle2" fontWeight={800} color="#059669">
                  4. ELABORATE (10 Mins):
                </Typography>
                <Typography variant="body2" color="#334155">
                  Students adjust live Simulation Sliders (Bohr atom proton numbers, refractive index $n$, Pythagoras leg lengths) to observe dynamic changes in real-time.
                </Typography>
              </Paper>

              <Paper variant="outlined" sx={{ p: 2, borderRadius: 3, borderLeft: "4px solid #7C3AED" }}>
                <Typography variant="subtitle2" fontWeight={800} color="#7C3AED">
                  5. EVALUATE (5 Mins):
                </Typography>
                <Typography variant="body2" color="#334155">
                  Students complete the AR HUD Quiz, record measurements in the NCERT Lab Worksheet, and receive official printable STEM achievement certificates upon passing.
                </Typography>
              </Paper>
            </Stack>
          </Box>

          {/* Section 4: Signatures & Approvals */}
          <Grid container spacing={2} alignItems="center" pt={3} sx={{ borderTop: "1px solid #E2E8F0" }}>
            <Grid item xs={6} textAlign="left">
              <Typography variant="caption" color="text.secondary" display="block">
                Prepared By: Teacher Signature
              </Typography>
              <Typography variant="caption" color="text.secondary">
                ________________________________
              </Typography>
            </Grid>

            <Grid item xs={6} textAlign="right">
              <Typography variant="caption" color="text.secondary" display="block">
                Approved By: Principal / HOD Signature
              </Typography>
              <Typography variant="caption" color="text.secondary">
                ________________________________
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
          sx={{ borderRadius: 3, fontWeight: 800, px: 3 }}
        >
          Print NCERT 5E Lesson Plan
        </Button>
        <Button onClick={onClose} variant="outlined" sx={{ borderRadius: 3, fontWeight: 600 }}>
          Close Lesson Plan
        </Button>
      </DialogActions>
    </Dialog>
  );
}
