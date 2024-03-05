const express = require ("express");
const router=express.Router()
const Messages= require("../models/messages")
const messageController=require("../controller/MessageController")

router.get('/', function(req,res){
    res.send("hello express");
});

router.get('/:sendDate/:Content', async function(req, res) {
    try {
        // Créer un nouveau message en utilisant les valeurs des paramètres de la route
        const newMessage = new Messages({
            sendDate: req.params.sendDate,
            Content: req.params.Content
        });

        // Sauvegarder le nouveau message dans la base de données
        await newMessage.save();

        // Envoyer une réponse indiquant que le message a été créé avec succès
        res.send("Message créé avec succès !");
    } catch (error) {
        // En cas d'erreur, renvoyer une réponse avec le code d'erreur et le message d'erreur détaillé
        console.error("Erreur lors de la création du message :", error);
        res.status(500).send(`Erreur lors de la création du message : ${error.message}`);
    }
});


//postman
router.post("/add",messageController.add);

router.get('/getall' ,messageController.getall);
router.get('/getidM/:id' ,messageController.getidM);

router.get('/getbyDate/:date' ,messageController.getbyDate);
router.put('/updateMessage/:id', messageController.UpdateMessage);

router.delete('/deleteMessage/:id',messageController.deleteMessage);

module.exports = router ;