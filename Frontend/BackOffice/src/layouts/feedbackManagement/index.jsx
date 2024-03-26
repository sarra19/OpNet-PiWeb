/* eslint-disable */
import {  Button, Card,  Divider, Grid, Icon, Stack, Typography } from "@mui/material";
import MDBox from "components/MDBox";
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import React , { useState }from "react";
import { Link } from "react-router-dom";


// Composant représentant une étape de feedback
function FeedbackStep({ title, onValid, onInvalid }) {
  const [isValid, setIsValid] = useState(null);

  const handleValidClick = () => {
    setIsValid(true);
    onValid();
  };

  const handleInvalidClick = () => {
    setIsValid(false);
    onInvalid();
  };

  return (
    <div>
      {isValid === null ? (
        <div>
          <Button style={{ color: 'green'}} onClick={handleValidClick}>
            Validé
            <Icon style={{ marginLeft: "10px" ,marginBottom: "1px" }} fontSize="small">event_available</Icon>
          </Button>
          <Button style={{ color: 'red'}} onClick={handleInvalidClick}>
            Non validé
            <Icon style={{ marginLeft: "10px" ,marginBottom: "1px" }} fontSize="small">event_busy</Icon>
          </Button>
        </div>
      ) : (
        <Button><Link  style={{ color: 'inherit' }} to={`/enregistreur_vocale`} > Feedback </Link>
          <Icon style={{ marginLeft: "8px"  , marginBottom: "1px"}} fontSize="small">graphic_eq</Icon>
        </Button>
      )}
      {isValid !== null && <Typography style={{color : "#344880" , fontSize:"20px" }} >{isValid ? 'Validé' : 'Non validé'}</Typography>}
    </div>
  );
}

function FeedBackManagement() {
  const [hrFeedback, setHrFeedback] = useState(null);
  const [technicalFeedback, setTechnicalFeedback] = useState(null);
  const [psychologicalFeedback, setPsychologicalFeedback] = useState(null);

  const handleHrFeedback = (isValid) => {
    setHrFeedback(isValid);
  };

  const handleTechnicalFeedback = (isValid) => {
    setTechnicalFeedback(isValid);
  };

  const handlePsychologicalFeedback = (isValid) => {
    setPsychologicalFeedback(isValid);
  };


  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={5} mb={5}>
        <Grid container justifyContent="center">
          <Grid item xs={10} md={8}>
            <Typography variant="h2" mb={3} textAlign="center">Feedback</Typography>
              <Grid container justifyContent="center">
                <Grid item xs={12} md={4} textAlign="center" p={2}>
                  <Card variant="outlined" sx={{ maxWidth: 360 }} style={{ height: '200px', width: '269px' }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" p={2}>
                      <Typography gutterBottom variant="h5" component="div" ml={7}>Entretien HR</Typography>
                    </Stack>
                    <Divider />
                    <Stack direction="column" alignItems="center" p={2} mt={-2}>
                      <FeedbackStep
                        title="Entretien HR"
                        onValid={() => handleHrFeedback(true)}
                        onInvalid={() => handleHrFeedback(false)}
                      />
                    </Stack>
                  </Card>
                </Grid>
                <Grid item xs={12} md={4} textAlign="center" p={2}>
                  <Card variant="outlined" sx={{ maxWidth: 360 }} style={{ height: '200px', width: '269px' }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" p={2}>
                      <Typography gutterBottom variant="h5" component="div" ml={3}>Entretien Technique</Typography>
                    </Stack>
                    <Divider />
                    <Stack direction="column" alignItems="center" p={2}  mt={-2}>
                      <FeedbackStep
                        title="Entretien Technique"
                        onValid={() => handleTechnicalFeedback(true)}
                        onInvalid={() => handleTechnicalFeedback(false)}
                      />
                    </Stack>
                  </Card>
                </Grid>
                <Grid item xs={12} md={4} textAlign="center" p={2}>
                  <Card variant="outlined" sx={{ maxWidth: 360  }} style={{ height: '200px', width: '269px' }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" p={2}>
                      <Typography gutterBottom variant="h5" component="div" ml={1}>Entretien Psychologique</Typography>
                    </Stack>
                    <Divider />
                    <Stack direction="column" alignItems="center" p={2} mt={-2}>
                      <FeedbackStep
                        title="Entretien Psychologique"
                        onValid={() => handlePsychologicalFeedback(true)}
                        onInvalid={() => handlePsychologicalFeedback(false)}
                      />
                    </Stack>
                  </Card>
                </Grid>
              </Grid>
              <h3>Résumé du feedback :</h3>
              <p>Entretien HR : {hrFeedback === null ? 'Non effectué' : hrFeedback ? 'Validé' : 'Non validé'}</p>
              <p>Entretien Technique : {technicalFeedback === null ? 'Non effectué' : technicalFeedback ? 'Validé' : 'Non validé'}</p>
              <p>Entretien Psychologique : {psychologicalFeedback === null ? 'Non effectué' : psychologicalFeedback ? 'Validé' : 'Non validé'}</p>
          </Grid>
        </Grid>
      </MDBox>    
      <Footer />
    </DashboardLayout>    
  );
}


export default FeedBackManagement;
