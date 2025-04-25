import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import api from "../api";  

const AssignJobDialog = ({ open, onClose, classroomId, jobId, onAssignStudents }) => {
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);


  console.log("Received jobId in dialog:", jobId);

  useEffect(() => {
    if (!classroomId) {
      setError("Classroom ID is required.");
      return;
    }

    const fetchStudents = async () => {
      try {
        const response = await api.get(`/students/classroom/${classroomId}`);
        if (response.data && response.data.students) {
          setStudents(response.data.students);
        } else {
          setError("No students found.");
        }
      } catch (err) {
        setError("Failed to fetch students");
      }
    };

    fetchStudents();
  }, [classroomId]);

  const handleCheckboxChange = (event, studentId) => {
    setSelectedStudents((prevSelected) => {
      if (event.target.checked) {
        return [...prevSelected, studentId];
      } else {
        return prevSelected.filter((id) => id !== studentId);
      }
    });
  };

  const handleAssign = async () => {
    console.log("Assigning students with the following data:");
    console.log("Job ID:", jobId);  
    console.log("Selected Students:", selectedStudents);  

    try {
      const response = await api.post("/jobs/assign-job", {
        job_id: jobId, 
        student_ids: selectedStudents, 
      });

      console.log("Response from backend:", response);  
      onAssignStudents(selectedStudents, jobId);
      onClose();
    } catch (err) {
      console.error("Error in assignment:", err);
      setError("Failed to assign students.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Assign Students to Job</DialogTitle>
      <DialogContent>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {students.length > 0 ? (
          students.map((student) => (
            <FormControlLabel
              key={student.id}
              control={
                <Checkbox
                  checked={selectedStudents.includes(student.id)}
                  onChange={(e) => handleCheckboxChange(e, student.id)}
                />
              }
              label={`${student.first_name} ${student.last_name}`} 
            />
          ))
        ) : (
          <p>No students available to assign.</p>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleAssign}>Assign</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AssignJobDialog;
