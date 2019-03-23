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

UserSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email })

  if (!user) {
    throw new Error('Unable to login')
  }

  const isMatch = await bcrypt.compare(password, user.password)

  if (!isMatch) {
    throw new Error('Unable to login')
  }

  return user
}

UserSchema.pre('save', async function(next) {
  const user = this

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }

  next()
})


const User = mongoose.model('User', UserSchema)

module.exports = User