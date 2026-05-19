import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { editObraSocial, getObraSocialById, clearObraSocialDetail } from "../redux/slices/obrasSocialesSlice";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, FormGroup, Label, Col, Input, Button, Container, Card, Spinner } from 'reactstrap';

export default function ObraSocialEdit() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const { obraSocialDetail, isLoading } = useSelector((state) => state.obrasSociales);

  const [input, setInput] = useState({
    nombre: "",
  });

  useEffect(() => {
    dispatch(getObraSocialById(id));
    return () => {
      dispatch(clearObraSocialDetail());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (obraSocialDetail) {
      setInput({
        nombre: obraSocialDetail.nombre || "",
      });
    }
  }, [obraSocialDetail]);

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(editObraSocial({ id, payload: input })).unwrap();
      alert("Obra social actualizada con éxito.");
      navigate("/obras-sociales");
    } catch (err) {
      alert("Error al actualizar obra social: " + err);
    }
  };

  return (
    <Container className="mt-5">
      <Card className="p-4 shadow w-75">
        <h1>EDITAR OBRA SOCIAL</h1>
        {isLoading && !obraSocialDetail ? (
          <div className="text-center my-5">
            <Spinner color="primary" />
            <p>Cargando obra social...</p>
          </div>
        ) : (
          <Form onSubmit={handleSubmit} onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}>
            <FormGroup row>
              <Label for='nombre' sm={2}><h5>Nombre</h5></Label>
              <Col sm={6}>
                <Input id="nombre" type="text" value={input.nombre} onChange={handleChange} name="nombre" />
              </Col>
            </FormGroup>
            {isLoading ? (
              <Spinner color="primary" />
            ) : (
              <Button className="first-button" type="submit">editar</Button>
            )}
            <Link to={'/obras-sociales'}><Button className="ms-2 second-button">cancelar</Button></Link>
          </Form>
        )}
      </Card>
    </Container>
  );
}