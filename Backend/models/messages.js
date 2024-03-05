const mongo=require("mongoose")
const Schema = mongo.Schema 
const Messages=new Schema(
    {
       
        sendDate: {
            type: Date,
            default: Date.now 
        },
         Content : String, 

    }
)

module.exports = mongo.model("message", Messages) ; 