import Grid from "@mui/material/Grid";

import CalculateIcon from "@mui/icons-material/Calculate";
import ScienceIcon from "@mui/icons-material/Science";

import SubjectCard from "./SubjectCard";

export default function SubjectGrid({
  selected,
  setSelected,
}) {
  const subjects = [
    {
      id: "math",
      title: "Mathematics",
      description: "Geometry • Shapes • Measurement",
      icon: <CalculateIcon sx={{ fontSize: 60 }} />,
    },

    {
      id: "science",
      title: "Science",
      description: "Physics • Chemistry • Biology",
      icon: <ScienceIcon sx={{ fontSize: 60 }} />,
    },
  ];

  return (
    <Grid container spacing={3}>
      {subjects.map((subject) => (
        <Grid item xs={12} md={6} key={subject.id}>
          <SubjectCard
            {...subject}
            selected={selected === subject.id}
            onClick={() => setSelected(subject.id)}
          />
        </Grid>
      ))}
    </Grid>
  );
}