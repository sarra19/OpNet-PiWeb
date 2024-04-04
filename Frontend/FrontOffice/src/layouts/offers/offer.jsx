/*eslint-disable*/
import React, { useState, useEffect } from "react";
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import axios from "axios";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Header from "layouts/profile/components/Header";
import Footer from "examples/Footer";
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import myLocalImage from "../offers/img/offre..webp";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EventIcon from "@mui/icons-material/Event";
import WorkIcon from "@mui/icons-material/Work";
import FavoriteIcon from '@mui/icons-material/Favorite'; // Importer l'icône pour le bouton "J'adore"
import { Link } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  card: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: theme.spacing(2), // Ajoute un espacement entre les cartes
    padding: theme.spacing(2), // Ajoute un espace à l'intérieur de la carte
    borderRadius: theme.spacing(1), // Ajoute des bords arrondis à la carte
    boxShadow: theme.shadows[1], // Ajoute une ombre à la carte
    backgroundColor: theme.palette.background.paper, // Change la couleur de fond de la carte
  },
  media: {
    height: 300,
    width: '100%', // Utilisez la largeur maximale disponible pour l'image
    objectFit: 'cover', // Assurez-vous que l'image est entièrement visible sans étirement
    borderTopLeftRadius: theme.spacing(1), // Bords arrondis seulement en haut à gauche
    borderTopRightRadius: theme.spacing(1), // Bords arrondis seulement en haut à droite
  },
  title: {
    fontSize: "1.5rem", // Réduisez la taille du titre pour correspondre au style de Facebook
    fontWeight: "bold",
    color: "#DC143C", // Changer la couleur du titre en rouge brique
},

  description: {
    fontSize: "1rem",
    color: theme.palette.primary.main,
  },
  icon: {
    marginRight: theme.spacing(1),
    verticalAlign: "middle",
  },
  detailsText: {
    color: "black",
  },
}));

function Offers() {
  const [offers, setOffers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedOffer, setExpandedOffer] = useState(null);
  const [comments, setComments] = useState({});
  const [likes, setLikes] = useState({});
  const [allComments, setAllComments] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [avatarImage, setAvatarImage] = useState(null);

  const itemsPerPage = 6;

  const classes = useStyles();

  useEffect(() => {
    fetchOffers();
  }, [searchTerm, sortOrder, currentPage]);

  const fetchOffers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/offer/getall", {
        params: {
          searchTerm: searchTerm,
          sortOrder: sortOrder,
        },
      });
      setOffers(response.data);
    } catch (error) {
      console.error("Error fetching offers:", error);
    }
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleExpandOffer = (offer) => {
    setSelectedOffer(offer);
    setOpenModal(true);
    if (!allComments[offer._id]) {
      handleGetAllComments(offer);
    }
  };
  

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleAvatarClick = () => {
    inputRef.current.click();
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  const handleChangeSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCommentKeyPress = (e, offerId) => {
    if (e.key === 'Enter') {
      let commentText = e.target.value;
      handleComment(offerId, commentText);
      e.target.value = '';
    }
  };
  const handleGetAllComments = async (offerId) => {
    try {
      const response = await axios.get(`http://localhost:5000/offer/${offerId}/comments`);
      console.log(response.data); // Affichez les commentaires reçus du backend
      // Mettez à jour l'état local des commentaires
      setAllComments({ ...allComments, [offerId]: response.data });
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };
  const handleLikeUnlike = async (offerId) => {
    try {
      if (likes[offerId]) {
        await axios.delete(`http://localhost:5000/offer/${offerId}/like`);
      } else {
        await axios.post(`http://localhost:5000/offer/${offerId}/like`);
      }
      const response = await axios.get(`http://localhost:5000/offer/${offerId}/like`);
      setLikes(prevLikes => ({
        ...prevLikes,
        [offerId]: response.data.likes
      }));
    } catch (error) {
      console.error('Error adding/removing like:', error);
    }
  };

  const handleComment = async (offerId, comment) => {
    try {
      const response = await axios.post(`http://localhost:5000/offer/${offerId}/comment/add`, { text: comment });
      console.log(response.data.message);
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleLikeComment = async (offerId, comment) => {
    try {
      if (likes[offerId] && likes[offerId][comment._id]) {
        await axios.delete(`http://localhost:5000/offer/${offerId}/comment/${comment._id}/like`);
      } else {
        await axios.post(`http://localhost:5000/offer/${offerId}/comment/${comment._id}/like`);
      }
      const response = await axios.get(`http://localhost:5000/offer/${offerId}/comment/${comment._id}/like`);
      setLikes(prevLikes => ({
        ...prevLikes,
        [offerId]: {
          ...prevLikes[offerId],
          [comment._id]: response.data.like
        }
      }));
    } catch (error) {
      console.error('Error liking/commenting on comment:', error);
    }
  };

  const handleDeleteComment = async (offerId, comment) => {
    try {
      await axios.delete(`http://localhost:5000/offer/${offerId}/comment/${comment._id}/delete`);
      // Mise à jour de l'état local des commentaires pour refléter les changements...
    } catch (error) {
      console.error('Erreur lors de la suppression du commentaire:', error);
    }
  };

  return (
    <DashboardLayout>
      <Header>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Liste Des Offres
          </MDTypography>
        </MDBox>
        <MDBox display="flex" alignItems="center" justifyContent="space-between" pt={4} pb={3} px={3}>
          <MDBox flex="4"  mt={2} mb={8}>
            <MDInput
              type="textarea"
              placeholder="Rechercher..."
              fullWidth
              value={searchTerm}
              onChange={handleChangeSearchTerm}
            />
          </MDBox>
          <MDBox flex="1" mt={2} mb={8}>
            <MDButton variant="gradient" color="info" onClick={() => fetchOffers()}>
              Rechercher
            </MDButton>
          </MDBox>
        </MDBox>
        <Grid container spacing={2}>
          {offers
            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
            .map((offer) => (
              <Grid item xs={12}  sm={6} md={4}  key={offer._id}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.media}
                    image={offer.file instanceof Blob ? URL.createObjectURL(offer.file) : myLocalImage}
                    title="Your Image Title"
                  />
                  <CardContent>
                    <Typography variant="h6" className={classes.title}>{offer.title}</Typography>
                    <Typography>
                      <LocationOnIcon className={classes.icon} />
                      {offer.location}
                    </Typography>
                    <Typography>
                      <EventIcon className={classes.icon} />
                      Expiration Date: {formatDate(offer.expirationDate)}
                    </Typography>
                    <Typography variant="h6">commentaires:</Typography>
                    <MDInput
                      type="textarea"
                      placeholder="Votre commentaire..."
                      fullWidth
                      value={comments[offer._id] || ''}
                      onChange={(e) => setComments({ ...comments, [offer._id]: e.target.value })}
                      onKeyPress={(e) => handleCommentKeyPress(e, offer._id)}
                    />
                    <Grid container alignItems="center" spacing={2}>
                    <Grid item>
                        <Button
                          onClick={() => handleGetAllComments(offer._id)}
                          color="primary"
                        >
                          Tous les commentaires
                        </Button>
                      </Grid>
                    </Grid>
                    {allComments[offer._id] && allComments[offer._id].map((comment, index) => (
                      <Box key={index} mt={2}>
                        <Box display="flex" alignItems="center">
                          <Avatar sx={{ bgcolor: '#2196F3', marginRight: 1 }}>{comment.user.charAt(0)}</Avatar>
                          <Typography variant="subtitle2" color="text.primary" fontWeight="bold">{comment.user}</Typography>
                        </Box>
                        <Typography>{comment.text}</Typography>
                        <Box display="flex" alignItems="center">
                          <Grid container  display="flex" alignItems="center" spacing={2}>
                            <Typography variant="subtitle2" color="text.secondary" ml={1}>
                            {formatDate(comment.createdAt).toLocaleString()}
                          </Typography>
                            <Button
                              onClick={() => handleDeleteComment(offer._id, comment)}
                              color={"primary" }
                            >
                              Supprimer
                            </Button>

                            <Button startIcon={<FavoriteIcon />} size="small" onClick={() => handleLikeComment(offer._id, comment)}>
                              J'aime
                            </Button>
                          </Grid>
                        </Box>
                        <Divider />
                      </Box>
                    ))}
                  <Button variant="outlined" color="primary" onClick={() => handleExpandOffer(offer)} style={{ color: '#2196F3' }}>
                      Plus de détails
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
        </Grid>
        <Dialog open={openModal} onClose={handleCloseModal}>
          <DialogTitle>Détails de l'offre</DialogTitle>
          <DialogContent>
            {selectedOffer && (
              <div>
                 <Typography className={classes.detailsText}>{selectedOffer.description}</Typography>
                <Typography className={classes.detailsText}>
                  <EventIcon className={classes.detailsText} />
                  Publication Date: {formatDate(selectedOffer.publicationDate)}
                </Typography>
                <Typography className={classes.detailsText}>
                  <WorkIcon className={classes.detailsText} />
                  Type d'offre: {selectedOffer.offerType}
                </Typography>
                <Typography className={classes.detailsText}>
                  <WorkIcon className={classes.detailsText} />
                  Salaire: {selectedOffer.salary}
                </Typography>
                <Typography className={classes.detailsText}>
                  <WorkIcon className={classes.detailsText} />
                  Niveau d'expérience: {selectedOffer.experienceLevel}
                </Typography>
                <Typography className={classes.detailsText}>
                  <WorkIcon className={classes.detailsText} />
                  Type de contrat: {selectedOffer.contractType}
                </Typography>
                <Typography className={classes.detailsText}>
                  <WorkIcon className={classes.detailsText} />
                  Durée de stage: {selectedOffer.internshipDuration}
                </Typography>
                
              </div>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal} color="primary">
              Fermer
            </Button>
            <Button variant="outlined" color="primary" component={Link} to="/candidature/ajouter">
              Postuler
            </Button>
          </DialogActions>
        </Dialog>
        <MDBox display="flex" justifyContent="space-between" mb={2}>
          <Button
            variant="contained"
            color="error"
            disabled={currentPage === 1}
            onClick={handlePreviousPage}
            style={{ color: "#E82227" }}
          >
            Précédent
          </Button>
          <Button
            variant="contained"
            color="error"
            disabled={currentPage === Math.ceil(offers.length / itemsPerPage)}
            onClick={handleNextPage}
            style={{ color: "#E82227" }}
          >
            Suivant
          </Button>
        </MDBox>
      </Header>
      <Footer />
    </DashboardLayout>
  );
}

export default Offers;
