const express = require ("express");
const router=express.Router();
const User= require("../models/user");
const userController=require("../controller/userController");
const validate = require("../middl/validate");
const Token = require("../models/token");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path"); // Importer le module path

// Configuration de multer pour le stockage des fichiers
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images/"); // Spécifiez le répertoire de destination où les fichiers seront stockés
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now()); // Générez un nom de fichier unique
  },
});

// Initialiser l'upload avec multer
const upload = multer({ storage: storage });

// Route pour télécharger et stocker l'image
router.put("/uploadAvatar", upload.single("avatar"), async (req, res) => {
  try {
    const userId = req.body.userId; // récupérer l'ID de l'utilisateur associé à l'image
    const avatarPath = req.file.path; // récupérer le chemin de l'image téléchargée

    // Enregistrer le chemin de l'image dans la base de données pour l'utilisateur avec l'ID correspondant
    await User.findByIdAndUpdate(userId, { profileImage: avatarPath });

    res.status(200).send("Avatar uploaded successfully");
  } catch (error) {
    console.error("Error uploading avatar:", error);
    res.status(500).send("An error occurred while uploading avatar");
  }
});
router.put("/upload", upload.single("avatar"), async (req, res) => {
	try {
	  // Vérifier si un fichier a été téléchargé
	  if (!req.file) {
		return res.status(400).json({ message: "No file uploaded" });
	  }
  
	  const avatarPath = req.file.path; // récupérer le chemin de l'image téléchargée
  
	  // Retourner le chemin de l'image téléchargée
	  res.status(200).json({ avatarPath: avatarPath });
	} catch (error) {
	  console.error("Error uploading avatar:", error);
	  res.status(500).json({ message: "An error occurred while uploading avatar" });
	}
  });
  
router.get('/images/:imageName', (req, res) => {
	const imageName = req.params.imageName;
	// Construire le chemin de l'image en utilisant path.join()
	const imagePath = path.join(__dirname, '..', 'images', imageName);
	// Envoyer le fichier image en tant que réponse
	res.sendFile(imagePath);
  });
  
// router.get('/', function(req,res){
//     res.send("hello user");
// });

router.get('/:FirstName/:LastName/:Email', function(req,res){
    //instanciation
    new User ({
        firstname: req.params.firstName ,
        lastname: req.params.lastName ,
        email : req.params.email
    }).save();
    res.send("hello user");
});

//postman
// router.post("/add",userController.add);
router.post("/login", userController.login)
router.post("/googlelogin",userController.googlelogin);
router.post("/storeUserRole", userController.storeUserRole); // Add this line
router.get("/profile/:id", userController.profile)

router.get('/getall' ,userController.getall);
router.get('/get/:id' ,userController.getbyid);

router.get('/getbyname/:name' ,userController.getbyname);
router.put('/updateUser/:id', userController.UpdateUser);

router.delete('/deleteUser/:id',userController.deleteUser);
router.post("/", async (req, res) => {
	try {
		

		let user = await User.findOne({ email: req.body.email });
		if (user)
			return res
				.status(409)
				.send({ message: "User with given email already Exist!" });

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		user = await new User({ ...req.body, password: hashPassword }).save();

		const token = await new Token({
			userId: user._id,
			token: crypto.randomBytes(32).toString("hex"),
		}).save();
		const url = `${process.env.BASE_URL}user/${user.id}/verify/${token.token}`;
		await sendEmail(user.email, "Verify Email", url);

		res
			.status(201)
			.send({ message: "An Email sent to your account please verify" });
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});

router.get("/:id/verify/:token/", async (req, res) => {
	try {
		const user = await User.findOne({ _id: req.params.id });
		if (!user) return res.status(400).send({ message: "Invalid link" });

		const token = await Token.findOne({
			userId: user._id,
			token: req.params.token,
		});
		if (!token) return res.status(400).send({ message: "Invalid link" });

		await User.updateOne({ _id: user._id, verified: true });
		await token.remove();

		res.status(200).send({ message: "Email verified successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});
  
module.exports = router ;