/* eslint-disable */
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/lab/Autocomplete";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import axios from "axios";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { Link } from "react-router-dom";

function AjoutChat() {
  const [formData, setFormData] = useState({
    nameChat: "",
    dateCreationChat: new Date().toISOString(),
    NbParticipantsChat: "",
    TypeChat: "",
  });

  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Mettre à jour la date de création avec la date actuelle
      const currentDate = new Date().toISOString();
      setFormData({
        ...formData,
        dateCreationChat: currentDate,
      });
  
      // Envoi de la requête POST avec les données mises à jour
      const res = await axios.post("http://localhost:5000/chat/add", formData);
      setMsg(res.data.message);
      window.alert('Add successful!');
    } catch (error) {
      console.error("Error adding chat:", error);
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
          Create a New Chat
        </MDTypography>
      </MDBox>
      <MDBox pt={4} pb={3} px={3}>
        <form onSubmit={handleSubmit}>
          <MDBox mb={2}>
            <TextField
              type="text"
              name="nameChat"
              label="Chat Name"
              variant="standard"
              fullWidth
              value={formData.nameChat}
              onChange={handleChange}
            />
          </MDBox>
          <MDBox mb={2}>
            <TextField
              type="number"
              name="NbParticipantsChat"
              label="Number of Participants"
              variant="standard"
              fullWidth
              value={formData.NbParticipantsChat}
              onChange={handleChange}
            />
          </MDBox>
          <MDBox mb={2}>
            <TextField
              type="text"
              name="TypeChat"
              label="Chat Type"
              variant="standard"
              fullWidth
              value={formData.TypeChat}
              onChange={handleChange}
            />
          </MDBox>
          <MDBox mt={4} mb={1}>
            <Button type="submit" variant="contained" color="error" fullWidth>
              Create Chat
            </Button>
          </MDBox>
        </form>
        <Link to="/chaManagement">
          <Button variant="contained" color="error" size="small">
            Back
          </Button>
        </Link>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default AjoutChat;
