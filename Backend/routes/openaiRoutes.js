const express = require ("express");
const router=express.Router()
const chatController = require("../controller/ChatRoomController");


router.post("/chatbot", chatController.chatbot);

module.exports = router ;