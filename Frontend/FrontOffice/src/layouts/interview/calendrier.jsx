/* eslint-disable */
import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { Grid, Icon } from "@mui/material";
import Footer from "examples/Footer";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import MDBox from "components/MDBox";
import axios from "axios";
import 'moment/locale/fr';
import { Link } from "react-router-dom";
const localizer = momentLocalizer(moment);
moment.locale('fr');
function Calendrier() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://localhost:5000/interviews/getall");
      if (!response.data || !Array.isArray(response.data)) {
        throw new Error("Invalid response format");
      }
  
      const formattedEvents = response.data.map(event => ({
        ...event,
        start: moment(event.dateInterv, 'YYYY-MM-DDTHH:mm:ss').toDate(),
        end: moment(event.dateInterv, 'YYYY-MM-DDTHH:mm:ss').toDate(),
      }));
  
      setEvents(formattedEvents);
    } catch (error) {
      console.error('Error fetching events:', error.message);
    }
  };
  

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setDialogOpen(true);
  };

  const handleCloseDetails = () => {
    setDialogOpen(false);
    setSelectedEvent(null);
  };
  const messages = {
    allDay: 'Toute la journée',
    previous: 'Précédent',
    next: 'Suivant',
    today: 'Aujourd\'hui',
    month: 'Mois',
    week: 'Semaine',
    day: 'Jour',
    agenda: 'Agenda',
    date: 'Date',
    time: 'Heure',
    event: 'Événement',
    noEventsInRange: 'Aucun événement',
    showMore: total => `+ ${total} de plus`
  };
  const redTextStyle = {
    color: 'white',
    backgroundColor: 'rgba(500, 10, 20, 0.7)',
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
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={3} mb={3}>
        <Grid container justifyContent="center">
          <Grid item xs={12} md={8}>
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              onSelectEvent={handleEventClick}
              style={{ height: '500px' }}
              messages={messages}
              eventPropGetter={() => ({ style: redTextStyle })}
            />
            <Button  style={{ marginInline:"43%", marginTop : "20px", color: 'red' }}  onClick={handleCloseDetails} ><Icon style={{ marginRight: "10px" }} fontSize="small">undo</Icon><Link  style={{ color: 'inherit' }} to={`/entretien`}>Retour</Link></Button>
            <Dialog open={dialogOpen} onClose={handleCloseDetails}>
              <DialogTitle>{selectedEvent && selectedEvent.title}</DialogTitle>
              <DialogContent style={{ height: '180px', width: '400px' }} >
                {selectedEvent && (
                  <div className="event-details">
                    <h3 className="red-text" style={ {marginBottom: "25px"}}>{selectedEvent.descrInter}</h3>
                      <p className="thin-text"><strong>Date :</strong>{formatInterviewDate(selectedEvent.dateInterv)}</p>
                      <p className="thin-text"><strong>Adresse :</strong>{selectedEvent.address}</p>
                      <p className="thin-text"><strong>Type d'entretien :</strong>{selectedEvent.typeIntrv}</p>
                      <p className="thin-text"><strong>Etat entretien :</strong>{selectedEvent.statusInterv}</p>
                  </div>
                )}
              </DialogContent>
              <DialogActions>
                <Button style={{ color: 'red' }}onClick={handleCloseDetails} className="red-text">Fermer</Button>
              </DialogActions>
            </Dialog>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Calendrier;
