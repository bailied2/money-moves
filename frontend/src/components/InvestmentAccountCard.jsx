import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  // TextField,
  // InputAdornment,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import dayjs from "dayjs";

import "./styles/InvestmentAccountCard.css";

const InvestmentAccountCard = ({ title, description, yearly_values }) => {
  // Utility function for displaying current share value
  const getCurrentValue = () => {
    // If yearly_values is missing or not an array, no value can be found.
    if (!Array.isArray(yearly_values)) {
      console.log("WARNING: yearly_values prop missing or not an array");
      return null; // Return null
    }

    let current_value; // Variable to update in loop
    // Loop through each yearly value, ensuring the values are sorted by end_date:
    for (const year of yearly_values.sort((a, b) => a.end_date - b.end_date)) {
      current_value = year.value; // Update current_value

      if (new Date(year.end_date) > Date.now()) {
        // If the current year has not yet ended, we have found the current value.
        return current_value; // Return the current value,
      }
    }
  };

  return (
    <Card
      raised
      sx={{
        bgcolor:"#FA7921",
        position: "relative",
        overflow: "visible",
        minHeight: 185,
        minWidth: 360,
        // aspectRatio: "3/2",
        borderColor:"black",
        borderStyle:"solid",
        borderWidth:"2px",
        padding: 1,
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h5" gutterBottom component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Description:
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {description}
        </Typography>
        <br />
        <Typography variant="body2" color="text.secondary">
          Share Value: ${getCurrentValue()}
        </Typography>
        <Accordion square>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="caption" color="text.secondary">
              Yearly Values
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <form className="yearly_value_form">
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="caption" color="text.secondary">
                  Initial Value:
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  ${yearly_values[0].value}
                </Typography>
              </Stack>
            </form>
            {yearly_values.toSpliced(0, 1).map((year, index) => {
              return (
                <form className="yearly_value_form">
                  <Divider aria-hidden="true" sx={{ margin: 1 }} />
                  <Stack>
                    <Stack
                      direction="row"
                      sx={{ justifyContent: "space-between" }}
                    >
                      <Typography variant="caption" color="text.secondary">
                        Year {index + 1}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        ends on {dayjs(year.end_date).format("M/D/YY")}
                      </Typography>
                    </Stack>
                    <Stack
                      direction="row"
                      sx={{
                        justifyContent: "space-around",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="caption" color="text.secondary">
                        Value
                      </Typography>
                      {/* <TextField 
                        name="value"
                        value={year.value}
                        variant="filled"
                        hiddenLabel
                        size="small"
                        margin="none"
                        required
                        disabled
                        sx={{width:"50%"}}
                        slotProps={{
                          input: {
                            startAdornment:<InputAdornment position="start" sx={{"font-size":"1rem"}}>$</InputAdornment>
                          },
                          htmlInput: {
                            sx: {
                              "font-size": "1rem",
                            },
                          },
                        }}
                      /> */}
                      <Typography variant="caption" color="text.secondary">
                        ${year.value}
                      </Typography>
                    </Stack>
                  </Stack>
                </form>
              );
            })}
          </AccordionDetails>
        </Accordion>
      </CardContent>
      <CardActions>
        <Button size="small">Edit</Button>
        <Button size="small" color="error">
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default InvestmentAccountCard;
