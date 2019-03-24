const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const User = require('../models/user')


// POST /users
router.post('/users', async (req, res) => {
  const user = new User(req.body) // new User('name', 'email', 'password')

  try {
    await user.save()

    const token = await user.generateAuthToken()
    
    res.status(201).send({user, token})

  } catch (e) {

    res.status(400).send(e)
  }
})

// POST /users/login
router.post('/users/login', async (req, res) => {

  try {
   
    const user  = await User.findByCredentials(req.body.email, req.body.password)
    const token = await user.generateAuthToken()
    
    res.send({ user, token})

  } catch (e) {

    res.status(400).send(e)

  }

})

// GET /users/me - get current user's profile
router.get('/users/me', auth, async (req, res) => {
  res.send(req.user)
})

// GET /user/:id - show
router.get('/users/:id', async (req, res) => {
  const _id = req.params.id
  
  try {
    const user = await User.findById(_id)

    if (!user) {
      res.status(404).send()
    }

    res.send(user)

  } catch (e) {

    res.status(500).send(e)

  }

})

router.patch('/users/:id', async (req, res) => {
  const _id              = req.params.id 
  const updates          = Object.keys(req.body)
  const allowedUpdates   = ['name', 'email', 'password']
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates' })
  }

  try {
    const user = await User.findById(_id)

    updates.forEach((update) => user[update] = req.body[update])
    await user.save()

    if (!user) {
      return res.status(404).send()
    }

    res.send(user)


  } catch (e) {

    res.status(400).send(e)

  }
})

router.delete('/users/:id')




module.exports = router