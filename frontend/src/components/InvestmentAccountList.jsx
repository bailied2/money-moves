import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";

import InvestmentAccountCard from "./InvestmentAccountCard";

import AddInvestmentCard from "./AddInvestmentCard";

import CircularProgress from "@mui/material/CircularProgress";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import api from "../api";

const InvestmentAccountList = ({ classroom_id, header = true }) => {
  const [investment_accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await api.get(
          `/investment-accounts/classroom/${classroom_id}`
        );
        console.log(response);
        setAccounts(response.data.investment_accounts);
        setError(null);
      } catch (err) {
        setError("Failed to fetch accounts");
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, [classroom_id]);

  const addInvestmentAccount = (investment_account) => {
    if (investment_account)
      setAccounts(investment_accounts.concat(investment_account));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <Stack
      sx={{
        margin: "0 auto",
        borderRadius: 5,
        boxShadow: 1,
        bgcolor: "#174C66",
        padding: 2,
      }}
    >
      <Stack direction="row" sx={{ marginLeft: "1em", padding: 1 }}>
        {header && <Typography variant="h5">Investment Accounts</Typography>}
      </Stack>
      <Grid
        container
        rowSpacing={3}
        columnSpacing={2}
        columns={{ xs: 4, sm: 8, md: 12 }}
        sx={{
          alignItems: "flex-start",
        }}
      >
        {loading && (
          <Grid size={12} display="flex" justifyContent="center">
            <CircularProgress sx={{ margin: "auto" }} />
          </Grid>
        )}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {!loading &&
          !error &&
          investment_accounts.map((investment_account, index) => (
            <Grid
              key={index}
              size={{ xs: 12, sm: 6, md: 6 }}
              display="flex"
              justifyContent="center"
            >
              <InvestmentAccountCard
                id={investment_account.id}
                title={investment_account.title}
                description={investment_account.description}
                yearly_values={investment_account.yearly_values}
              ></InvestmentAccountCard>
            </Grid>
          ))}
        <Grid
          size={{ xs: 12, sm: 6, md: 6 }}
          display="flex"
          justifyContent="center"
        >
          <AddInvestmentCard
            classroom_id={classroom_id}
            onSubmit={addInvestmentAccount}
          />
        </Grid>
      </Grid>
    </Stack>
  );
};
export default InvestmentAccountList;
