const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema

const TasksCountSchema = new mongoose.Schema({
    count: {
        type: Number
    },
    employee: { 
        type: ObjectId, 
        ref: "Employee" 
    }    
},
{timestamps: true}
);

module.exports = mongoose.model('TasksCount', TasksCountSchema)