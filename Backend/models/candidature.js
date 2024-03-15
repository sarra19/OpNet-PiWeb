// models/Candidature.js
const mongoose = require("mongoose");

const CandidatureSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true // Assure que chaque email est unique
  },
  specialite: {
    type: String,
    required: true
  },
  lettreMotivation: {
    type: String,
    required: true
  },
  cv: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Candidature", CandidatureSchema);
