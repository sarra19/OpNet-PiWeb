const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const http = require("http");
const dotenv = require("dotenv");

const config = require("./config/dbconnection.json");
const questionRouter = require("./routes/question");
const userRouter = require("./routes/user");
const candRouter = require("./routes/candidature")
const quizRoutes = require('./routes/quiz');
const offerRouter =require("./routes/offer");
const app = express();

// dotenv.config();
// const { Connect } = require("./config/connect.js");

// Connect to MongoDB
mongoose.connect(config.url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Database connected"))
  .catch((err) => console.error("Database connection error:", err));

  // Connect to MongoDB
// Connect()
// .then(() => {
//   console.log("Database connected");
//   mongoose.connect(process.env.MONGO_URI);
// })
// .catch((err) => console.error("Database connection error:", err));

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:4000']  }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Spécifiez le répertoire contenant vos fichiers statiques
app.use('/', express.static('uploads'));

// Routes
app.use('/question', questionRouter);
app.use('/candidature', candRouter);
app.use('/user', userRouter);
app.use('/quiz', quizRoutes);
app.use('/offer',offerRouter);

// Server setup
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app; 
