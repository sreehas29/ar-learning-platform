import Grid from "@mui/material/Grid";
import ActivityCard from "./ActivityCard";

export default function ActivityGrid({
  activities,
  selectedActivity,
  onSelectActivity,
}) {
  return (
    <Grid container spacing={3}>
      {activities.map((item) => (
        <Grid item xs={12} sm={6} md={6} key={item.id}>
          <ActivityCard
            activity={item}
            selected={selectedActivity?.id === item.id}
            onClick={() => onSelectActivity(item)}
          />
        </Grid>
      ))}
    </Grid>
  );
}
