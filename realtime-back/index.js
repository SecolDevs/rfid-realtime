const express = require('express')
const cors = require('cors')
const conectarDb = require('./config/db')
const app = express()
const serialPort = require('serialport')
const personaSocket = require('./controller/personaSocket')

// Serial Port
const port = new serialPort('COM3', { baudRate: 9600 })
const parser = new serialPort.parsers.Readline()
port.pipe(parser)

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

// socket
let conSocket = null
io.on('connection', (socket) => {
  console.log('Alguien se ha conectado con Sockets', socket.id)
  conSocket = socket
})

parser.on('data', async (line) => {
  let res = await personaSocket.findTag(line.trim())
  console.log(line)
  console.log(res)
  if (res) {
    port.write('true')
    io.emit('succesCard', res)
  } else {
    port.write('false')
    io.emit('badCard')
  }
})

// Server
server.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`)
})
