import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import Icon from "@mui/material/Icon";

const FeeBonusCard = ({
  id,
  title,
  description,
  amount,
  iconClass = "fas fa-money-bill-wave",
  onDelete = null,
}) => {
  const isBonus = amount >= 0;

  return (
    <Card
      raised
      sx={{
        position: "relative",
        overflow: "visible",
        minHeight: 185,
        maxWidth: 300,
        aspectRatio: "3/2",
        padding: 1,
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        backgroundColor: isBonus ? grey[100] : grey[200],
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h5" component="div" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {description || "No description provided."}
        </Typography>
        <Typography
          variant="body1"
          color={isBonus ? "green" : "error"}
          fontWeight="bold"
        >
          {isBonus ? "+" : "-"}${Math.abs(amount).toFixed(2)}
        </Typography>
        <Icon
          baseClassName="fas"
          className={iconClass}
          sx={{ fontSize: 30, marginTop: 1 }}
        />
      </CardContent>
      <CardActions sx={{ padding: 0 }}>
        {typeof onDelete === "function" && (
          <Button size="small" color="error" onClick={onDelete}>
            Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default FeeBonusCard;
