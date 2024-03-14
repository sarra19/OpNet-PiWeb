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

const useStyles = makeStyles((theme) => ({
  userContainer: {
    padding: theme.spacing(2),
    borderRadius: theme.spacing(1),
    boxShadow: theme.shadows[2],
    backgroundColor: theme.palette.background.paper,
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
  },
  userDetails: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(1),
  },
  profileImage: {
    width: theme.spacing(6),
    height: theme.spacing(6),
    marginRight: theme.spacing(2),
  },
  buttonContainer: {
    marginLeft: 'auto',
  },
  userList: {
    marginTop: theme.spacing(5), // Ajouter une marge supérieure
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

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/user/deleteUser/${userId}`);
      setUsers(users.filter(user => user._id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar absolute isMini />
      <Grid container spacing={2} className={classes.userList}> {/* Ajouter une classe pour la marge supérieure */}
        {users.map((user, index) => (
          <Grid item xs={12} key={index}>
            <div className={classes.userContainer}>
              <div className={classes.userDetails}>
                <Avatar src={user.profileImage} alt="Profile" className={classes.profileImage} />
                <Typography variant="subtitle1">{user.firstname} {user.lastname}</Typography>
                <div className={classes.buttonContainer}>
                  <Button component={Link} to={`/user/${user._id}`} variant="contained" color="primary">
                    Voir Profile
                  </Button>
                  <Button component={Link} to={`/user/${user._id}`} variant="contained" color="error">
                    Contacter
                  </Button>
                </div>
              </div>
              <Typography variant="body2"><strong>Speciality:</strong> {user.speciality}</Typography>
            </div>
          </Grid>
        ))}
      </Grid>
      {error && <div>Error: {error}</div>}
      <Footer />
    </DashboardLayout>
  );
}

export default Network;

