import { Grid } from "@mui/material";
import GradeCard from "./GradeCard";

export default function GradeGrid({
  selectedGrade,
  onSelectGrade,
}) {
  const grades = [
    {
      grade: 6,
      title: "Grade 6",
      description: "Introductory Concepts",
    },
    {
      grade: 7,
      title: "Grade 7",
      description: "Intermediate Explorations",
    },
    {
      grade: 8,
      title: "Grade 8",
      description: "Advanced Fundamentals",
    },
    {
      grade: 9,
      title: "Grade 9",
      description: "High School Prep",
    },
    {
      grade: 10,
      title: "Grade 10",
      description: "Advanced Curriculum",
    },
  ];

  return (
    <Grid container spacing={2.5} justifyContent="center">
      {grades.map((item) => (
        <Grid item xs={12} sm={6} md={2.4} key={item.grade}>
          <GradeCard
            grade={item.grade}
            title={item.title}
            description={item.description}
            selected={selectedGrade === item.grade}
            onClick={() => onSelectGrade(item.grade)}
          />
        </Grid>
      ))}
    </Grid>
  );
}
