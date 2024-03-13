const mongo = require("mongoose");
const Schema = mongo.Schema;

const MessageSchema = new Schema({
    sendDate: {
        type: Date,
        default: Date.now 
        
    },
    Content: String, 
    chat: {
        type: Schema.Types.ObjectId,
        ref: 'Chat' // Utilisation correcte du modèle Chat
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User' // Utilisation correcte du modèle User
    }
});

module.exports = mongo.model("Message", MessageSchema); // Utilisation de "Message" pour le modèle

