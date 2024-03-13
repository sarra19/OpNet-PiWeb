const Interview = require("../models/interview");
const User = require("../models/user");

async function add(req, res) {
    try {
        const { assignedStudentId, ...otherFields } = req.body;

        // Check if the assigned student ID is valid
        const student = await User.findOne({ firstname: assignedStudentId });

        if (!student) {
            return res.status(404).send("Student not found");
        }

        // Create the interview with the assigned student ID
        const intrv = new Interview({
            ...otherFields,
            assignedStudentId: student._id,
        });

        await intrv.save();
        res.status(200).send("add good");
    } catch (err) {
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

async function getallAsso(req, res) {
    try {
        const studentId = req.params.id;

        const student = await User.findById(studentId);
        if (!student) {
            return res.status(404).send("Student not found");
        }

        const data = await Interview.find({ assignedStudentId: studentId }).populate('assignedStudentId', 'firstname');

        res.status(200).send(data);
    } catch (err) {
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
        await Interview.findByIdAndUpdate(req.params.id , { statusInterv: "Décliné" });
        res.status(200).send("archived");
    }catch(err){
        res.status(400).send(err);
    }
}

async function deleteinterviewB(req,res){
    try{
        await Interview.findByIdAndDelete(req.params.id);
        res.status(200).send("deleted");
    }catch(err){
        res.status(400).send(err);
    }
}

async function fixAnotherDate(req, res) {
    try { 
      await Interview.findByIdAndUpdate(req.params.id, { statusInterv: "Demande report" });
      res.status(200).json({ success: true, message: "Demande envoyée avec succès." });
      }catch(err){
        res.status(500).json({ success: false, message: "Erreur serveur." });
    }
  }


module.exports = { add, getall,getallAsso ,  getbyid, getbytitle, update, deleteinterview , deleteinterviewB, fixAnotherDate };
  