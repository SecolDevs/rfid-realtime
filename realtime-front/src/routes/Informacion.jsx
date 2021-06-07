import React from "react";
import { useEffect, useState } from "react";
import { socket } from "../config/SocketConfig";

const Informacion = () => {
  const [persona, setPersona] = useState({});
  const [error, setError] = useState(false);
  const valor = true;
  socket.emit("formato", valor);
  useEffect(() => {
    socket.on("successInfoCard", (data) => {
      setPersona(data);
    });

    socket.on("badCard", () => {
      setError(true);
      setPersona({});
      setTimeout(() => {
        setError(false);
      }, 3000);
    });
  }, [socket]);
  return (
    <div className="container">
      <div className="titulo">
        <h1>Use la tarjeta para verificar</h1>
      </div>

      <>
        {error ? (
          <div
            className="card border-danger mb-3"
            // style="max-width: 20rem;"
          >
            <div className="card-header">ERROR</div>
            <div className="card-body">
              <h4 className="card-title">No existe la persona</h4>
            </div>
          </div>
        ) : (
          Object.keys(persona).length > 0 && (
            <div
              className="card border-primary mb-3"
              // style="max-width: 20rem;"
            >
              <div className="card-header"> CON EXITO</div>
              <div className="card-body">
                <img src={persona.foto} alt="" className="img-card" />
                <p className="card-text">nombre: {persona.nombre}</p>

                <p className="card-text">Documento: {persona.documento}</p>

                <p className="card-text">telefono : {persona.telefono}</p>
              </div>
            </div>
          )
        )}
      </>
    </div>
  );
};

export default Informacion;
