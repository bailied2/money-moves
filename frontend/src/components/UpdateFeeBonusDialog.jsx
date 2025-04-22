import React, { useState, useEffect } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const UpdateFeeBonusDialog = ({ open, onClose, feeBonusData, onUpdate }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [fee, setFee] = useState("");
  const [bonus, setBonus] = useState("");
  const [payFrequency, setPayFrequency] = useState("Monthly");
  const [payDay, setPayDay] = useState("");

  useEffect(() => {
    if (feeBonusData) {
      setTitle(feeBonusData.title);
      setDescription(feeBonusData.description);
      setFee(feeBonusData.fee);
      setBonus(feeBonusData.bonus);
      setPayFrequency(feeBonusData.pay_frequency);
      setPayDay(feeBonusData.pay_day);
    }
  }, [feeBonusData]);

  const handleSubmit = () => {
    const updatedFeeBonus = {
      ...feeBonusData,
      title,
      description,
      fee,
      bonus,
      pay_frequency: payFrequency,
      pay_day: payDay,
    };
    onUpdate(updatedFeeBonus);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Update Fee Bonus</DialogTitle>
      <DialogContent>
        <TextField
          label="Title"
          fullWidth
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="Description"
          fullWidth
          margin="normal"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          label="Fee"
          fullWidth
          margin="normal"
          type="number"
          value={fee}
          onChange={(e) => setFee(e.target.value)}
        />
        <TextField
          label="Bonus"
          fullWidth
          margin="normal"
          type="number"
          value={bonus}
          onChange={(e) => setBonus(e.target.value)}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Pay Frequency</InputLabel>
          <Select
            value={payFrequency}
            onChange={(e) => setPayFrequency(e.target.value)}
            label="Pay Frequency"
          >
            <MenuItem value="Daily">Daily</MenuItem>
            <MenuItem value="Weekly">Weekly</MenuItem>
            <MenuItem value="Monthly">Monthly</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Pay Day"
          fullWidth
          margin="normal"
          value={payDay}
          onChange={(e) => setPayDay(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateFeeBonusDialog;
