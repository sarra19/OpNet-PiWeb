const express=require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const http =require("http");
const config=require ("./config/dbconnection.json");
const mongoose = require ("mongoose");
const bodyParser =require('body-parser')

dotenv.config();
const { Connect } = require("./config/connect.js");

// Connect to MongoDB
Connect()
  .then(() => {
    console.log("Database connected");
    mongoose.connect(process.env.MONGO_URI);
  })
  .catch((err) => console.error("Database connection error:", err));

const questionRouter = require("./routes/question");
const candRouter = require("./routes/candidature")
const app=express();

// Middleware
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:4000']  }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/question', questionRouter);
app.use('/candidature', candRouter);

const server = http.createServer(app);
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app ;

