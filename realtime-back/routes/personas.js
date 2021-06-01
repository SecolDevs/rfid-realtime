const express = require('express')
const personaController = require('../controller/personaController')
const router = express()

router.get('/', personaController.findPersonas)
router.post('/', personaController.createPersona)
router.delete('/:id', personaController.deletePersona)

module.exports = router
