const express = require("express");
const cors = require("cors");
const session = require("express-session");
const logger = require("morgan");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const http = require("http");
const passport = require("passport");
const app = express();
const router = express.Router();

dotenv.config();
const { Connect } = require("./config/connect.js");
const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");
const passwordResetRoutes = require("./routes/passwordReset");
const chatRoomRouter = require("./routes/chat");
const messageRouter = require("./routes/messages");
const googleAuth = require("./routes/index");
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
router.use(cors());

// Middleware de journalisation
app.use(logger("dev"));

// Middleware pour initialiser Passport
app.use(passport.initialize());
require("./auth/google-auth.js")(passport);

// Routes
app.use("/", googleAuth);

// Configuration du serveur
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
