import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Stack,
} from "@mui/material";

const FeeBonusCard = ({ title, description, amount, icon_class, is_trustee }) => {
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
        <Stack direction="row" alignItems="center">
          {/* Display icon if provided */}
          {icon_class && (
            <i className={icon_class} style={{ marginRight: 8 }} />
          )}
          <Typography variant="h5" component="div">
            {title}
          </Typography>
        </Stack>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Amount: ${amount.toFixed(2) || "0.00"}
        </Typography>
      </CardContent>
      <CardActions sx={{ padding: 0 }}>
        <Button size="small">Edit</Button>
        {is_trustee && (
          <Button size="small" color="error">
            Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default FeeBonusCard;
