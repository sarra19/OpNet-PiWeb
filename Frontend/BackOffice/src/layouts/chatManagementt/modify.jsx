/* eslint-disable */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { Link } from "react-router-dom";

function ModifierChat() {
  const { chatId } = useParams();
  const [formData, setFormData] = useState({
    nameChat: "",
    dateCreationChat: "",
    NbParticipantsChat: "",
    TypeChat: "",
  });
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const fetchChatData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/chat/getid/${chatId}`);
        const chatData = response.data;
        setFormData({
          ...formData,
          nameChat: chatData.nameChat,
          dateCreationChat: chatData.dateCreationChat,
          NbParticipantsChat: chatData.NbParticipantsChat,
          TypeChat: chatData.TypeChat,
        });
      } catch (error) {
        console.error("Error fetching chat data:", error);
      }
    };
    fetchChatData();
  }, [chatId]);

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
      const response = await axios.put(`http://localhost:5000/chat/updateChatRoom/${chatId}`, formData);
      setMsg(response.data.message);
      window.alert('Update successful!');
    } catch (error) {
      setError(error.response.data.message);
      window.alert('Update failed. Please try again.');
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
          Update Chat
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
              type="text"
              name="dateCreationChat"
              label="Creation Date"
              variant="standard"
              fullWidth
              value={formData.dateCreationChat}
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
              Update Chat
            </Button>
          </MDBox>
        </form>
        <MDBox mt={2}>
          <Button component={Link} to="/chaManagement" variant="contained" color="error">
            Go to Chat Management
          </Button>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default ModifierChat;

