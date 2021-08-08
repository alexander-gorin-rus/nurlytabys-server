const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema


const RoleSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true, 
    },
    employee: {
        type: ObjectId,
        ref: "Employee"
    }
}, {timestamps: true});

module.exports = mongoose.model("Role", RoleSchema)