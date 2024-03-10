const express = require ("express");
const router=express.Router();
const User= require("../models/user");
const userController=require("../controller/userController");
const validate = require("../middl/validate");
const Token = require("../models/token");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const bcrypt = require("bcrypt");


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