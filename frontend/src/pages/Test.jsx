import React, { useState, useEffect, useCallback, useContext } from "react";

import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

import CustomToolbar from "../components/CustomGridToolbar";

import { DataGrid, useGridApiRef, Toolbar } from "@mui/x-data-grid";

import DeleteIcon from "@mui/icons-material/Delete";

import { AuthContext } from "../AuthContext";

import api from "../api";

const ClassControlsGrid = ({ title, fetchFunc, columns, rows, apiRef }) => {
  return (
    <Box sx={{ width: "80%", margin: "auto", boxShadow: 3 }}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <DataGrid
        columns={columns}
        rows={rows}
        apiRef={apiRef}
        checkboxSelection
        disableColumnSelector
        disableMultipleRowSelection
        disableRowSelectionOnClick
        slotProps={{
          toolbar: {},
        }}
      />
    </Box>
  );
};

const Test = () => {
  const { user, setUser } = useContext(AuthContext);

  const userApiRef = useGridApiRef();

  const [showButtons, setShowButtons] = useState(false);

  const [users, setUsers] = useState([]);
  const [classrooms, setClassrooms] = useState([]);
  const [students, setStudents] = useState([]);
  const [fees_bonuses, setFeesBonuses] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [properties, setProperties] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [year_ends, setYearEnds] = useState([]);
  const [investment_accounts, setInvestmentAccounts] = useState([]);

  const [selectedClassroom, selectClassroom] = useState(null);
  const [selectedStudents, selectStudents] = useState([]);
  const [selectedFeesBonuses, selectFeesBonuses] = useState([]);
  const [selectedJobs, selectJobs] = useState([]);
  const [selectedProperties, selectProperties] = useState([]);
  const [selectedAccounts, selectAccounts] = useState([]);
  const [selectedYearEnds, selectYearEnds] = useState([]);
  const [selectedInvestmentAccounts, selectInvestmentAccounts] = useState([]);

  const [error, setError] = useState(null);
  const [user_loading, setUserLoading] = useState(true);
  const [classroom_loading, setClassroomLoading] = useState(true);

  // USER COLUMNS
  const user_columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "first_name",
      headerName: "First name",
      width: 150,
    },
    {
      field: "last_name",
      headerName: "Last name",
      width: 150,
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 250,
      width: 325,
    },
  ];

  // CLASS COLUMNS
  const class_columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "class_name",
      headerName: "Class name",
      width: 150,
    },
    {
      field: "fk_teacher_id",
      headerName: "Teacher ID",
      width: 110,
    },
    {
      field: "teacher_name",
      headerName: "Teacher",
      width: 150,
      valueGetter: (value, row) => {
        const teacher = users.find((user) => user.id === row.fk_teacher_id);
        if (teacher) return `${teacher.first_name} ${teacher.last_name}`;
        return value;
      },
    },
    {
      field: "class_code",
      headerName: "Class Code",
      width: 150,
    },
    {
      field: "start_date",
      headerName: "Start Date",
      type: "date",
      width: 150,
      valueFormatter: (value) => {
        const date = new Date(value);
        return date.toString().slice(4, 15);
      }
    },
    {
      field: "end_date",
      headerName: "End Date",
      type: "date",
      width: 150,
      valueFormatter: (value) => {
        const date = new Date(value);
        return date.toString().slice(4, 15);
      }
    },
    {
      field: "num_students",
      headerName: "# Students",
      type: "number",
      width: 120,
    },
    {
      field: "is_savings_enabled",
      headerName: "Savings Enabled",
      type: "boolean",
      width: 170,
    },
  ];

  // STUDENT COLUMNS
  const student_columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "first_name",
      headerName: "First name",
      width: 150,
    },
    {
      field: "last_name",
      headerName: "Last name",
      width: 150,
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 250,
      width: 325,
    },
    {
      field: "checking_balance",
      headerName: "Checking Balance",
      type: "number",
      width: 160,
      valueFormatter: (value) => `$${value}`,
    },
    {
      field: "savings_balance",
      headerName: "Savings Balance",
      type: "number",
      width: 160,
      valueFormatter: (value) => `$${value}`,
    },
  ];

  // FEES/BONUSES COLUMNS
  const fees_bonuses_columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "title",
      headerName: "Title",
      width: 150,
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      width: 150,
      valueFormatter: (value) => `$${value}`,
    },
    {
      field: "description",
      headerName: "Description",
      width: 400,
    },
  ];

  // JOB COLUMNS
  const job_columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "title",
      headerName: "Title",
      width: 150,
    },
    {
      field: "wage",
      headerName: "Amount",
      type: "number",
      width: 150,
      valueFormatter: (value) => `$${value}`,
    },
    {
      field: "pay_frequency",
      headerName: "Pay Frequency",
      width: 150,
    },
    {
      field: "pay_day",
      headerName: "Pay Day",
      width: 150,
    },
    {
      field: "is_trustee",
      headerName: "Trustee",
      type: "boolean",
    },
    {
      field: "description",
      headerName: "Description",
      width: 400,
    },
  ];

  // PROPERTY COLUMNS
  const property_columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "title",
      headerName: "Title",
      width: 150,
    },
    {
      field: "value",
      headerName: "Value",
      type: "number",
      width: 150,
      valueFormatter: (value) => `$${value}`,
    },
    {
      field: "rent",
      headerName: "Rent",
      type: "number",
      width: 150,
      valueFormatter: (value) => `$${value}`,
    },
    {
      field: "maintenance",
      headerName: "Maintenance",
      type: "number",
      width: 150,
      valueFormatter: (value) => `$${value}`,
    },
    {
      field: "pay_frequency",
      headerName: "Pay Frequency",
      width: 150,
    },
    {
      field: "pay_day",
      headerName: "Pay Day",
      width: 150,
    },
    {
      field: "description",
      headerName: "Description",
      width: 400,
    },
  ];

  // INVESTMENT ACCOUNT COLUMNS
  const investment_account_columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "title",
      headerName: "Title",
      width: 150,
    },
    {
      field: "description",
      headerName: "Description",
      width: 400,
    },
  ];

  // YEAR END COLUMNS
  const year_end_columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "title",
      headerName: "Title",
      width: 150,
    },
    {
      field: "end_date",
      headerName: "End Date",
      type: "date",
      width: 150,
      valueFormatter: (value) => `${value}%`,
    },
    {
      field: "savings_apr",
      headerName: "Savings APR",
      type: "number",
      width: 150,
      valueFormatter: (value) => {
        const date = new Date(value);
        return date.toString().slice(4, 15);
      }
    },
    {
      field: "description",
      headerName: "Description",
      width: 400,
    },
  ];



  const fetchClassroomDetails = useCallback(async () => {
    // If no selected classroom, return null. (No classroom details)
    if (!selectedClassroom) return null;

    // Otherwise, a classroom is selected and we can fetch the details from the database.
    try {
      // Object that maps backend route names as properties to their
      // corresponding state setter functions for use by the data grids
      const classroomSetters = {
        // Students
        students: setStudents,
        // Fees / Bonuses
        "fees-bonuses": setFeesBonuses,
        // Jobs
        jobs: setJobs,
        // Properties
        properties: setProperties,
        // Investment Accounts
        "investment-accounts": setInvestmentAccounts,
        // Year Ends
        "year-ends": setYearEnds,
      };

      // Loop through classroomSetters keys
      for (const key of Object.keys(classroomSetters)) {
        console.log("Fetching ", key);
        // Call api route
        const response = await api.get(
          // Use key string to get backend route
          `/${key}/classroom/${selectedClassroom.id}`
        );

        console.log(`Fetched ${key}, got response:`);
        console.log(response);

        // Use key to access setter function
        classroomSetters[key](
          // Here, we use the String replace() function to change any dash
          // characters from the route names with underscores to get the
          // correct property name of the json response data we want, and pass
          // that value to the state setting function we're calling.
          response.data[key.replace("-", "_")]
        );
      }
      setError(null);
    } catch (err) {
      setError("Failed to fetch classroom data");
    } finally {
      setClassroomLoading(false);
    }
  }, [selectedClassroom]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const users_response = await api.get(`/users`);
        console.log(users_response);
        setUsers(users_response.data.users);

        const classrooms_response = await api.get(`/classrooms`);
        console.log(classrooms_response);
        setClassrooms(classrooms_response.data.classrooms);

        setError(null);
      } catch (err) {
        setError("Failed to fetch data");
      } finally {
        setUserLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchClassroomData = async () => {    
      // If no selected classroom, return null. (No classroom details)
      if (!selectedClassroom) return null;
  
      // Otherwise, a classroom is selected and we can fetch the details from the database.
      try {
        // Object that maps backend route names as properties to their
        // corresponding state setter functions for use by the data grids
        const classroomSetters = {
          // Students
          students: setStudents,
          // Fees / Bonuses
          "fees-bonuses": setFeesBonuses,
          // Jobs
          jobs: setJobs,
          // Properties
          properties: setProperties,
          // Investment Accounts
          "investment-accounts": setInvestmentAccounts,
          // Year Ends
          "year-ends": setYearEnds,
        };
  
        // Loop through classroomSetters keys
        for (const key of Object.keys(classroomSetters)) {
          console.log("Fetching ", key);
          // Call api route
          const response = await api.get(
            // Use key string to get backend route
            `/${key}/classroom/${selectedClassroom.id}`
          );
  
          console.log(`Fetched ${key}, got response:`);
          console.log(response);
  
          // Use key to access setter function
          classroomSetters[key](
            // Here, we use the String replace() function to change any dash
            // characters from the route names with underscores to get the
            // correct property name of the json response data we want, and pass
            // that value to the state setting function we're calling.
            response.data[key.replace("-", "_")]
          );
        }
        setError(null);
      } catch (err) {
        setError("Failed to fetch classroom data");
      } finally {
        setClassroomLoading(false);
      }
    };

    fetchClassroomData();
  }, [selectedClassroom]);

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Testing Page
      </Typography>
      <Divider />

      {/* Admin Controls */}
      <Box sx={{ padding: 3 }}>
        <Typography variant="h5" gutterBottom>
          Admin Controls
        </Typography>
        {user_loading ? (
          <CircularProgress sx={{ margin: "auto" }} />
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <>
            <Box sx={{ width: "60%", margin: "auto", boxShadow: 3 }}>
              <DataGrid
                columns={user_columns}
                rows={users}
                label="Users"
                apiRef={userApiRef}
                showToolbar
                checkboxSelection
                disableColumnSelector
                disableMultipleRowSelection
                disableRowSelectionOnClick
                sx={{ mt: 3 }}
                slots={{
                  toolbar: CustomToolbar,
                }}
                slotProps={{
                  toolbar: {
                    label: "Users",
                  },
                }}
              />
            </Box>

            <Box sx={{ width: "70%", margin: "auto", boxShadow: 3 }}>
              <DataGrid
                columns={class_columns}
                rows={classrooms}
                label="Classrooms"
                showToolbar
                checkboxSelection
                disableMultipleRowSelection
                disableRowSelectionOnClick
                onRowSelectionModelChange={(rowSelectionModel) => {
                  selectClassroom(
                    classrooms.find((c) => rowSelectionModel.ids.has(c.id))
                  );
                  fetchClassroomDetails();
                }}
                sx={{ mt: 3 }}
                slots={{
                  toolbar: CustomToolbar,
                }}
                slotProps={{
                  toolbar: {
                    label: "Classrooms",
                    additionalActions: [
                      {
                        title: "Create New Classroom",
                        buttonContent: "Create New",
                        buttonProps: {
                          color: "primary",
                          variant: "contained",
                        },
                      },
                    ],
                  },
                }}
              />
            </Box>

            {selectedClassroom &&
              (classroom_loading ? (
                <CircularProgress sx={{ margin: "auto" }} />
              ) : (
                <>
                  {/* Students */}
                  <Box sx={{ width: "80%", margin: "auto", boxShadow: 3 }}>
                    <DataGrid
                      columns={student_columns}
                      rows={students}
                      label={`Students - ${selectedClassroom.class_name}`}
                      showToolbar
                      checkboxSelection
                      disableRowSelectionOnClick
                      onRowSelectionModelChange={(rowSelectionModel) => {
                        selectStudents(
                          students.filter((s) =>
                            rowSelectionModel.ids.has(s.id)
                          )
                        );
                      }}
                      sx={{ mt: 3 }}
                    />
                  </Box>

                    // Students
                    students: setStudents,
                    // Fees / Bonuses
                    "fees-bonuses": setFeesBonuses,
                    // Jobs
                    jobs: setJobs,
                    // Properties
                    properties: setProperties,
                    // Investment Accounts
                    "investment-accounts": setInvestmentAccounts,
                    // Year Ends

                  {/* Fees / Bonuses */}
                  <Box sx={{ width: "80%", margin: "auto", boxShadow: 3 }}>
                    <DataGrid
                      columns={fees_bonuses_columns}
                      rows={fees_bonuses}
                      label={`Fees/Bonuses - ${selectedClassroom.class_name}`}
                      showToolbar
                      checkboxSelection
                      disableRowSelectionOnClick
                      onRowSelectionModelChange={(rowSelectionModel) => {
                        selectFeesBonuses(
                          fees_bonuses.filter((s) =>
                            rowSelectionModel.ids.has(s.id)
                          )
                        );
                      }}
                      sx={{ mt: 3 }}
                    />
                  </Box>

                  {/* Jobs */}
                  <Box sx={{ width: "80%", margin: "auto", boxShadow: 3 }}>
                    <DataGrid
                      columns={job_columns}
                      rows={jobs}
                      label={`Jobs - ${selectedClassroom.class_name}`}
                      showToolbar
                      checkboxSelection
                      disableRowSelectionOnClick
                      onRowSelectionModelChange={(rowSelectionModel) => {
                        selectJobs(
                          jobs.filter((s) =>
                            rowSelectionModel.ids.has(s.id)
                          )
                        );
                      }}
                      sx={{ mt: 3 }}
                    />
                  </Box>

                  {/* Properties */}
                  <Box sx={{ width: "80%", margin: "auto", boxShadow: 3 }}>
                    <DataGrid
                      columns={property_columns}
                      rows={properties}
                      label={`Properties - ${selectedClassroom.class_name}`}
                      showToolbar
                      checkboxSelection
                      disableRowSelectionOnClick
                      onRowSelectionModelChange={(rowSelectionModel) => {
                        selectProperties(
                          properties.filter((s) =>
                            rowSelectionModel.ids.has(s.id)
                          )
                        );
                      }}
                      sx={{ mt: 3 }}
                    />
                  </Box>

                  {/* Investment Accounts */}
                  <Box sx={{ width: "80%", margin: "auto", boxShadow: 3 }}>
                    <DataGrid
                      columns={investment_account_columns}
                      rows={investment_accounts}
                      label={`Investment Accounts - ${selectedClassroom.class_name}`}
                      showToolbar
                      checkboxSelection
                      disableRowSelectionOnClick
                      onRowSelectionModelChange={(rowSelectionModel) => {
                        selectInvestmentAccounts(
                          investment_accounts.filter((s) =>
                            rowSelectionModel.ids.has(s.id)
                          )
                        );
                      }}
                      sx={{ mt: 3 }}
                    />
                  </Box>

                  {/* Year Ends */}
                  <Box sx={{ width: "80%", margin: "auto", boxShadow: 3 }}>
                    <DataGrid
                      columns={year_end_columns}
                      rows={year_ends}
                      label={`Year Ends - ${selectedClassroom.class_name}`}
                      showToolbar
                      checkboxSelection
                      disableRowSelectionOnClick
                      onRowSelectionModelChange={(rowSelectionModel) => {
                        selectYearEnds(
                          year_ends.filter((s) =>
                            rowSelectionModel.ids.has(s.id)
                          )
                        );
                      }}
                      sx={{ mt: 3 }}
                    />
                  </Box>

                  {/* Investment Values */}
                  <Box sx={{ width: "80%", margin: "auto", boxShadow: 3 }}>
                    <DataGrid
                      columns={student_columns}
                      rows={students}
                      label={`Students - ${selectedClassroom.class_name}`}
                      showToolbar
                      checkboxSelection
                      disableRowSelectionOnClick
                      onRowSelectionModelChange={(rowSelectionModel) => {
                        selectStudents(
                          students.filter((s) =>
                            rowSelectionModel.ids.has(s.id)
                          )
                        );
                      }}
                      sx={{ mt: 3 }}
                    />
                  </Box>

                  {/* Student Jobs */}
                  <Box sx={{ width: "80%", margin: "auto", boxShadow: 3 }}>
                    <DataGrid
                      columns={student_columns}
                      rows={students}
                      label={`Students - ${selectedClassroom.class_name}`}
                      showToolbar
                      checkboxSelection
                      disableRowSelectionOnClick
                      onRowSelectionModelChange={(rowSelectionModel) => {
                        selectStudents(
                          students.filter((s) =>
                            rowSelectionModel.ids.has(s.id)
                          )
                        );
                      }}
                      sx={{ mt: 3 }}
                    />
                  </Box>

                  {/* Student Properties */}
                  <Box sx={{ width: "80%", margin: "auto", boxShadow: 3 }}>
                    <DataGrid
                      columns={student_columns}
                      rows={students}
                      label={`Students - ${selectedClassroom.class_name}`}
                      showToolbar
                      checkboxSelection
                      disableRowSelectionOnClick
                      onRowSelectionModelChange={(rowSelectionModel) => {
                        selectStudents(
                          students.filter((s) =>
                            rowSelectionModel.ids.has(s.id)
                          )
                        );
                      }}
                      sx={{ mt: 3 }}
                    />
                  </Box>
                </>
              ))}
          </>
        )}
      </Box>
      <Divider />

      {showButtons ? (
        <>
          <Button onClick={() => setShowButtons(false)} sx={{ mt: 4 }}>
            Hide Buttons
          </Button>
          {/* Button Theme Testing */}
          <Box sx={{ margin: 1, padding: 1 }}>
            {/* "Text" variant buttons */}
            <Typography variant="h5" gutterBottom>
              Text
            </Typography>
            <Stack direction="row" gap={2}>
              <Button variant="text">Default</Button>
              <Button variant="text" color="primary">
                Primary
              </Button>
              <Button variant="text" color="secondary">
                Secondary
              </Button>
              <Button variant="text" disabled>
                Disabled
              </Button>
              <Button variant="text" href="#">
                Link
              </Button>
            </Stack>
          </Box>
          <Divider />
          <Box sx={{ margin: 1, padding: 1 }}>
            {/* "Outlined" variant buttons */}
            <Typography variant="h5" gutterBottom>
              Outlined
            </Typography>
            <Stack direction="row" gap={2}>
              <Button variant="outlined">Default</Button>
              <Button variant="outlined" color="primary">
                Primary
              </Button>
              <Button variant="outlined" color="secondary">
                Secondary
              </Button>
              <Button variant="outlined" disabled>
                Disabled
              </Button>
              <Button variant="outlined" href="#">
                Link
              </Button>
            </Stack>
          </Box>
          <Divider />
          <Box sx={{ margin: 1, padding: 1 }}>
            {/* "Contained" variant buttons */}
            <Typography variant="h5" gutterBottom>
              Contained
            </Typography>
            <Stack direction="row" gap={2}>
              <Button variant="contained">Default</Button>
              <Button variant="contained" color="primary">
                Primary
              </Button>
              <Button variant="contained" color="secondary">
                Secondary
              </Button>
              <Button variant="contained" disabled>
                Disabled
              </Button>
              <Button variant="contained" href="#">
                Link
              </Button>
            </Stack>
          </Box>
          <Divider />
          <Box sx={{ margin: 1, padding: 1 }}>
            {/* Buttons w/Icons and Label */}
            <Typography variant="h5" gutterBottom>
              Buttons with icons and label
            </Typography>
            <Stack direction="row" gap={2}>
              <Button startIcon={<DeleteIcon />} variant="contained">
                Default
              </Button>
              <Button
                startIcon={<DeleteIcon />}
                variant="contained"
                color="primary"
              >
                Primary
              </Button>
              <Button
                startIcon={<DeleteIcon />}
                variant="contained"
                color="secondary"
              >
                Secondary
              </Button>
              <Button startIcon={<DeleteIcon />} variant="contained" disabled>
                Disabled
              </Button>
              <Button startIcon={<DeleteIcon />} variant="contained" href="#">
                Link
              </Button>
            </Stack>
          </Box>
          <Divider />
        </>
      ) : (
        <Button onClick={() => setShowButtons(true)} sx={{ mt: 4 }}>
          Show Buttons
        </Button>
      )}
    </Box>
  );
};

export default Test;
