import React, {useState, useEffect} from "react";
import {Link, useNavigate, useParams} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { editObraSocial, getObraSocialById } from "../redux/actions";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, FormGroup, Label, Col, Input, Button, Container, Card} from 'reactstrap';

export default function ObraSocialEdit(){

  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const [input, setInput] = useState({
    nombre: "",
   
  });

  useEffect(()=>{
    dispatch(getObraSocialById(id));
  }, [dispatch, id]);

  const obraSocial = useSelector((state) => state.obrasSociales);

  useEffect(() => {
    if (obraSocial && obraSocial.length > 0) {
      setInput({
        nombre: obraSocial[0].nombre,
      });
    }
  }, [obraSocial]);

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editObraSocial(input, id));
    alert("Obra social actualizada con éxito.");
    navigate("/obras-sociales");
  };

  return (
    <Container className="mt-5">
      <Card className="p-2 shadow w-75">
        <h1>EDITAR OBRA SOCIAL</h1>
      <Form onSubmit={(e) => handleSubmit(e)} onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}>
      <FormGroup row>
          <Label for='nombre' sm={2}><h5>Nombre</h5></Label>
          <Col sm={6}>
          <Input id="nombre" type="text" value={input.nombre} onChange={(e) => handleChange(e)} name="nombre"/>
          </Col>
        </FormGroup>
        <Button className="first-button" type="submit">editar</Button>
        <Link to={'/obras-sociales'}><Button className="ms-2 second-button">cancelar</Button></Link>
      </Form>
      </Card>
    </Container>
  )
}