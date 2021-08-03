const mongoose = require('mongoose');

const MainPageVideoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        unique: true,
        text: true,
        lowercase: true,
        index: true
    },
    companyInfo: {
        type: String
    },
    description: {
        type: String
    },
    contacts: {
        type: String
    },
    filePath: {
        type: String
    },
    duration: {
        type: String
    },
    thumbnail: {
        type: String,
        default: 0
    },
    images: {
        type: Array,
        default: []
    }
}, {timestamps: true});

module.exports = mongoose.model('main_page_video', MainPageVideoSchema)