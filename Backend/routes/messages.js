const express = require("express");
const router = express.Router();
const Messages = require("../models/messages");
const messageController = require("../controller/MessageController");
const multer = require("multer");
const path = require("path");
const User = require("../models/user");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../images/")); // Corriger le chemin de destination
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname); // Nom du fichier
    },
});

// Initialisation de multer avec la configuration de stockage
const upload = multer({ storage: storage });

// Route pour gérer l'upload de fichiers
router.post("/upload", upload.single("file"), (req, res) => {
    if (!req.file) {
        return res.status(400).send("Aucun fichier n'a été téléchargé.");
    }
    res.send(req.file.filename); // Renvoyer le nom du fichier téléchargé
});

router.post('/:id/reactions', async (req, res) => {
    const messageId = req.params.id;
    const { userId, reaction } = req.body;
  
    try {
      // Vérifier si le message existe
      const message = await Messages.findById(messageId);
      if (!message) {
        return res.status(404).json({ error: 'Message not found' });
      }
  
      const user = await User.findById(userId);


      // Ajouter la réaction avec senderId
      message.reactions.push({ userName: user.firstname, reaction });
  
      // Enregistrer le message mis à jour dans la base de données
      const updatedMessage = await message.save();
  
      res.status(200).json(updatedMessage);
    } catch (error) {
      console.error('Error adding reaction to message:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);
router.get('/:id/reactions', async (req, res) => {
    const messageId = req.params.id;
  
    try {
      // Rechercher le message par son ID
      const message = await Messages.findById(messageId);
      if (!message) {
        return res.status(404).json({ error: 'Message not found' });
      }
  
      // Renvoyer les réactions du message
      res.status(200).json({ reactions: message.reactions });
    } catch (error) {
      console.error('Error fetching reactions:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
// router.get('/', function(req,res){
//     res.send("hello express");
// });

// router.get('/:sendDate/:Content', async function(req, res) {
//     try {
//         // Créer un nouveau message en utilisant les valeurs des paramètres de la route
//         const newMessage = new Messages({
//             sendDate: req.params.sendDate,
//             Content: req.params.Content
//         });

//         // Sauvegarder le nouveau message dans la base de données
//         await newMessage.save();

//         // Envoyer une réponse indiquant que le message a été créé avec succès
//         res.send("Message créé avec succès !");
//     } catch (error) {
//         // En cas d'erreur, renvoyer une réponse avec le code d'erreur et le message d'erreur détaillé
//         console.error("Erreur lors de la création du message :", error);
//         res.status(500).send(`Erreur lors de la création du message : ${error.message}`);
//     }
// });



//postman
router.post("/add",messageController.add);

router.get('/getall' ,messageController.getall);
router.get('/getidM/:id' ,messageController.getidM);
router.get('/getMessage/:chatId', async function (req, res) {
    try {
        const chatId = req.params.chatId;
        // Fetch the message by chat ID from the database
        const message = await Messages.findOne({ chat: chatId });
        if (!message) {
            // If no message is found, send a 404 response
            return res.status(404).send("Message not found");
        }
        // If the message is found, send it as a response
        res.json(message);
    } catch (error) {
        // If an error occurs, send a 500 response with the error message
        console.error("Error fetching message:", error);
        res.status(500).send("Internal Server Error");
    }
});

router.get('/getbyDate/:date' ,messageController.getbyDate);
router.put('/updateMessage/:id', messageController.UpdateMessage);

router.delete('/deleteMessage/:id',messageController.deleteMessage);


router.post('/', messageController.addMessage);

router.get('/:chatId', messageController.getMessages);

module.exports = router ;