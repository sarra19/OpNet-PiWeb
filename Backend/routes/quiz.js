const express = require("express");
const router = express.Router();
const OuizController = require("../controller/quizController");


// Route pour créer un nouveau quiz
router.post("/quiz", async (req, res) => {
  try {
    const nouveauQuiz = await createQuiz(req.body); // Appeler la fonction createQuiz avec les données du quiz provenant de la requête
    res.status(201).json(nouveauQuiz); // Répondre avec le quiz créé et le code de statut 201 (Created)
  } catch (error) {
    console.error("Erreur lors de la création du quiz :", error);
    res.status(500).json({ message: "Erreur lors de la création du quiz" }); // Répondre avec un message d'erreur et le code de statut 500 (Internal Server Error)
  }
});

// Route pour récupérer tous les quizzes
router.get("/quiz", async (req, res) => {
  try {
    const quizzes = await getAllQuizzes(); // Appeler la fonction getAllQuizzes pour récupérer tous les quizzes
    res.json(quizzes); // Répondre avec la liste des quizzes
  } catch (error) {
    console.error("Erreur lors de la récupération des quizzes :", error);
    res.status(500).json({ message: "Erreur lors de la récupération des quizzes" }); // Répondre avec un message d'erreur et le code de statut 500 (Internal Server Error)
  }
});

// Route pour récupérer un quiz par son ID
router.get("/quiz/:quizId", async (req, res) => {
  const { quizId } = req.params;
  try {
    const quiz = await getQuizById(quizId); // Appeler la fonction getQuizById avec l'ID du quiz provenant de la requête
    if (!quiz) {
      return res.status(404).json({ message: "Quiz non trouvé" }); // Si le quiz n'est pas trouvé, répondre avec un code de statut 404 (Not Found)
    }
    res.json(quiz); // Répondre avec le quiz trouvé
  } catch (error) {
    console.error("Erreur lors de la récupération du quiz par ID :", error);
    res.status(500).json({ message: "Erreur lors de la récupération du quiz par ID" }); // Répondre avec un message d'erreur et le code de statut 500 (Internal Server Error)
  }
});

// Route pour mettre à jour un quiz existant
router.put("/quiz/:quizId", async (req, res) => {
  const { quizId } = req.params;
  const newData = req.body;
  try {
    const quiz = await updateQuiz(quizId, newData); // Appeler la fonction updateQuiz avec l'ID du quiz et les nouvelles données provenant de la requête
    if (!quiz) {
      return res.status(404).json({ message: "Quiz non trouvé" }); // Si le quiz n'est pas trouvé, répondre avec un code de statut 404 (Not Found)
    }
    res.json(quiz); // Répondre avec le quiz mis à jour
  } catch (error) {
    console.error("Erreur lors de la mise à jour du quiz :", error);
    res.status(500).json({ message: "Erreur lors de la mise à jour du quiz" }); // Répondre avec un message d'erreur et le code de statut 500 (Internal Server Error)
  }
});

// Route pour supprimer un quiz existant
router.delete("/quiz/:quizId", async (req, res) => {
  const { quizId } = req.params;
  try {
    const deleted = await deleteQuiz(quizId); // Appeler la fonction deleteQuiz avec l'ID du quiz provenant de la requête
    if (!deleted) {
      return res.status(404).json({ message: "Quiz non trouvé" }); // Si le quiz n'est pas trouvé, répondre avec un code de statut 404 (Not Found)
    }
    res.json({ message: "Quiz supprimé avec succès" }); // Répondre avec un message de succès
  } catch (error) {
    console.error("Erreur lors de la suppression du quiz :", error);
    res.status(500).json({ message: "Erreur lors de la suppression du quiz" }); // Répondre avec un message d'erreur et le code de statut 500 (Internal Server Error)
  }
});

router.post('/quiz/publier', async (req, res) => {
  try {
    const quizData = req.body; // Récupérer les données du quiz depuis le corps de la requête
    const nouveauQuiz = new Quiz(quizData); // Créer une nouvelle instance du modèle Quiz
    await nouveauQuiz.save(); // Enregistrer le quiz dans la base de données
    res.status(201).json({ message: 'Quiz publié avec succès' }); // Répondre avec un message de succès
  } catch (error) {
    console.error('Erreur lors de la publication du quiz :', error);
    res.status(500).json({ message: 'Erreur lors de la publication du quiz' }); // Répondre avec un message d'erreur et le code de statut 500 (Internal Server Error)
  }
});


module.exports = router;
