import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

const AssignPropertyDialog = ({ open, onClose, students, onAssignStudents }) => {
  const [selectedStudents, setSelectedStudents] = React.useState([]);

  const handleCheckboxChange = (event, studentId) => {
    setSelectedStudents((prevSelected) => {
      if (event.target.checked) {
        return [...prevSelected, studentId];
      } else {
        return prevSelected.filter((id) => id !== studentId);
      }
    });
  };

  const handleAssign = () => {
    onAssignStudents(selectedStudents); // Pass selected students to parent component
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Assign Students to Property</DialogTitle>
      <DialogContent>
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
              label={`${student.first_name} ${student.last_name}`} // Use both first_name and last_name for full name
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

export default AssignPropertyDialog;
