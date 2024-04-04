const mongo=require("mongoose")
const Schema = mongo.Schema 
const Chat=new Schema(
    {
        nameChat: String,
        dateCreationChat: {
            type: Date,
            default: Date.now 
        },
        NbParticipantsChat: Number,

    }
)

module.exports = mongo.model("chat", Chat) ; 