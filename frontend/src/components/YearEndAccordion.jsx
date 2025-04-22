import "./styles/YearEndAccordion.css";

import React, { useState } from "react";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionActions from "@mui/material/AccordionActions";
import Divider from "@mui/material/Divider";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

import CircularProgress from "@mui/material/CircularProgress";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";

import ShapesLoader from "./ShapesLoader";

import dayjs from "dayjs";

import api from "../api";

const YearEndAccordion = ({
  year,
  index,
  prev_end_date,
  next_end_date,
  onUpdate,
}) => {
  const [data, setData] = useState(year);
  const [editing, setEditing] = useState(false);
  const [endDate, setEndDate] = useState(dayjs(year.end_date));
  const [formData, setFormData] = useState({
    ...year,
    end_date: endDate.format("YYYY-MM-DD HH:mm:ss"),
  });
  const canEdit = dayjs().isBefore(endDate);
  const tomorrow = dayjs().startOf("day").add(1, "day");

  const handleEndDateChange = (value) => {
    setEndDate(dayjs(value));
    setFormData({
      ...formData,
      end_date: dayjs(value).format("YYYY-MM-DD HH:mm:ss"),
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    console.log("Update year end form submitted");
    onUpdate(formData, index);
    setData(formData);
    setEditing(false);
  };

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="body2" color="text.secondary">
          Year {index + 1}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <form id={`update_year_form_${year.id}`} onSubmit={handleUpdate}>
          <TableContainer>
            <Table>
              <TableRow>
                <TableCell>End Date</TableCell>
                <TableCell>
                  {editing ? (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        id="end_date"
                        name="end_date"
                        value={endDate}
                        required
                        disablePast
                        minDate={
                          dayjs(prev_end_date).isBefore(tomorrow)
                            ? tomorrow
                            : dayjs(prev_end_date)
                        }
                        maxDate={
                          next_end_date ? dayjs(next_end_date) : undefined
                        }
                        onChange={handleEndDateChange}
                        slotProps={{
                          textField: {
                            size: "small",
                          },
                        }}
                      />
                    </LocalizationProvider>
                  ) : (
                    dayjs(data.end_date).format("M/D/YY")
                  )}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Savings APR</TableCell>
                <TableCell>
                  {editing ? (
                    <TextField
                      id="savings_apr"
                      name="savings_apr"
                      type="number"
                      value={formData.savings_apr}
                      size="small"
                      required
                      onChange={(e) => {
                        const isValidDecimal = /^\d+(\.\d{1,2})?$/.test(
                          e.target.value
                        );
                        if (isValidDecimal)
                          setFormData({
                            ...formData,
                            savings_apr: parseFloat(e.target.value) || "",
                          });
                      }}
                      slotProps={{
                        input: {
                          step: "0.01",
                          endAdornment: (
                            <InputAdornment position="end">%</InputAdornment>
                          ),
                        },
                      }}
                    />
                  ) : (
                    data.savings_apr + "%"
                  )}
                </TableCell>
              </TableRow>
              {data.investment_values.map((account, index) => (
                <TableRow>
                  <TableCell>{account.title}</TableCell>
                  <TableCell>
                    {editing ? (
                      <TextField
                        id={`${account.title}_share_value`}
                        name={`${account.title}_share_value`}
                        type="number"
                        value={formData.investment_values[index].value}
                        size="small"
                        required
                        onChange={(e) => {
                          const isValidDecimal = /^\d+(\.\d{1,2})?$/.test(
                            e.target.value
                          );
                          if (isValidDecimal)
                            setFormData({
                              ...formData,
                              investment_values:
                                formData.investment_values.toSpliced(index, 1, {
                                  ...data.investment_values[index],
                                  value: parseFloat(e.target.value) || "",
                                }),
                            });
                        }}
                        slotProps={{
                          input: {
                            step: "0.01",
                            startAdornment: (
                              <InputAdornment position="start">
                                $
                              </InputAdornment>
                            ),
                          },
                        }}
                      />
                    ) : (
                      "$" + account.value
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </Table>
          </TableContainer>
        </form>
      </AccordionDetails>
      <AccordionActions>
        {editing ? (
          <>
            <Button color="error" onClick={() => setEditing(false)}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              form={`update_year_form_${year.id}`}
            >
              Confirm
            </Button>
          </>
        ) : (
          canEdit && (
            <Button
              variant="contained"
              color="primary"
              onClick={() => setEditing(true)}
            >
              Edit
            </Button>
          )
        )}
      </AccordionActions>
    </Accordion>
  );
};

export default YearEndAccordion;
