import React from "react";
import { NavLink } from "react-router-dom";

const Boton = ({ boton }) => {
  const { img, nombre, ruta } = boton;
  return (
    <div className="col">
      <NavLink to={ruta} className="card">
        <img src={img} className="card-img-top img-card" alt="..." />

        <div className="card-body">
          <h1 className="card-title text-center"> {nombre}</h1>
        </div>
      </NavLink>
    </div>
  );
};

export default Boton;
