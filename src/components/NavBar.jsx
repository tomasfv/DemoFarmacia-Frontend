import React from "react";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCreditCard } from "@fortawesome/free-solid-svg-icons";
import { Button, Card, Nav, NavItem} from 'reactstrap';


export default function NavBar(){
  return(
    <Card style={{width: '15rem'}} className="vh-100 p-3">
    
    <Nav vertical card pills>
      <NavItem className="mb-4 text-center">
        <h5>Farmacia Alto Palermo</h5>
      </NavItem>
      <NavItem className="mb-4">
        <Link to='/home'><Button className="w-100 first-button"><FontAwesomeIcon icon={faUser}/> clientes</Button></Link>
      </NavItem>

      <NavItem>
        <Link to='/obras-sociales'><Button color="success" className="w-100 first-button"><FontAwesomeIcon icon={faCreditCard}/> obras sociales</Button></Link>
      </NavItem>

    </Nav>
    </Card>
  )
}