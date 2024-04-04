const express = require("express");
const router = express.Router();
const offerController = require("../controller/OffersController");

router.get("/", function (req, res) {
  res.send("Hello Offer");
});

router.post("/add", offerController.addOffer);
router.get("/getall", offerController.getAllOffers);
router.get("/get/:id", offerController.getOfferById);
router.put("/updateOffer/:id", offerController.updateOffer);
router.delete("/deleteOffer/:id", offerController.deleteOffer);

module.exports = router;
