const express = require("express");
const router = express.Router();

const questionController = require("../controller/QuestionController");

router.post("/add", questionController.add);
router.get("/getall", questionController.getAll);
router.put("/update/:id", questionController.update);
router.delete("/delete/:id", questionController.deleteQuestion);
router.get("/get/:id", questionController.getByID);

module.exports = router;

