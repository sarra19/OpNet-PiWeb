/* eslint-disable */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Autocomplete from "@mui/lab/Autocomplete";
import ReCAPTCHA from "react-google-recaptcha";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import API_URLS from "apiUrls";
import { Link } from "react-router-dom";

function Modifier() {
  const roles = ["Student", "Teacher", "Alumni", "Admin", "Subadmin", "Company"];
  const { userId } = useParams();
  const [capVal, setCapVal] = useState(null);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    firstnameError: "",
    lastnameError: "",
    emailError: "",
    role: "",
  });
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/user/get/${userId}`);
        const userData = response.data;
        setFormData({
          ...formData,
          firstname: userData.firstname,
          lastname: userData.lastname,
          email: userData.email,
          role: userData.role,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, [userId]);

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
    try {
      const response = await axios.put(`http://localhost:5000/user/updateUser/${userId}`, formData);
      setMsg(response.data.message);
      window.alert('Update successful!');
    } catch (error) {
      setError(error.response.data.message);
      window.alert('Update failed. Please try again.');
    }
  };

  // Function to check if all fields are valid
  const isFormValid = () => {
    return (
      formData.firstname &&
      formData.lastname &&
      formData.email &&
     
      formData.role &&
      !formData.firstnameError &&
      !formData.lastnameError &&
      !formData.emailError &&
      capVal
    );
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
          Update User
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
            <MDButton disabled={!isFormValid()} type="submit" variant="gradient" color="info" fullWidth>
              Update
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

export default Modifier;
