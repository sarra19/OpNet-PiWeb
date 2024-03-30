const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const http = require("http");
const app = express();
const router = express.Router();

dotenv.config();
const { Connect } = require("./config/connect.js");
const userRouter = require("./routes/user");

const offerRouter =require("./routes/offer");

const path = require("path");

// Connect to MongoDB
Connect()
  .then(() => {
    console.log("Database connected");
    mongoose.connect(process.env.MONGO_URI);
  })
  .catch((err) => console.error("Database connection error:", err));

// Middleware

app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:4000'] // Autoriser les deux front-ends
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/user', userRouter);
app.use('/offer',offerRouter);



router.use(cors());



// Configuration du serveur
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;