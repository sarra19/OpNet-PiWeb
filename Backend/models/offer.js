const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OfferSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("Offer", OfferSchema);
