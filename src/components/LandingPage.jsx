import React from "react";
import { Container, Button} from "reactstrap";
import { Link } from "react-router-dom";


export default function LandingPage(){


  return(
    <Container className="d-flex flex-column justify-content-center align-items-center vh-100 text-center">
      <h1 className="mb-4">Bienvenidos a Demo App Farmacia</h1>
        <Link to="/home">
          <Button className="first-button w-100">ingresar</Button>
        </Link> 
    </Container>
  )
}