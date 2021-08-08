const mongoose = require('mongoose');

const BusinessSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    start: {
        type: Date
    },
    finish: {
        type: Date
    }
}, {timestamp:true}
);

module.exports = mongoose.model('Business', BusinessSchema)