import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid2";

import AccountCard from "./AccountCard";

import AddInvestmentCard from "./AddInvestmentCard";

import CircularProgress from "@mui/material/CircularProgress";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { grey } from "@mui/material/colors";
import {
  Box,
  Paper,
  Stack,
  Typography,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import dayjs from "dayjs";

// import { ClassroomContext } from "../ClassroomContext";
import api from "../api";

const YearEnds = ({ classroom_id, header = true }) => {
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

  const addYearEnd = (year_end) => {
    if (year_end) setYearEnds(year_ends.concat(year_end));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <Stack
      sx={{
        borderRadius: 5,
        boxShadow: 1,
        bgcolor: "#174C66",
        margin: "0 auto",
        padding: 2,
      }}
    >
      <Stack direction="row" sx={{ marginLeft: "1em", padding: 1 }}>
        {header && <Typography variant="h5">Year Ends</Typography>}
      </Stack>
      {loading && <CircularProgress sx={{ margin: "auto" }} />}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading &&
        !error &&
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

              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Dessert (100g serving)</TableCell>
                      <TableCell align="right">Calories</TableCell>
                      <TableCell align="right">Fat&nbsp;(g)</TableCell>
                      <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                      <TableCell align="right">Protein&nbsp;(g)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {/* {rows.map((row) => (
                            <TableRow
                              key={row.name}
                              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                              <TableCell component="th" scope="row">
                                {row.name}
                              </TableCell>
                              <TableCell align="right">{row.calories}</TableCell>
                              <TableCell align="right">{row.fat}</TableCell>
                              <TableCell align="right">{row.carbs}</TableCell>
                              <TableCell align="right">{row.protein}</TableCell>
                            </TableRow>
                          ))} */}
                  </TableBody>
                </Table>
              </TableContainer>

              {/* <Stack direction="row" sx={{justifyContent: "space-around", alignItems: "center"}}>
                      <Typography variant="body2" color="text.secondary">
                        End Date:
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {dayjs(year.end_date).format("M/D/YY")}
                      </Typography>
                    </Stack>
                    <Stack direction="row" sx={{justifyContent: "space-around", alignItems: "center"}}>
                      <Typography variant="body2" color="text.secondary">
                        Savings APR:
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {year.savings_apr}%
                      </Typography>
                    </Stack>
                    {year.investment_values.map((account) => {
                      <Stack direction="row" sx={{justifyContent: "space-around", alignItems: "center"}}>
                        <Typography variant="body2" color="text.secondary">
                          Value
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          ${year.value}
                        </Typography>
                      </Stack>
                    })} */}
            </AccordionDetails>
          </Accordion>
        ))}
    </Stack>
  );
};

export default YearEnds;
