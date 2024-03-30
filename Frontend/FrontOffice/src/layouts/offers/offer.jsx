/*eslint-disable*/
import React, { useState, useEffect } from "react";
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
    margin: theme.spacing(),
    width: '100%', // La carte occupera toute la largeur disponible
    height: 'auto', // La hauteur s'adaptera automatiquement en fonction du contenu
  },
  media: {
    height: 400,
  },
  title: {
    fontSize: "2rem",
    fontWeight: "bold",
    color: theme.palette.primary.main,
  },
  description: {
    fontSize: "1rem",
    color: theme.palette.primary.main,
  },
  icon: {
    marginRight: theme.spacing(1),
    verticalAlign: "middle",
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
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };
  const handleChangeSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  };
  
  
  
// Gestionnaire pour commenter une offre
const handleComment = async (offerId, comment) => {
  try {
    const response = await axios.post(`http://localhost:5000/offer/${offerId}/comment/add`, { text: comment });
    console.log(response.data.message); // Affichez le message de réponse du backend
    // Mettez à jour les commentaires localement si nécessaire
  } catch (error) {
    console.error('Error adding comment:', error);
  }
};


  // Gestionnaire pour aimer une offre
 // Mettez à jour la fonction handleLike pour récupérer le nombre de likes actualisé après l'ajout de like
const handleLike = async (offerId) => {
  try {
    await axios.post(`http://localhost:5000/offer/${offerId}/like`);
    const response = await axios.get(`http://localhost:5000/offer/${offerId}/likes`);
    setLikes(prevLikes => ({
      ...prevLikes,
      [offerId]: response.data.likes
    }));
  } catch (error) {
    console.error('Error adding like:', error);
  }
};

// Mettez à jour la fonction handleUnlike pour récupérer le nombre de likes actualisé après la suppression de like
const handleLikeUnlike = async (offerId) => {
  try {
    if (likes[offerId]) {
      await axios.delete(`http://localhost:5000/offer/${offerId}/like`);
      // Après la suppression du like, récupérez le nombre de likes mis à jour
      const response = await axios.get(`http://localhost:5000/offer/${offerId}/like`);
      setLikes(prevLikes => ({
        ...prevLikes,
        [offerId]: response.data.likes
      }));
    } else {
      await axios.post(`http://localhost:5000/offer/${offerId}/like`);
      // Après l'ajout du like, récupérez également le nombre de likes mis à jour
      const response = await axios.get(`http://localhost:5000/offer/${offerId}/like`);
      setLikes(prevLikes => ({
        ...prevLikes,
        [offerId]: response.data.likes
      }));
    }
  } catch (error) {
    console.error('Error adding/removing like:', error);
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
  
  const buttonStyles = {
    cursor: "pointer",
    marginRight: "5px",
  };
  const buttonContainerStyles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "10px",
  };
  const handlePostuler = async (offerId) => {
    try {
      await axios.post(`http://localhost:5000/candidature/add`, {
        nom: "Nom de l'utilisateur",
        email: "email@example.com",
        specialite: "Spécialité de l'utilisateur",
        offreId: offerId // Passer l'ID de l'offre à laquelle postuler
      });
      handleCloseModal(); // Fermer la boîte de dialogue après la postulation réussie
    } catch (error) {
      console.error('Error applying for offer:', error);
    }
  };
// Gestionnaire pour ajouter un commentaire lorsque la touche "Entrée" est enfoncée
const handleCommentKeyPress = (e, offerId) => {
  if (e.key === 'Enter') {
    let commentText = e.target.value;
    // Vérifiez si le commentaire contient un hashtag
    if (commentText.includes('#')) {
      // Ajoutez votre logique pour traiter les hashtags ici
      // Par exemple, vous pouvez diviser le commentaire en mots et trouver les hashtags
      // Ensuite, vous pouvez les extraire et les traiter comme vous le souhaitez
      // Ici, je vais simplement les ajouter au commentaire avec un espace après le hashtag
      commentText = commentText.replace(/#(\S+)/g, ' #$1');
    }
    handleComment(offerId, commentText);
    e.target.value = ''; // Efface le champ de commentaire après avoir ajouté le commentaire
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
            <MDButton variant="gradient" color="info"  style={buttonStyles}  onClick={() => fetchOffers()}>
              Rechercher
            </MDButton>
          </MDBox>
        </MDBox>
      <Grid container spacing={2}>
        {offers
          .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
          .map((offer) => (
            <Grid item xs={12} sm={6} md={4} key={offer._id}>
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
                   {/* Section pour les commentaires */}
{/* Section pour afficher tous les commentaires */}
<Typography variant="h6">commentaires:</Typography>
<MDInput
  type="textarea"
  placeholder="Votre commentaire..."
  fullWidth
  value={comments[offer._id] || ''}
  onChange={(e) => setComments({ ...comments, [offer._id]: e.target.value })}
  onKeyPress={(e) => handleCommentKeyPress(e, offer._id)} // Gestion de la touche "Entrée"
/>
{/* Section pour "J'adore" */}
<Grid container alignItems="center" spacing={2}>
  <Grid item>
  <Button
  startIcon={<FavoriteIcon />}
  onClick={() => handleLikeUnlike(offer._id)}
  color={likes[offer._id] ? "primary" : "secondary"}
>
  J'adore {likes[offer._id] || 0}
</Button>

  </Grid>
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
  <Typography key={index}>{comment.text}</Typography>))}
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
              <Typography className={classes.description}>{selectedOffer.description}</Typography>
              <Typography>
                <EventIcon className={classes.icon} />
                Publication Date: {formatDate(selectedOffer.publicationDate)}
              </Typography>
              <Typography>
                <WorkIcon className={classes.icon} />
                Type d'offre: {selectedOffer.offerType}
              </Typography>
              <Typography>
                <WorkIcon className={classes.icon} />
                Salaire: {selectedOffer.salary}
              </Typography>
              <Typography>
                <WorkIcon className={classes.icon} />
                Niveau d'expérience: {selectedOffer.experienceLevel}
              </Typography>
              <Typography>
                <WorkIcon className={classes.icon} />
                Type de contrat:
                 {selectedOffer.contractType}
              </Typography>
              <Typography>
                <WorkIcon className={classes.icon} />
                Durée de stage: {selectedOffer.internshipDuration}
              </Typography>
              <Typography>
               File: {selectedOffer.file ? selectedOffer.file.name : "Not provided"}
              </Typography>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Fermer
          </Button>
          <Button variant="outlined" color="primary" component={Link} to="/candidature/ajouter" >
            Postuler
          </Button>
        </DialogActions>
      </Dialog>
      {/* Pagination section */}
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
