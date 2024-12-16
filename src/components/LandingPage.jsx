import React from "react";
import { Link } from "react-router-dom";
import { Container, Button } from "reactstrap";

export default function LandingPage(){
  return(
    <Container className="d-flex flex-column justify-content-center align-items-center vh-100 text-center">
      <h1 className="mb-4">Bienvenidos a Farmacia Alto Palermo</h1>
      <Link to="/home">
        <Button className="first-button" size="lg">ingresar</Button>
      </Link>
    </Container>
  )
}