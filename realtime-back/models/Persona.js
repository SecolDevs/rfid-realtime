const mongoose = require('mongoose')

const PersonaSchema = mongoose.Schema({
  tag: {
    type: String,
    required: true,
  },
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  foto: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
})

module.exports = mongoose.model('Persona', PersonaSchema)
