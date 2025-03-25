import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid2";

import AccountCard from "./AccountCard";

import { grey } from "@mui/material/colors";
import { Stack, Typography, Button } from "@mui/material";

// import { ClassroomContext } from "../ClassroomContext";
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
      sx={{
        maxWidth: "80%",
        margin: "0 auto",
      }}
    >
      <Stack direction="row" sx={{ marginLeft: "1em", padding: 1 }}>
        {header && <Typography variant="h5">My Accounts</Typography>}
        <Button variant="contained" sx={{ marginLeft: "2em" }}>
          Transfer Funds
        </Button>
      </Stack>
      <Grid
        container
        rowSpacing={3}
        columnSpacing={2}
        columns={{ xs: 4, sm: 8, md: 12 }}
        sx={{
          borderRadius: 5,
          boxShadow: 1,
          bgcolor: grey[300],
          alignItems: "flex-start",
          padding: 2,
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
