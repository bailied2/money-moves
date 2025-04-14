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
import Divider from "@mui/material/Divider";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import CircularProgress from "@mui/material/CircularProgress";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";

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
      const response = await api.post(`/year-ends`, {
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
      {loading ? (
        <CircularProgress sx={{ margin: "auto" }} />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        year_ends.toSpliced(0, 1).map((year, index) => (
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="body2" color="text.secondary">
                Year {index + 1}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  End Date: {dayjs(year.end_date).format("M/D/YY")}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Savings APR: {year.savings_apr}%
                </Typography>
              </Box>
              <TableContainer component={Paper} sx={{ bgcolor: "grey" }}>
                <Table>
                  <TableRow>
                    <TableCell>End Date</TableCell>
                    <TableCell>
                      {dayjs(year.end_date).format("M/D/YY")}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Savings APR</TableCell>
                    <TableCell>{year.savings_apr}%</TableCell>
                  </TableRow>
                  {year.investment_values.map((account) => (
                    <TableRow>
                      <TableCell>{account.title}</TableCell>
                      <TableCell>${account.value}</TableCell>
                    </TableRow>
                  ))}
                </Table>
              </TableContainer>
            </AccordionDetails>
          </Accordion>
        ))
      )}
      <Divider>
        <Fab onClick={addYearEnd}>
          <AddIcon />
        </Fab>
      </Divider>
    </Stack>
  );
};

export default YearEnds;
