const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const validRoles = ["admin", "subadmin", "teacher", "student", "alumni"];

const Role = new Schema({
    role: {
        type: String,
        enum: validRoles,
        required: true
    }
});

module.exports = mongoose.model("role", Role);
