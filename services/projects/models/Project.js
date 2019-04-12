
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProjectSchema = new Schema({
    projectId: {
        type: String,
        required: true,
    },
    createDate:{
        type: Date,
        default: Date.now(),
    },
    bucketId: {
        type: String,
        required: true
    },
    mediaCount: {
        type: Number,
        required: true
    },
    coverImage: {
        type: String,
        default: 'http://clipart-library.com/img1/1394305.png'
    },
    youtubeLinks: {
        type: [String]
    },
    priceMin: {
        type: Number,
        default: 0
    },
    priceMax: {
        type: Number,
        default: 0
    }
})


module.exports = Project = mongoose.model("projects", ProjectSchema);
