import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getClientes, orderByName, deleteCliente, getNombreCliente } from "../redux/slices/clientesSlice";
import { Link } from 'react-router-dom';
import './Home.css';
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button, Container, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Alert, Col, Row, Spinner } from 'reactstrap';

export default function Home() {
  const dispatch = useDispatch();
  const { clientesList, isLoading, error } = useSelector((state) => state.clientes);

  const [orden, setOrden] = useState('ordenar');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  // PAGINADO
  const [currentPage, setCurrentPage] = useState(1);
  const [clientesPorPagina] = useState(6);
  const indexUltimoCliente = currentPage * clientesPorPagina;
  const indexPrimerCliente = indexUltimoCliente - clientesPorPagina;
  const currentClientes = clientesList.slice(indexPrimerCliente, indexUltimoCliente);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
    localStorage.setItem('currentPage', pageNumber);
  };

  useEffect(() => {
    dispatch(getClientes());
    const savedPage = localStorage.getItem('currentPage');
    if (savedPage) {
      setCurrentPage(parseInt(savedPage, 10));
    }
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getClientes());
    setCurrentPage(1);
    localStorage.removeItem('currentPage');
  }

  function handleSort(value) {
    dispatch(orderByName(value));
    setCurrentPage(1);
    setOrden(`Ordenado ${value}`);
  }

  function handleDelete(id) {
    dispatch(deleteCliente(id));
  }

  function handleSearch(nombre) {
    dispatch(getNombreCliente(nombre));
    setCurrentPage(1);
  }

  return (
    <Container fluid className="px-4">
      <Col sm={11}>
        <h1>CLIENTES</h1>
        <SearchBar onSearch={handleSearch} placeholder="Buscar clientes..." />
        <Row className="mt-4 mb-4">
          <Col sm={12} className="d-flex justify-content-between align-items-center flex-wrap">
            <Link to='/clientes/nuevo'><Button className='first-button'>crear cliente</Button></Link> {' '}

            <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown} className="d-inline-block">
              <DropdownToggle caret className="first-button mt-2"> ordenar </DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={() => handleSort('asc')}>
                  Ascendente
                </DropdownItem>
                <DropdownItem onClick={() => handleSort('desc')}>
                  Descendente
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>

            <Paginado
              itemsPorPagina={clientesPorPagina}
              allItems={clientesList.length}
              paginado={paginado}
            />
            <Button className='first-button mt-2' onClick={handleClick}> volver a cargar</Button>
          </Col>
        </Row>

        {isLoading ? (
          <div className="text-center my-5">
            <Spinner color="success" />
            <p className="mt-2">Cargando clientes...</p>
          </div>
        ) : error ? (
          <Alert color="danger">{error}</Alert>
        ) : (
          <div className="table-responsive">
            <Table bordered className="custom-table shadow">
              <thead>
                <tr>
                  <th className="text-secondary fw-semibold">NOMBRE</th>
                  <th className="text-secondary fw-semibold">APELLIDO</th>
                  <th className="text-secondary fw-semibold">PUNTOS</th>
                  <th className="text-secondary fw-semibold">D.N.I</th>
                  <th className="text-secondary fw-semibold">O.S</th>
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
                    <td className="fw-semibold">
                      <Link to={`/clientes/${el.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        {el.nombre}
                      </Link>
                    </td>
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
                    <td className="text-secondary">
                      <div
                        style={{
                          maxHeight: "80px",
                          minWidth: "180px",
                          maxWidth: "181px",
                          overflowY: "auto",
                          overflowX: "hidden",
                          whiteSpace: "pre-wrap",
                          wordBreak: "break-word",
                          paddingRight: "5px"
                        }}>
                        {el.notas}
                      </div>
                    </td>
                    <td>
                      <Link to={`/clientes/editar/${el.id}`}>
                        <Button size="sm" className="mb-2 me-2 third-button action-btn">editar</Button>
                      </Link>
                      <Button size="sm" className="mb-2 me-2 second-button action-btn"
                        onClick={() => {
                          const confirmar = window.confirm("¿Está seguro que quiere eliminar el cliente?");
                          if (confirmar) handleDelete(el.id);
                        }}>
                        eliminar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </Col>
    </Container>
  );
}