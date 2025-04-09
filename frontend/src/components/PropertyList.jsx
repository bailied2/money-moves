import "./styles/CardList.css";
import Grid from "@mui/material/Grid2";
import PropertyCard from "./PropertyCard"; 

import React, { useEffect, useState } from "react";
import { Typography, Stack, CircularProgress } from "@mui/material";
import api from "../api"; 
import { grey } from "@mui/material/colors";
// import CircularProgress from "@mui/material/CircularProgress";
// import { Stack, Typography } from "@mui/material";


const PropertiesList = ({ classroomId }) => {
  const [properties, setProperty] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await api.get(`/properties/properties/classroom/${classroomId.id}`);
        setProperty(response.data.property || []); 
        console.log(response);
        setProperty(response.data.properties);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch properties", err);
        setError("Error fetching properties.");
      } finally {
        setLoading(false);
      }
    };

    
      fetchProperties();
    
  }, [classroomId]);

  const addProperty = (property) => {
    if (property) setProperty(properties.concat(property));
  };

  const deleteProperty = async (classroom_id) => {
    try {
      const response = await api.delete(`/property/${classroom_id}`);
      console.log(response);
      setProperty(properties.filter((c) => c.id !== classroom_id));
    } catch (err) {
      alert("Error deleting property");
    }
  return (
    <Stack
      sx={{
        maxWidth: "80%",
        margin: "0 auto",
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
          borderRadius: 5,
          boxShadow: 1,
          bgcolor: grey[200],
          alignItems: "flex-start",
          padding: 2,
        }}
      >
        {loading && (
          <Grid item xs={12} display="flex" justifyContent="center">
            <CircularProgress />
          </Grid>
        )}

        {error && <Typography color="error">{error}</Typography>}

        {!loading && !error && properties.length === 0 && (
          <Typography sx={{ margin: "1em" }}>No properties found.</Typography>
        )}

        {!loading &&
          !error &&
          properties.map((property) => (
            <Grid item xs={12} sm={6} md={4} key={property.id}>
              <PropertyCard property={property} />
            </Grid>
          ))}
      </Grid>
    </Stack>
  );
};
}
export default PropertiesList;

