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
    // ratings: [
    //     {
    //         star: Number,
    //         postedBy: {
    //             type: ObjectId,
    //             ref: 'User'
    //         }
    //     }
    // ],
    completed: [
        {
            done: Boolean,
            default: false,
            byEmployee: {
                type: ObjectId,
                ref: "Role"
            }
        }
    ],
    comments: [
        {
            comment: String,
            byEmployee: {
                type: ObjectId,
                ref: "Role"
            }
        }
    ],
    opened: [
        {
            open: Boolean,
            default: false,
            byEmployee: {
                type: ObjectId,
                ref: "Role"
            }
        }
    ],
    downloadedFiles: [
        {
            files: Array,
            default: [],
            byEmployee: {
                type: ObjectId,
                ref: "Role"
            }
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