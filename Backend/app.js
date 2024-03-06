const express=require("express");
const http =require("http");
const cors = require("cors");
const config=require ("./config/dbconnection.json");
const mongo = require ("mongoose");
const bodyParser =require('body-parser')

const userRouter=require("./routes/user") 
const chatRoomRouter = require("./routes/chat");
const messageRouter = require("./routes/messages");
const interviewRouter = require("./routes/interview")
const app=express();

// Connect to MongoDB
mongo.connect(config.url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Database connected"))
  .catch((err) => console.error("Database connection error:", err));

// Middleware
app.use(cors({
    origin: 'http://localhost:3000' 
  }))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/user', userRouter) 
app.use('/chat', chatRoomRouter) 
app.use('/messages', messageRouter) 
app.use('/interviews', interviewRouter) 

// Server setup
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app ;


