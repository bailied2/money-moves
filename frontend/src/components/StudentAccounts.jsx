import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";

import AccountCard from "./AccountCard";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";

import api from "../api";

const AccountList = ({ classroom_id, header = true }) => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await api.get(`/accounts/student/${classroom_id}`);
        console.log(response);
        setAccounts(response.data.accounts);
        setError(null);
      } catch (err) {
        setError("Failed to fetch accounts");
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, [classroom_id]);

  const addAccount = (account) => {
    if (account) setAccounts(accounts.concat(account));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <Stack
      component={Paper}
      sx={{
        borderRadius: 5,
        boxShadow: 1,
        maxWidth: "80%",
        margin: "0 auto",
        padding: 2,
      }}
    >
      <Stack
        direction="row"
        sx={{ marginLeft: "1em", padding: 1, justifyContent: "space-between" }}
      >
        {header && <Typography variant="h5">My Accounts</Typography>}
        <Button variant="contained" color="primary" sx={{ marginRight: "1em" }}>
          Transfer Funds
        </Button>
      </Stack>
      <Divider></Divider>
      <Grid
        container
        rowSpacing={3}
        columnSpacing={2}
        columns={{ xs: 4, sm: 8, md: 12 }}
        sx={{
          borderRadius: 5,
          boxShadow: 1,
           bgcolor: "#174C66",
          alignItems: "flex-start",
        }}
      >
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {!loading &&
          !error &&
          accounts.map((account, index) => (
            <Grid
              key={index}
              size={{ xs: 2, sm: 4, md: 4 }}
              display="flex"
              justifyContent="center"
            >
              <AccountCard
                id={account.id}
                account_type={account.account_type}
                balance={account.balance}
                investment_account={account.investment_account}
              ></AccountCard>
            </Grid>
          ))}
        <Grid
          size={{ xs: 2, sm: 4, md: 4 }}
          display="flex"
          justifyContent="center"
        ></Grid>
      </Grid>
    </Stack>
  );
};

export default AccountList;
