const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = require('../models/user')


// POST /users
router.post('/users', async (req, res) => {
  const user = new User(req.body)

  try {
    await user.save()
    
    res.status(201).send(user)
    
  } catch (e) {

    res.status(400).send(e)
  }
})




module.exports = router