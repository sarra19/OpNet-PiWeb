const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const validRoles = ["admin", "subadmin", "teacher", "student", "alumni", "compagny"];

const Role = new Schema({
    role: {
        type: String,
        enum: validRoles,
    }
});

module.exports = mongoose.model("role", Role);
