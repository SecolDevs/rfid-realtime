import React, { useContext, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Botones from './components/Botones'
import { socket } from './config/SocketConfig'
import AsistenciaContext from './context/AsistenciaContext'
import Asistencias from './routes/Asistencias'
import Informacion from './routes/Informacion'
import Main from './routes/Main'

const Root = () => {
  // Context
  const { asistenciasFn } = useContext(AsistenciaContext)
  const { addAsistencia, updateAsistencia } = asistenciasFn

  useEffect(() => {
    socket.on('createdAsistencia', (asistencia) => {
      addAsistencia(asistencia)
    })

    socket.on('updatedAsistencia', (asistencia) => {
      updateAsistencia(asistencia)
    })
  }, [socket])

  return (
    <Router>
      <Botones />

      <Switch>
        <Route path="/informacion" component={Informacion} />
        <Route path="/asistencias" component={Asistencias} />
        <Route path="/" component={Main} />
      </Switch>
    </Router>
  )
}

export default Root
