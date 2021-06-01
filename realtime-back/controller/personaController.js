const Persona = require('../models/Persona')

module.exports = {
  createPersona: async (req, res) => {
    try {
      const persona = new Persona(req.body)
      persona.save()
      res.json(persona)
    } catch (err) {
      res.status(500).json({ msg: `Error ${err}` })
    }
  },
  findPersonas: async (_, res) => {
    try {
      const personas = await Persona.find()
      res.json(personas)
    } catch (err) {
      res.status(500).json({ msg: `Error ${err}` })
    }
  },
  deletePersona: async (req, res) => {
    const { id } = req.params
    try {
      const persona = await Persona.findById(id)

      if (!persona) return res.status(404).json({ msg: 'No existe' })

      await Persona.findOneAndRemove({ _id: id })
      return res.json({ msg: 'Eliminado' })
    } catch (err) {
      res.status(500).json({ msg: `Error ${err}` })
    }
  },
}
