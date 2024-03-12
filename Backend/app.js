const express = require("express");
const cors = require("cors");
const session = require("express-session");
const logger = require("morgan");
const dotenv = require ("dotenv");

dotenv.config();
const {Connect}= require("./config/connect.js");

const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const http = require("http");

const config = require("./config/connect.js");
const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");
const passwordResetRoutes = require("./routes/passwordReset");

const chatRoomRouter = require("./routes/chat");
const messageRouter = require("./routes/messages");
const googleAuth = require("./routes/index");

const passport = require("passport");
const app = express();


// Connect to MongoDB
// mongoose.connect(config.Connect, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("Database connected"))
//   .catch((err) => console.error("Database connection error:", err));

// // Middleware
// app.use(cors({
//     origin: 'http://localhost:3000' // Replace with your frontend URL
//   }))

Connect()
  .then(() => {
    console.log("Database connected");
    mongoose.connect(process.env.MONGO_URI);
  })
  .catch((err) => console.error("Database connection error:", err));

// Middleware
app.use(cors({
  origin: 'http://localhost:3000' // Remplacez par l'URL de votre frontend
}));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/user', userRouter);
app.use('/auth', authRouter);

app.use('/chat', chatRoomRouter);
app.use('/messages', messageRouter);
app.use("/password-reset", passwordResetRoutes);


app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);

///auth
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
require("./auth/google-auth.js")(passport);
//app.use(express.static(path.join(__dirname, "public")));

app.use("/",googleAuth);

// Server setup
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));  //.env

module.exports = app;
