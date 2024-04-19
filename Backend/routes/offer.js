const express = require("express");
const router = express.Router();
const Offer = require("../models/offer");
const offerController = require("../controller/OffersController");
const validate = require("../middl/validate");
//const upload = require("../config/multer");
const multer = require("multer");
const PDFDocument = require('pdfkit');
const fs = require('fs');


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
router.get('/generate-pdf', async (req, res) => {
  try {
    const doc = new PDFDocument();
    const filePath = 'offers.pdf';

    // Ajouter du contenu au PDF
    doc.fontSize(20).text('Liste des Offres', 100, 50);

    const offers = await Offer.find();

    // Tableau des en-têtes
    const tableHeaders = [ 'Titre','Compétences', 'Lieu', 'Salaire', 'Niveau d\'expérience'];

    // Définir la position du tableau
    let tableY = 150;

    // Dessiner les en-têtes du tableau
    tableHeaders.forEach((header, index) => {
      doc.fontSize(12).text(header, 100 + index * 100, tableY);
    });

    // Mettre à jour la position Y pour les données
    tableY += 20;

    offers.forEach((offer) => {
      const offerData = [
        offer.title ? offer.title : '',
        offer.skills ? offer.skills : '',
        offer.location ? offer.location : '',
        offer.salary ? offer.salary.toString() : '',
        offer.experienceLevel ? offer.experienceLevel : ''
      ];
      let dataX = 100;
      // Dessiner les données de l'offre dans le tableau
      offerData.forEach((data, index) => {
        doc.fontSize(10).text(data.toString(), 100 + index * 100, tableY);
      });

      // Mettre à jour la position Y pour la prochaine ligne
      tableY += 20;
    });

    // Enregistrer le PDF sur le disque
    const stream = doc.pipe(fs.createWriteStream(filePath));
    doc.end();

    stream.on('finish', () => {
      res.download(filePath, (err) => {
        if (err) {
          console.error('Erreur lors du téléchargement du fichier PDF:', err);
          res.status(500).send('Erreur lors du téléchargement du fichier PDF');
        } else {
          console.log('Fichier PDF téléchargé avec succès');
          fs.unlinkSync(filePath); // Supprimer le fichier PDF après le téléchargement
        }
      });
    });
  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).send("Error generating PDF. Please try again.");
  }
});

// Dans routes/offer.js

router.get('/statistics', async (req, res) => {
  try {
    const offersWithQuiz = await Offer.countDocuments({ quiz: true });
    const offersWithoutQuiz = await Offer.countDocuments({ quiz: false });

    res.status(200).json({
      offersWithQuiz: offersWithQuiz,
      offersWithoutQuiz: offersWithoutQuiz
    });
  } catch (error) {
    console.error("Error getting statistics:", error);
    res.status(500).send("Error getting statistics. Please try again.");
  }
});


router.post("/add", upload.fields([
    { name: "file", maxCount: 1 }
]), validate, async (req, res) => {
    try {
        const { title, description, skills, location, salary, experienceLevel, offerType, expirationDate, contractType, internshipDuration ,quiz} = req.body;
        
        // Vérifier si un fichier a été téléchargé
        let file = "";
        if (req.files["file"] && req.files["file"][0]) {
            file = req.files["file"][0].originalname;
        }

        // Vérifier si tous les champs requis sont fournis
        if (!title || !description) { 
            return res.status(400).send("Title and description are required.");
        }
        if (quiz === "false") {
          quiz = false;
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
            quiz,
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
router.put('/:id/archiveExpired', offerController.archiveExpiredOffer);
router.put('/:id/unarchive', offerController.unarchiveOffer);
router.get('/archived', offerController.getArchivedOffers);


// Route pour ajouter un commentaire à une offre spécifique
router.post("/:offerId/comment/add/:userId", offerController.addComment);

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


