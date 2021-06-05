const Asistencia = require('../models/Asistencia')

findId = async (id) => {
  try {
    const asistencia = await Asistencia.findById(id).populate('persona').exec()
    return asistencia
  } catch (err) {
    return false
  }
}

module.exports = {
  findData: async (data) => {
    try {
      const asistencia = await Asistencia.find(data).exec()
      if (Object.keys(asistencia).length > 0) return asistencia[0]
      else return false
    } catch (err) {
      return false
    }
  },
  create: async (data) => {
    try {
      let asistencia = new Asistencia(data)
      await asistencia.save()
      asistencia = findId(asistencia._id)
      return asistencia
    } catch (err) {
      return { msg: `Error ${err}` }
    }
  },
  update: async (data) => {
    try {
      let asistencia = await Asistencia.findOneAndUpdate(
        { _id: data._id },
        data,
        { new: true }
      )
      asistencia = findId(asistencia._id)
      return asistencia
    } catch (err) {
      return { msg: `Error ${err}` }
    }
  },
}
