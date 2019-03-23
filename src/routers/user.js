const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = require('../models/user')


// POST /users
router.post('/users', (req, res) => {
  res.send('Hello from user create route')
})




module.exports = router