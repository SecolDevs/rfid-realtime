import React from 'react'
import AsistenciaState from './context/AsistenciaState'
import Root from './Root'

const App = () => {
  return (
    <AsistenciaState>
      <Root />
    </AsistenciaState>
  )
}

export default App
