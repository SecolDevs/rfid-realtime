const express = require('express')
const asistenciaController = require('../controller/asistenciaController')
const router = express()

router.get('/', asistenciaController.findAsistencias)

module.exports = router
