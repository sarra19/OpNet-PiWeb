const FeedBack = require("../models/feedback");


async function save(req, res){
    try {
        await FeedBack.create({ texte: req.body.text });
        res.status(201).send('add good');
    }catch (error) {
        console.error('Erreur lors de l\'enregistrement de la transcription dans la base de données :', error);
        res.status(500).send('Erreur lors de l\'enregistrement de la transcription dans la base de données.');
    }
};

async function getall (req, res){
    try {
      const transcriptions = await FeedBack.find();
      res.status(200).json(transcriptions);
    } catch (error) {
      console.error('Erreur lors de la récupération des transcriptions depuis la base de données :', error);
      res.status(500).send('Erreur lors de la récupération des transcriptions depuis la base de données.');
    }
};

async function deleteTranscription  (req, res)  {
    try {
        const feedback = await FeedBack.findById(req.params);
        if (!feedback) {
            return res.status(404).send('Le feedback spécifié n\'existe pas.');
        }
        await FeedBack.findByIdAndDelete(req.params);
        res.status(200).send('Feedback supprimé avec succès.');
    } catch (error) {
      console.error('Erreur lors de la suppression du feedback dans la base de données :', error);
      res.status(500).send('Erreur lors de la suppression du feedback dans la base de données.');
    }
};  

async function update(req ,res){
    try {
        let feedback = await FeedBack.findById(req.params);
        if (!feedback) {
            return res.status(404).send('Le feedback spécifié n\'existe pas.');
        }
        feedback.texte = req.body;
        await feedback.save();
        res.status(200).send('Feedback mis à jour avec succès.');
    } catch (error) {
        console.error('Erreur lors de la mise à jour du feedback dans la base de données :', error);
        res.status(500).send('Erreur lors de la mise à jour du feedback dans la base de données.');
     }
};

  module.exports = {save , getall , deleteTranscription , update }