import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { postObraSocial } from "../redux/slices/obrasSocialesSlice";
import { Form, FormGroup, Label, Col, Input, Button, Container, Alert, Card, Spinner } from 'reactstrap';

function validate(input) {
  let errors = {};
  if (!input.nombre) {
    errors.nombre = "se requiere un nombre";
  }
  return errors;
}

export default function ObraSocialCreate() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { isLoading } = useSelector((state) => state.obrasSociales);
  
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    nombre: '',
  });

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
    setErrors(validate({
      ...input,
      [e.target.name]: e.target.value
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await dispatch(postObraSocial(input)).unwrap();
      alert('¡Obra social creada con éxito!');
      setInput({
        nombre: '',
      });
      navigate('/obras-sociales');
    } catch (err) {
      alert('Error al crear obra social: ' + err);
    }
  }

  return (
    <Container className="mt-5">
      <Card className="p-4 shadow w-75">
        <h1>Crear Nueva Obra Social</h1>
        <br />
        <Form onSubmit={handleSubmit}>
          <FormGroup row>
            <Label for='nombre' sm={2}><h5>Nombre</h5></Label>
            <Col sm={6}>
              <Input id="nombre" type="text" value={input.nombre} onChange={handleChange} name="nombre" />
              {errors.nombre && (<Alert className="mt-2" color="danger">{errors.nombre}</Alert>)}
            </Col>
            <br />
            <br />
            <Col sm={8} className="mt-3">
              {isLoading ? (
                <Spinner color="primary" />
              ) : (
                <>
                  {Object.keys(errors).length ? (
                    <Button className="first-button" type="submit" disabled>crear</Button>
                  ) : (
                    <Button className="first-button" type="submit">crear</Button>
                  )}
                </>
              )}
              <Link to={'/obras-sociales'}><Button className="ms-2 second-button">cancelar</Button></Link>
            </Col>
          </FormGroup>
        </Form>
      </Card>
    </Container>
  );
}