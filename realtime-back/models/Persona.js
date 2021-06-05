const mongoose = require('mongoose')

const PersonaSchema = mongoose.Schema({
  tag: {
    type: String,
    required: true,
  },
  documento: {
    type: String,
    required: true,
    trim: true,
  },
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  telefono: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  foto: {
    type: String,
    required: true,
    trim: true,
  },
})

module.exports = mongoose.model('Persona', PersonaSchema)
