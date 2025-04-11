import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";

const AccountCard = ({
  id,
  account_type,
  balance = null,
  investment_account = null,
}) => {
  return (
    <Card
      raised
      sx={{
        position: "relative",
        overflow: "visible",
        minHeight: 185,
        maxWidth: 300,
        // aspectRatio: "3/2",
        padding: 1,
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h5" gutterBottom component="div">
          {account_type === 1 && "Checking Account"}
          {account_type === 2 && "Savings Account"}
          {account_type === 3 && investment_account.title}
        </Typography>
        <Typography noWrap variant="body2" color="text.secondary">
          Account ID: {id}
        </Typography>
        <br />
        <Typography noWrap variant="body2" color="text.secondary">
          Balance: ${balance ? balance : "0.00"}
        </Typography>
        {investment_account && (
          <>
            <Typography noWrap variant="body2" color="text.secondary">
              Shares: {investment_account.shares}
            </Typography>
            <Typography noWrap variant="body2" color="text.secondary">
              Total Value: {investment_account.value}
            </Typography>
          </>
        )}
      </CardContent>
      <CardActions>
        {investment_account && <Button size="small">Buy/Sell Shares</Button>}
        <Button size="small">View Transactions</Button>
      </CardActions>
    </Card>
  );
};

export default AccountCard;
