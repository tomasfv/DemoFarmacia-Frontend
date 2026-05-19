import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { editCliente, getClienteById, clearClienteDetail } from "../redux/slices/clientesSlice";
import { getObrasSociales } from "../redux/slices/obrasSocialesSlice";
import CalculadoraPuntos from "./CalculadoraPuntos";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, FormGroup, Label, Col, Input, Button, Container, 
          Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Card, Badge, Spinner } from 'reactstrap';

export default function ClientEdit() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  
  const { obrasSocialesList, isLoading: osLoading } = useSelector((state) => state.obrasSociales);
  const { clienteDetail, isLoading: clientLoading } = useSelector((state) => state.clientes);
  
  const [selectedObraSocial, setSelectedObraSocial] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  
  const [input, setInput] = useState({
    nombre: "",
    apellido: "",
    puntos: 0,
    dni: "",
    numeroDeAfiliado: "",
    direccion: "",
    telefono: "",
    notas: "",
    obraSocial: [],
  });

  useEffect(() => {
    dispatch(getClienteById(id));
    dispatch(getObrasSociales());
    return () => {
      dispatch(clearClienteDetail());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (clienteDetail) {
      setInput({
        nombre: clienteDetail.nombre || "",
        apellido: clienteDetail.apellido || "",
        puntos: clienteDetail.puntos || 0,
        dni: clienteDetail.dni || "",
        numeroDeAfiliado: clienteDetail.numeroDeAfiliado || "",
        direccion: clienteDetail.direccion || "",
        telefono: clienteDetail.telefono || "",
        notes: clienteDetail.notas || "", // API maps notes to notas
        notas: clienteDetail.notas || "",
        obraSocial: clienteDetail.obraSocials?.map(os => os.nombre) || [],
      });
    }
  }, [clienteDetail]);

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue && !input.obraSocial.includes(selectedValue)) {
      setInput({
        ...input,
        obraSocial: [...input.obraSocial, selectedValue],
      });
      setSelectedObraSocial("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(editCliente({ id, payload: input })).unwrap();
      alert("Cliente actualizado con éxito.");
      navigate("/clientes");
    } catch (err) {
      alert("Error al actualizar cliente: " + err);
    }
  };

  function handleDelete(el) {
    setInput({
      ...input,
      obraSocial: input.obraSocial.filter(os => os !== el)
    });
  }

  function sumarPuntos(puntosSumados) {
    setInput({
      ...input,
      puntos: puntosSumados
    });
  }

  function canjearPuntos(puntosCanjeados) {
    setInput({
      ...input,
      puntos: puntosCanjeados
    });
  }

  return (
    <Container className="mt-5">
      <div className="d-flex gap-4 align-items-start">
        <Card className="p-4 shadow w-75">
          <h1>EDITAR CLIENTE</h1>
          {clientLoading && !clienteDetail ? (
            <div className="text-center my-5">
              <Spinner color="primary" />
              <p>Cargando cliente...</p>
            </div>
          ) : (
            <Form onSubmit={handleSubmit} onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}>
              <FormGroup row>
                <Label for='nombre' sm={2}><h5>Nombre</h5></Label>
                <Col sm={8}>
                  <Input id="nombre" type="text" value={input.nombre} onChange={handleChange} name="nombre" />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for='apellido' sm={2}><h5>Apellido</h5></Label>
                <Col sm={8}>
                  <Input id="apellido" type="text" value={input.apellido} onChange={handleChange} name="apellido" />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for='puntos' sm={2}><h5>Puntos</h5></Label>
                <Col sm={8}>
                  <Input id='puntos' type="number" value={input.puntos} name='puntos' onChange={handleChange} />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for='dni' sm={2}><h5>D.N.I</h5></Label>
                <Col sm={8}>
                  <Input id='dni' type="text" value={input.dni} name='dni' onChange={handleChange} />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for='numeroDeAfiliado' sm={2}><h5>Numero de Afiliado</h5></Label>
                <Col sm={8}>
                  <Input id='numeroDeAfiliado' type="text" value={input.numeroDeAfiliado} name='numeroDeAfiliado' onChange={handleChange} />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for='direccion' sm={2}><h5>Dirección</h5></Label>
                <Col sm={8}>
                  <Input id='dirección' type="text" value={input.direccion} name='direccion' onChange={handleChange} />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for='telefono' sm={2}><h5>Teléfono</h5></Label>
                <Col sm={8}>
                  <Input id='telefono' type="text" value={input.telefono} name='telefono' onChange={handleChange} />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for='notas' sm={2}><h5>Notas</h5></Label>
                <Col sm={8}>
                  <Input id='notas' type="textarea" value={input.notas} name='notas' onChange={handleChange} />
                </Col>
              </FormGroup>
              <div>
                <Label for='obrasSociales' sm={2}><h5>Obras Sociales</h5></Label>
                {osLoading ? (
                  <Spinner size="sm" color="primary" />
                ) : (
                  <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown} className="d-inline-block">
                    <DropdownToggle caret className="third-button">elige una obra social</DropdownToggle>
                    <DropdownMenu>
                      {obrasSocialesList.map((os) => (
                        <DropdownItem key={os.id} value={os.nombre} onClick={handleSelectChange}>{os.nombre.toUpperCase()}</DropdownItem>
                      ))}
                    </DropdownMenu>
                  </Dropdown>
                )}
                <FormGroup row>
                  <Col sm={12} className="d-flex align-items-center flex-wrap mt-2">
                    {input.obraSocial.map((el, index) => 
                      <h4 key={el + index}>
                        <Badge className="me-2 os-badge" pill>{el.toUpperCase()}
                          <button type="button" className="close-badge" onClick={() => handleDelete(el)}><h4>x</h4></button>  
                        </Badge>
                      </h4>
                    )}
                  </Col>
                </FormGroup>
              </div>
              <br />
              {clientLoading ? (
                <Spinner color="primary" />
              ) : (
                <Button className="me-2 mb-4 first-button" type="submit">editar</Button>
              )}
              <Link to={'/clientes'}><Button className="mb-4" color="dark">cancelar</Button></Link>
            </Form>
          )}
        </Card>
        <div className="w-25">
          <CalculadoraPuntos
            argPuntos={input.puntos}
            sumarPuntos={sumarPuntos}
            canjearPuntos={canjearPuntos}
          />
        </div>
      </div>
    </Container>
  );
}