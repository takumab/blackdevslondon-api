const express = require('express')
const router  = express.Router()
const auth    = require('../middleware/auth')
const User    = require('../models/user')


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

router.post('/users/logout', auth, async (req, res) => {
  // Get access to the token that was used to authenticate user
  try {
    // Remove item from tokens array
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token
    })

    await req.user.save()

    res.status(200).send()

  } catch (e) {
    
    res.status(500).send()

  }
})

router.post('/users/logoutAll', auth, async (req, res) => {
  try {
    req.user.tokens = []
    await req.user.save()

    res.send()

  } catch (e) {
    
    res.status(500).send()

  }
})

// GET /users/me - get current user's profile
router.get('/users/me', auth, async (req, res) => {
  res.send(req.user)
})

// PATCH /users/5c9690153de56f6356ac4bd3
router.patch('/users/me', auth, async (req, res) => {
  // const _id              = req.params.id 
  const updates          = Object.keys(req.body)
  const allowedUpdates   = ['name', 'email', 'password']
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates' })
  }

  try {
    updates.forEach((update) => req.user[update] = req.body[update])
    await req.user.save()

    res.send(req.user)
  
  } catch (e) {

    res.status(400).send(e)

  }
})

// DELETE /users/5c9690153de56f6356ac4bd3
router.delete('/users/me', auth, async (req, res) => {
  
  try {
    await req.user.remove()
    res.send(req.user)

  } catch (e) {

    res.status(500).send(e)

  }
})




module.exports = router