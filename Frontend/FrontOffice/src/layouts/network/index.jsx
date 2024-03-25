/* eslint-disable */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";

const useStyles = makeStyles((theme) => ({
  userContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),
    borderRadius: theme.spacing(1),
    boxShadow: theme.shadows[2],
    backgroundColor: theme.palette.background.paper,
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
  },
  profileImage: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    marginBottom: theme.spacing(1),
  },
  userName: {
    marginBottom: theme.spacing(1),
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing(1),
  },
}));

function Network() {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/user/getall");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("Error fetching users. Please try again later.");
      }
    };

    fetchUsers();
  }, []);

  const handleContact = async (userId) => {
    try {
      const senderId = window.sessionStorage.getItem('userId');
      const updatedChatData = {
        senderId: senderId,
        receiverId: userId,
      };

      const response = await axios.post("http://localhost:5000/chat/", updatedChatData);
      // No need to navigate programmatically, handle navigation using Link
    } catch (error) {
      console.error("Error creating chat:", error);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar absolute isMini />
      <MDBox mt={8}>
        <MDBox mb={3}>
          <Grid container spacing={2}>
            {users.map((user, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <div className={classes.userContainer}>
                  <Avatar src={user.profileImage} alt="Profile" className={classes.profileImage} />
                  <Typography variant="subtitle2" className={classes.userName}>{user.firstname} {user.lastname}</Typography>
                  <Typography variant="body2"><strong>Specialité:</strong> {user.speciality}</Typography>
                  <div className={classes.buttonContainer}>
                    <Button size="small" variant="contained" color="primary">
                      <Link to={`/user/${user._id}`} style={{ textDecoration: "none", color: "white" }}>Voir Profile</Link>
                    </Button>
                    <Button size="small" component={Link} to={`/Chat`} onClick={() => handleContact(user._id)} variant="contained" color="secondary" style={{ marginLeft: 8 }}>
                      Contacter
                    </Button>
                  </div>
                </div>
              </Grid>
            ))}
          </Grid>
          {error && <div>Error: {error}</div>}
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Network;

