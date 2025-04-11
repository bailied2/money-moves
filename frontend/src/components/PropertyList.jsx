import "./styles/CardList.css";

import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid2";
import CircularProgress from "@mui/material/CircularProgress";
import { Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import AddNewCard from "./AddNewCard";

import PropertyCard from "./PropertyCard";
import CreatePropertyDialog from "./CreatePropertyDialogue"; // Optional dialog for creating new properties
import dayjs from "dayjs";
import api from "../api";

const PropertyList = ({ classroomId, showHeader = true }) => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return (
    <Stack
      sx={{
        maxWidth: "80%",
        margin: "0 auto",
      }}
    >
      {showHeader && (
        <Typography variant="h5" sx={{ marginLeft: "1em", padding: 1 }}>
          Classroom Properties
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
        {loading && (
          <Grid size={12} display="flex" justifyContent="center">
            <CircularProgress sx={{ margin: "auto" }} />
          </Grid>
        )}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {!loading &&
          !error &&
          properties.map((property) => (
            <Grid
              key={property.id}
              size={{ xs: 2, sm: 3, md: 3 }}
              display="flex"
              justifyContent="center"
            >
              <PropertyCard
                title={property.name}
                description={property.description}
                start_date={dayjs(property.start_date).format("M/D/YYYY")}
                end_date={dayjs(property.end_date).format("M/D/YYYY")}
                id={property.id}
                onDelete={() => deleteProperty(property.id)}
              />
            </Grid>
          ))}
        <Grid
          size={{ xs: 2, sm: 3, md: 3 }}
          display="flex"
          justifyContent="center"
        >

          {<AddNewCard
            label="Create New Property"
            onClassroomAdded={addProperty}
          />}
          {!loading && <CreatePropertyDialog classroomId={classroomId} onSubmit={addProperty} />}
        </Grid>
      </Grid>
    </Stack>
  );
};

export default PropertyList;
