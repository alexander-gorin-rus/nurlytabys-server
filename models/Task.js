const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema

const TaskSchema = new mongoose.Schema({
    role: [
        {
            type: ObjectId,
            ref: "Role"
        }
    ],
    title: {
        type: String
    },
    content: {
        type: String
    },
    img: {
        type: String
    },
    completed: [
        {
            type: ObjectId,
            ref: "Role"
        }
    ],
    comments: [
        {
            type: ObjectId,
            ref: "Role"
        }
    ],
    opened: [
        {
            type: ObjectId,
            ref: "Role"
        }
    ],
    downloadedFiles: [
        {
            type: ObjectId,
            ref: "Role"
        }
    ],
    start: {
        type: Date,
        default: Date.now()
    },
    finish: {
        //type: Date,
        type: String
    }
},
{timestamps: true}
);

module.exports = mongoose.model('Task', TaskSchema)