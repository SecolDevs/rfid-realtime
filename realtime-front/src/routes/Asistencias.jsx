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
    <div className="container asis-pri">
      <div className="col-9">
        <h1>Dentro</h1>
      </div>
      {loading ? (
        <h1>Cargando...</h1>
      ) : Object.keys(asistencias).length > 0 ? (
        asistencias.map((asistencia) => (
          <Asistencia key={asistencia._id} asistencia={asistencia} />
        ))
      ) : (
        <h2>No hay asistencias</h2>
      )}
      <div className="col-9">
        <h1>Historial</h1>
      </div>
      <table class="table table-hover">
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
            <h2>No hay asistencias</h2>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Asistencias;
