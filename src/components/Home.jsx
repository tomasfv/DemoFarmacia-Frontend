import React from "react";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getClientes, orderByName, deleteCliente } from "../redux/actions";
import { Link } from 'react-router-dom';
import './Home.css';
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button, Container, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Alert, Col, Row } from 'reactstrap';

export default function Home(){

  const dispatch = useDispatch();
  const allClientes = useSelector((state) => state.clientes);
  const error = useSelector((state) => state.error);
  const [orden, setOrden] = useState('ordenar');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  //PAGINADO
  const [currentPage, setCurrentPage] = useState(1);
  const [clientesPorPagina, /*setClientesPorPagina*/] = useState(6);
  const indexUltimoCliente = currentPage * clientesPorPagina;
  const indexPrimerCliente = indexUltimoCliente - clientesPorPagina;
  const currentClientes = allClientes.slice(indexPrimerCliente, indexUltimoCliente);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
    localStorage.setItem('currentPage', pageNumber);
  };
  //FINAL PAGINADO

  useEffect(() => {
    dispatch(getClientes());
    const savedPage = localStorage.getItem('currentPage');
    if(savedPage){
      setCurrentPage(parseInt(savedPage, 10))
    }
  }, [dispatch]);

  function handleClick(e){
    e.preventDefault();
    dispatch(getClientes());
    setCurrentPage(1);
    localStorage.removeItem('currentPage');
  };

  function handleSort(e){
    //e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`);
    console.log(orden);
  }
  
  function handleDelete(id){
    dispatch(deleteCliente(id));
  }

  return(
    <Container>
    <Col sm={10}>
      <h1>CLIENTES</h1>
      <SearchBar inHome={true} inObrasSociales={false}/>
      <Row className="mt-4 mb-4">
        <Col sm={12} className="d-flex justify-content-between align-items-center flex-wrap">
          <Link to='/cliente'><Button className='first-button'>crear cliente</Button></Link> {' '}
        
        <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown} className="d-inline-block">
          <DropdownToggle caret className="first-button mt-2"> ordenar </DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={() => handleSort({ target: { value: 'asc' } })}>
              Ascendente
            </DropdownItem>
            <DropdownItem onClick={() => handleSort({ target: { value: 'desc' } })}>
              Descendente
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        
        <Paginado
          itemsPorPagina={clientesPorPagina}
          allItems={allClientes.length}
          paginado={paginado}
          />
          <Button className='first-button mt-2' onClick={ e => {handleClick(e)} }> volver a cargar</Button>
        </Col>
        </Row>
        
        {
          error ? 
          
          <Alert color="danger">{error}</Alert>
          :
          (
          <div className="table-responsive">
          <Table bordered className="custom-table shadow">
            <thead>
              <tr>
                <th className="text-secondary fw-semibold">NOMBRE</th>
                <th className="text-secondary fw-semibold">APELLIDO</th>
                <th className="text-secondary fw-semibold">PUNTOS</th>
                <th className="text-secondary fw-semibold">D.N.I</th>
                <th className="text-secondary fw-semibold">OBRA SOCIAL</th>
                <th className="text-secondary fw-semibold">AFILIADO</th>
                <th className="text-secondary fw-semibold">DIRECCION</th>
                <th className="text-secondary fw-semibold">TELEFONO</th>
                <th className="text-secondary fw-semibold">NOTAS</th>
                <th className="text-secondary fw-semibold">ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              {currentClientes?.map((el) => (
                <tr key={el.id}>
                  <td className="fw-semibold">{el.nombre}</td>
                  <td className="fw-semibold">{el.apellido}</td>
                  <td className="points fw-semibold">{el.puntos}</td>
                  <td className="text-secondary">{el.dni}</td>
                  <td className="text-secondary">{el.obraSocials?.map((os, index) => (
                      <div key={index}>{os.nombre.toUpperCase()}</div>
                      ))}
                  </td>
                  <td className="text-secondary">{el.numeroDeAfiliado}</td>
                  <td className="text-secondary">{el.direccion}</td>
                  <td className="text-secondary">{el.telefono}</td>
                  <td className="text-secondary">{el.notas}</td>
                  <td>
                    <Link to={`/cliente/${el.id}`}>
                      <Button size="sm" className="mb-2 me-2 third-button">editar</Button>
                    </Link>
                    <Button size="sm" className=" mb-2 me-2 second-button" onClick={() => handleDelete(el.id)}>eliminar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          </div>)
        }
      </Col>
      </Container>
  )

}