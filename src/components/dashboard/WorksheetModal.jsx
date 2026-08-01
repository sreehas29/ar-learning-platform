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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PrintIcon from "@mui/icons-material/Print";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import BuildCircleIcon from "@mui/icons-material/BuildCircle";
import CenterFocusStrongIcon from "@mui/icons-material/CenterFocusStrong";
import QrCode2Icon from "@mui/icons-material/QrCode2";

export default function WorksheetModal({
  open,
  onClose,
  activity,
  subject,
  grade,
}) {
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
          <MenuBookIcon color="primary" fontSize="large" />
          <Typography variant="h6" fontWeight={800} color="#1565C0">
            Printable NCERT Lab Experiment Worksheet & AR Target Marker
          </Typography>
        </Box>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <Divider />

      <DialogContent sx={{ py: 3 }}>
        {/* Printable Worksheet Document Paper Frame */}
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
          {/* Official Worksheet Header */}
          <Box borderBottom="2px solid #1565C0" pb={2} mb={3}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={8}>
                <Typography variant="caption" fontWeight={800} color="#1565C0" letterSpacing={1.5} display="block">
                  NATIONAL COUNCIL OF EDUCATIONAL RESEARCH & TRAINING (NCERT)
                </Typography>
                <Typography variant="h4" fontWeight={900} color="#0F172A" sx={{ fontFamily: "Georgia, serif", my: 0.5 }}>
                  STEM Experiment Lab Worksheet
                </Typography>
                <Typography variant="subtitle2" color="text.secondary" fontWeight={600}>
                  Module: {activity.title} ({activity.ncertCode || "NCERT-UPMK-01"})
                </Typography>
              </Grid>

              <Grid item xs={12} sm={4} textAlign={{ sm: "right" }}>
                <Chip
                  label={`Grade ${grade || "6"} • ${subject ? subject.toUpperCase() : "MATHEMATICS"}`}
                  color="primary"
                  sx={{ fontWeight: 800, mb: 1 }}
                />
                <Typography variant="caption" display="block" color="text.secondary">
                  Date: __________________
                </Typography>
                <Typography variant="caption" display="block" color="text.secondary">
                  Student Name: __________________
                </Typography>
              </Grid>
            </Grid>
          </Box>

          {/* Section 1: NCERT Objective & Kit Apparatus Checklist */}
          <Box mb={3}>
            <Typography variant="subtitle1" fontWeight={800} color="#1565C0" gutterBottom display="flex" alignItems="center" gap={1}>
              <BuildCircleIcon fontSize="small" /> 1. NCERT Objective & Apparatus Checklist
            </Typography>

            <Paper variant="outlined" sx={{ p: 2, borderRadius: 3, backgroundColor: "#F8FAFC", mb: 2 }}>
              <Typography variant="body2" color="#334155" sx={{ fontSize: "0.95rem", lineHeight: 1.5 }}>
                <strong>NCERT Objective:</strong> {activity.ncertObjective || "To visualize and empirically model 3D geometric polyhedra nets."}
              </Typography>
            </Paper>

            <Typography variant="caption" fontWeight={700} color="text.secondary" display="block" mb={1}>
              PHYSICAL KIT APPARATUS ITEMS REQUIRED:
            </Typography>

            <Grid container spacing={1}>
              {activity.ncertApparatus?.map((item, idx) => (
                <Grid item xs={12} sm={6} key={idx}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Checkbox size="small" color="primary" />
                    <Typography variant="body2" fontWeight={600} color="#1E293B">
                      {item}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Section 2: Student Observation Table Grid */}
          <Box mb={4}>
            <Typography variant="subtitle1" fontWeight={800} color="#1565C0" gutterBottom display="flex" alignItems="center" gap={1}>
              <MenuBookIcon fontSize="small" /> 2. 3D AR Observation & Measurement Table
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={2}>
              Perform the 3D WebAR interaction and record your observed values in the grid table below:
            </Typography>

            <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 3 }}>
              <Table size="small">
                <TableHead sx={{ backgroundColor: "#F0F9FF" }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 800, color: "#0369A1" }}>Step #</TableCell>
                    <TableCell sx={{ fontWeight: 800, color: "#0369A1" }}>3D Mesh Component / Hotspot Node</TableCell>
                    <TableCell sx={{ fontWeight: 800, color: "#0369A1" }}>Observed Measurement / Formula</TableCell>
                    <TableCell sx={{ fontWeight: 800, color: "#0369A1" }}>Verified Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell fontWeight={700}>01</TableCell>
                    <TableCell>Primary 3D Geometric Solid / Nucleus</TableCell>
                    <TableCell>________________________</TableCell>
                    <TableCell>[  ] Verified in AR</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell fontWeight={700}>02</TableCell>
                    <TableCell>Outer Wireframe Net / Electron Shell</TableCell>
                    <TableCell>________________________</TableCell>
                    <TableCell>[  ] Verified in AR</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell fontWeight={700}>03</TableCell>
                    <TableCell>Exploded 3D Deconstruction Offset</TableCell>
                    <TableCell>________________________</TableCell>
                    <TableCell>[  ] Verified in AR</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Section 3: Printable Optical AR Target Marker Card */}
          <Box mb={3} textAlign="center">
            <Typography variant="subtitle1" fontWeight={800} color="#1565C0" gutterBottom display="flex" alignItems="center" justifyContent="center" gap={1}>
              <CenterFocusStrongIcon fontSize="small" /> 3. Printable Optical AR Target Marker Graphic
            </Typography>
            <Typography variant="caption" color="text.secondary" display="block" mb={2}>
              Cut out or place this printable marker flat on your desk to anchor 3D AR models using your camera.
            </Typography>

            {/* High-Contrast Target Marker Graphic Box */}
            <Box
              sx={{
                width: 220,
                height: 220,
                mx: "auto",
                border: "6px solid #0F172A",
                borderRadius: 4,
                p: 2,
                backgroundColor: "#FFFFFF",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
                position: "relative",
              }}
            >
              {/* Outer Alignment Ring */}
              <Box
                sx={{
                  width: 150,
                  height: 150,
                  borderRadius: "50%",
                  border: "4px dashed #1565C0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <QrCode2Icon sx={{ fontSize: 90, color: "#0F172A" }} />
              </Box>
              <Typography variant="caption" fontWeight={900} color="#1565C0" mt={1} letterSpacing={1}>
                {activity.ncertCode || "NCERT-AR-TARGET"}
              </Typography>
            </Box>
          </Box>

          {/* Worksheet Footer Signatures */}
          <Grid container spacing={2} alignItems="center" pt={3} sx={{ borderTop: "1px solid #E2E8F0" }}>
            <Grid item xs={6} textAlign="left">
              <Typography variant="caption" color="text.secondary" display="block">
                Date Completed: {currentDate}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Student Signature: __________________
              </Typography>
            </Grid>

            <Grid item xs={6} textAlign="right">
              <Typography variant="caption" color="text.secondary" display="block">
                Teacher Evaluation: [  ] Outstanding  [  ] Satisfactory
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Teacher Signature: __________________
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
          Print Lab Worksheet & AR Target Marker
        </Button>
        <Button onClick={onClose} variant="outlined" sx={{ borderRadius: 3, fontWeight: 600 }}>
          Close Worksheet
        </Button>
      </DialogActions>
    </Dialog>
  );
}
