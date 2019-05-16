const express = require('express');
const estimate = express.Router();
const nodemailer = require('nodemailer');
var bodyParser = require('body-parser')

var createTemplate = require('./emailTemplate')

estimate.use(bodyParser.urlencoded({
    extended: true
  }));

var transporter = nodemailer.createTransport({
    host: 'smtp.mail.yahoo.com',
            port: 465,
            service:'yahoo',
            secure: false,
            auth: {
               user: 'lu_construction_estimates@yahoo.com',
               pass: 'z5wJFPjy4eYpuqyZ'
            },
            debug: false,
            logger: true 
  });




estimate.post('/send', (req, res, next) => {

    var newEstimate = req.body

    var mailOptions = {
        from: 'lu_construction_estimates@yahoo.com',
        to: 'matanbroner@gmail.com',
        subject: 'LU Construction Estimate Request',
        html: createTemplate(newEstimate)
      };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error)
            res.status(404).json({err: "Error sending estimate"});
        } else {
            console.log(info)
          res.status(200).json({sent: "Estimate was sent."});
        }
      });

})

module.exports = estimate