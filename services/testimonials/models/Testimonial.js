const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TestimonialSchema = new Schema({
    testId: {
        type: String
    },
    name: {
        type: String,
    },
    rating: {
        type: Number
    },
    relationship: {
        type: String
    },
    date: {
        type: Date
    },
    price: {
        type: String
    },
    description: {
        type: String
    },
    color: {
        type: String
    },
    approved: {
        type: Boolean,
        default: false
    },
    featured: {
        type: Boolean,
        default: false
    }
})


module.exports = Testimonial = mongoose.model("testimonials", TestimonialSchema);
