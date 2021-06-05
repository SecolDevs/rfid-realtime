import React, { useReducer } from 'react'
import AsistenciaContext from './AsistenciaContext'
import AsistenciaReducer from './AsistenciaReducer'

const AsistenciaState = (props) => {
  const initialState = {}

  const [state, dispatch] = useReducer(AsistenciaReducer, initialState)

  // Functions

  return (
    <AsistenciaContext.Provider value={{}}>
      {props.children}
    </AsistenciaContext.Provider>
  )
}

export default AsistenciaState
