/* eslint-disable */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Button from '@material-ui/core/Button';
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";

const tableStyles = {
  width: "100%",
  borderCollapse: "collapse",
};

const cellStyles = {
  padding: "8px",
  textAlign: "center",
  borderBottom: "1px solid #ddd",
  fontSize: "12px",
};

const evenRowStyles = {
  backgroundColor: "#f2f2f2",
};

const headerStyles = {
  ...cellStyles,
  color: "red",
  textAlign: "center",
};

const buttonContainerStyles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: "10px",
};

const buttonStyles = {
  cursor: "pointer",
  marginRight: "5px",
};

function MessageComponent() {

  const [messages, setMessages] = useState([]); // Initialisation à un tableau vide
  const [error, setError] = useState(null);
  const { chatId } = useParams();

  useEffect(() => {
    const fetchMessagesForChat = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/messages/getMessage/${chatId}`);
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages for chat:", error);
        setError("Error fetching messages for chat. Please try again later."); // Utilisation de setError pour gérer les erreurs
      }
    };

    fetchMessagesForChat();
  }, [chatId]);

  const handleDeleteMessage = async (messageId) => {
    try {
      await axios.delete(`http://localhost:5000/messages/deleteMessage/${messageId}`);
      setMessages(prevMessages => prevMessages.filter(message => message._id !== messageId));
    } catch (error) {
      console.error("Error deleting message:", error);
      setError("Error deleting message. Please try again later."); // Utilisation de setError pour gérer les erreurs
    }
  };

  
  return (
    <DashboardLayout>
      <DashboardNavbar absolute isMini />
      <MDBox mt={8}>
        <MDBox mb={3}>
          <div style={buttonContainerStyles}>
            <Button variant="contained" color="secondary">
              <Link to="/AddChat" style={{ textDecoration: "none", color: "white" }}>Add Chat</Link>
            </Button>
          </div>
          {error && <div>Error: {error}</div>} {/* Afficher l'erreur ici */}
          <table style={tableStyles}>
            <thead>
              <tr>
                <th style={headerStyles}>Send Date</th>
                <th style={headerStyles}>Content</th>
                <th style={headerStyles}>Chat</th>
                <th style={headerStyles}>Sender</th>
                <th style={headerStyles}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(messages) && messages.map((message, index) => (
                <tr key={index} style={index % 2 === 0 ? evenRowStyles : {}}>
                  <td style={cellStyles}>{message.sendDate}</td>
                  <td style={cellStyles}>{message.Content}</td>
                  <td style={cellStyles}>{message.chat}</td>
                  <td style={cellStyles}>{message.sender}</td>
                  <td style={{ ...cellStyles, ...buttonContainerStyles }}>
                    <Button size="small" variant="contained" color="primary" style={buttonStyles}>
                      <Link to={`/messages/${message._id}`} style={{ textDecoration: "none", color: "white" }}>View Messages</Link>
                    </Button>
                    <Button size="small" variant="contained" color="secondary" style={buttonStyles} onClick={() => handleDeleteMessage(message._id)}>Delete</Button>
                    <Button size="small" variant="contained" color="default" style={buttonStyles}>
                      <Link to={`/updateMessage/${message._id}`}>Modify</Link>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
  
}

export default MessageComponent;
