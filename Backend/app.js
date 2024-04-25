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
app.use(express.static('images'));
dotenv.config();
const { Connect } = require("./config/connect.js");
const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");
const passwordResetRoutes = require("./routes/passwordReset");
const chatRoomRouter = require("./routes/chat");
const messageRouter = require("./routes/messages");
const googleAuth = require("./routes/index");
const path = require("path");
const facebookRouter = require('./routes/indexf');

const githubRouter = require('./routes/indexg');



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

// Define a route for serving images
app.get('/images/:imageName', (req, res) => {
  const imageName = req.params.imageName;
  // Construct the path to the image file
  const imagePath = path.join(__dirname, 'images', imageName);
  // Send the image file as the response
  res.sendFile(imagePath);
});
// Routes
app.use('/user', userRouter);
app.use('/auth', authRouter);
app.use('/chat', chatRoomRouter);
app.use('/messages', messageRouter);
app.use("/password-reset", passwordResetRoutes);
app.use("/api/v1/openai", require("./routes/openaiRoutes"));

app.use(
  session({
    secret: "secret",// Chaîne aléatoire utilisée pour signer le cookie de session
    resave: false,
    saveUninitialized: false,
    cookie: {
      sameSite: "none",//"none" pour les connexions cross-origin
      secure: true //doit être envoyé uniquement sur HTTPS
    }
  })
);
router.use(cors());

// Middleware de journalisation
app.use(logger("dev"));

// Middleware pour initialiser Passport
app.use(passport.initialize());
require("./auth/google-auth.js")(passport);
require("./auth/facebook-auth.js")(passport);
require("./auth/github-auth.js")(passport);

app.use('/auth/github', githubRouter);

app.use('/auth/facebook', facebookRouter);

// Routes
app.use("/", googleAuth);

// Configuration du serveur
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
