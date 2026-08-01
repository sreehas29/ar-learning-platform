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
  Tabs,
  Tab,
  IconButton,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import GroupsIcon from "@mui/icons-material/Groups";
import CastIcon from "@mui/icons-material/Cast";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import SensorsIcon from "@mui/icons-material/Sensors";
import SchoolIcon from "@mui/icons-material/School";

export default function ClassroomSessionModal({
  open,
  onClose,
  activeActivity,
  onBroadCastState,
}) {
  const [tabIndex, setTabIndex] = useState(0); // 0: Host Teacher, 1: Student Join
  const [roomCode, setRoomCode] = useState("NCERT-8492");
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [studentName, setStudentName] = useState("");
  const [joinedRoom, setJoinedRoom] = useState(null);
  const [copiedCode, setCopiedCode] = useState(false);

  const simulatedRoster = [
    { name: "Rohan Sharma", score: "100%", status: "Active Sync" },
    { name: "Priya Verma", score: "100%", status: "Active Sync" },
    { name: "Aarav Patel", score: "80%", status: "Active Sync" },
    { name: "Ananya Singh", score: "100%", status: "Active Sync" },
    { name: "Kavya Reddy", score: "90%", status: "Active Sync" },
  ];

  const handleGenerateRoomCode = () => {
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const newCode = `NCERT-${randomDigits}`;
    setRoomCode(newCode);
    setIsBroadcasting(true);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(roomCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const handleStudentJoin = () => {
    if (!roomCode || !studentName) return;
    setJoinedRoom(roomCode);
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
          backgroundColor: "#0F172A",
          color: "#FFFFFF",
          border: "1px solid rgba(255, 255, 255, 0.15)",
        },
      }}
    >
      <DialogTitle display="flex" justifyContent="space-between" alignItems="center">
        <Box display="flex" alignItems="center" gap={1.5}>
          <GroupsIcon color="primary" fontSize="large" />
          <Typography variant="h5" fontWeight={900} color="#38BDF8">
            Multi-User AR Smart Classroom Suite
          </Typography>
        </Box>
        <IconButton onClick={onClose} sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.1)" }} />

      <DialogContent sx={{ py: 3 }}>
        {/* Mode Tabs: Host Teacher vs Student Join */}
        <Tabs
          value={tabIndex}
          onChange={(e, v) => setTabIndex(v)}
          textColor="inherit"
          indicatorColor="primary"
          sx={{ mb: 3, "& .MuiTab-root": { fontWeight: 800, fontSize: "0.95rem" } }}
        >
          <Tab icon={<CastIcon />} iconPosition="start" label="Host Teacher AR Session" />
          <Tab icon={<PersonAddIcon />} iconPosition="start" label="Student Join Room" />
        </Tabs>

        {/* TAB 0: TEACHER HOST BROADCAST MODE */}
        {tabIndex === 0 && (
          <Box>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                mb: 3,
                borderRadius: 4,
                backgroundColor: "rgba(30, 41, 59, 0.8)",
                border: "1px solid rgba(56, 189, 248, 0.3)",
              }}
            >
              <Grid container spacing={3} alignItems="center">
                <Grid item xs={12} sm={7}>
                  <Box display="flex" alignItems="center" gap={1} mb={1}>
                    <SensorsIcon color="error" />
                    <Typography variant="subtitle2" fontWeight={800} color="#F59E0B">
                      TEACHER LIVE BROADCAST ROOM CODE:
                    </Typography>
                  </Box>
                  <Typography variant="h3" fontWeight={900} color="#38BDF8" letterSpacing={2}>
                    {roomCode}
                  </Typography>
                  <Typography variant="caption" color="rgba(255, 255, 255, 0.7)">
                    Share this 6-digit code with students in your classroom to synchronize 3D WebAR screens.
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={5} textAlign={{ sm: "right" }}>
                  <Stack spacing={1.5} direction={{ xs: "column", sm: "row" }} justifyContent="flex-end">
                    <Button
                      variant="outlined"
                      startIcon={<ContentCopyIcon />}
                      onClick={handleCopyCode}
                      sx={{ color: "#FFFFFF", borderColor: "rgba(255, 255, 255, 0.3)", borderRadius: 3 }}
                    >
                      {copiedCode ? "Copied!" : "Copy Code"}
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<CastIcon />}
                      onClick={handleGenerateRoomCode}
                      sx={{ borderRadius: 3, fontWeight: 800 }}
                    >
                      {isBroadcasting ? "New Room Code" : "Start Live Session"}
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </Paper>

            {/* Broadcast Control Matrix */}
            <Typography variant="h6" fontWeight={800} color="#38BDF8" mb={2}>
              Teacher Live Broadcast Controls:
            </Typography>

            <Grid container spacing={2} mb={3}>
              <Grid item xs={12} sm={4}>
                <Paper sx={{ p: 2, borderRadius: 3, backgroundColor: "rgba(15, 23, 42, 0.8)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
                  <Typography variant="caption" color="rgba(255, 255, 255, 0.6)" fontWeight={700} display="block" mb={1}>
                    BROADCAST 3D MESH RENDER:
                  </Typography>
                  <Stack direction="row" spacing={1}>
                    <Button size="small" variant="contained" color="primary" onClick={() => onBroadCastState?.({ wireframe: false })}>
                      Shaded
                    </Button>
                    <Button size="small" variant="outlined" color="info" onClick={() => onBroadCastState?.({ wireframe: true })}>
                      Wireframe
                    </Button>
                  </Stack>
                </Paper>
              </Grid>

              <Grid item xs={12} sm={4}>
                <Paper sx={{ p: 2, borderRadius: 3, backgroundColor: "rgba(15, 23, 42, 0.8)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
                  <Typography variant="caption" color="rgba(255, 255, 255, 0.6)" fontWeight={700} display="block" mb={1}>
                    BROADCAST 3D NET MODE:
                  </Typography>
                  <Stack direction="row" spacing={1}>
                    <Button size="small" variant="contained" color="warning" onClick={() => onBroadCastState?.({ exploded: true })}>
                      Explode 3D Net
                    </Button>
                    <Button size="small" variant="outlined" color="inherit" onClick={() => onBroadCastState?.({ exploded: false })}>
                      Assemble
                    </Button>
                  </Stack>
                </Paper>
              </Grid>

              <Grid item xs={12} sm={4}>
                <Paper sx={{ p: 2, borderRadius: 3, backgroundColor: "rgba(15, 23, 42, 0.8)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
                  <Typography variant="caption" color="rgba(255, 255, 255, 0.6)" fontWeight={700} display="block" mb={1}>
                    CLASSROOM QUIZ ACCURACY:
                  </Typography>
                  <Box display="flex" alignItems="center" gap={1}>
                    <EmojiEventsIcon style={{ color: "#F59E0B" }} />
                    <Typography variant="h6" fontWeight={900} color="#4ADE80">
                      94% Average
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            </Grid>

            {/* Live Connected Student Roster */}
            <Typography variant="h6" fontWeight={800} color="#FFFFFF" mb={1.5}>
              Connected Student Roster ({simulatedRoster.length} Active):
            </Typography>

            <Paper sx={{ p: 1, borderRadius: 3, backgroundColor: "rgba(30, 41, 59, 0.6)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
              <List dense>
                {simulatedRoster.map((st, idx) => (
                  <ListItem
                    key={idx}
                    secondaryAction={
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Chip label={`Quiz: ${st.score}`} size="small" color="success" sx={{ fontWeight: 700 }} />
                        <Chip icon={<CheckCircleIcon fontSize="small" />} label={st.status} size="small" color="info" />
                      </Stack>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar sx={{ backgroundColor: "#1565C0", fontWeight: 800, fontSize: "0.85rem" }}>
                        {st.name.charAt(0)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={<Typography fontWeight={700} color="#FFFFFF">{st.name}</Typography>}
                      secondary={<Typography variant="caption" color="rgba(255, 255, 255, 0.6)">NCERT AR Live Sync Active</Typography>}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Box>
        )}

        {/* TAB 1: STUDENT JOIN ROOM MODE */}
        {tabIndex === 1 && (
          <Box maxWidth={500} mx="auto" py={2}>
            {!joinedRoom ? (
              <Paper sx={{ p: 4, borderRadius: 4, backgroundColor: "rgba(30, 41, 59, 0.8)", border: "1px solid rgba(255, 255, 255, 0.15)", textAlign: "center" }}>
                <SchoolIcon sx={{ fontSize: 48, color: "#38BDF8", mb: 2 }} />
                <Typography variant="h5" fontWeight={800} color="#FFFFFF" mb={1}>
                  Join Teacher's AR Classroom
                </Typography>
                <Typography variant="body2" color="rgba(255, 255, 255, 0.7)" mb={3}>
                  Enter the 6-digit room code displayed on your teacher's board to sync 3D WebAR models.
                </Typography>

                <Stack spacing={2} mb={3}>
                  <TextField
                    fullWidth
                    label="Student Full Name"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    variant="outlined"
                    InputLabelProps={{ style: { color: "rgba(255, 255, 255, 0.7)" } }}
                    InputProps={{ style: { color: "#FFFFFF" } }}
                  />
                  <TextField
                    fullWidth
                    label="Classroom Room Code (e.g. NCERT-8492)"
                    value={roomCode}
                    onChange={(e) => setRoomCode(e.target.value)}
                    variant="outlined"
                    InputLabelProps={{ style: { color: "rgba(255, 255, 255, 0.7)" } }}
                    InputProps={{ style: { color: "#38BDF8", fontWeight: 800 } }}
                  />
                </Stack>

                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={handleStudentJoin}
                  disabled={!studentName || !roomCode}
                  sx={{ py: 1.5, borderRadius: 3, fontWeight: 800 }}
                >
                  Join AR Classroom Session
                </Button>
              </Paper>
            ) : (
              <Alert severity="success" sx={{ borderRadius: 3, p: 3 }}>
                <Typography variant="h6" fontWeight={800}>
                  Successfully Joined Room {joinedRoom}!
                </Typography>
                <Typography variant="body2">
                  Welcome <strong>{studentName}</strong>! Your 3D WebAR canvas is now live-synchronized with the teacher presentation.
                </Typography>
              </Alert>
            )}
          </Box>
        )}
      </DialogContent>

      <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.1)" }} />

      <DialogActions sx={{ p: 2.5, justifyContent: "space-between" }}>
        <Typography variant="caption" color="rgba(255, 255, 255, 0.5)">
          WebAR Smart Classroom Engine • NCERT Standard Compliant
        </Typography>
        <Button onClick={onClose} variant="outlined" sx={{ color: "#FFFFFF", borderColor: "rgba(255, 255, 255, 0.3)", borderRadius: 3 }}>
          Close Suite
        </Button>
      </DialogActions>
    </Dialog>
  );
}
