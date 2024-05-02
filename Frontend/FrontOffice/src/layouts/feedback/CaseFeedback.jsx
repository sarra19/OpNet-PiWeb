/* eslint-disable */
import { useState, useEffect } from 'react';
import { Grid, Card, Stack, Typography, Divider, Button, Icon, Dialog, DialogTitle, DialogContent , DialogActions, Box  } from '@mui/material';
import axios from 'axios';

export default function CaseFeedback({ interview, validated }) {
  const [hrFeedback, setHrFeedback] = useState(validated);
  const [feedbackText, setFeedbackText] = useState('');
  const [openFeedbackDialog, setOpenFeedbackDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  useEffect(() => {
    setHrFeedback(validated);
  }, [validated]);


  const handleViewFeedback = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/feedbacks/getfeedback/${interview._id}`);
      const feedbackPartsArray = Object.values(response.data.feedbackParts);
      setFeedbackText(feedbackPartsArray); // Mettez à jour pour utiliser feedbackPartsArray
      setOpenViewDialog(true);
    } catch (error) {
       alert('Aucun feedback disponible.');
    }
  };

  const handleCloseViewDialog = () => {
    setOpenViewDialog(false);
  };

  const handleCloseFeedbackDialog = () => {
    setOpenFeedbackDialog(false);
  };

  const isFeedbackEmpty = interview.feedbacks.length === 0;
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  return (
    <Grid item xs={12} md={4} ml={1} mt={4} textAlign="center">
      <Card variant="outlined" sx={{ maxWidth: 360 }} style={{ height: '200px', width: '300px' }}>
        <Stack  justifyContent="space-between" alignItems="center">
          <Typography gutterBottom variant="h5" color="Black" component="div" mt={1}>{truncateText(interview.title, 28)}</Typography>
          <Typography variant="h6" color="red" >{interview.typeIntrv}</Typography>
        </Stack>
        <Divider />
        <Stack direction="column" alignItems="center" p={2} mt={-2}>
          {hrFeedback ? (
              <Typography variant="body2" color="lightgreen" fontWeight={400} mb={0.6} mt={0.3}>Validée</Typography>
          ) : (
            <Typography variant="body2" color="brown" fontWeight={400} mb={0.6} mt={0.3}>En attente</Typography>
          )}
          {!isFeedbackEmpty && ( // Affiche le bouton uniquement si des feedbacks sont disponibles
            <Box display="flex" justifyContent="center">
              <Button style={{ color: "Black" }} onClick={handleViewFeedback}> Voir Feedback <Icon style={{ marginLeft: "8px", marginBottom: "1px"}} fontSize="small">visibility</Icon></Button>
            </Box>
          )}
        </Stack>
      </Card>

      <Dialog open={openViewDialog} onClose={handleCloseViewDialog}>
        <DialogTitle variant="h6" color="Black" textAlign={'center'}>Feedback</DialogTitle>
          <DialogContent>
            {Array.isArray(feedbackText) && feedbackText.map((part, index) => (
                <span key={index} style={{ color: part.color }}>{part.text}</span>
            ))}
          </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseViewDialog} style={{ color: "Black" }}>Fermer</Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
