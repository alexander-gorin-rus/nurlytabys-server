const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const EmployeeSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        
    },
    lastName:{
        type: String,
        required: true,
       
    },
    password:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        trim: true
    },
    role:{
        type: ObjectId,
        ref: "Roles"
    }
}, {timestamps: true});

module.exports = mongoose.model("Employee", EmployeeSchema)