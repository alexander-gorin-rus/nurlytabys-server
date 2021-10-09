const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema

const TaskSchema = new mongoose.Schema({
    employee: [
        {
            type: ObjectId,
            ref: "Employee"
        }
    ],
    title: {
        type: String
    },
    content: {
        type: String
    },
    completed: [
        {
            done: Boolean,
            byEmployee: { type: ObjectId, ref: "Employee" }
        }
    ],
    comments: [
        {
            comment: String,
            byEmployee: { type: ObjectId, ref: "Role" }
        }
    ],
    opened: [
        {
            open: Number,
            byEmployee: { type: ObjectId, ref: "Employee" }
        }
    ],
    downloadedFiles: [
        {
            file: Array,
            default: [],
            byEmployee: { type: ObjectId, ref: "Employee" }
        }
    ],
    start: {
        type: Date,
        default: Date.now()
    },
    finish: {
        //type: Date,
        type: String
    },
    backgroungColor: {
        type: String,
        default: 'rgb(248, 169, 169)'
    }
},
{timestamps: true}
);

module.exports = mongoose.model('Task', TaskSchema)