const mongoose = require('mongoose');

const RegisterPasswordSchema = new mongoose.Schema({
    name: {
        type: String
    },
    password: {
        type: String
    }
}, {timestamps: true});

module.exports = mongoose.model("RegisterPassword", RegisterPasswordSchema)