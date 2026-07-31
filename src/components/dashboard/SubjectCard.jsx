import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Box,
  Chip,
  Stack,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function SubjectCard({
  id,
  icon,
  title,
  description,
  selected,
  onClick,
}) {
  const isMath = id === "math";

  const themeColors = isMath
    ? {
        border: "#1565C0",
        bgLight: "linear-gradient(135deg, #F0F7FF 0%, #E3F2FD 100%)",
        iconBg: "linear-gradient(135deg, #1565C0 0%, #0D47A1 100%)",
        glow: "rgba(21, 101, 192, 0.25)",
        chipBg: "#E3F2FD",
        chipText: "#1565C0",
      }
    : {
        border: "#00897B",
        bgLight: "linear-gradient(135deg, #E0F2F1 0%, #E8F5E9 100%)",
        iconBg: "linear-gradient(135deg, #00897B 0%, #004D40 100%)",
        glow: "rgba(0, 137, 123, 0.25)",
        chipBg: "#E0F2F1",
        chipText: "#00695C",
      };

  return (
    <Card
      elevation={selected ? 10 : 3}
      sx={{
        borderRadius: 5,
        border: selected ? `2.5px solid ${themeColors.border}` : "1.5px solid #E2E8F0",
        background: selected ? themeColors.bgLight : "#FFFFFF",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        position: "relative",
        overflow: "hidden",
        "&:hover": {
          boxShadow: `0 16px 32px ${themeColors.glow}`,
          transform: "translateY(-8px) scale(1.01)",
          borderColor: themeColors.border,
        },
      }}
    >
      <CardActionArea
        onClick={onClick}
        sx={{
          p: { xs: 2.5, md: 3.5 },
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <CardContent sx={{ p: 0, width: "100%", textAlign: "center" }}>
          {/* Header Badge */}
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Chip
              label={isMath ? "Mathematics Discipline" : "Science & Nature"}
              size="small"
              sx={{
                backgroundColor: themeColors.chipBg,
                color: themeColors.chipText,
                fontWeight: 700,
                fontSize: "0.75rem",
              }}
            />
            {selected && <CheckCircleIcon style={{ color: themeColors.border, fontSize: 26 }} />}
          </Box>

          {/* 3D Icon Container */}
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 84,
              height: 84,
              borderRadius: "50%",
              background: themeColors.iconBg,
              color: "#FFFFFF",
              my: 2,
              boxShadow: `0 10px 24px ${themeColors.glow}`,
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "rotate(10deg) scale(1.05)",
              },
            }}
          >
            {icon}
          </Box>

          {/* Title */}
          <Typography
            variant="h4"
            component="h2"
            align="center"
            gutterBottom
            sx={{ fontWeight: 800, color: selected ? themeColors.border : "text.primary" }}
          >
            {title}
          </Typography>

          {/* Subtitle / Topics */}
          <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 2 }}>
            {description}
          </Typography>
        </CardContent>

        {/* Card Footer Action Bar */}
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          gap={1}
          sx={{
            mt: 2,
            pt: 2,
            width: "100%",
            borderTop: "1px solid rgba(0, 0, 0, 0.06)",
            color: selected ? themeColors.border : "text.secondary",
            fontWeight: 700,
          }}
        >
          <Typography variant="subtitle2" fontWeight={700}>
            {selected ? "Subject Selected" : "Tap to Select Subject"}
          </Typography>
          <ArrowForwardIcon fontSize="small" />
        </Box>
      </CardActionArea>
    </Card>
  );
}