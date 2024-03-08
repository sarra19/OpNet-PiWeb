const User = require("../models/user")
const nodemailer = require('nodemailer');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
async function getall (req,res){
    try{
        const data = await User.find();
       
        res.status(200).send(data)
        }catch(err){
            res.status(400).send(err);
        }
}


async function googlelogin (req, res) {
    try {
      const { access_token } = req.body;
  
      // Ici, vous devriez traiter la connexion Google en utilisant l'access_token
      // Obtenez les informations de l'utilisateur à partir de Google
      // Vérifiez si l'utilisateur existe déjà dans votre base de données
      // Si l'utilisateur existe, générez un jeton JWT et redirigez l'utilisateur
      // Sinon, créez un nouvel utilisateur dans votre base de données et générez un jeton JWT
  
      // Par exemple :
      const googleUser = await fetchUserInfoFromGoogle(access_token);
      let user = await User.findOne({ email: googleUser.email });
      if (!user) {
        user = new User({ email: googleUser.email, password:googleUser.password });
        await user.save();
      }
  
      // Générer un jeton JWT pour l'utilisateur
      const token = jwt.sign({ userId: user._id }, "secretKey", { expiresIn: "1h" });
  
      // Rediriger l'utilisateur vers l'URI de redirection
      res.status(200).json({ token, redirectUrl: "http://localhost:3000" });
    } catch (error) {
      console.error("Erreur lors de la connexion avec Google:", error);
      res.status(500).json({ message: "Une erreur s'est produite lors de l'authentification avec Google." });
    }
  }

  
  // Autres routes et fonctions du contrôleur utilisateur...
  
  async function login(req, res) {
    const { email, password } = req.body;

    try {
        // Vérifier si l'utilisateur existe dans la base de données
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé." });
        }

        // Vérifier si le mot de passe est correct
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Mot de passe incorrect." });
        }

        // Générer un jeton JWT et inclure le rôle de l'utilisateur dans la payload
        const token = jwt.sign({ userId: user._id, userRole: user.role }, "secretKey", { expiresIn: "1h" });

        let redirectUrl = "/dashboard";

        res.status(200).json({ token, redirectUrl, userRole: user.role ,userId: user._id, }); // Inclure le rôle dans la réponse
    } catch (error) {
        res.status(500).json({ message: "Une erreur s'est produite lors de l'authentification." });
    }
}




async function sendConfirmationEmail(email) {
    console.log(email);

    try {

        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: 'esprite257@gmail.com', // a changer esprit
                pass: 'ftca mbut fkxx wcpq' // Votre mot de passe Gmail
            }
        });

        let mailOptions = {
            from: 'esprite257@gmail.com', // Expéditeur par défaut
            to: email, // Adresse e-mail saisie dans le formulaire
            subject: 'Confirmation d\'inscription',
            text: 'Bienvenue sur notre plateforme! Votre inscription a été confirmée avec succès.'
        };

        let info = await transporter.sendMail(mailOptions);
        console.log('E-mail de confirmation envoyé: %s', info.messageId);
    } catch (error) {
        console.error('Erreur lors de l\'envoi de l\'e-mail de confirmation:', error);
    }
}
async function profile(req, res) {
    try {
        const userId = req.params.id; // Retrieve the user ID from the request parameters

        // Fetch user data from the database based on the provided ID
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Return user profile data
        res.status(200).json({
            _id: user._id,
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname,
            // Add other user fields as needed
        });
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}


async function add(req, res) {
    try {
        // Récupérer l'email et le mot de passe à partir du corps de la requête
        const { email, password, firstname, lastname, dateOfBirth, country, phone, speciality, institution, languages, profileImage, description, skills, experience, formation, certificates, cV,role } = req.body;

        // Vérifier si l'e-mail existe déjà
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).send({ error: "This email is already registered" });
        }

        // Hacher le mot de passe
        const hashedPassword = await bcrypt.hash(password, 10); // 10 est le coût de hachage

        // Créer un nouvel utilisateur avec le mot de passe haché
        const user = new User({ 
            email, 
            password: hashedPassword, 
            firstname, 
            lastname, 
            dateOfBirth, 
            country, 
            phone, 
            speciality, 
            institution, 
            languages, 
            profileImage, 
            description, 
            skills, 
            experience, 
            formation, 
            certificates, 
            cV ,
            role
        });
        // Sauvegarder l'utilisateur dans la base de données
        await user.save();
        await sendConfirmationEmail(email);

        // Envoyer une réponse de réussite à l'utilisateur
        res.status(200).send("Inscription réussie.");
    } catch (err) {
        // Gérer les erreurs et renvoyer une réponse d'erreur au client
        res.status(400).send({ error: err });
    }
}


async function getbyid (req,res){
    try{
        const data = await User.findById(req.params.id);
       
        res.status(200).send(data)
        }catch(err){
            res.status(400).send(err);
        }
}

async function getbyname(req,res){
    try{
        let name = req.params.firstname;
        const dataname = await User.findOne({name});
       
        res.status(200).send(dataname)
        }catch(err){
            res.status(400).send( err);
        }
}

async function UpdateUser(req, res){
    try {
       await User.findByIdAndUpdate(req.params.id, req.body);
       res.status(200).send("data updated")

    } catch (err) {
        res.status(400).json(err);
    }
}
async function deleteUser (req, res) {
    try {
       await User.findByIdAndDelete(req.params.id);
       res.status(200).send("User deleted")

    } catch (err) {
        res.status(500).json(err);
    }
}
module.exports={getall ,googlelogin, getbyid, getbyname,profile, login,add , UpdateUser ,deleteUser}