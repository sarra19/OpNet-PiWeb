const Quiz = require("../models/quiz"); // Importer le modèle de quiz

// Fonction pour créer un nouveau quiz
const createQuiz = async (quizData) => {
  try {
    const nouveauQuiz = new Quiz(quizData); // Créer une nouvelle instance du modèle Quiz avec les données fournies
    const quizCree = await nouveauQuiz.save(); // Sauvegarder le nouveau quiz dans la base de données
    return quizCree; // Retourner le quiz créé
  } catch (error) {
    console.error("Erreur lors de la création du quiz :", error);
    throw error;
  }
};

// Fonction pour récupérer tous les quizzes
const getAllQuizzes = async () => {
  try {
    const quizzes = await Quiz.find(); // Récupérer tous les quizzes de la base de données
    return quizzes; // Retourner la liste des quizzes
  } catch (error) {
    console.error("Erreur lors de la récupération des quizzes :", error);
    throw error;
  }
};

// Fonction pour récupérer un quiz par son ID
const getQuizById = async (quizId) => {
  try {
    const quiz = await Quiz.findById(quizId); // Récupérer le quiz correspondant à l'ID fourni
    return quiz; // Retourner le quiz trouvé
  } catch (error) {
    console.error("Erreur lors de la récupération du quiz par ID :", error);
    throw error;
  }
};

// Fonction pour mettre à jour un quiz existant
const updateQuiz = async (quizId, newData) => {
  try {
    const quiz = await Quiz.findByIdAndUpdate(quizId, newData, { new: true }); // Rechercher et mettre à jour le quiz correspondant à l'ID fourni avec les nouvelles données
    return quiz; // Retourner le quiz mis à jour
  } catch (error) {
    console.error("Erreur lors de la mise à jour du quiz :", error);
    throw error;
  }
};

// Fonction pour supprimer un quiz existant
const deleteQuiz = async (quizId) => {
  try {
    await Quiz.findByIdAndDelete(quizId); // Rechercher et supprimer le quiz correspondant à l'ID fourni
    return true; // Retourner vrai si la suppression a réussi
  } catch (error) {
    console.error("Erreur lors de la suppression du quiz :", error);
    throw error;
  }
};

module.exports = {
  createQuiz,
  getAllQuizzes,
  getQuizById,
  updateQuiz,
  deleteQuiz,
};
