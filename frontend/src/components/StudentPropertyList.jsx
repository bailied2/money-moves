import "./styles/CardList.css";

import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import AddPropertyCard from "./AddPropertyCard";
import StudentPropertycard from "./StudentPropertyCard";
import UpdatePropertyDialog from "./UpdatePropertyDialog";
import api from "../api";

const StudentPropertyList = ({ classroomId }) => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingProperty, setEditingProperty] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await api.get(`/properties/classroom/${classroomId}`);
        setProperties(response.data.properties || []);
        setError(null);
      } catch (err) {
        console.error("Error fetching properties:", err);
        setError("Failed to fetch properties");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [classroomId]);

  const addProperty = (property) => {
    if (property) setProperties((prev) => [...prev, property]);
  };

  const deleteProperty = async (propertyId) => {
    try {
      await api.delete(`/properties/${propertyId}`);
      setProperties((prev) => prev.filter((p) => p.id !== propertyId));
    } catch (err) {
      alert("Error deleting property");
    }
  };

  const handleUpdate = (updatedProperty) => {
    setProperties((prev) =>
      prev.map((p) => (p.id === updatedProperty.id ? updatedProperty : p))
    );
    setEditingProperty(null);
  };

  return (
    <Stack
      component={Paper}
      sx={{
        borderRadius: 5,
        boxShadow: 1,
        margin: "0 auto",
        padding: 2,
      }}
    >
      <Typography variant="h5" sx={{ marginLeft: "1em", padding: 1 }}>
        Classroom Properties
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
          properties.map((property) => (
            <Grid
              key={property.id}
              item
              xs={2}
              sm={3}
              md={3}
              display="flex"
              justifyContent="center"
            >
              <StudentPropertycard
                id={property.id}
                title={property.title}
                description={property.description}
                value={property.value}
                rent={property.rent}
                maintenance={property.maintenance}
                pay_frequency={property.pay_frequency}
                pay_day={property.pay_day}
                icon_class={property.icon_class}
              />
            </Grid>
          ))}
        <Grid
          item
          xs={2}
          sm={3}
          md={3}
          display="flex"
          justifyContent="center"
        >
          <AddPropertyCard classroom_id={classroomId} onSubmit={addProperty} />
        </Grid>
      </Grid>

      {editingProperty && (
        <UpdatePropertyDialog
          open={Boolean(editingProperty)}
          onClose={() => setEditingProperty(null)}
          propertyData={editingProperty}
          onUpdate={handleUpdate}
        />
      )}
    </Stack>
  );
};

export default StudentPropertyList;
