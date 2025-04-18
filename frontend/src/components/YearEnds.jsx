import React, { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
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

import CircularProgress from "@mui/material/CircularProgress";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import dayjs from "dayjs";

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
      component={Paper}
      sx={{
        borderRadius: 5,
        boxShadow: 1,
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
              {/* <Box>
                <Typography variant="body2" color="text.secondary">
                  End Date: {dayjs(year.end_date).format("M/D/YY")}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Savings APR: {year.savings_apr}%
                </Typography>
              </Box> */}
              <TableContainer component={Paper}>
                <Table>
                  <TableRow>
                    <TableCell>End Date</TableCell>
                    <TableCell>
                      <form>
                        
                      </form>
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
            <AccordionActions>
              <Button>
                Edit
              </Button>
            </AccordionActions>
          </Accordion>
        ))}
    </Stack>
  );
};

export default YearEnds;
