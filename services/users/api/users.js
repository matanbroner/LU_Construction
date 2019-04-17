
const express = require("express")
const router = express.Router()
var bcrypt   = require('bcryptjs');
const jwt = require("jsonwebtoken")
const keys = require('../config/keys')
const passport = require('passport')

const validateRegisterInput = require('../validation/register')
const validateLoginInput = require('../validation/login')

const User = require('../models/User')

router.post('/register', (req, res) => {

    const {errors, isValid} = validateRegisterInput(req.body)
    if (!isValid)
        return res.status(400).json(errors)

    User.findOne({ email: req.body.email }).then(user => {
        if (user){
            return res.status(400).json({ email: "Email already exists"})
        } else {
            const newUser = new User({
                name: req.body.name,
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            })

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err
                    newUser.password = hash
                    newUser.save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err))
                })
            })
        }
    })
})

router.post('/login', (req, res) => {
    const {errors, isValid} = validateLoginInput(req.body)
    if (!isValid)
        return res.status(400).json(errors)

    const username = req.body.username
    const password = req.body.password


    User.findOne({ username }).then(user => {
        if (!user)
            return res.status(404).json({usernamenotfound: "Username not found"})


        bcrypt.compare(password, user.password, function(err, response){
            if (response){
                const payload = {
                    id: user.id,
                    username: user.username
                }

                jwt.sign(
                    payload,
                    process.env.SECRET_KEY,
                    {
                        expiresIn: 31556926 // 1 year in seconds
                    },
                    (err, token) => {
                            res.status(200).json({
                            success: true,
                            token: "Bearer " + token,
                            name: user.name
                        })
                    }
                )
            } else if (err){
                return res 
                    .status(400)
                    .json({ passwordincorrect: "Password incorrect."})
            }
        })
        
    })
})

router.get('/auth',
  passport.authenticate('jwt', {session: false}),
  (req, res) => {
    const { user } = req;

    res.status(200).json({ user });
  });

module.exports = router;
