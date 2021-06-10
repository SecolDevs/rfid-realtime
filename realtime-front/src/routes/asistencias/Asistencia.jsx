import React from 'react'

const Asistencia = ({ asistencia, historial = false }) => {
  const { estado, fechaEntrada, fechaSalida, persona } = asistencia

  return (
    <>
      {historial
        ? estado === '0' && (
            <tr className="table-info">
              <td>{persona.nombre}</td>
              <td>
                {Intl.DateTimeFormat('es-CO', {
                  timeZone: 'America/Bogota',
                  dateStyle: 'short',
                  timeStyle: 'short',
                }).format(new Date(fechaEntrada))}
              </td>
              <td>
                {Intl.DateTimeFormat('es-CO', {
                  timeZone: 'America/Bogota',
                  dateStyle: 'short',
                  timeStyle: 'short',
                }).format(new Date(fechaSalida))}
              </td>
            </tr>
          )
        : estado === '1' && (
            <div className="row asistencia-dentro col-5">
              <div className="col-6">
                <img src={persona.foto} alt="" className="img-asis" />
              </div>
              <div className="col-6">
                <p className="text-asis">
                  <b>Nombre</b>: {persona.nombre}
                </p>
                <p className="text-asis">
                  <b>Fecha Entrada</b>:
                  {Intl.DateTimeFormat('es-CO', {
                    timeZone: 'America/Bogota',
                    dateStyle: 'long',
                    timeStyle: 'short',
                  }).format(new Date(fechaEntrada))}
                </p>
              </div>
            </div>
          )}
    </>
  )
}

export default Asistencia
