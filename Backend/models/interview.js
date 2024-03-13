const mongo = require ("mongoose");
const Schema =mongo.Schema 
const typeIntrvEnum = ["En ligne","En face"];
const statusIntrvEnum =["En attente","Terminé" ,"En cours" , "A venir" , "Passé" , "Reporté"]
const Interview = new Schema(
    {
        title: String,
        descrInter: String,
        dateInterv: Date,
        company: String,
        assignedStudentId: {
            type: Schema.Types.ObjectId,
            ref: "user", // Make sure this matches the model name for User
        },
        address: String,
        typeIntrv: {
            type: String,
            enum: typeIntrvEnum,
            default: "En ligne"
        },
        statusInterv: {
            type: String,
            enum: statusIntrvEnum,
            default: "En attente"
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongo.model("interview", Interview) ;