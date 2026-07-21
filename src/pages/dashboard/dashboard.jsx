import {
  Box,
  Typography,
  Paper
} from "@mui/material";

export default function Dashboard() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 4,
      }}
    >
      <Paper
        elevation={5}
        sx={{
          p: 5,
          borderRadius: 4,
          width: 700,
          textAlign: "center",
        }}
      >
        <Typography variant="h4">
          Teacher Dashboard
        </Typography>

        <Typography
          color="text.secondary"
          mt={2}
        >
          Grade Selection will be implemented next.
        </Typography>
      </Paper>
    </Box>
  );
}