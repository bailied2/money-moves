import React, { useState, useEffect } from "react";

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

import Tooltip from "@mui/material/Tooltip";

import YearEndAccordion from "./YearEndAccordion";

import CircularProgress from "@mui/material/CircularProgress";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";

import ShapesLoader from "./ShapesLoader";

import dayjs from "dayjs";

import api from "../api";

const YearEnds = ({ classroom_id }) => {
  const [year_ends, setYearEnds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchYearEnds = async () => {
      try {
        const response = await api.get(`/year-ends/classroom/${classroom_id}`);
        console.log(response);
        setYearEnds(response.data.year_ends);
        setError(null);
      } catch (err) {
        setError("Failed to fetch year ends");
      } finally {
        setLoading(false);
      }
    };

    fetchYearEnds();
  }, [classroom_id]);

  const addYearEnd = async () => {
    try {
      const nextWeek = dayjs(
        year_ends.length > 1 ? year_ends.at(-1).end_date : Date.now()
      )
        .startOf("day")
        .add(1, "week")
        .format("YYYY-MM-DD HH:mm:ss");
      const response = await api.post('/year-ends', {
        classroom_id,
        end_date: nextWeek,
        savings_apr:
          year_ends.length > 1 ? year_ends.at(-1).savings_apr : "0.05",
        previous_investment_values: year_ends.at(-1).investment_values,
      });
      if (response.data.year_end)
        setYearEnds(year_ends.concat(response.data.year_end));
    } catch (error) {
      console.log("Error adding year end:", error);
    }
  };

  const handleUpdate = async (updated_year, index) => {
    try {
      const response = await api.put('/year-ends/', updated_year);
      setYearEnds(year_ends.toSpliced(index, 1, updated_year));
    } catch (error) {
      console.log("Error updating year end:", error);
    }
  }

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
      <Stack direction="row" sx={{ marginLeft: "1em", padding: 1 }}>
        <Typography variant="h5">Year Ends</Typography>
      </Stack>
{/* 
      <CircularProgress sx={{ margin: "auto" }} />
      <ShapesLoader sx={{ margin: "1rem auto" }} /> */}

      {loading ? (
        <>
          <CircularProgress sx={{ margin: "auto" }} />
          {/* <IconShapes style={{ width: 48, height: 48, margin: "auto" }} /> */}
        </>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        year_ends.toSpliced(0, 1).map((year, index) => (
          <YearEndAccordion 
            year={year}
            index={index}
            prev_end_date={year_ends[index].end_date}
            next_end_date={index + 2 < year_ends.length ? 
              year_ends[index + 2].end_date
              : undefined
            }
            onUpdate={handleUpdate}
          />
        ))
      )}
      <Divider sx={{ mt: 2 }}>
        <Tooltip title="Add Year End">
          <Fab onClick={addYearEnd}>
            <AddIcon />
          </Fab>
        </Tooltip>
      </Divider>
    </Stack>
  );
};

export default YearEnds;
