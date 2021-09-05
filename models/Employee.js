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
        ref: "Role"
    },
    boss:{
        type: Number,
        default: 0
    },
    profilePicture: {
        type: String,
        default: "",
      },
      coverPicture: {
        type: String,
        default: "",
      },
      followers: {
        type: Array,
        default: [],
      },
      followings: {
        type: Array,
        default: [],
      },
      desc: {
        type: String,
        max: 50,
      },
      city: {
        type: String,
        max: 50,
      },
      from: {
        type: String,
        max: 50,
      },
      relationship: {
        type: Number,
        enum: [1, 2, 3],
      },
}, {timestamps: true});

module.exports = mongoose.model("Employee", EmployeeSchema)