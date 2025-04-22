import "./styles/CardList.css";
import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import AddFeeBonusCard from "./AddFeeBonusCard";
import FeeBonusCard from "./FeeBonusCard";
import UpdateFeeBonusDialog from "./UpdateFeeBonusDialog";
import api from "../api";
import CreateFeeBonusDialog from "./CreateFeeBonusDialogue";
import dayjs from "dayjs";

const FeeBonusList = ({ classroomId }) => {
  const [feeBonuses, setFeeBonuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingFeeBonus, setEditingFeeBonus] = useState(null); // For edit dialog

  useEffect(() => {
    const fetchFeeBonuses = async () => {
      try {
        const response = await api.get(`/feeBonuses/classroom/${classroomId}`);
        setFeeBonuses(response.data.feeBonuses || []);
        setError(null);
      } catch (err) {
        console.error("Error fetching fee bonuses:", err);
        setError("Failed to fetch fee bonuses");
      } finally {
        setLoading(false);
      }
    };

    fetchFeeBonuses();
  }, [classroomId]);

  const addFeeBonus = (feeBonus) => {
    if (feeBonus) setFeeBonuses((prev) => [...prev, feeBonus]);
  };

  const deleteFeeBonus = async (feeBonusId) => {
    try {
      await api.delete(`/feeBonuses/${feeBonusId}`);
      setFeeBonuses((prev) => prev.filter((fb) => fb.id !== feeBonusId));
    } catch (err) {
      alert("Error deleting fee bonus");
    }
  };

  const handleUpdate = (updatedFeeBonus) => {
    setFeeBonuses((prev) =>
      prev.map((fb) => (fb.id === updatedFeeBonus.id ? updatedFeeBonus : fb))
    );
    setEditingFeeBonus(null);
  };

  const assignFeeBonus = (feeBonusId) => {
    console.log("Assign clicked for fee bonus:", feeBonusId);
  };

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
      <Typography variant="h5" sx={{ marginLeft: "1em", padding: 1 }}>
        Classroom Fee Bonuses
      </Typography>
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
          <Grid item xs={12} display="flex" justifyContent="center">
            <CircularProgress sx={{ margin: "auto" }} />
          </Grid>
        )}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {!loading &&
          !error &&
          feeBonuses.map((feeBonus) => (
            <Grid
              key={feeBonus.id}
              item xs={2} sm={3} md={3}
              display="flex"
              justifyContent="center"
            >
              <FeeBonusCard
                title={feeBonus.title}
                description={feeBonus.description}
                fee={feeBonus.fee}
                bonus={feeBonus.bonus}
                pay_frequency={feeBonus.pay_frequency}
                pay_day={feeBonus.pay_day}
                onEdit={() => setEditingFeeBonus(feeBonus)}
                onAssign={() => assignFeeBonus(feeBonus.id)}
                onDelete={() => deleteFeeBonus(feeBonus.id)}
              />
            </Grid>
          ))}
        <Grid
          item xs={2} sm={3} md={3}
          display="flex"
          justifyContent="center"
        >
          <AddFeeBonusCard classroom={classroomId} onSubmit={addFeeBonus} />
        </Grid>
      </Grid>

      {/* Edit dialog */}
      {editingFeeBonus && (
        <UpdateFeeBonusDialog
          open={Boolean(editingFeeBonus)}
          onClose={() => setEditingFeeBonus(null)}
          feeBonusData={editingFeeBonus}
          onUpdate={handleUpdate}
        />
      )}
    </Stack>
  );
};

export default FeeBonusList;
