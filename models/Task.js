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
    completed: [
        {
            complete: String,
            //default: 'Не выполнено',
            enum: [
                'Выполнено',
                'Не выполнено'
        ],
            byEmployee: { type: ObjectId, ref: "Role" }
        }
    ],
    // comments: [
    //     {
    //         comment: String,
    //         byEmployee: { type: ObjectId, ref: "Role" }
    //     }
    // ],
    // comments:[
    //     {
    //         text:String,
    //         postedBy:{ type:ObjectId, ref:"Role" }
    //     }
    // ],
    comments: [
        {
          role: {
            type: ObjectId,
            ref: 'Role'
          },
          text: {
            type: String,
            required: true
          },
          name: {
            type: String
          },
          date: {
            type: Date,
            default: Date.now
          }
        }
      ],
    opened: [
        {
            open: Boolean,
            default: false,
            byEmployee: { type: ObjectId, ref: "Role" }
        }
    ],
    downloadedFiles: [
        {
            file: Array,
            default: [],
            byEmployee: { type: ObjectId, ref: "Role" }
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