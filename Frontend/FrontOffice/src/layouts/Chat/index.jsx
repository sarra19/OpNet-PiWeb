/* eslint-disable */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  chatContainer: {
    padding: theme.spacing(2),
    borderRadius: theme.spacing(1),
    boxShadow: theme.shadows[2],
    backgroundColor: theme.palette.background.paper,
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
    marginTop: theme.spacing(2), // Add spacing between containers
  },
  chatDetails: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(1),
  },
  buttonContainer: {
    marginLeft: 'auto',
  },
  chatList: {
    marginTop: theme.spacing(5), // Add top margin
  },
}));

function ChatManagement() {
  const classes = useStyles();
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

  const handleDeleteChat = async (chatId) => {
    try {
      await axios.delete(`http://localhost:5000/chat/deleteChatRoom/${chatId}`);
      setChats(chats.filter(chat => chat._id !== chatId));
    } catch (error) {
      console.error("Error deleting chat:", error);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar absolute isMini />
      <MDBox mt={8}>
        <MDBox mb={3}>
          {error && <div>Error: {error}</div>}
          {chats.map((chat, index) => (
            <div className={classes.chatContainer} key={index}>
              <div className={classes.chatDetails}>
                <Typography variant="subtitle1">{chat.nameChat}</Typography>
                <div className={classes.buttonContainer}>
                  <Button component={Link} to={`/messages/${chat._id}`} variant="contained" color="primary">
                    View Messages
                  </Button>
                  <Button variant="contained" color="secondary" onClick={() => handleDeleteChat(chat._id)}>
                    Delete
                  </Button>
                  <Button component={Link} to={`/updateChat/${chat._id}`} variant="contained" color="default">
                    Modify
                  </Button>
                </div>
              </div>
              <Typography variant="body2"> {chat.NbParticipantsChat} participants</Typography>
              <Typography variant="body2"><strong>Type:</strong> {chat.TypeChat}</Typography>
            </div>
          ))}
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default ChatManagement;
