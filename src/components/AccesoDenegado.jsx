import React from "react";
import { Container } from "reactstrap";

export default function AccesoDenegado(){


  return(
    <Container className="d-flex flex-column justify-content-center align-items-center vh-100 text-center">
      <h1 className="mb-4">No tienes acceso a esta aplicación.</h1>
    </Container>
  )
}