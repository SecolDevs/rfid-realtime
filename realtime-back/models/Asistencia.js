const mongoose = require('mongoose')

const AsistenciaSchema = mongoose.Schema({
  fechaEntrada: {
    type: Date,
    default: Date.now(),
  },
  fechaSalida: {
    type: Date,
    required: false,
  },
  estado: {
    type: String,
    default: '0',
  },
  persona: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Persona',
  },
})

module.exports = mongoose.model('Asistencia', AsistenciaSchema)
