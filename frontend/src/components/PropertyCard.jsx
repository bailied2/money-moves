import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Stack,
  // TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";

const PropertyCard = ({
  title,
  description,
  value,
  rent,
  maintenance,
  pay_frequency,
  pay_day,
  icon_class,
  onCreate,
  onDelete,
}) => {
  return (
    <Card
      raised
      sx={{
        position: "relative",
        minHeight: 250,
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
            {title || "Property Title"}
          </Typography>
        </Stack>
        <Typography variant="body2" color="text.secondary">
          {description || "Property description goes here."}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Value: ${value || "0.00"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Rent: ${rent || "0.00"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Maintenance: ${maintenance || "0.00"}
        </Typography>

        <FormControl fullWidth sx={{ marginTop: 1 }}>
          <InputLabel>Pay Frequency</InputLabel>
          <Select
            value={pay_frequency || "Monthly"}
            label="Pay Frequency"
            disabled
          >
            <MenuItem value="Daily">Daily</MenuItem>
            <MenuItem value="Weekly">Weekly</MenuItem>
            <MenuItem value="Monthly">Monthly</MenuItem>
          </Select>
        </FormControl>

        {pay_day && (
          <Typography variant="body2" color="text.secondary">
            Pay Day: {pay_day}
          </Typography>
        )}
      </CardContent>
      <CardActions sx={{ padding: 0 }}>
        <Button
          size="small"
          onClick={onCreate}
          variant="contained"
          color="primary"
        >
          Create Property
        </Button>
        <Button size="small" onClick={onDelete} color="error">
          Delete Property
        </Button>
      </CardActions>
    </Card>
  );
};

export default PropertyCard;
