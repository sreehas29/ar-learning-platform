import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Box,
} from "@mui/material";

export default function SubjectCard({
  icon,
  title,
  description,
  selected,
  onClick,
}) {
  return (
    <Card
      sx={{
        border: selected
          ? "2px solid #1565C0"
          : "1px solid #ddd",

        transition: "0.25s",

        boxShadow: selected ? 8 : 2,

        "&:hover": {
          boxShadow: 8,
          transform: "translateY(-4px)",
        },
      }}
    >
      <CardActionArea onClick={onClick}>
        <CardContent>

          <Box
            sx={{
              fontSize: 60,
              textAlign: "center",
              mb: 2,
            }}
          >
            {icon}
          </Box>

          <Typography
            variant="h5"
            align="center"
            gutterBottom
          >
            {title}
          </Typography>

          <Typography
            color="text.secondary"
            align="center"
          >
            {description}
          </Typography>

        </CardContent>
      </CardActionArea>
    </Card>
  );
}