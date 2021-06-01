const Persona = require('../models/Persona')

module.exports = {
  findTag: async (tag) => {
    try {
      const persona = await Persona.find({ tag }).exec()
      if (Object.keys(persona).length > 0) return persona
      else return false
    } catch (err) {
      return false
    }
  },
}
