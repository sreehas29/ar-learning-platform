import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Box,
  Chip,
  Stack,
} from "@mui/material";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import BookmarkIcon from "@mui/icons-material/Bookmark";

export default function ActivityCard({
  activity,
  selected,
  onClick,
}) {
  const { title, description, duration, difficulty, topics, arType, ncertCode, subject } = activity;

  const isMath = subject === "math";
  const accentColor = isMath ? "#1565C0" : "#00897B";

  const difficultyColor = {
    Easy: "success",
    Medium: "info",
    Hard: "warning",
  }[difficulty] || "default";

  return (
    <Card
      elevation={selected ? 8 : 2}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        border: selected ? `2.5px solid ${accentColor}` : "1.5px solid #E2E8F0",
        backgroundColor: selected ? (isMath ? "#F0F7FF" : "#E0F2F1") : "#FFFFFF",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        borderRadius: 4,
        position: "relative",
        overflow: "hidden",
        "&:hover": {
          boxShadow: `0 12px 28px ${isMath ? "rgba(21, 101, 192, 0.2)" : "rgba(0, 137, 123, 0.2)"}`,
          transform: "translateY(-6px)",
          borderColor: accentColor,
        },
      }}
    >
      {/* Top Accent Strip */}
      <Box sx={{ height: 5, backgroundColor: accentColor }} />

      <CardActionArea
        onClick={onClick}
        sx={{
          height: "100%",
          p: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          justifyContent: "space-between",
        }}
      >
        <CardContent sx={{ p: 2.5 }}>
          {/* Top Bar: Icon + NCERT Code + Difficulty + Selected Check */}
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                p: 1,
                borderRadius: 3,
                backgroundColor: selected ? accentColor : (isMath ? "#E3F2FD" : "#E0F2F1"),
                color: selected ? "#FFFFFF" : accentColor,
              }}
            >
              <ViewInArIcon fontSize="medium" />
            </Box>

            <Stack direction="row" spacing={1} alignItems="center">
              {ncertCode && (
                <Chip
                  icon={<BookmarkIcon fontSize="small" style={{ color: accentColor }} />}
                  label={ncertCode}
                  size="small"
                  variant="outlined"
                  sx={{ fontWeight: 700, borderColor: accentColor, color: accentColor, fontSize: "0.725rem" }}
                />
              )}
              <Chip
                label={difficulty}
                color={difficultyColor}
                size="small"
                variant={selected ? "filled" : "outlined"}
                sx={{ fontWeight: 600 }}
              />
              {selected && <CheckCircleIcon style={{ color: accentColor }} fontSize="medium" />}
            </Stack>
          </Box>

          {/* Activity Title */}
          <Typography variant="h6" component="h2" gutterBottom sx={{ fontWeight: 700, color: selected ? accentColor : "text.primary" }}>
            {title}
          </Typography>

          {/* Description */}
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2, fontSize: "0.85rem", lineHeight: 1.5 }}>
            {description}
          </Typography>

          {/* Topics Badges */}
          <Stack direction="row" spacing={0.8} flexWrap="wrap" useFlexGap sx={{ mb: 2 }}>
            {topics?.map((topic) => (
              <Chip
                key={topic}
                label={topic}
                size="small"
                sx={{ fontSize: "0.725rem", backgroundColor: "#F1F5F9", fontWeight: 500 }}
              />
            ))}
          </Stack>
        </CardContent>

        {/* Card Footer */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          px={2.5}
          pb={2}
          pt={0}
        >
          <Box display="flex" alignItems="center" gap={0.5} color="text.secondary">
            <AccessTimeIcon fontSize="small" />
            <Typography variant="caption" fontWeight={600}>
              {duration}
            </Typography>
          </Box>

          <Chip
            label={arType}
            size="small"
            variant="outlined"
            sx={{ fontSize: "0.7rem", fontWeight: 700, borderColor: accentColor, color: accentColor }}
          />
        </Box>
      </CardActionArea>
    </Card>
  );
}
