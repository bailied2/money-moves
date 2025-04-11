import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid2";

import AccountCard from "./AccountCard";

import AddInvestmentCard from "./AddInvestmentCard";

import CircularProgress from "@mui/material/CircularProgress";

import { grey } from "@mui/material/colors";
import { Stack, Typography, Button, Paper } from "@mui/material";

// import { ClassroomContext } from "../ClassroomContext";
import api from "../api";

const YearEnds = ({ classroom_id, header = true }) => {
  const [yearEnds, setYearEnds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchYearEnds = async () => {
      try {
        const response = await api.get(`/iyear-ends/classroom/${classroom_id}`);
        console.log(response);
        setYearEnds(response.data.year_ends);
        setError(null);
      } catch (err) {
        setError("Failed to fetch accounts");
      } finally {
        setLoading(false);
      }
    };

    fetchYearEnds();
  }, [classroom_id]);

  const addYearEnd = (yearEnd) => {
    if (yearEnd) setYearEnds(yearEnds.concat(yearEnd));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <Stack
      sx={{
        margin: "0 auto",
      }}
    >
      <Stack direction="row" sx={{ marginLeft: "1em", padding: 1 }}>
        {header && <Typography variant="h5">Investment Accounts</Typography>}
      </Stack>
      <Paper
        sx={{
          borderRadius: 5,
          boxShadow: 1,
          bgcolor: grey[300],
          alignItems: "flex-start",
          padding: 2,
        }}
      >
        {loading && (
          <Grid size={12} display="flex" justifyContent="center">
            <CircularProgress sx={{ margin: "auto" }} />
          </Grid>
        )}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </Paper>
    </Stack>
  );
};
export default YearEnds;
