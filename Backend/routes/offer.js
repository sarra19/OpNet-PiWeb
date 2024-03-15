const express = require("express");
const router = express.Router();
const Offer = require("../models/offer");
const offerController = require("../controller/OffersController");
const validate = require("../middl/validate");

router.get('/', function(req, res) {
    res.send("Hello Offer");
});

router.post("/add", validate, offerController.addOffer);

router.get('/getall', offerController.getAllOffers);
router.get('/get/:id', offerController.getOfferById);

router.put('/updateOffer/:id', validate, offerController.updateOffer);

router.delete('/deleteOffer/:id', offerController.deleteOffer);

module.exports = router;
