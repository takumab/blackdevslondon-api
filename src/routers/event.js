const express = require('express')
const router = express.Router()
const Event = require('../models/event')


// POST /events
router.post('/events', async (req, res) => {
  const event = new Event(req.body)

  try {

    await event.save()

    res.send()

  } catch (e) {

    res.status(400).send(e)

  }
})


module.exports = router

