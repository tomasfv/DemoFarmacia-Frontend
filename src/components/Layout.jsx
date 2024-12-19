import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import NavBar from "./NavBar";

export default function Layout({ children }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1100);

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
        <>
        <Container>
          <Row>
            <Col>
              <NavBar />
            </Col>
          </Row>
          <Row>
            <Col className="p-4">{children}</Col>
          </Row>
        </Container>  
        </>
      ) : (
        <Row>
          <Col sm={2} className="p-1">
            <NavBar />
          </Col>
          <Col sm={10} className="p-4">
            {children}
          </Col>
        </Row>
      )}
    </Container>
  );
}
