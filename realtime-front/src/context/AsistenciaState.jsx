import React, { useReducer } from "react";
import clienteAxios from "../config/clienteAxios";
import AsistenciaContext from "./AsistenciaContext";
import AsistenciaReducer from "./AsistenciaReducer";

const AsistenciaState = (props) => {
  const initialState = {
    asistencias: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(AsistenciaReducer, initialState);

  // Functions
  const asistenciasFn = {
    getAsistencias: async () => {
      try {
        const res = await clienteAxios("asistencia");
        dispatch({
          type: "getAsistencias",
          payload: res.data,
        });
      } catch (e) {
        console.log(e);
      }
    },
    addAsistencia: (data) => {
      dispatch({
        type: "addAsistencia",
        payload: data,
      });
    },
    updateAsistencia: (data) => {
      dispatch({
        type: "updateAsistencia",
        payload: data,
      });
    },
  };

  return (
    <AsistenciaContext.Provider
      value={{
        asistencias: state.asistencias,
        loading: state.loading,
        asistenciasFn,
      }}
    >
      {props.children}
    </AsistenciaContext.Provider>
  );
};

export default AsistenciaState;
