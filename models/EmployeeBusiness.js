const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema


const EmployeeBusinessSchema = mongoose.Schema({
    employee: {
        type: ObjectId,
        ref: 'Employee'
    },
    title: {
        type: String,
        
    },
    content: {
        type: String,
        required: true
    },
    start: {
        type: String
    },
    finish: {
        type: String
    },
    allDay: {
        type: Boolean,
        default: false
    },
    done: {
        type: Boolean,
        default: false
    }
}, {timestamp:true}
);

module.exports = mongoose.model('EmployeeBusiness', EmployeeBusinessSchema)