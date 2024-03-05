const User = require("../models/user")

async function getall (req,res){
    try{
        const data = await User.find();
       
        res.status(200).send(data)
        }catch(err){
            res.status(400).send(err);
        }
}
async function add (req, res){
    try{
    console.log('data',req.body.name)
    const user = new User(req.body)
    await user.save();
    res.status(200).send("add good")
    }catch(err){
        res.status(400).send({error : err});
        console.log()
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
module.exports={getall , getbyid, getbyname, add , UpdateUser ,deleteUser}