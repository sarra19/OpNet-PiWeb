const Chat = require("../models/chat")

async function getall (req,res){
    try{
        const data = await Chat.find();
       
        res.status(200).send(data)
        }catch(err){
            res.status(400).send(err);
        }
}
async function add (req, res){
    try{
    console.log('data',req.body.name)
    const chat = new Chat(req.body)
    await chat.save();
    res.status(200).send("add good")
    }catch(err){
        res.status(400).send({error : err});
        console.log()
    }
}

async function getid (req,res){
    try{
        const data = await Chat.findById(req.params.id);
       
        res.status(200).send(data)
        }catch(err){
            res.status(400).send(err);
        }
}

async function getbynameChat(req,res){
    try{
        let name = req.params.nameChat;
        const dataname = await Chat.findOne({name});
       
        res.status(200).send(dataname)
        }catch(err){
            res.status(400).send( err);
        }
}

async function UpdateChatRoom(req, res){
    try {
       await Chat.findByIdAndUpdate(req.params.id, req.body);
       res.status(200).send("data updated")

    } catch (err) {
        res.status(400).json(err);
    }
}
async function deleteChatRoom (req, res) {
    try {
       await Chat.findByIdAndDelete(req.params.id);
       res.status(200).send("ChatRoom deleted")

    } catch (err) {
        res.status(500).json(err);
    }
}
module.exports={getall , getid, getbynameChat, add , UpdateChatRoom ,deleteChatRoom}