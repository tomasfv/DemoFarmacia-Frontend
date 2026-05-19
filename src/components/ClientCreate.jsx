import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { postCliente } from "../redux/slices/clientesSlice";
import { getObrasSociales } from "../redux/slices/obrasSocialesSlice";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, FormGroup, Label, Col, Input, Button, Container, 
          Dropdown, DropdownToggle, DropdownMenu, DropdownItem, 
          Alert, Badge, Card, Spinner } from 'reactstrap';

function validate(input){
  let errors = {};
  if(!input.nombre) {
    errors.nombre = "se requiere un nombre";
  } 
  if(!input.apellido) {
    errors.apellido = "se requiere un apellido";
  }
  if(!input.dni) {
    errors.dni = "se requiere un DNI";
  }
  return errors;
}

export default function ClientCreate(){
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { obrasSocialesList, isLoading: osLoading } = useSelector((state) => state.obrasSociales);
  const { isLoading: clientLoading } = useSelector((state) => state.clientes);

  const [selectedObraSocial, setSelectedObraSocial] = useState("");
  const [errors, setErrors] = useState({});
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  
  const [input, setInput] = useState({
    nombre: '',
    apellido: '',
    puntos: 0,
    dni: '',
    numeroDeAfiliado: '',
    direccion: '',
    telefono: '',
    notas: '',
    obraSocial: []
  });

  function handleChange(e){
    setInput({
      ...input,
      [e.target.name] : e.target.value
    });
    setErrors(validate({
      ...input,
      [e.target.name] : e.target.value
    }));
  }

  function handleSelect(e){
    if(e.target.value && !input.obraSocial.includes(e.target.value)){
      setInput({
        ...input,
        obraSocial: [...input.obraSocial, e.target.value]
      });
      setSelectedObraSocial("");
    }
  }

  function handleDelete(el){
    setInput({
      ...input,
      obraSocial: input.obraSocial.filter(os => os !== el)
    });
  }

  async function handleSubmit(e){
    e.preventDefault();
    try {
      await dispatch(postCliente(input)).unwrap();
      alert('¡Cliente creado con éxito!');
      setInput({
        nombre: '',
        apellido: '',
        puntos: 0,
        dni: '',
        numeroDeAfiliado: '',
        direccion: '',
        telefono: '',
        notas: '',
        obraSocial: []
      });
      navigate('/clientes');
    } catch (err) {
      alert('Error al crear cliente: ' + err);
    }
  }

  useEffect(()=>{
    dispatch(getObrasSociales());
  }, [dispatch]);

  return(
    <Container className="mt-5">
      <Card className="p-4 shadow w-75">
        <h1>Crear Nuevo Cliente</h1>
        <Form className="mt-4" onSubmit={handleSubmit} onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}>
          <FormGroup row>
            <Label for='nombre' sm={2}><h5>Nombre*</h5></Label>
            <Col sm={8}>
              <Input id='nombre' type="text" value={input.nombre} name='nombre' onChange={handleChange}/>
              {errors.nombre && (<Alert color="danger" className="mt-2">{errors.nombre}</Alert>)}
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for='apellido' sm={2}><h5>Apellido*</h5></Label>
            <Col sm={8}>
              <Input id='apellido' type="text" value={input.apellido} name='apellido' onChange={handleChange}/>
              {errors.apellido && (<Alert color="danger" className="mt-2">{errors.apellido}</Alert>)}
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for='dni' sm={2}><h5>D.N.I*</h5></Label>
            <Col sm={8}>
              <Input id='dni' type="text" value={input.dni} name='dni' onChange={handleChange}/>
              {errors.dni && (<Alert color="danger" className="mt-2">{errors.dni}</Alert>)}
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for='puntos' sm={2}><h5>Puntos</h5></Label>
            <Col sm={8}>
              <Input id='puntos' type="number" value={input.puntos} name='puntos' onChange={handleChange}/>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for='numeroDeAfiliado' sm={2}><h5>Numero de Afiliado</h5></Label>
            <Col sm={8}>
              <Input id='numeroDeAfiliado' type="text" value={input.numeroDeAfiliado} name='numeroDeAfiliado' onChange={handleChange}/>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for='direccion' sm={2}><h5>Dirección</h5></Label>
            <Col sm={8}>
              <Input id='dirección' type="text" value={input.direccion} name='direccion' onChange={handleChange}/>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for='telefono' sm={2}><h5>Teléfono</h5></Label>
            <Col sm={8}>
              <Input id='telefono' type="text" value={input.telefono} name='telefono' onChange={handleChange}/>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for='notas' sm={2}><h5>Notas</h5></Label>
            <Col sm={8}>
              <Input id='notas' type="textarea" value={input.notas} name='notas' onChange={handleChange}/>
            </Col>
          </FormGroup>
          
          <FormGroup row>
            <Label for='obrasSociales' sm={2}><h5>Obras Sociales</h5></Label>
            <Col sm={4}>
              {osLoading ? (
                <Spinner size="sm" color="primary" />
              ) : (
                <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown} className="d-inline-block">
                  <DropdownToggle caret className="third-button">elige una obra social</DropdownToggle>
                  <DropdownMenu>
                    {obrasSocialesList.map((os) => (
                      <DropdownItem key={os.id} value={os.nombre} onClick={handleSelect}>
                        {os.nombre.toUpperCase()}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
              )}
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col sm={12} className="d-flex align-items-center flex-wrap">
              {input.obraSocial.map((el, index) => 
                <h4 key={el + index}>
                  <Badge className="me-2 os-badge" pill>{el.toUpperCase()}
                    <button type="button" className="close-badge" onClick={() => handleDelete(el)}><h4>x</h4></button>  
                  </Badge>
                </h4>
              )}
            </Col>
          </FormGroup>
            
          <br/>
          {clientLoading ? (
            <Spinner color="primary" className="mb-4" />
          ) : (
            <>
              {Object.keys(errors).length ? (
                <Button className="mb-4 first-button" type="submit" disabled>crear</Button>
              ) : (
                <Button className="mb-4 first-button" type="submit">crear</Button>
              )}
            </>
          )}
          <Link to={'/clientes'}><Button className="ms-2 mb-4 second-button">cancelar</Button></Link>
        </Form>
      </Card>
    </Container>
  );
}