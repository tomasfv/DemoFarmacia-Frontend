import React from "react";
import { Container, Button} from "reactstrap";
import { Link } from "react-router-dom";
import LoginButton from "./LoginButton.jsx";
import Profile from "./Profile.jsx";
import LogoutButton from "./LogoutButton.jsx";
import { useAuth0 } from "@auth0/auth0-react";

export default function LandingPage(){

  const {user, isAuthenticated} = useAuth0();
  
  const allowedEmail = process.env.REACT_APP_ALLOWED_USER_EMAIL;
  const allowedName = process.env.REACT_APP_ALLOWED_USER_NAME;
  const usuarioPermitido = user?.email === allowedEmail && user?.name === allowedName;
  

  return(
    <Container className="d-flex flex-column justify-content-center align-items-center vh-100 text-center">
      <h1 className="mb-4">Bienvenidos a Farmacia Alto Palermo</h1>
      
      
      {isAuthenticated && usuarioPermitido ? (
      <div>
        <h3>Este usuario tiene permiso para acceder a la aplicación:</h3>
        <Profile/>
        <Link to="/home">
          <Button className="first-button w-100">ingresar</Button>
        </Link> 
        <LogoutButton/>
      </div>
      ) : isAuthenticated? (
      <div>
        <h3>No tienes acceso a la aplicación.</h3>
        <LogoutButton/> 
      </div>
      ) : (
        <div>
          <LoginButton/>
        </div>
      )}
    </Container>
  )
}