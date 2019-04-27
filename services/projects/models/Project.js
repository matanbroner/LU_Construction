
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProjectSchema = new Schema({
    projectId: {
        type: String,
    },
    projectName:{
        type: String,
    },
    projectLocation: {
        type: String,
        default: 'No Location Given'
    },
    projectDescription: {
        type: String,
        default: ''
    },
    createDate:{
        type: Date,
        default: Date.now(),
    },
    bucketId: {
        type: String,
    },
    mediaCount: {
        type: Number,
        default: 0
    },
    coverImage: {
        type: String,
        default: ''
    },
    youtubeLinks: {
        type: [Object]
    },
    priceMin: {
        type: Number,
        default: 0
    },
    priceMax: {
        type: Number,
        default: 0
    },
    featured: {
        type: Boolean,
        default: false
    }
})


module.exports = Project = mongoose.model("projects", ProjectSchema);
