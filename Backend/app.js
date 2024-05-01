const express=require("express");
const http =require("http");
const cors = require("cors");
const config=require ("./config/dbconnection.json");
const mongoose = require ("mongoose");
const bodyParser =require('body-parser')
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
dotenv.config();
const { Connect } = require("./config/connect.js");
const userRouter=require("./routes/user") 
const chatRoomRouter = require("./routes/chat");
const messageRouter = require("./routes/messages");
const interviewRouter = require("./routes/interview")
const feedbackRouter = require("./routes/feedback")

const app=express();

// Connect to MongoDB
// mongo.connect(config.url, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("Database connected"))
//   .catch((err) => console.error("Database connection error:", err));

Connect()
  .then(() => {
    console.log("Database connected");
    mongoose.connect(process.env.MONGO_URI);
  })
  .catch((err) => console.error("Database connection error:", err));
  
// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:4000']
  }))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/user', userRouter) 
app.use('/chat', chatRoomRouter) 
app.use('/messages', messageRouter) 
app.use('/interviews', interviewRouter) 
app.use('/feedbacks', feedbackRouter )
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
  } catch (error) {
    console.error("Erreur lors de la mise à jour des entrevues :", error);
  }
}

setInterval(marquerEntrevuesTerminees, 1 * 60 * 1000);

function envoyMail(recipient_email, subject, message) {
  return new Promise((resolve, reject) => {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "farahtelly@gmail.com",
        pass: "qayv oufk bfup ywhc",
      },
      tls: {
        rejectUnauthorized: false, // Désactiver la vérification du certificat SSL/TLS
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
        return reject({ message: "An error has occurred" });
      }
      return resolve({ message: "Email sent successfully" });
    });
  });
}


app.get("/mails", (req, res) => {
  const recipient_email = "farahtelly@gmail.com";
  const subject = "Test Email";
  const message = "This is a test email.";

  envoyMail(recipient_email, subject, message)
    .then((response) => res.send(response.message))
    .catch((error) => res.status(500).send(error.message));
});

app.post("/send_email", (req, res) => {
  const { recipient_email, subject, message } = req.body;

  envoyMail(recipient_email, subject, message)
    .then((response) => res.send(response.message))
    .catch((error) => res.status(500).send(error.message));
});

// Server setup
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app ;


