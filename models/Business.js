const mongoose = require('mongoose');
// const moment = require('moment-timezone');
// const dateKz = moment.tz.names("Qazakhstan/Qaragandy")

const BusinessSchema = mongoose.Schema({
    title: {
        type: String,
        // required: true
    },
    content: {
        type: String,
        required: true
    },
    start: {
        type: String
        // type: Date,
        // default: Date.now()
    },
    finish: {
        type: String
        // type: Date
    },
    allDay: {
        type: Boolean,
        default: true
    },
    done: {
        type: Boolean,
        default: false
    }
}, {timestamp:true}
);

module.exports = mongoose.model('Business', BusinessSchema)