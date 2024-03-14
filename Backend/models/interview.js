const mongo = require ("mongoose");
const Schema =mongo.Schema 
const typeIntrvEnum = ["En ligne","En face"];
const statusIntrvEnum =["En attente","Terminé" ,"En cours" , "A venir" , "Passé" , "Reporté"]
const Interview = new Schema(
    {
        title: String,
        descrInter: String,
        dateInterv: Date,
        assignedCompanyId: {
            type: Schema.Types.ObjectId,
            ref: "user", 
        },
        assignedStudentId: {
            type: Schema.Types.ObjectId,
            ref: "user", 
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
            default: "A venir"
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongo.model("interview", Interview) ;