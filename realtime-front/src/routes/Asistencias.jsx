import React, { useContext, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { socket } from '../config/SocketConfig'
import AsistenciaContext from '../context/AsistenciaContext'
import Asistencia from './asistencias/Asistencia'

function Asistencias() {
  // Context
  const { asistencias, loading, asistenciasFn } = useContext(AsistenciaContext)
  const { getAsistencias } = asistenciasFn

  const location = useLocation()

  useEffect(() => {
    if (location.pathname === '/asistencias') {
      getAsistencias()
    }
  }, [location.pathname])

  return (
    <div className="container asis-pri">
      <div className="col-9">
        <h1>Dentro</h1>
      </div>
      {loading ? (
        <h1>Cargando...</h1>
      ) : Object.keys(asistencias).length > 0 ? (
        asistencias.map((asistencia) => (
          <Asistencia
            key={asistencia._id}
            asistencia={asistencia}
            historial={false}
          />
        ))
      ) : (
        <h2>No hay asistencias</h2>
      )}
      <div className="col-9">
        <h1>Historial</h1>
      </div>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">NOMBRE</th>
            <th scope="col">FECHA ENTRADA</th>
            <th scope="col">FECHA SALIDA</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <h1>Cargando...</h1>
          ) : Object.keys(asistencias).length > 0 ? (
            asistencias.map((asistencia) => (
              <Asistencia
                key={asistencia._id}
                asistencia={asistencia}
                historial={true}
              />
            ))
          ) : (
            <tr>
              <td>No hay Asistencias</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Asistencias
