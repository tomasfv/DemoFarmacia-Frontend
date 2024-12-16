import React from "react";
import { Container, Row, Col } from "reactstrap";
import NavBar from './NavBar';

export default function Layout({ children }) {
  return (
    <Container fluid>
      <Row>
        <Col sm={2} className="p-1">
          <NavBar/>
        </Col>
        <Col sm={10} className="p-4">
          {children}
        </Col>
      </Row>
    </Container>
  );
}