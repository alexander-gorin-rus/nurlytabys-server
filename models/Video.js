const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema

const VideoSchema = new mongoose.Schema({
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
    description: {
        type: String
    },
    category: {
        type: ObjectId,
        ref: "Category"
    },
    // category: {
    //     type: String
    // },
    filePath: {
        type: String
    },
    duration: {
        type: String
    },
    views: {
        type: Number
    },
    duration: {
        type: String
    },
    thumbnail: {
        type: String,
        default: 0
    }
}, {timestamps: true});

module.exports = mongoose.model('video', VideoSchema)