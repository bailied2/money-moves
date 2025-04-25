import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";

const PropertyCard = ({
  id,
  title,
  description,
  value,
  rent,
  maintenance,
  pay_frequency,
  pay_day,
  icon_class,
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
        height: "250px",
        maxWidth: 300,
        padding: 1,
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <CardContent sx={{ flexGrow: 1, overflow: "auto", maxHeight: "180px" }}>
        <Typography variant="h6" color="text.primary" gutterBottom>
          {title}
        </Typography>

        <Typography variant="body2" color="text.secondary" gutterBottom>
          {description || "Property description goes here."}
        </Typography>
        <Typography variant="body2">Value: ${value || "0.00"}</Typography>
        <Typography variant="body2">Rent: ${rent || "0.00"}</Typography>
        <Typography variant="body2">Maintenance: ${maintenance || "0.00"}</Typography>

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
        <Button size="small" onClick={onEdit} sx={{ marginRight: 1 }}>
          Edit
        </Button>

        <Button size="small" onClick={() => onAssign(id)} sx={{ marginRight: 1 }}>
          Assign
        </Button>

        <Button size="small" color="error" onClick={onDelete}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default PropertyCard;
