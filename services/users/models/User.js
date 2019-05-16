
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: {
        type: String,
        unique: true,
        default: 'LU Employee'
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        unique: true
    },
    password: {
        type: String,
    },
    role: {
        type: String,
        default: 'Moderator'
    },
    color: {
        type: String,
        default: '#83ab4a'
    }
})


module.exports = User = mongoose.model("users", UserSchema);
