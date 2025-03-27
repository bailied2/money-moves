import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Stack,
} from "@mui/material";

const JobCard = ({ title, description, wage, pay_frequency, pay_day, icon_class, is_trustee }) => {
  return (
    <Card
      raised
      sx={{
        position: "relative",
        minHeight: 185,
        maxWidth: 300,
        aspectRatio: "3/2",
        padding: 1,
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Stack direction="row">
          <Typography variant="h5" component="div">
            {title}
          </Typography>
        </Stack>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Wage: ${wage || "0.00"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Pay Frequency: {pay_frequency}
        </Typography>
        {pay_day && (
          <Typography variant="body2" color="text.secondary">
            Pay Day: {pay_day}
          </Typography>
        )}
      </CardContent>
      <CardActions sx={{ padding: 0 }}>
        <Button size="small">Open</Button>
        <Button size="small" color="error">
          Delete
        </Button>{" "}
      </CardActions>
    </Card>
  );
};

export default JobCard;
