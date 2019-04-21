const express = require('express');
const api = express.Router();
const Testimonial = require('../models/Testimonial')
var authenticate = require('./auth')


api.get('/need_approval', (req, res, next) => {
    Testimonial.find({approved: false}, (err, data) => {
        if (err)
            res.status(404).json({err: 'Unable to fetch testimonials.'})
        else res.json(data)
    })
})

api.post('/create', (req, res, next) => {
    let testimonial = req.body.testimonial
    let newTestimonial = new Testimonial({
        testId: testimonial.id,
        name: testimonial.name,
        rating: testimonial.rating,
        relationship: testimonial.relationship,
        date: testimonial.date,
        price: testimonial.price,
        description: testimonial.description,
        color: testimonial.color,
        featured: testimonial.featured
    })

    newTestimonial.save(err => {
        if (err)
            res.status(404).json({err: "Error saving testimonial"})
    })
})

api.post('/approve', (req, res, next) => {
    authenticate(req, res , (r) => { 
        if (!r) 
        return res.status(404).json({badAuth: 'Invalid or no authorization was provided, action denied.'})
        else {
            var testimonials = req.body.testimonials
            testimonials.forEach(testimonial => {
            Testimonial.findById(testimonial, (err, result) => {
                if (err || !result)
                    return res.status(404).json({err: "Error modifying testimonial"})
                else result.approved = true
                result.save(err => {
                    if (err) res.status(404).json({err: "Error saving testimonial"})
                    })
                })
            })
            res.status(200).json({approved: "Testimonials have been approved."})
        }
    })
})

api.post('/delete', (req, res, next) => {
    authenticate(req, res , (r) => { 
        if (!r) 
        return res.status(404).json({badAuth: 'Invalid or no authorization was provided, action denied.'})
        else {
            var testimonials = req.body.testimonials
            testimonials.forEach(testimonial => {
                Testimonial.findByIdAndRemove(testimonial, (err, result) => {
                if (err || !result)
                    return res.status(404).json({err: "Error modifying testimonial"})
                else result.approved = true
                result.save(err => {
                    if (err) res.status(404).json({err: "Error saving testimonial"})
                    })
                })
            })
        res.status(200).json({approved: "Testimonials have been deleted."})
        }
    })
})


module.exports = api