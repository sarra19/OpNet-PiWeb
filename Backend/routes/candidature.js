// candidature.js
const express = require("express");
const router = express.Router();
const Candidature = require("../models/candidature");
const Quiz = require("../models/quiz");
const upload = require("../config/multer");

router.post("/add", upload.fields([
  { name: "lettreMotivation", maxCount: 1 },
  { name: "cv", maxCount: 1 }
]), async (req, res) => {
  try {
    const { nom, email, specialite } = req.body;
    const lettreMotivation = req.files["lettreMotivation"][0].originalname;
    const cv = req.files["cv"][0].originalname;

    // Vérifier si tous les champs sont renseignés
    if (!nom || !email || !specialite || !lettreMotivation || !cv) {
      return res.status(400).send("Tous les champs sont obligatoires.");
    }

    // Vérifier si l'email existe déjà dans les candidatures
    const existingCandidature = await Candidature.findOne({ email });
    if (existingCandidature) {
      return res.status(400).send("Cet email a déjà été ajouté à une candidature.");
    }

    // Vérifier si l'email appartient à l'esprit
    if (!email.endsWith("@esprit.tn")) {
      return res.status(400).send("Seuls les emails de l'esprit sont autorisés.");
    }
  
    // Ajouter la candidature à la base de données
    const candidature = await Candidature.create({ nom, email, specialite, lettreMotivation, cv });

    res.status(201).json({ message: "Candidature ajoutée avec succès." });
  } catch (error) {
    console.error("Error adding candidature:", error);
    return res.status(500).send("Erreur lors de l'ajout de la candidature. Veuillez réessayer.");
  }
});

module.exports = router;
