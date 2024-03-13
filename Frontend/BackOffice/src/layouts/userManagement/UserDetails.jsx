/* eslint-disable */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import { makeStyles } from "@mui/styles";
import { Grid, Paper, Typography } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(4),
    color: "#0000",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    borderRadius: theme.spacing(2),
    marginBottom: theme.spacing(4), // Ajouter une marge en bas
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: theme.spacing(1),
  },
  avatarWrapper: {
    width: theme.spacing(14), // Taille agrandie pour les avatars
    height: theme.spacing(14),
  },
  redText: {
    color: "#B3272B",
  },
}));

function UserDetails() {
  const classes = useStyles();
  const [user, setUser] = useState(null);
  const { userId } = useParams(); // Récupérer l'ID de l'utilisateur depuis les paramètres de l'URL

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        // Utilisez l'ID récupéré dans la requête pour récupérer les détails de l'utilisateur
        const response = await axios.get(`http://localhost:5000/user/get/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [userId]); // Assurez-vous d'inclure userId dans la liste des dépendances du useEffect

  return (
    <DashboardLayout>
      <DashboardNavbar absolute isMini />
      <MDBox mt={8}>
        <Grid container style={{ height: "100%" }} justifyContent="center" alignItems="center">
          <Grid item xs={12} sm={6}>
            <Paper className={classes.paper}>
              {user && (
                <div>
                  <Typography variant="h4" gutterBottom>User Details</Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6} className={classes.avatarWrapper}>
                      <img className={classes.image} alt="Profile Picture" src={user.profileImage} />
                    </Grid>
                    <Grid item xs={6} className={classes.avatarWrapper}>
                      <img className={classes.image} alt="CV" src={user.cv} />
                    </Grid>
                  </Grid>
                  <Typography variant="h6" gutterBottom>
                    <span className={classes.redText}>{`${user.firstname} ${user.lastname}`}</span>
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>Email: {user.email}</Typography>
                  <Typography variant="subtitle1" gutterBottom>Date of Birth: {user.dateOfBirth}</Typography>
                  <Typography variant="subtitle1" gutterBottom>Country: {user.country}</Typography>
                  <Typography variant="subtitle1" gutterBottom>Phone: {user.phone}</Typography>
                  <Typography variant="subtitle1" gutterBottom>Speciality: {user.speciality}</Typography>
                  <Typography variant="subtitle1" gutterBottom>Institution: {user.institution}</Typography>
                  <Typography variant="subtitle1" gutterBottom>Languages: {user.languages}</Typography>
                  <Typography variant="subtitle1" gutterBottom>Description: {user.description}</Typography>
                  <Typography variant="subtitle1" gutterBottom>Skills: {user.skills}</Typography>
                  <Typography variant="subtitle1" gutterBottom>Experience: {user.experience}</Typography>
                  <Typography variant="subtitle1" gutterBottom>Formation: {user.formation}</Typography>
                  <Typography variant="subtitle1" gutterBottom>Certificates: {user.certificates}</Typography>
                  {/* Affichez d'autres détails de l'utilisateur ici */}

              
                </div>
              )}
            </Paper>
          </Grid>
        </Grid>
      </MDBox>
      <MDBox mt={4}>
        {/* Ajouter une marge en haut pour le footer */}
        <Footer />
      </MDBox>
    </DashboardLayout>
  );
}

export default UserDetails;

