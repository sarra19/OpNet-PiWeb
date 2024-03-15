const express = require("express");
const router = express.Router();
const Quiz = require("../models/quiz");

// Route pour récupérer un quiz par spécialité
router.get("/:specialite", async (req, res) => {
  try {
    const quiz = await Quiz.findOne({ specialite: req.params.specialite });
    if (!quiz) {
      return res.status(404).send("Quiz not found for this specialty.");
    }
    res.json(quiz);
  } catch (error) {
    console.error("Error fetching quiz:", error);
    res.status(500).send("Error fetching quiz.");
  }
});

module.exports = router;
