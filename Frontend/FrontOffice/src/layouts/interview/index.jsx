/* eslint-disable */
import React, { useEffect, useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import { Link } from "react-router-dom";
import "./index.css";
import { Alert, Icon } from "@mui/material";
function Interview() {
  const [searchInput, setSearchInput] = useState("");
  const [interviews, setInterviews] = useState([]);
  const [interviewToDelete, setInterviewToDelete] = useState(null);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [canRequestAnotherDate, setCanRequestAnotherDate] = useState(true);

  useEffect(() => {
    getInterviews();
  }, []);

  const getInterviews = async () => {
    try {
      const response = await axios.get("http://localhost:5000/interviews/getall");
      const filteredInterviews = response.data.filter(interview => interview.statusInterv !== "Décliné");
      setInterviews(filteredInterviews);
    } catch (error) {
      console.error("Erreur lors de la récupération des entretiens:", error);
    }
  };


  const formatInterviewDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getUTCDate().toString().padStart(2, '0');
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // Les mois sont indexés à partir de 0, donc ajoutez 1
    const year = date.getUTCFullYear().toString().slice(-2); // Obtenir les deux derniers chiffres de l'année
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    return `${day}/${month}/${year}   ${hours}:${minutes}`;
  };

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };
  const filteredInterviews = interviews.filter((interview) => {
    const titleMatch = interview.title.toLowerCase().includes(searchInput.toLowerCase());
    const descrInterMatch = interview.descrInter && interview.descrInter.toLowerCase().includes(searchInput.toLowerCase());
    return titleMatch || descrInterMatch;
  });

  //confirmation supp
  const handleDeclineClick = (interviewId) => {
    setInterviewToDelete(interviewId);
    setConfirmationOpen(true);
  };

  const handleConfirmationClose = (confirmed) => {
    setConfirmationOpen(false);
    if (confirmed) {
      // Supprimer l'entretien seulement si l'utilisateur a confirmé
      deleteInterview();
    } else {
      // Réinitialiser l'interviewToDelete si l'utilisateur a annulé
      setInterviewToDelete(null);
    }
  };

  const deleteInterview = () => {
    axios
      .delete(`http://localhost:5000/interviews/deleteintrv/${interviewToDelete}`)
      .then(() => {
        getInterviews();
      })
      .catch((error) => {
        console.error("Erreur lors de la suppression de l'entretien:", error);
      })
      .finally(() => {
        setInterviewToDelete(null);
      });
  };

  const [message, setMessage] = useState(null);
  const showMessage = (text) => {
    setMessage(text);
    setTimeout(() => {
      setMessage(null);
    }, 10000); 
  };

  const requestAnotherDate = (interviewId) => {
    fetch(`http://localhost:5000/interviews/fixAnotherDate/${interviewId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error(`Erreur HTTP ${response.status}`);
        }
    })
    .then(data => {
        console.log('Réponse du serveur:', data);
        if (data && data.success) {
            setInterviews(prevInterviews => {
                const updatedInterviews = prevInterviews.map(interview => {
                    if (interview._id === interviewId) {
                        return { ...interview, statusInterv: "Demande report" };
                    }
                    return interview;
                });
                return updatedInterviews;
            });
            showMessage("Votre demande a été envoyée avec succès!");
        } else {
            showMessage("Une erreur s'est produite ! Réessayez plus tard");
        }
    })
    .catch(error => {
        console.error('Erreur lors de la requête:', error);
        showMessage(`Erreur lors de l'envoi de la demande: ${error.message}`);
    })
};



  
  

 
  
  return (
    <DashboardLayout>
      <DashboardNavbar searchInput={searchInput} onSearchInputChange={handleSearchInputChange}/>
      <MDBox mt={3} mb={3}>
        <Grid container justifyContent="center">
          <Grid item xs={12} md={8}>
            
            <Typography variant="h2" mb={7} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              Vos entretiens
              <Button style={{marginTop:"10px" , color: 'red' }}>
                <Icon style={{ marginRight: "10px" }} fontSize="small">event_note</Icon><Link  style={{ color: 'inherit' }} to={`/calendrier`}>Voir calendrier</Link>
              </Button>
            </Typography>
            {message && (
              <Alert style={{ textAlign: "center" , marginBottom: "15px"}}>
                <strong>{message}</strong>
                </Alert>
            )}
            <Grid container spacing={2} mb={13}>
            {filteredInterviews.map((interview, index) => (
                <Grid item key={interview.id || index } xs={12} sm={6} md={4}>
                  <Card  style={{ height: '360px', width: '100%' }}>
                    <CardContent>
                    <Typography variant="h5">{interview.title}</Typography>
                      <Typography variant="h6" mt={2}>
                        <div className="interview-details">
                          <h4 className="red-text" style={{ textAlign: "center", marginBottom: "25px" }}>{interview.descrInter}</h4>
                          <p className="thin-text"><strong>Date :</strong>{formatInterviewDate(interview.dateInterv)}</p>
                          <p className="thin-text"><strong>Adresse :</strong>{interview.address}</p>
                          <p className="thin-text"><strong>Type d'entretien :</strong>{interview.typeIntrv}</p>
                          <p className="thin-text"><strong>Etat entretien :</strong>{interview.statusInterv}</p>
                        </div>
                      </Typography>
                      <div style={{ display: "flex", marginTop: "16px" }}>
                        <Button style={{ marginRight: "8px", color: 'red' }} onClick={() => handleDeclineClick(interview._id)} >
                          Décliner
                        </Button>
                        <Button style={{ color: 'red' }} onClick={() =>  requestAnotherDate(interview._id)} disabled={interview.statusInterv === "Demande report"} >
                          Autre date ?
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </MDBox>
      <Dialog open={confirmationOpen} onClose={() => handleConfirmationClose(false)}>
        <DialogTitle>Voulez-vous vraiment décliner cet entretien ?</DialogTitle>
        <DialogActions>
          <Button onClick={() => handleConfirmationClose(false)} color="primary">
            Non
          </Button>
          <Button onClick={() => handleConfirmationClose(true)} color="primary">
            Oui
          </Button>
        </DialogActions>
      </Dialog>       
      <Footer />
    </DashboardLayout>
  );
}

export default Interview;
