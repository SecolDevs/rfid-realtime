const Asistencia = require('../models/Asistencia')

module.exports = {
  create: async (data) => {
    try {
      const asistencia = new Asistencia(data)
      asistencia.save()
      return asistencia
    } catch (err) {
      return { msg: `Error ${err}` }
    }
  },
  update: async (data) => {
    try {
      const asistencia = Asistencia.findByIdAndUpdate(
        { _id: data._id },
        { $set: data }
      )
      return asistencia
    } catch (err) {
      return { msg: `Error ${err}` }
    }
  },
}
