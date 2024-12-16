import {
    Button,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField
  } from "@mui/material";
  import { useFormik } from "formik";
  import React, { useState } from "react";
  import * as Yup from "yup";
  import { blue } from "@mui/material/colors";
  import { useDispatch } from 'react-redux';
import { registerUser } from "../../Store/Auth/Action";
import { useNavigate } from "react-router-dom";
  
  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required("Full Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });
  
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
  const months = [
    { value: 1, label: "January" },
    { value: 2, label: "February" },
    { value: 3, label: "March" },
    { value: 4, label: "April" },
    { value: 5, label: "May" },
    { value: 6, label: "June" },
    { value: 7, label: "July" },
    { value: 8, label: "August" },
    { value: 9, label: "September" },
    { value: 10, label: "October" },
    { value: 11, label: "November" },
    { value: 12, label: "December" },
  ];

  
  const SignupForm = () => {
    const navigate = useNavigate();
    const [days, setDays] = useState(Array.from({ length: 31 }, (_, i) => i + 1));
    const dispatch = useDispatch();
    const formik = useFormik({
      initialValues: {
        fullName: "",
        email: "",
        password: "",
        dateOfBirth: {
          day: "",
          month: "",
          year: "",
        },
      },
      validationSchema,
      onSubmit: (values) => {
        const { day, month, year } = values.dateOfBirth;
        const dateOfBirth = `${year}-${month}-${day}`;
        values.dateOfBirth = dateOfBirth;
        console.log("Form values:", values);

        dispatch(registerUser(values))
        .then(() => {
          navigate('/home');
        })
        .catch((error) => {
          console.error("Registration failed: ", error);
        });

        console.log("form value: ", values);
      },
    });
  
    const handleDateChange = (name) => (event) => {
      const value = event.target.value;
  
      if (name === "month" || name === "year") {
        const selectedMonth = name === "month" ? value : formik.values.dateOfBirth.month;
        const selectedYear = name === "year" ? value : formik.values.dateOfBirth.year;
  
        if (selectedMonth && selectedYear) {
          const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
          setDays(Array.from({ length: daysInMonth }, (_, i) => i + 1));
        }
      }
  
      formik.setFieldValue("dateOfBirth", {
        ...formik.values.dateOfBirth,
        [name]: value,
      });
    };
  
    return (
      <form onSubmit={formik.handleSubmit} >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Full Name"
              name="fullName"
              variant="outlined"
              value={formik.values.fullName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.fullName && Boolean(formik.errors.fullName)}
              helperText={formik.touched.fullName && formik.errors.fullName}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              variant="outlined"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              variant="outlined"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </Grid>
          <Grid item xs={12}>
            <InputLabel>Date of Birth</InputLabel>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <InputLabel>Day</InputLabel>
                <Select
                  name="day"
                  fullWidth
                  onChange={handleDateChange("day")}
                  value={formik.values.dateOfBirth.day}
                >
                  {days.map((day) => (
                    <MenuItem key={day} value={day}>
                      {day}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={4}>
                <InputLabel>Month</InputLabel>
                <Select
                  name="month"
                  fullWidth
                  onChange={handleDateChange("month")}
                  value={formik.values.dateOfBirth.month}
                >
                  {months.map((month) => (
                    <MenuItem key={month.value} value={month.value}>
                      {month.label}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={4}>
                <InputLabel>Year</InputLabel>
                <Select
                  name="year"
                  fullWidth
                  onChange={handleDateChange("year")}
                  value={formik.values.dateOfBirth.year}
                >
                  {years.map((year) => (
                    <MenuItem key={year} value={year}>
                      {year}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Button
              sx={{ borderRadius: "29px", py: "15px", bgcolor: blue[500] }}
              type="submit"
              fullWidth
              variant="contained"
            >
              Sign up
            </Button>
          </Grid>
        </Grid>
      </form>
    );
  };
  
  export default SignupForm;
  