const MessageModel = require("../models/messages")

async function getall (req,res){
    try{
        const data = await MessageModel.find();
       
        res.status(200).send(data)
        }catch(err){
            res.status(400).send(err);
        }
}
async function add (req, res){
    try{
    console.log('data',req.body.name)
    const Message = new MessageModel(req.body)
    await Message.save();
    res.status(200).send("add good")
    }catch(err){
        res.status(400).send({error : err});
        console.log()
    }
}

async function getidM (req,res){
    try{
        const data = await MessageModel.findById(req.params.id);
       
        res.status(200).send(data)
        }catch(err){
            res.status(400).send(err);
        }
}

async function getbyDate(req,res){
    try{
        let date = req.params.sendDate;
        const dataname = await MessageModel.findOne({date});
       
        res.status(200).send(dataname)
        }catch(err){
            res.status(400).send( err);
        }
}

async function UpdateMessage(req, res){
    try {
       await MessageModel.findByIdAndUpdate(req.params.id, req.body);
       res.status(200).send("data updated")

    } catch (err) {
        res.status(400).json(err);
    }
}
async function deleteMessage (req, res) {
    try {
       await MessageModel.findByIdAndDelete(req.params.id);
       res.status(200).send("Message deleted")

    } catch (err) {
        res.status(500).json(err);
    }
}
module.exports={getall , getidM, getbyDate, add , UpdateMessage,deleteMessage}