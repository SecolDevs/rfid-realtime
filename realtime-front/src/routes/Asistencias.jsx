import React, { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { socket } from "../config/SocketConfig";
import AsistenciaContext from "../context/AsistenciaContext";
import Asistencia from "./asistencias/Asistencia";

function Asistencias() {
  // Context
  const { asistencias, loading, asistenciasFn } = useContext(AsistenciaContext);
  const { getAsistencias, addAsistencia, updateAsistencia } = asistenciasFn;

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/asistencias") {
      getAsistencias();
    }
  }, [location.pathname]);

  useEffect(() => {
    socket.on("createdAsistencia", (asistencia) => {
      addAsistencia(asistencia);
    });

    socket.on("updatedAsistencia", (asistencia) => {
      updateAsistencia(asistencia);
    });
  }, [socket]);

  return (
    <div>
      <h1>Dentro</h1>
      {loading ? (
        <h1>Cargando...</h1>
      ) : Object.keys(asistencias).length > 0 ? (
        asistencias.map((asistencia) => (
          <Asistencia key={asistencia._id} asistencia={asistencia} />
        ))
      ) : (
        <h2>No hay asistencias</h2>
      )}
      <h1>Historial</h1>
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
        <h2>No hay asistencias</h2>
      )}
    </div>
  );
}

export default Asistencias;
