const mongo = require ("mongoose");
const Schema =mongo.Schema 
const FeedBack = new Schema(
    {
        texte: String 
    }
)

module.exports = mongo.model("feedBack", FeedBack) ;