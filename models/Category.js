const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema

const CategorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String
    },
    slug: {
        type: String,
        lowercase: true,
        unique: true,
        index: true
    },
    videos: {
        type: ObjectId,
        ref: "Video"
    }
}, 
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    },
{timestamps: true});

//Cascade delete videos when the category is deleted
CategorySchema.pre('remove', async function (next) {
    console.log("Категория вместе с видео успешно удалены")
    await this.model("Video").deleteMany({ category: this._id });
    next();
})

//Reverse populate with virtuals
CategorySchema.virtual('video', {
    ref: "video",
    localField: '_id',
    foreignField: 'category',
    justOne: false
})

module.exports = mongoose.model('Category', CategorySchema)