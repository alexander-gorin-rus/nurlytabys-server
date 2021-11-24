const mongoose = require('mongoose');
// const moment = require('moment-timezone');
// const dateKz = moment.tz.names("Qazakhstan/Qaragandy")

const BusinessSchema = mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    start: {
        type: Date,
        default: Date.now()
    },
    finish: {
        type: String
        //type: Date
    },
    done: {
        type: Boolean,
        default: false
    }
}, {timestamp:true}
);

module.exports = mongoose.model('Business', BusinessSchema)