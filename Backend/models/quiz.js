// Quiz.js (dans le dossier models)

const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  options: {
    type: [String],
    required: true
  }
});

module.exports = mongoose.model("Quiz", quizSchema);
