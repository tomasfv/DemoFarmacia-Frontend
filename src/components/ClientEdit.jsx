import React, {useState, useEffect} from "react";
import {Link, useNavigate, useParams} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getObrasSociales, editCliente, getClienteById } from "../redux/actions";
import CalculadoraPuntos from "./CalculadoraPuntos";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, FormGroup, Label, Col, Input, Button, Container, 
          Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Card, Badge } from 'reactstrap';


export default function ClientEdit(){

  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const obrasSociales = useSelector((state) => state.obrasSociales);
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

  useEffect(()=>{
    dispatch(getClienteById(id));
    dispatch(getObrasSociales());
  }, [dispatch, id]);

  const cliente = useSelector((state) => state.clientes);

useEffect(() => {
  if (cliente && cliente.length > 0) {
    setInput({
      nombre: cliente[0].nombre,
      apellido: cliente[0].apellido,
      puntos: cliente[0].puntos,
      dni: cliente[0].dni,
      numeroDeAfiliado: cliente[0].numeroDeAfiliado,
      direccion: cliente[0].direccion,
      telefono: cliente[0].telefono,
      notas: cliente[0].notas,
      obraSocial: cliente[0].obraSocials?.map(os => os.nombre) || [],
    });
  }
}, [cliente]);

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
  console.log(selectedObraSocial);
};

const handleSubmit = (e) => {
  e.preventDefault();
  dispatch(editCliente(input, id));
  alert("Cliente actualizado con éxito.");
  navigate("/home");
};

function handleDelete(el){
  setInput({
    ...input,
    obraSocial: input.obraSocial.filter(os => os !== el)
  })
}

function sumarPuntos(puntosSumados){
  setInput({
    ...input,
    puntos: puntosSumados
  })
}

function canjearPuntos(puntosCanjeados){
  setInput({
    ...input,
    puntos: puntosCanjeados
  })
}


  return (
    <Container className="mt-5">
    <div className="d-flex gap-4 align-items-start">
    <Card className="p-2 shadow w-75">
    <h1>EDITAR CLIENTE</h1>
    <Form onSubmit={(e) => handleSubmit(e)} onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}>
      
      <FormGroup row>
        <Label for='nombre' sm={2}><h5>Nombre</h5></Label>
        <Col sm={8}>
          <Input id="nombre" type="text" value={input.nombre} onChange={(e) => handleChange(e)} name="nombre"/>
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for='apellido' sm={2}><h5>Apellido</h5></Label>
        <Col sm={8}>
          <Input id="apellido" type="text" value={input.apellido} onChange={(e) => handleChange(e)} name="apellido"/>
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for='puntos' sm={2}><h5>Puntos</h5></Label>
        <Col sm={8}>
        <Input id='puntos' type="number" value={input.puntos} name='puntos' onChange={(e) => handleChange(e)}/>
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for='dni' sm={2}><h5>D.N.I</h5></Label>
        <Col sm={8}>
        <Input id='dni' type="text" value={input.dni} name='dni' onChange={(e) => handleChange(e)}/>
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for='numeroDeAfiliado' sm={2}><h5>Numero de Afiliado</h5></Label>
        <Col sm={8}>
        <Input id='numeroDeAfiliado' type="text" value={input.numeroDeAfiliado} name='numeroDeAfiliado' onChange={(e) => handleChange(e)}/>
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for='direccion' sm={2}><h5>Dirección</h5></Label>
        <Col sm={8}>
        <Input id='dirección' type="text" value={input.direccion} name='direccion' onChange={(e) => handleChange(e)}/>
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for='telefono' sm={2}><h5>Teléfono</h5></Label>
        <Col sm={8}>
        <Input id='telefono' type="text" value={input.telefono} name='telefono' onChange={(e) => handleChange(e)}/>
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for='notas' sm={2}><h5>Notas</h5></Label>
        <Col sm={8}>
        <Input id='notas' type="textarea" value={input.notas} name='notas' onChange={(e) => handleChange(e)}/>
        </Col>
      </FormGroup>
      <div>
          <Label for='obrasSociales' sm={2}><h5>Obras Sociales</h5></Label>
          <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown} className="d-inline-block">
            <DropdownToggle caret className="third-button">elige una obra social</DropdownToggle>
            <DropdownMenu>
            {obrasSociales.map((os) =>(
              <DropdownItem key={os.nombre} value={os.nombre} onClick={(e) => handleSelectChange(e)}>{os.nombre.toUpperCase()}</DropdownItem>
            ))}
            </DropdownMenu>
          </Dropdown>
          <FormGroup row>
            <Col sm={12} className="d-flex align-items-center flex-wrap mt-2">
          
          {input.obraSocial.map((el, index) => 
              <h4 key={el + index}>
              <Badge className="me-2 os-badge" pill>{el.toUpperCase()}
              <button className="close-badge" onClick={() => handleDelete(el)}><h4>x</h4></button>  
              </Badge>
              </h4>
          )}
          </Col>
          </FormGroup>
        </div>
        <br/>
      <Button className="me-2 mb-4 first-button" type="submit">editar</Button>
      <Link to={'/home'}><Button className="mb-4" color="dark">cancelar</Button></Link>
    </Form>
    </Card>
    <div className="w-25">
    <CalculadoraPuntos
    argPuntos={input.puntos}
    sumarPuntos={sumarPuntos}
    canjearPuntos={canjearPuntos}/>
    </div>
    </div>
  </Container>
  )
}