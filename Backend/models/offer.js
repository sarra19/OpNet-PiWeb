const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Offer = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  skills: String,
  location: String,
  salary: Number,
  experienceLevel: String,
  jobType: {
    type: String,
    enum: ["emploi", "stage"], // Example job types
  },
  publicationDate: {
    type: Date,
    default: Date.now,
  },
  expirationDate: Date,
  file: {
    Type: String,
  },
  contractType: {
    type: String,
    enum: ["CDI", "CDD", "freelance", "stage"], // Example contract types
  },
  internshipDuration: {
    type: String,
  },
  
  // Add other fields as needed for your specific use case
});

module.exports = mongoose.model("offer", Offer);
