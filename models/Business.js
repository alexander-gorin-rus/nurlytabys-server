const mongoose = require('mongoose');
// const moment = require('moment-timezone');
// const dateKz = moment.tz.names("Qazakhstan/Qaragandy")

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
        type: Date,
        default: Date.now()
    },
    finish: {
        type: Date
    }
}, {timestamp:true}
);

module.exports = mongoose.model('Business', BusinessSchema)