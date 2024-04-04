const mongoose = require("mongoose");
const { Schema } = mongoose; // Import Schema object from mongoose

const QuizSchema = new Schema({
  title: { type: String, required: true }, // Le titre du quiz
  // description: { type: String }, // La description du quiz (optionnelle)
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
  // published: { type: Boolean, default: false }, // Indique si le quiz est publié ou non (par défaut, non publié)
  // dateCreated: { type: Date, default: Date.now }, // La date de création du quiz
});

module.exports = mongoose.models.Quiz || mongoose.model("Quiz", QuizSchema);
