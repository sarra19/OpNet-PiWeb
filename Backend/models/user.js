const mongo = require ("mongoose");
const Schema =mongo.Schema 
const Role = require('./role'); 
const User = new Schema(
    {
        firstname: String ,
        lastname : String,
        email : String,
        password : String,
        role: {
            type: String, 
            enum: Role.validRoles,
        },
        dateOfBirth: String,
        country : String,
        phone : Number,
        speciality : String,
        institution : String,
        languages : String,
        profileImage : String,
        description : String,
        skills : String,
        experience : String,
        formation : String,
        certificates : String,
        cV : String



    }
)

module.exports = mongo.model("user", User) ;