const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema

const TaskSchema = new mongoose.Schema({
    employee: {
        type: ObjectId,
        ref: "Employee"
    },
    description: {
        type: String
    },
    img: {
        type: String
    },
    completed: {
        type: Boolean,
        default: false
    },
    feedback: {
        type: String
    },
    start: {
        type: Date,
        default: Date.now()
    },
    finish: {
        type: Date
    }
},
{timestamps: true}
);

module.exports = mongoose.model('Task', TaskSchema)