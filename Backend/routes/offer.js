const express = require("express");
const router = express.Router();
const Offer = require("../models/offer");
const offerController = require("../controller/OffersController");
const validate = require("../middl/validate");
//const upload = require("../config/multer");
const multer = require("multer");


    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, "uploads/"); // Spécifiez le répertoire de destination où les fichiers seront stockés
        },
        filename: function (req, file, cb) {
          cb(null, file.fieldname + "-" + Date.now()) + path.extname(file.originalname); // Générez un nom de fichier unique
        },
      });


// Initialiser l'upload avec multer
const upload = multer({ storage: storage });    

router.get('/', function(req, res) {
    res.send("Hello Offer");
});

router.post("/add", upload.fields([
    { name: "file", maxCount: 1 }
]), validate, async (req, res) => {
    try {
        const { title, description, skills, location, salary, experienceLevel, offerType, expirationDate, contractType, internshipDuration } = req.body;
        
        // Vérifier si un fichier a été téléchargé
        let file = "";
        if (req.files["file"] && req.files["file"][0]) {
            file = req.files["file"][0].originalname;
        }

        // Vérifier si tous les champs requis sont fournis
        if (!title || !description) { 
            return res.status(400).send("Title and description are required.");
        }

        // Créer une nouvelle instance d'Offre
        const newOffer = new Offer({
            title,
            description,
            skills,
            location,
            salary,
            experienceLevel,
            offerType,
            expirationDate,
            contractType,
            internshipDuration,
            file, // Inclure le nom de fichier uniquement s'il a été téléchargé
        });

        // Sauvegarder l'Offre dans la base de données
        await newOffer.save();
        return res.status(200).send("Offer added successfully.");
    } catch (error) {
        console.error("Error adding offer:", error);
        return res.status(500).send("Error adding offer. Please try again.");
    }
});

  // Route pour télécharger et stocker le CV
  // Backend

// Route pour télécharger et stocker un fichier associé à une offre
router.put("/offer/uploadFile/:offerId", upload.single("file"), async (req, res) => {
    try {
      const offerId = req.params.offerId;
      const filePath = req.file.path;
  
      await Offer.findByIdAndUpdate(offerId, { file: filePath });
  
      res.status(200).send({ filePath: filePath });
    } catch (error) {
      console.error("Error uploading file:", error);
      res.status(500).send("An error occurred while uploading file");
    }
  });
  
// Route pour télécharger et stocker un fichier associé à une offre
const path = require('path');
const offer = require("../models/offer");

// Dans votre route pour télécharger et stocker un fichier associé à une offre
router.put("/uploadFile", upload.single("file"), async (req, res) => {
  try {
      const offerId = req.body.id; // Récupérer l'ID de l'offre associée au fichier
      const filePath = req.file.filename; // Récupérer le nom du fichier téléchargé

      // Construire l'URL complète du fichier téléchargé
      const fileUrl = path.join("/uploads", filePath);

      // Enregistrer le chemin du fichier dans la base de données pour l'offre avec l'ID correspondant
      await Offer.findByIdAndUpdate(offerId, { file: fileUrl });

      res.status(200).send("File uploaded successfully");
  } catch (error) {
      console.error("Error uploading file:", error);
      res.status(500).send("An error occurred while uploading file");
  }
});

router.get('/uploads/:fileName', (req, res) => {
	const fileName = req.params.fileName;
	// Construire le chemin de uploads en utilisant path.join()
	const filePath = path.join(__dirname, '..', 'uploads', fileName);
	// Envoyer le fichier uploads en tant que réponse
	res.sendFile(filePath);
  });

router.get('/getall', offerController.getAllOffers);
router.get('/get/:id', offerController.getOfferById);

router.put('/updateOffer/:id', validate, offerController.updateOffer);

router.delete('/deleteOffer/:id', offerController.deleteOffer);

// Nouvelles routes pour archiver les offres
router.put('/:id/archive', offerController.archiveOffer);
router.get('/archived', offerController.getArchivedOffers);


// Route pour ajouter un commentaire à une offre spécifique
router.post("/:offerId/comment/add", offerController.addComment);

// Route pour mettre à jour un commentaire spécifique associé à une offre
router.put("/:offerId/comment/:commentId/update",  offerController.updateComment);

// Route pour supprimer un commentaire spécifique associé à une offre
router.delete("/:offerId/comment/:commentId/delete", offerController.deleteComment);

router.get('/:offerId/comments', offerController.getCommentsByOfferId);
// Routes pour les likes
router.post('/:id/like', offerController.addLike);
router.delete('/:id/like', offerController.removeLike);
router.get('/:id/like', offerController.getLike);


module.exports = router;