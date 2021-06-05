const Asistencia = require('../models/Asistencia')

module.exports = {
  findAsistencias: async (_, res) => {
    try {
      const asistencias = await Asistencia.find().populate('persona')
      res.json(asistencias)
    } catch (err) {
      res.status(500).json({ msg: `Error ${err}` })
    }
  },
}
