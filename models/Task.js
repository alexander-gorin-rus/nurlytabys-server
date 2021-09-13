const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema

const TaskSchema = new mongoose.Schema({
    employee: {
        type: ObjectId,
        ref: "Employee"
    },
    title: {
        type: String
    },
    content: {
        type: String
    },
    img: {
        type: String
    },
    completed: {
        type: String,
        default: 'Не выполнено',
        enum: [
            'Выполнено',
            'Не выполнено'
    ]
    },
    feedback: {
        type: String
    },
    start: {
        type: Date,
        default: Date.now()
    },
    finish: {
        type: Date,
        //type: String
    }
},
{timestamps: true}
);

module.exports = mongoose.model('Task', TaskSchema)