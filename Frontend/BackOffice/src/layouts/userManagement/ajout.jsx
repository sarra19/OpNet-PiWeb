/* eslint-disable */
import Autocomplete from "@mui/lab/Autocomplete";
import ReCAPTCHA from "react-google-recaptcha";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import ImageIcon from "@mui/icons-material/Image";
import FileIcon from "@mui/icons-material/Description";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import axios from "axios";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import API_URLS from "apiUrls";
import { Link } from "react-router-dom";

function Ajout() {
  const roles = ["Student", "Teacher", "Alumni", "Admin", "Subadmin", "Company"]; // List of roles
  const [capVal, setCapVal] = useState(null);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    firstnameError: "",
    lastnameError: "",
    emailError: "",
    passwordError: "",
    confirmPasswordError: "",
    role: "",
  });

  

	
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    let errorMessage = "";
    if (name === "firstname" || name === "lastname") {
      if (/\d/.test(value)) {
        errorMessage = "Name should not contain numbers";
      } else if (value.length <= 3) {
        errorMessage = "Name should be more than 3 characters";
      }
    } else if (name === "email") {
      if (!/\S+@\S+\.\S{2,}/.test(value)) {
        errorMessage = "Invalid email format";
      }
    } else if (name === "password") {
      if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}/.test(value)) {
        errorMessage = "Password must be at least 8 characters long and contain at least one digit, one lowercase letter, one uppercase letter, and one special character";
      }
    } else if (name === "confirmPassword") {
      if (value !== formData.password) {
        errorMessage = "Passwords do not match";
      }
    }
    setFormData({
      ...formData,
      [name]: value,
      [`${name}Error`]: errorMessage,
    });
  };

  const handleRoleChange = (event, newValue) => {
    setFormData({
      ...formData,
      role: newValue || "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData); // Ajoutez cette ligne pour afficher les valeurs des champs de formulaire
    try {
      const res = await axios.post(API_URLS.signup, formData);
      setMsg(res.data.message);
      window.alert('Add successful!');

    } catch (error) {
      if (error.response && error.response.status >= 400 && error.response.status < 500) {
        setError(error.response.data.message);
      } else if (error.response && error.response.status === 401) {
        setError("Unauthorized: Please log in again.");
      } else if (error.response && error.response.status === 404) {
        setError("Resource not found.");
      } else if (error.response && error.response.status === 503) {
        setError("Service unavailable. Please try again later.");
      } else if (error.request) {
        setError("Network error. Please check your internet connection.");
      } else {
        setError("An error occurred while processing your request. Please try again later.");
      }
      window.alert('Add failed. Please try again.');

    }
  };
  
  
  return (

    <DashboardLayout>
                <DashboardNavbar />

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
          style={{ marginTop: "20px" }}
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Join us today
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Enter your details to register
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <form onSubmit={handleSubmit}>
            <MDBox mb={2}>
              <MDInput
                type="text"
                name="firstname"
                label="First Name"
                variant="standard"
                fullWidth
                value={formData.firstname}
                onChange={handleChange}
              />
              {formData.firstnameError && (
                <MDTypography variant="body2" color="error">
                  {formData.firstnameError}
                </MDTypography>
              )}
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                name="lastname"
                label="Last Name"
                variant="standard"
                fullWidth
                value={formData.lastname}
                onChange={handleChange}
              />
              {formData.lastnameError && (
                <MDTypography variant="body2" color="error">
                  {formData.lastnameError}
                </MDTypography>
              )}
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="email"
                name="email"
                label="Email"
                variant="standard"
                fullWidth
                value={formData.email}
                onChange={handleChange}
              />
              {formData.emailError && (
                <MDTypography variant="body2" color="error">
                  {formData.emailError}
                </MDTypography>
              )}
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                name="password"
                label="Password"
                variant="standard"
                fullWidth
                value={formData.password}
                onChange={handleChange}
              />
              {formData.passwordError && (
                <MDTypography variant="body2" color="error">
                  {formData.passwordError}
                </MDTypography>
              )}
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                name="confirmPassword"
                label="Confirm Password"
                variant="standard"
                fullWidth
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {formData.confirmPasswordError && (
                <MDTypography variant="body2" color="error">
                  {formData.confirmPasswordError}
                </MDTypography>
              )}
            </MDBox>
            <MDBox mb={2}>
              <Grid>
                <Grid item xs={12}>
                  <Autocomplete
                    options={roles}
                    value={formData.role}
                    onChange={handleRoleChange}
                    renderInput={(params) => <TextField {...params} label="Role" />}
                  />
                </Grid>
              </Grid>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <ReCAPTCHA
                sitekey="6LdXhYspAAAAABmF7uoESPX5wt57MZEsNAdWbC4h"
                onChange={(val) => setCapVal(val)}
              />
              <MDButton disabled={!capVal} type="submit" variant="gradient" color="info" fullWidth>
                Sign up
              </MDButton>
            </MDBox>
          </form>
          <Link to="/userManagement">
          <MDButton variant="contained" color="error" size="small">
            Back
          </MDButton>
        </Link>
        </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Ajout;
