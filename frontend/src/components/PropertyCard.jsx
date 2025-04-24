import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, CardActions, Button } from "@mui/material";
import AssignPropertyDialog from "./AssignPropertyDialog";
import api from "../api"; // axios instance

const PropertyCard = ({
  id,
  title,
  description,
  value,
  rent,
  maintenance,
  pay_frequency,
  pay_day,
  onEdit,
  onDelete,
  classroomId, 
}) => {
  const [students, setStudents] = useState([]);
  const [openAssignDialog, setOpenAssignDialog] = useState(false);
  const [assignedStudents, setAssignedStudents] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await api.get(`/students/classroom/${classroomId}`);
        console.log("Response data:", response.data);
        setStudents(response.data.students);
        setError(null);
      } catch (err) {
        setError("Failed to fetch students");
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [classroomId]);

  const handleAssign = () => {
    setOpenAssignDialog(true);
  };

  const handleCloseAssignDialog = () => {
    setOpenAssignDialog(false);
  };

  const handleAssignStudents = (studentIds) => {
    setAssignedStudents(studentIds);
    console.log(`Assigned students to property ${title}:`, studentIds);
  };

  return (
    <Card
      raised
      sx={{
        bgcolor: "#FA7921",
        position: "relative",
        height: "100%",
        maxWidth: 300,
        padding: 3,
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        height:"auto",
       
        borderColor:"black",
        borderStyle:"solid",
        borderWidth:"2px",
      }}
    >
<CardContent sx={{ flexGrow: 1 }}>
  <Typography variant="body1" color="text.primary" gutterBottom>
    {description || "Property description goes here."}
  </Typography>
  <Typography variant="body2">Value: ${value || "0.00"}</Typography>
  <Typography variant="body2">Rent: ${rent || "0.00"}</Typography>
  <Typography variant="body2">Maintenance: ${maintenance || "0.00"}</Typography>
</CardContent>

<CardActions
  sx={{
    display: "flex",
    flexDirection: "column", // stack vertically
    alignItems: "stretch",   // make buttons full width
    gap: 1,                  // spacing between buttons
    
    mt: 2,                   // spacing above the buttons
  }}
>
  <Button
    size="small"
    onClick={onEdit}
    variant="outlined"
  >
    Edit
  </Button>
  <Button
    size="small"
    onClick={handleAssign}
    variant="outlined"
  >
    Assign
  </Button>
  <Button
    size="small"
    color="error"
    onClick={onDelete}
    variant="outlined"
    fullWidth
  >
    Delete
  </Button>
</CardActions>

<AssignPropertyDialog
  open={openAssignDialog}
  onClose={handleCloseAssignDialog}
  students={students}
  onAssignStudents={handleAssignStudents}
/>
    </Card>
  );
};

export default PropertyCard;
