const mongoose = require('mongoose')

const AsistenciaSchema = mongoose.Schema({
  tag: {
    type: String,
    required: true,
  },
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
})

module.exports = mongoose.model('Asistencia', AsistenciaSchema)
