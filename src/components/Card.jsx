import React from "react";

export default function Card({ nombre, apellido, puntos }){

  return(
    <div>
      <h3>{nombre} {apellido} - Puntos acumulados: {puntos}</h3>
    </div>
  )
}