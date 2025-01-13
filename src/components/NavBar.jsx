import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCreditCard } from "@fortawesome/free-solid-svg-icons";
import { Button, Nav, NavItem, Container, Card, Row, Col } from "reactstrap";
import "./NavBar.css"; // Importamos el archivo de estilos

export default function NavBar() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1100);

  // Manejar el cambio de tamaño de la ventana
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1100);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Container fluid>
      {isMobile ? (
        <Row className="navbar w-100">
            <Nav card pills>
          <Col>
              <NavItem className="m-2 text-center">
                <h5>Demo Farmacia</h5>
              </NavItem>
          </Col>
          <Col className="d-flex m-1">
              <NavItem className="me-2">
                <Link to='/home'>
                  <Button className="first-button" size="sm">
                    <FontAwesomeIcon icon={faUser}/>
                  </Button>
                </Link>
              </NavItem>
              <NavItem>
                <Link to='/obras-sociales'>
                  <Button color="success" className="first-button" size="sm">
                    <FontAwesomeIcon icon={faCreditCard}/>
                  </Button>
                </Link>
              </NavItem>
          </Col>
          <Col>
          </Col>
            </Nav>
        </Row>
      
           
      
      ) : (
        
        <Card className="vh-100 p-3">
    
        <Nav vertical card pills>
          <NavItem className="mb-4 text-center">
            <h5>Demo Farmacia</h5>
          </NavItem>
          <NavItem className="mb-4">
            <Link to='/home'><Button className="w-100  first-button"><FontAwesomeIcon icon={faUser}/> clientes</Button></Link>
          </NavItem>
    
          <NavItem>
            <Link to='/obras-sociales'><Button color="success" className="w-100  first-button"><FontAwesomeIcon icon={faCreditCard}/> obras sociales</Button></Link>
          </NavItem>
    
        </Nav>
        </Card>
      )}
    
    </Container>

  );
}
