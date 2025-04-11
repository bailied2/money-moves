import "./styles/CardList.css";

import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid2";
import CircularProgress from "@mui/material/CircularProgress";
import { grey } from "@mui/material/colors";
import { Stack, Typography } from "@mui/material";

import AddNewCard from "./AddNewCard";
import CreateFeesBonusesDialog from "./CreateFeesBonusesDialog"; // You’ll need to create this modal/dialog
import FeeBonusCard from "./FeeBonusCard"; 

import api from "../api";

const FeeBonusList = ({ classroomId }) => {
  const [feesBonuses, setFeesBonuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeesBonuses = async () => {
      try {
        const response = await api.get(`/fees-bonuses/:id/fees-bonuses`);
        setFeesBonuses(response.data.fees_bonuses);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch fees/bonuses");
      } finally {
        setLoading(false);
      }
    };

    fetchFeesBonuses();
  }, [classroomId]);

  const addFeeBonus = (feeBonus) => {
    if (feeBonus) setFeesBonuses(feesBonuses.concat(feeBonus));
  };

  const deleteFeeBonus = async (id) => {
    try {
      await api.delete(`/fees-bonuses/${id}`);
      setFeesBonuses(feesBonuses.filter((fb) => fb.id !== id));
    } catch (err) {
      alert("Error deleting fee/bonus");
    }
  };

  return (
    <Stack
      sx={{
        maxWidth: "80%",
        margin: "0 auto",
      }}
    >
      <Typography variant="h5" sx={{ marginLeft: "1em", padding: 1 }}>
        Fees & Bonuses
      </Typography>
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
        {loading && (
          <Grid size={12} display="flex" justifyContent="center">
            <CircularProgress sx={{ margin: "auto" }} />
          </Grid>
        )}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {!loading &&
          !error &&
          feesBonuses.map((fb, index) => (
            <Grid
              key={index}
              size={{ xs: 2, sm: 3, md: 3 }}
              display="flex"
              justifyContent="center"
            >
              <FeeBonusCard
                id={fb.id}
                title={fb.title}
                description={fb.description}
                amount={fb.amount}
                iconClass={fb.icon_class}
                onDelete={() => deleteFeeBonus(fb.id)}
              />
            </Grid>
          ))}
        <Grid
          size={{ xs: 2, sm: 3, md: 3 }}
          display="flex"
          justifyContent="center"
        >
          <AddNewCard label="Create New Fee/Bonus" />
          <CreateFeesBonusesDialog
            fk_classroom_id={classroomId}
            onSubmit={addFeeBonus}
          />
        </Grid>
      </Grid>
    </Stack>
  );
};

export default FeeBonusList;
