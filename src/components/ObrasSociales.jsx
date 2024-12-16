import React from "react";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getObrasSociales, orderObrasSocialesByName, deleteObraSocial } from "../redux/actions";
import { Link } from 'react-router-dom';
import Paginado from "./Paginado";
import './ObrasSociales.css';
import SearchBar from "./SearchBar";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button, Container, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Alert, Row, Col } from 'reactstrap';



export default function ObrasSociales(){
  const dispatch = useDispatch();
  const allObrasSociales = useSelector((state) => state.obrasSociales);
  const error = useSelector((state) => state.error);
  const [orden, setOrden] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
   //PAGINADO
   const [currentPage, setCurrentPage] = useState(1);
   const [obrasSocialesPorPagina, /*setObrasSocialesPorPagina*/] = useState(6);
   const indexUltimaObraSocial = currentPage * obrasSocialesPorPagina;
   const indexPrimeraObraSocial = indexUltimaObraSocial - obrasSocialesPorPagina;
   const currentObrasSociales = allObrasSociales.slice(indexPrimeraObraSocial, indexUltimaObraSocial);
 
   const paginado = (pageNumber) => {
     setCurrentPage(pageNumber);
    localStorage.setItem('currentPage', pageNumber);
   };
   //FINAL PAGINADO

   useEffect(() => {
    dispatch(getObrasSociales());
    const savedPage = localStorage.getItem('currentPage');
    if(savedPage){
      setCurrentPage(parseInt(savedPage, 10))
    }
  }, [dispatch]);

  function handleClick(e){
    e.preventDefault();
    dispatch(getObrasSociales());
    setCurrentPage(1);
    localStorage.removeItem('currentPage');
  };

  function handleSort(e){
    dispatch(orderObrasSocialesByName(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`);
    console.log(orden);
  }

  function handleDelete(id){
    dispatch(deleteObraSocial(id));
  }


  return (
    <Container>
      <Col sm={10}>
      <h1>OBRAS SOCIALES</h1>
      <SearchBar inHome={false} inObrasSociales={true} />
      <Row className="mb-4 mt-4">
        <Col sm={12} className="d-flex justify-content-between align-items-center flex-wrap">
          <Link to='/obrasocial'><Button className="first-button">crear obra social</Button></Link>
          <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown} className="d-inline-block">
              <DropdownToggle caret className="first-button"> ordenar </DropdownToggle>
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
              itemsPorPagina={obrasSocialesPorPagina}
              allItems={allObrasSociales.length}
              paginado={paginado}
              />
      
          <Button className="first-button" onClick={ e => {handleClick(e)} }>
            volver a cargar
          </Button>
        </Col>
      </Row>
      <div>
        {
            error ?             
            <Alert color="danger">{error}</Alert>
           :
           (<Table bordered className="custom-table shadow">
            <thead>
              <tr>
                <th className="text-secondary fw-semibold">NOMBRE</th>
                <th className="text-secondary fw-semibold">ACCIONES</th>
              </tr>
            </thead>
            <tbody>
            {currentObrasSociales?.map((el) =>(
            <tr key={el.id}>
            <td className="fw-semibold">{el.nombre.toUpperCase()}</td>
            <td>
              <Link to={`/obrasocial/${el.id}`}><Button className="w-25 me-2 third-button">editar</Button></Link>
              
              <Button className="w-25 second-button" onClick={() =>{
                const confirmar = window.confirm("¿Está seguro que quiere eliminar esta obra social? Se borrará de esta lista y de todos los clientes que la tengan asignada.");
                if(confirmar) handleDelete(el.id)}}>eliminar</Button>
          </td>
          </tr>))}
          </tbody>
          </Table>)}
        </div>
        </Col>
    </Container>
  )
}