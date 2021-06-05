import React from 'react'

import asistencias from '../assets/images/asistencia.png'
import informacion from '../assets/images/info.png'
import Boton from './Boton'

const Botones = () => {
  const buttons = [
    { nombre: 'Asistencias', ruta: '/asistencias', img: asistencias },
    { nombre: 'Informacion', ruta: '/informacion', img: informacion },
  ]

  return (
    <div className="container mt-5">
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {buttons.map((button) => (
          <Boton key={button.nombre} boton={button} />
        ))}
      </div>
    </div>
  )
}

export default Botones
