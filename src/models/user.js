const mongoose = require('mongoose')
const { Schema } = mongoose;
const validator = require('validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


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
  },
  password: {
    type: String,
    minlength: 8,
    required: true
  },
  tokens:[{
    token: {
      type: String,
      required: true
    }
  }]
})

UserSchema.methods.generateAuthToken = async function() {
  const user = this
  const token = jwt.sign({_id: user._id.toString()}, 'blackdevslondon')

  user.tokens = user.tokens.concat({ token })

  await user.save()
  return token
}

const User = mongoose.model('User', UserSchema)

module.exports = User