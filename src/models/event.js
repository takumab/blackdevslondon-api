const mongoose = require('mongoose')
const { Schema } = mongoose


const EventSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  dateTime: {
    type: Date,
    required: true
  }
})

const Event = mongoose.model('Event', EventSchema)
