import React from "react";

const Asistencia = ({ asistencia, historial = false }) => {
  const { estado, fechaEntrada, fechaSalida, persona } = asistencia;

  return (
    <>
      {historial
        ? estado === "0" && (
            <h2>{`${persona.nombre}-${Intl.DateTimeFormat("es-CO", {
              timeZone: "America/Bogota",
              dateStyle: "long",
              timeStyle: "short",
            }).format(new Date(fechaEntrada))}-- ${Intl.DateTimeFormat(
              "es-CO",
              {
                timeZone: "America/Bogota",
                dateStyle: "long",
                timeStyle: "short",
              }
            ).format(new Date(fechaSalida))}`}</h2>
          )
        : estado === "1" && (
            <h2>{`${persona.nombre}-${Intl.DateTimeFormat("es-CO", {
              timeZone: "America/Bogota",
              dateStyle: "long",
              timeStyle: "short",
            }).format(new Date(fechaEntrada))}`}</h2>
          )}
    </>
  );
};

export default Asistencia;
