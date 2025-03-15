import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid2";

import AccountCard from "./AccountCard";
import AddNewCard from "./AddNewCard";

import { grey } from "@mui/material/colors";
import { Stack, Typography } from "@mui/material";

import api from "../api";

const AccountList = ({ header = true }) => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await api.get(
          `/accounts/student/${/** INSERT ACCOUNT SOMETHING HERE*/ null}`
        );
        console.log(response);
        setAccounts(response.data.accounts);
      } catch (err) {
        setError("Failed to fetch accounts");
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  });

  const addAccount = (account) => {
    if (account) setAccounts(accounts.concat(account));
  };

  const deleteAccount = async (account_id) => {
    try {
      const response = await api.delete(`/accounts/${account_id}`);
      console.log(response);
      setAccounts(accounts.filter((a) => a.id !== account_id));
    } catch (err) {
      alert("Error deleting account");
    }
  };

  return (
    <Stack
      sx={{
        maxWidth: "80%",
        margin: "0 auto",
      }}
    >
      {header && (
        <Typography variant="h5" sx={{ marginLeft: "1em", padding: 1 }}>
          My Accounts
        </Typography>
      )}
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
              size={{ xs: 2, sm: 3, md: 3 }}
              display="flex"
              justifyContent="center"
            >
              <AccountCard
                title={account.class_name}
                id={account.id}
              ></AccountCard>
            </Grid>
          ))}
        <Grid
          size={{ xs: 2, sm: 3, md: 3 }}
          display="flex"
          justifyContent="center"
        >
          <AddNewCard label="Create New Account" onAccountAdded={addAccount} />
        </Grid>
      </Grid>
    </Stack>
  );
};

export default AccountList;
