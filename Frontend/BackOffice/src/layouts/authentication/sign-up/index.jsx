/* eslint-disable */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import CoverLayout from "layouts/authentication/components/CoverLayout";
import bgImage from "assets/images/bg-sign-up-cover.jpg";
import axios from "axios";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import ImageIcon from "@mui/icons-material/Image";
import FileIcon from "@mui/icons-material/Description";

function Cover() {
  const [formData, setFormData] = useState({
    firstname: { value: "", isValid: true, errorMessage: "" },
    lastname: { value: "", isValid: true, errorMessage: "" },
    email: { value: "", isValid: true, errorMessage: "" },
    password: { value: "", isValid: true, errorMessage: "" },
    role: { value: "", isValid: true, errorMessage: "" },
    age: { value: "", isValid: true, errorMessage: "" },
    city: { value: "", isValid: true, errorMessage: "" },
    phone: { value: "", isValid: true, errorMessage: "" },
    speciality: { value: "", isValid: true, errorMessage: "" },
    institution: { value: "", isValid: true, errorMessage: "" },
    languages: { value: "", isValid: true, errorMessage: "" },
    profileImage: { value: "", isValid: true, errorMessage: "" },
    description: { value: "", isValid: true, errorMessage: "" },
    skills: { value: "", isValid: true, errorMessage: "" },
    experience: { value: "", isValid: true, errorMessage: "" },
    formation: { value: "", isValid: true, errorMessage: "" },
    certificates: { value: "", isValid: true, errorMessage: "" },
    cV: { value: "", isValid: true, errorMessage: "" }
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(Object.keys(formData).length / itemsPerPage);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    let isValid = true;
    let errorMessage = "";

    // Validation logic
    if (value.trim() === "") {
      isValid = false;
      errorMessage = "This field is required";
    } else {
      switch (name) {
        case "email":
          // Check if email format is valid
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = "Please enter a valid email address";
          }
          break;
        case "age":
          // Check if age is a number between 1 and 150
          const ageValue = parseInt(value);
          if (isNaN(ageValue) || ageValue < 1 || ageValue > 150) {
            isValid = false;
            errorMessage = "Please enter a valid age between 1 and 150";
          }
          break;
        case "phone":
          // Check if phone number format is valid
          const phoneRegex = /^\d{10}$/;
          if (!phoneRegex.test(value)) {
            isValid = false;
            errorMessage = "Please enter a valid 10-digit phone number";
          }
          break;
        case "firstname":
        case "lastname":
          // Check if firstname or lastname contains only letters
          const onlyLettersRegex = /^[A-Za-z]+$/;
          if (!onlyLettersRegex.test(value)) {
            isValid = false;
            errorMessage = "Only letters are allowed";
          }
          break;
        default:
          break;
      }
    }

    if (name === "profileImage" || name === "cV") {
      // If the target is a file input, set the file name to the state
      setFormData({
        ...formData,
        [name]: { value: files[0].name, isValid, errorMessage }
      });
    } else {
      // For other inputs, update the state with the value and its validation status
      setFormData({
        ...formData,
        [name]: { value, isValid, errorMessage }
      });
    }
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validation check before submitting
      const isFormValid = Object.values(formData).every((field) => field.isValid);
      if (!isFormValid) {
        alert("Please fill out all required fields correctly.");
        return;
      }

      const response = await axios.post("http://localhost:5000/user/add", formData);
      console.log(response.data);
      // Optionally, you can redirect the user after successful sign-in
    } catch (error) {
      console.error("Error signing in:", error);
      if (error.response) {
        // Server responded with a status code other than 2xx
        console.error("Server responded with:", error.response.status, error.response.data);
      } else if (error.request) {
        // Request was made but no response was received
        console.error("No response received:", error.request);
      } else {
        // Something else went wrong
        console.error("Error:", error.message);
      }
    }
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const fileInputLabelStyle = {
    backgroundColor: '#E82227',
    color: 'white',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
  };

  return (
    <CoverLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Join us today
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Enter your email and password to register
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {Object.entries(formData)
                .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                .map(([key, value]) => (
                  <Grid item xs={12} key={key}>
                    {key === "role" ? (
                      <FormControl fullWidth>
                        <InputLabel>{key.charAt(0).toUpperCase() + key.slice(1)}</InputLabel>
                        <Select
                          name={key}
                          value={value.value}
                          onChange={handleChange}
                          variant="outlined"
                          size="small"
                        >
                          <MenuItem value="">Select Role</MenuItem>
                          <MenuItem value="admin">Admin</MenuItem>
                          <MenuItem value="subadmin">Subadmin</MenuItem>
                          <MenuItem value="teacher">Teacher</MenuItem>
                          <MenuItem value="student">Student</MenuItem>
                          <MenuItem value="alumni">Alumni</MenuItem>
                        </Select>
                      </FormControl>
                    ) : (
                      <React.Fragment>
                        <TextField
                          fullWidth
                          label={key.charAt(0).toUpperCase() + key.slice(1)}
                          name={key}
                          value={value.value}
                          onChange={handleChange}
                          type={key === "password" ? "password" : "text"}
                          error={!value.isValid}
                          helperText={value.errorMessage}
                        />
                      </React.Fragment>
                    )}
                    {/* Additional file upload inputs */}
                    {key === "profileImage" || key === "cV" ? (
                      <Grid container spacing={2} alignItems="center" style={{ marginTop: 6 }}>
                        <Grid item>
                          <input
                            type="file"
                            name={key}
                            id={key}
                            onChange={handleChange}
                            style={{ display: 'none' }}
                          />
                          <label htmlFor={key} className="custom-file-label" style={fileInputLabelStyle}>
                            {key === "profileImage" ? (
                              <React.Fragment>
                                <ImageIcon fontSize="small" /> Add a photo
                              </React.Fragment>
                            ) : (
                              <React.Fragment>
                                <FileIcon fontSize="small" /> Add a CV
                              </React.Fragment>
                            )}
                          </label>
                        </Grid>
                        <Grid item>
                          {/* Display the filename if selected */}
                          {formData[key].value && (
                            <MDTypography variant="body2" color="textSecondary">
                              {formData[key].value}
                            </MDTypography>
                          )}
                        </Grid>
                      </Grid>
                    ) : null}
                  </Grid>
                ))}
            </Grid>
            {isLastPage && (
              <React.Fragment>
                <MDBox display="flex" alignItems="center" ml={-1}>
                  <Checkbox />
                  <MDTypography
                    variant="button"
                    fontWeight="regular"
                    color="text"
                    sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
                  >
                    &nbsp;&nbsp;I agree the&nbsp;
                  </MDTypography>
                  <MDTypography
                    component="a"
                    href="#"
                    variant="button"
                    fontWeight="bold"
                    color="info"
                    textGradient
                  >
                    Terms and Conditions
                  </MDTypography>
                </MDBox>
                <MDBox mt={4} mb={1}>
                  <Button style={{ backgroundColor: "#E82227", color: "white" }} variant="contained" fullWidth type="submit">
                    Sign In
                  </Button>
                </MDBox>
              </React.Fragment>
            )}
          </form>
        </MDBox>
        {/* Pagination section */}
        <MDBox display="flex" justifyContent="space-between" mb={2}>
          <Button
            variant="contained"
            color="error"
            disabled={isFirstPage}
            onClick={handlePreviousPage}
            style={{ color: "#E82227" }}
          >
            Back
          </Button>
          <Button
            variant="contained"
            color="error"
            disabled={isLastPage}
            onClick={handleNextPage}
            style={{ color: "#E82227" }}
          >
            Next
          </Button>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
