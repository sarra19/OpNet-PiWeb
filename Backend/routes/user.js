const express = require ("express");
const router=express.Router();
const User= require("../models/user");
const userController=require("../controller/userController");
const validate = require("../middl/validate");
router.get('/', function(req,res){
    res.send("hello user");
});

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
router.post("/add",validate,userController.add);

router.get('/getall' ,userController.getall);
router.get('/get/:id' ,userController.getbyid);

router.get('/getbyname/:name' ,userController.getbyname);
router.put('/updateUser/:id', userController.UpdateUser);

router.delete('/deleteUser/:id',userController.deleteUser);

module.exports = router ;