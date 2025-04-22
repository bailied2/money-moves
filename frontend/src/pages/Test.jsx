import React, { useState, useEffect, useContext } from "react";

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

const ControlsGrid = ({ title, columns, rows, apiRef }) => {
  return (
    <Box sx={{ width: "80%", margin: "auto" }}>
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
  const [selectedJobs, selectJosb] = useState([]);
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
      valueGetter: (value) => new Date(value),
    },
    {
      field: "end_date",
      headerName: "End Date",
      type: "date",
      width: 150,
      valueGetter: (value) => new Date(value),
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
    },
    {
      field: "savings_balance",
      headerName: "Savings Balance",
      type: "number",
      width: 160,
    },
  ];

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
      if (!selectedClassroom) return;
      try {
        const students_response = await api.get(
          `/students/classroom/${selectedClassroom.id}`
        );
        console.log(students_response);
        setStudents(students_response.data.students);

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
            <Box sx={{ width: "80%", margin: "auto" }}>
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

            <Box sx={{ width: "80%", margin: "auto" }}>
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
                  <Box sx={{ width: "80%", margin: "auto" }}>
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
