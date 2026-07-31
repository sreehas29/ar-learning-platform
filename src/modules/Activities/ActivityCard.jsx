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
  const { title, description, duration, difficulty, topics, arType, ncertCode } = activity;

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
        border: selected ? "2px solid #1565C0" : "1px solid #E0E0E0",
        backgroundColor: selected ? "#F0F7FF" : "#FFFFFF",
        transition: "all 0.25s ease-in-out",
        borderRadius: 4,
        position: "relative",
        "&:hover": {
          boxShadow: 8,
          transform: "translateY(-4px)",
          borderColor: "#1565C0",
        },
      }}
    >
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
                backgroundColor: selected ? "#1565C0" : "#E3F2FD",
                color: selected ? "#FFFFFF" : "#1565C0",
              }}
            >
              <ViewInArIcon fontSize="medium" />
            </Box>

            <Stack direction="row" spacing={1} alignItems="center">
              {ncertCode && (
                <Chip
                  icon={<BookmarkIcon fontSize="small" style={{ color: "#1565C0" }} />}
                  label={ncertCode}
                  size="small"
                  variant="outlined"
                  sx={{ fontWeight: 700, borderColor: "#1565C0", color: "#1565C0", fontSize: "0.725rem" }}
                />
              )}
              <Chip
                label={difficulty}
                color={difficultyColor}
                size="small"
                variant={selected ? "filled" : "outlined"}
                sx={{ fontWeight: 600 }}
              />
              {selected && <CheckCircleIcon color="primary" fontSize="medium" />}
            </Stack>
          </Box>

          {/* Activity Title */}
          <Typography variant="h6" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
            {title}
          </Typography>

          {/* Description */}
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {description}
          </Typography>

          {/* Topics Badges */}
          <Stack direction="row" spacing={0.8} flexWrap="wrap" useFlexGap sx={{ mb: 2 }}>
            {topics?.map((topic) => (
              <Chip
                key={topic}
                label={topic}
                size="small"
                sx={{ fontSize: "0.75rem", backgroundColor: "#F5F5F5" }}
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
            <Typography variant="caption" fontWeight={500}>
              {duration}
            </Typography>
          </Box>

          <Chip
            label={arType}
            size="small"
            color="primary"
            variant="outlined"
            sx={{ fontSize: "0.7rem", fontWeight: 600 }}
          />
        </Box>
      </CardActionArea>
    </Card>
  );
}
