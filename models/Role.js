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
    },
    // task:[{
    //     type: ObjectId,
    //     ref: "Task"
    // }],
}, {timestamps: true});

module.exports = mongoose.model("Role", RoleSchema)