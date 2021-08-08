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
    },
    images: {
        type: Array,
        default: []
    }
}, {timestamps: true});

module.exports = mongoose.model('video', VideoSchema)