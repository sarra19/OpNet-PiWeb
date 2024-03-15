const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const http = require("http");

const config = require("./config/dbconnection.json");
const userRouter = require("./routes/user");
const chatRoomRouter = require("./routes/chat");
const messageRouter = require("./routes/messages");
const offerRouter =require("./routes/offer");

const app = express();

// Connect to MongoDB
mongoose.connect(config.url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Database connected"))
  .catch((err) => console.error("Database connection error:", err));

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:4000'] // Replace with your frontend URL
  }))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/user', userRouter);
app.use('/chat', chatRoomRouter);
app.use('/messages', messageRouter);
app.use('/offer',offerRouter);

// Server setup
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;

