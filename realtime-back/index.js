const express = require('express')
const cors = require('cors')
const conectarDb = require('./config/db')
const app = express()
const serialPort = require('serialport')
const personaSocket = require('./controller/personaSocket')
const asistenciaSocket = require('./controller/asistenciaSocket')

// Serial Port
const port = new serialPort('COM5', { baudRate: 9600 })
const parser = new serialPort.parsers.Readline()
port.pipe(parser)

const informacion = false

// Conectar DB
conectarDb()
// Levantar Server
const server = require('http').Server(app)

// Escuchar eventos con socket io
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  },
})
// Config Inicial
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const PORT = process.env.PORT || 4000

app.get('/', (res) => {
  res.status(200).json({ msg: 'Conectado a la api' })
})

// rutas
app.use('/persona', require('./routes/personas'))
app.use('/asistencia', require('./routes/asistencias'))

// socket
if (informacion) {
  let conSocket = null
  io.on('connection', (socket) => {
    console.log('Alguien se ha conectado con Sockets', socket.id)
    conSocket = socket
  })

  parser.on('data', async (line) => {
    line = line.trim()
    let res = await personaSocket.findTag(line.trim())
    console.log(line)
    console.log(res)
    if (res) {
      port.write('true')
      io.emit('successInfoCard', res)
    } else {
      port.write('false')
      io.emit('badCard')
    }
  })
  //
  // ASISTENCIAS
} else {
  let conSocket = null
  io.on('connection', (socket) => {
    console.log('Alguien se ha conectado con Sockets', socket.id)
    conSocket = socket
  })

  parser.on('data', async (line) => {
    line = line.trim()
    let res = await personaSocket.findTag(line.trim())
    if (res) {
      port.write('true')
      let asis = await asistenciaSocket.findData({
        persona: res._id,
        estado: '1',
      })
      if (asis) {
        let asistencia = await asistenciaSocket.update({
          _id: asis._id,
          estado: '0',
          fechaSalida: Date.now(),
        })
        io.emit('updatedAsistencia', asistencia)
      } else {
        let asistencia = await asistenciaSocket.create({
          persona: res._id,
          estado: '1',
          fechaSalida: null,
        })
        io.emit('createdAsistencia', asistencia)
      }
    } else {
      port.write('false')
      io.emit('badCard')
    }
  })
}

// Server
server.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`)
})
