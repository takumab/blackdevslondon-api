const mongoose = require('mongoose')
const { Schema } = mongoose;
const validator = require('validator')


/*
  User
  -----
    * name 
    * email
    * password
*/
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    required: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is invalid')
      }
    }
  }
})

const User = mongoose.model('User', UserSchema)

module.exports = User