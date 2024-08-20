const express = require("express");
const cors = require("cors");

const session = require("express-session");
const logger = require("morgan");
const nodemailer = require('nodemailer');
const { OpenAI } = require("openai");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

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
const interviewRouter = require("./routes/interview")
const feedbackRouter = require("./routes/feedback")

const facebookRouter = require('./routes/indexf');

const githubRouter = require('./routes/indexg');



//socket 
const http = require("http");
const server = http.createServer(app);

const {Server} = require('socket.io');

const io = new  Server(server, {
  cors:{
    origin:"https://opnet-piweb.onrender.com",
    methods:["GET","POST"]
  }
});

io.on('connection', (socket) => {
    //console.log('New client connected',socket.id);
    socket.on('comment',(msg)=>{
      console.log('new-comment',msg);
    })
  })

exports.io =io







// Connect to MongoDB
Connect()
  .then(() => {
    console.log("Database connected");
    mongoose.connect(process.env.MONGO_URI);
  })
  .catch((err) => console.error("Database connection error:", err));

// Middleware



app.use(cors({
  origin: ['https://opnet-piweb.onrender.com', 'http://localhost:4000']  }));


// Configuration du chatbot OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY ,
});
// Global variable to hold the conversation history
let conversationHistory = [
  { role: "system", content: "You are a helpful assistant." },
];




const questionRouter = require("./routes/question");
const candRouter = require("./routes/candidature")
const quizRoutes = require('./routes/quiz');
const offerRouter =require("./routes/offer");



// Middleware pour analyser les corps de requête JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/images/:imageName', (req, res) => {
  const imageName = req.params.imageName;
  // Construct the path to the image file
  const imagePath = path.join(__dirname, 'images', imageName);
  // Send the image file as the response
  res.sendFile(imagePath);
});
// Spécifiez le répertoire contenant vos fichiers statiques
app.use('/', express.static('uploads'));
// Routes
app.use('/user', userRouter);
app.use('/auth', authRouter);
app.use('/chat', chatRoomRouter);
app.use('/messages', messageRouter);
app.use("/password-reset", passwordResetRoutes);
app.use('/interviews', interviewRouter) 
app.use('/feedbacks', feedbackRouter )

// Middleware de session pour Express
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

// Activation du middleware CORS pour le routeur Express
router.use(cors());

// Middleware de journalisation : enregistrer des informations sur les requêtes entrantes sur le serveur.
app.use(logger("dev"));

// Middleware pour initialiser Passport
app.use(passport.initialize()); //utilisée pour l'authentification des utilisateurs
require("./auth/google-auth.js")(passport);

// Routes
app.use("/", googleAuth);







// Routes
app.use('/question', questionRouter);
app.use('/candidature', candRouter);

app.use('/quiz', quizRoutes);
app.use('/offer',offerRouter);






router.use(cors());


const Interview = require("../Backend/models/interview.js");

async function marquerEntrevuesTerminees() {
  try {
    const interviews = await Interview.find({ statusInterv: "A venir" });
    for (const interview of interviews) {
      if (new Date() > interview.dateInterv) {
        if (interview.statusInterv !== "Décliné" && interview.statusInterv !== "Demande report") {
          await Interview.findByIdAndUpdate(interview._id, { $set: { statusInterv: "Terminé" } });
        }
      }
    }
    console.log("Mise à jour des entrevues terminée.");
  } catch (error) {
    console.error("Erreur lors de la mise à jour des entrevues :", error);
  }
}

setInterval(marquerEntrevuesTerminees, 1 * 60 * 1000)
// Configuration du serveur
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



function sendEmail(recipient_email, subject, message) {
  return new Promise((resolve, reject) => {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "farahtelly@gmail.com",
        pass: "qayv oufk bfup ywhc",
      },
    });

    const mail_configs = {
      from: "farahtelly@gmail.com",
      to: recipient_email,
      subject: subject,
      text: message
    };
    
    transporter.sendMail(mail_configs, function (error, info) {
      if (error) {
        console.log(error);
        return reject({ message: `An error has occurred` });
      }
      return resolve({ message: `Email sent successfully` });
    });
  });
}


app.get("/", (req, res) => {
  const recipient_email = "farahtelly@gmail.com"; // Remplacez par l'e-mail du destinataire
  const subject = "Test Email";
  const message = "This is a test email.";

  sendEmail(recipient_email, subject, message)
    .then((response) => res.send(response.message))
    .catch((error) => res.status(500).send(error.message));
});

app.post("/send_email", (req, res) => {
  const { recipient_email, subject, message } = req.body;

  sendEmail(recipient_email, subject, message)
    .then((response) => res.send(response.message))
    .catch((error) => res.status(500).send(error.message));
});
app.post("/ask", async (req, res) => {
  const userMessage = req.body.message;

  // Update conversation history with the user's message
  conversationHistory.push({ role: "user", content: userMessage });

  try {
    // Request a completion from OpenAI based on the updated conversation history
    const completion = await openai.chat.completions.create({
      messages: conversationHistory,
      model: "gpt-3.5-turbo",
    });

    // Extract the response
    const botResponse = completion.choices[0].message.content;

    // Update conversation history with the assistant's response
    conversationHistory.push({ role: "assistant", content: botResponse });

    // Send the assistant's response back to the client
    res.json({ message: botResponse });
  } catch (error) {
    console.error("Error calling OpenAI: ", error);
    res.status(500).send("Error generating response from OpenAI");
  }
});

// Configuration du serveur
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;