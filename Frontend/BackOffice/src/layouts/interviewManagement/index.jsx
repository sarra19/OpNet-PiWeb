/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
/* eslint-disable */
// @mui material components
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { useEffect, useState } from "react";
import axios from "axios";  
import "./index.css";
import { DateTime } from "luxon";
import { Button, Dialog, DialogContent, DialogTitle, Icon, MenuItem, TextField } from "@mui/material";
import { Link } from "react-router-dom";
/* eslint-disable */

function InterviewManagement() {
  const [interviews, setInterviews] = useState([]);

  const getInterviews = async () => {
    try {
      const response = await axios.get("http://localhost:5000/interviews/getall");
      return response; 
    } catch (error) {
      console.error("Erreur lors de la récupération des entretiens:", error);
      throw error; 
    }
  };
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getInterviews();
        if (response && response.data) {
          setInterviews(response.data);
        } else {
          console.error("Error: Response or response data is undefined");
        }
      } catch (error) {
        console.error("Error fetching interview data", error);
      }
    };    
    fetchData();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "Décliné":
        return "red";
      case "Demande report":
        return "darkorange";
      case "En attente":
        return "darkblue";
      case "Terminé":
        return "green";
      default:
        return "black";
    }
  };

  const formatDateTime = (dateString) => {
    const date = DateTime.fromISO(dateString, { zone: "Africa/Tunis" });
    return date.toFormat("yyyy-MM-dd   HH:mm");
  };

  const deleteInterview = async (interviewId) => {
    try {
      await axios.delete(`http://localhost:5000/interviews/deleteintrvB/${interviewId}`);
      // Actualisez l'état des entretiens après la suppression
      const updatedInterviews = interviews.filter((interview) => interview._id !== interviewId);
      setInterviews(updatedInterviews);
    } catch (error) {
      console.error("Erreur lors de la suppression de l'entretien :", error);
    }
  };

  const [message, setMessage] = useState(null);
  const showMessage = (text) => {
    setMessage(text);
    setTimeout(() => {
      setMessage(null);
    }, 10000); 
  };

  const [addFormOpen, setAddFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    descrInter: "",
    candidateName: "",
    dateInterv: "",
    address: "",
    typeIntrv: "En ligne", 
    statusInterv: "A venir",
  });

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  

  const handleOpenAddForm = () => {
    setAddFormOpen(true);
  };

  const handleCloseAddForm = () => {
    setAddFormOpen(false);
  };

  const handleAddInterview = async () => {
    try {
      // Enregistrez les nouvelles données directement dans la liste des entretiens
      setInterviews([...interviews, formData]);
  
      // Envoyez la requête au serveur pour sauvegarder les données
      const response = await axios.post("http://localhost:5000/interviews/add", formData);
      if (response.status === 200) {
        // Fermez le formulaire après l'ajout réussi
        handleCloseAddForm();
      } else {
        console.error("Erreur lors de l'ajout de l'entretien");
      }
    } catch (error) {
      // Gérez les erreurs ici
      console.error("Erreur lors de l'ajout de l'entretien:", error);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={5} mb={5}>
      <Grid container justifyContent="center">
          <Grid item xs={15} md={11}>
            <Typography variant="h2" mb={3} style={{ display: 'flex'}}>
              Vos entretiens
              <div style={{ marginLeft: "auto", marginRight: "10px" }} >
                <Button style={{marginTop:"10px" , color: 'red' }}>
                  <Icon style={{ marginRight: "10px" }} fontSize="small">event_note</Icon><Link  style={{ color: 'inherit' }} to={`/calendrier`}>Voir calendrier</Link>
                </Button>
              </div>
              <Button style={{marginTop:"10px" , color: 'red' }} onClick={handleOpenAddForm} >
                <Icon style={{ marginRight: "10px" }} fontSize="small">add_to_photos</Icon>Ajouter entretien
              </Button>
            </Typography>
            <Grid container spacing={2}>
              {interviews.map((interview, index) => (
                <Grid item key={interview._id || index} xs={12}>
                  <Paper
                    elevation={3}
                    className={`${getStatusColor(interview.statusInterv)}-border ${getStatusColor(interview.statusInterv)}-background inline-elements`}
                    style={{
                      backgroundColor: "gray",
                      padding: "10px",
                      borderRadius: "12px",
                      border: "2px solid",
                    }}
                  >
                    <Typography variant="h5" style={{ marginTop: 2 , marginRight: 20}}>{interview.title}</Typography>
                    <Typography style={{ marginRight: 20 }}>{interview.descrInter}</Typography>
                    <Typography style={{ marginRight: 20 }}> {formatDateTime(interview.dateInterv)}</Typography>
                    <Typography >{interview.typeIntrv}</Typography>
                    <div style={{ marginLeft: "auto", marginRight: "10px" }} >
                      <Icon style={{ marginRight: "30px" , color: "#013a63" }} fontSize="medium" onClick={() => handleDelete(interview._id)}>edit_calendar</Icon>
                      <Icon style={{ marginRight: "20px" , color: "#013a63"}} fontSize="medium" onClick={() => deleteInterview(interview._id)}>delete_forever</Icon>
                    </div>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </MDBox >
      <Dialog open={addFormOpen} onClose={handleCloseAddForm}>
        <DialogTitle>Ajouter un entretien</DialogTitle>
        <DialogContent>
          <form>
            <TextField style={{marginBlock:"10px"}}  label="Title" name="title" value={formData.title} onChange={handleInputChange} fullWidth />
            <TextField style={{marginBlock:"10px"}}  label="Description d'entretien" name="descrInter" value={formData.descrInter} onChange={handleInputChange} fullWidth multiline />
            <TextField style={{ marginBlock: "10px" }} label="Nom du candidat" name="candidateName" value={formData.candidateName} onChange={handleInputChange} fullWidth/>
            <TextField style={{ marginBlock: "10px" }}  type="datetime-local" name="dateInterv" value={formData.dateInterv} onChange={handleInputChange} fullWidth />

            <TextField style={{marginBlock:"10px"}}  label="Adresse" name="address" value={formData.address} onChange={handleInputChange} fullWidth />
            <TextField style={{marginBlock:"10px"}}  label="Etat d'entretien" name="statusInterv" value={formData.statusInterv} onChange={handleInputChange} fullWidth />
            <TextField style={{ marginBlock: "10px" }} label="Type d'entretien" name="typeIntrv" value={formData.typeIntrv} onChange={handleInputChange} fullWidth select  >
              <MenuItem value="En ligne" >En ligne</MenuItem>
              <MenuItem value="En face">En face</MenuItem>
            </TextField>
            <Button variant="contained" style={{backgroundColor:"red" , color: 'white' , marginTop:"23px"}} onClick={handleAddInterview}>
              Ajouter 
            </Button>
          </form>
        </DialogContent>
      </Dialog>
      <Footer />
    </DashboardLayout>
  );
}

export default InterviewManagement;

