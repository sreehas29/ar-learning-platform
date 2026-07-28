import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Box,
  Chip,
} from "@mui/material";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";

export default function GradeCard({
  grade,
  title,
  description,
  selected,
  onClick,
}) {
  return (
    <Card
      elevation={selected ? 8 : 2}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        border: selected
          ? "2px solid #1565C0"
          : "1px solid #E0E0E0",
        backgroundColor: selected ? "#F0F7FF" : "#FFFFFF",
        transition: "all 0.25s ease-in-out",
        borderRadius: 4,
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
          p: 1.5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CardContent
          sx={{
            textAlign: "center",
            width: "100%",
            p: 2,
          }}
        >
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 56,
              height: 56,
              borderRadius: "50%",
              backgroundColor: selected ? "#1565C0" : "#E3F2FD",
              color: selected ? "#FFFFFF" : "#1565C0",
              fontWeight: "bold",
              fontSize: "1.5rem",
              mb: 1.5,
              transition: "all 0.25s ease-in-out",
            }}
          >
            {grade}
          </Box>

          <Typography
            variant="h6"
            align="center"
            gutterBottom
            sx={{ fontWeight: 600 }}
          >
            {title || `Grade ${grade}`}
          </Typography>

          {description && (
            <Typography
              variant="body2"
              color="text.secondary"
              align="center"
            >
              {description}
            </Typography>
          )}

          {selected && (
            <Box mt={1.5}>
              <Chip
                label="Selected"
                color="primary"
                size="small"
                sx={{ fontWeight: 600 }}
              />
            </Box>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
