/* eslint-disable */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
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

function ChatManagement() {
  const [chats, setChats] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axios.get("http://localhost:5000/chat/getall");
        setChats(response.data);
      } catch (error) {
        console.error("Error fetching chats:", error);
        setError("Error fetching chats. Please try again later.");
      }
    };

    fetchChats();
  }, []);

  const fetchMessagesForChat = async (chatId) => {
    try {
      const response = await axios.get(`http://localhost:5000/messages/getMessage/${chatId}`);
      console.log("Messages for chat:", response.data);
      // Handle the response data as needed, such as setting it to state or displaying it in UI
    } catch (error) {
      console.error("Error fetching messages for chat:", error);
    }
  };

  const handleDeleteChat = async (chatId) => {
    try {
      await axios.delete(`http://localhost:5000/chat/deleteChatRoom/${chatId}`);
      // Remove the chat from the list of chats
      setChats(chats.filter(chat => chat._id !== chatId));
    } catch (error) {
      console.error("Error deleting chat:", error);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar absolute />
      <MDBox mt={8}>
        <MDBox mb={3}>
          <div style={buttonContainerStyles}>
            <Button variant="contained" color="secondary">
              <Link to="/AddChat" style={{ textDecoration: "none", color: "white" }}>Add Chat</Link>
            </Button>
          </div>
          {error && <div>Error: {error}</div>}
          <table style={tableStyles}>
            <thead>
              <tr>
                <th style={headerStyles}>Chat Name</th>
                <th style={headerStyles}>Creation Date</th>
                <th style={headerStyles}>Participants Count</th>
                <th style={headerStyles}>TypeChat</th>
                <th style={headerStyles}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {chats.map((chat, index) => (
                <tr key={index} style={index % 2 === 0 ? evenRowStyles : {}}>
                  <td style={cellStyles}>{chat.nameChat}</td>
                  <td style={cellStyles}>{chat.dateCreationChat}</td>
                  <td style={cellStyles}>{chat.NbParticipantsChat}</td>
                  <td style={cellStyles}>{chat.TypeChat}</td>
                  <td style={{ ...cellStyles, ...buttonContainerStyles }}>
                    {/* Button to view messages for the chat */}
  
<Button size="small" variant="contained" color="primary" style={buttonStyles}>
                      <Link to={`/messages/${chat._id}`} style={{ textDecoration: "none", color: "white" }}>View Messages</Link>
                    </Button>
                    {/* Button to delete the chat */}
                    <Button size="small" variant="contained" color="secondary" style={buttonStyles} onClick={() => handleDeleteChat(chat._id)}>
                      Delete
                    </Button>
                    {/* Button to update the chat */}
                    <Button size="small" variant="contained" color="default" style={buttonStyles}>
                      <Link to={`/updateChat/${chat._id}`}>Modify</Link>
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

export default ChatManagement;
