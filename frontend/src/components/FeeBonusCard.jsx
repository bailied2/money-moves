import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Stack,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";

const FeeBonusCard = ({
  title,
  description,
  fee,
  bonus,
  pay_frequency,
  pay_day,
  onEdit,
  onAssign,
  onDelete,
}) => {
  return (
    <Card
      raised
      sx={{
        bgcolor: "#FA7921",
        position: "relative",
        height: "100%",
        maxWidth: 300,
        padding: 1,
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {description || "Fee/Bonus description goes here."}
        </Typography>
        <Typography variant="body2">Fee: ${fee || "0.00"}</Typography>
        <Typography variant="body2">Bonus: ${bonus || "0.00"}</Typography>

        <FormControl fullWidth size="small" sx={{ marginTop: 1 }}>
          <InputLabel>Pay Frequency</InputLabel>
          <Select value={pay_frequency || "Monthly"} label="Pay Frequency" disabled>
            <MenuItem value="Daily">Daily</MenuItem>
            <MenuItem value="Weekly">Weekly</MenuItem>
            <MenuItem value="Monthly">Monthly</MenuItem>
          </Select>
        </FormControl>

        {pay_day && (
          <Typography variant="body2" sx={{ mt: 1 }}>
            Pay Day: {pay_day}
          </Typography>
        )}
      </CardContent>

      <CardActions sx={{ padding: 0 }}>
        <Button size="small" onClick={onEdit}>
          Edit
        </Button>
        <Button size="small" onClick={onAssign}>
          Assign
        </Button>
        <Button size="small" color="error" onClick={onDelete}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default FeeBonusCard;
