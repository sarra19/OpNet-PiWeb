const Interview = require("../models/interview");

async function add(req, res){
    try{
    const intrv = new Interview(req.body)
    await intrv.save();
    res.status(200).send("add good")
    }catch(err){
        res.status(400).send(err);
        console.log(err);
    }
}
async function getall(req,res){
    try{
        const data=await Interview.find();
        res.status(200).send(data);
    }catch(err){
        res.status(400).send(err);
    }
}

async function getbyid (req , res){
    try{
        const data = await Interview.findById(req.params.id);
        res.status(200).send(data);
    }catch(err){
        res.status(400).send(err);
    }
}


async function getbytitle(req,res){
    try{
        let title = req.params.title ;
        const datatitle = await Interview.findOne({ title }) ;
        res.status(200).send(datatitle);
    }catch(err){
        res.status(400).send(err);
    }
}

async function update(req ,res){
    try{
        await Interview.findByIdAndUpdate(req.params.id , req.body);
        res.status(200).send("updated");
    }catch(err){
        res.status(400).send(err);
    }
}

async function deleteinterview(req,res){
    try{
        await Interview.findByIdAndUpdate(req.params.id , { statusInterv: "Décliné", archived: true });
        res.status(200).send("archived");
    }catch(err){
        res.status(400).send(err);
    }
}


async function fixAnotherDate(req, res) {
    try {
      const interviewId = req.params.id;
      const requestMessage = `Demande de l'utilisateur pour fixer une autre date. Proposez une nouvelle date disponible.`;
      console.log(requestMessage);
  
      // Simulez le succès de l'envoi de la demande
      const successResponse = {
        success: true,
        message: "Request sent to the company for fixing another date.",
      };
  
      // Indiquez que la réponse est en JSON
      res.setHeader('Content-Type', 'application/json');
  
      // Ajoutez des logs supplémentaires ici
      console.log('Réponse du serveur:', successResponse);
  
      res.status(200).json(successResponse);
    } catch (err) {
      console.error(err);
      res.setHeader('Content-Type', 'application/json');
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  }
  

module.exports = { add, getall, getbyid, getbytitle, update, deleteinterview, fixAnotherDate };
  