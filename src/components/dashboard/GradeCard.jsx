import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Box,
  Chip,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function GradeCard({
  grade,
  title,
  description,
  selected,
  onClick,
}) {
  const gradeCategory = grade <= 8 ? "Middle School" : "Secondary High School";

  return (
    <Card
      elevation={selected ? 8 : 2}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        border: selected ? "2.5px solid #1565C0" : "1.5px solid #E2E8F0",
        background: selected
          ? "linear-gradient(135deg, #F0F7FF 0%, #E3F2FD 100%)"
          : "#FFFFFF",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        borderRadius: 4,
        position: "relative",
        "&:hover": {
          boxShadow: "0 12px 28px rgba(21, 101, 192, 0.2)",
          transform: "translateY(-6px)",
          borderColor: "#1565C0",
        },
      }}
    >
      <CardActionArea
        onClick={onClick}
        sx={{
          height: "100%",
          p: 1.5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <CardContent
          sx={{
            textAlign: "center",
            width: "100%",
            p: 1.5,
          }}
        >
          {/* Metallic Avatar Grade Ring */}
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 64,
              height: 64,
              borderRadius: "50%",
              background: selected
                ? "linear-gradient(135deg, #1565C0 0%, #0D47A1 100%)"
                : "linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)",
              color: selected ? "#FFFFFF" : "#1565C0",
              fontWeight: 800,
              fontSize: "1.6rem",
              mb: 1.5,
              boxShadow: selected
                ? "0 8px 20px rgba(21, 101, 192, 0.35)"
                : "0 4px 12px rgba(0,0,0,0.06)",
              transition: "all 0.3s ease",
            }}
          >
            {grade}
          </Box>

          {/* Grade Title */}
          <Typography
            variant="h6"
            align="center"
            gutterBottom
            sx={{ fontWeight: 700, color: selected ? "#1565C0" : "text.primary" }}
          >
            {title || `Grade ${grade}`}
          </Typography>

          {/* Category Chip */}
          <Chip
            label={gradeCategory}
            size="small"
            sx={{
              fontSize: "0.7rem",
              fontWeight: 600,
              backgroundColor: selected ? "#1565C0" : "#F1F5F9",
              color: selected ? "#FFFFFF" : "text.secondary",
              mb: 1,
            }}
          />

          {description && (
            <Typography
              variant="body2"
              color="text.secondary"
              align="center"
              sx={{ fontSize: "0.8rem", mt: 0.5 }}
            >
              {description}
            </Typography>
          )}

          {selected && (
            <Box mt={1.5} display="flex" justifyContent="center" alignItems="center" gap={0.5}>
              <CheckCircleIcon color="primary" fontSize="small" />
              <Typography variant="caption" fontWeight={700} color="primary">
                Selected
              </Typography>
            </Box>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
