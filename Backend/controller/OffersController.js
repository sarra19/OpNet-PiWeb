const Offer = require("../models/offer");

async function getAllOffers(req, res) {
  try {
    const data = await Offer.find();
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function getOfferById(req, res) {
  try {
    const data = await Offer.findById(req.params.id);
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function addOffer(req, res) {
  try {
    const offer = new Offer(req.body);
    await offer.save();
    res.status(201).json({ message: "Offer added successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function updateOffer(req, res) {
  try {
    await Offer.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ message: "Offer updated successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function deleteOffer(req, res) {
  try {
    await Offer.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Offer deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  getAllOffers,
  getOfferById,
  addOffer,
  updateOffer,
  deleteOffer,
};
