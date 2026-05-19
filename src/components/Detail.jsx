import React, { useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getClienteById, clearClienteDetail } from "../redux/slices/clientesSlice";
import { Button, Container, Card, Spinner, Alert } from 'reactstrap';

export default function Detail() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { clienteDetail, isLoading, error } = useSelector((state) => state.clientes);

  useEffect(() => {
    dispatch(getClienteById(id));
    return () => {
      dispatch(clearClienteDetail());
    };
  }, [dispatch, id]);

  return (
    <Container className="mt-5">
      <Link to={'/clientes'}>
        <Button className="mb-3 second-button">Volver</Button>
      </Link>
      
      {isLoading ? (
        <div className="text-center my-5">
          <Spinner color="primary" />
          <p className="mt-2">Cargando detalles del cliente...</p>
        </div>
      ) : error ? (
        <Alert color="danger">{error}</Alert>
      ) : clienteDetail ? (
        <Card className="p-4 shadow">
          <div>
            <h1>Nombre: {clienteDetail.nombre}</h1>
            <h1>Apellido: {clienteDetail.apellido}</h1>
            <h2>Puntos: <span className="points">{clienteDetail.puntos}</span></h2>
            <h2>DNI: {clienteDetail.dni}</h2>
            <h2>Número de Afiliado: {clienteDetail.numeroDeAfiliado || 'N/A'}</h2>
            <h2>Dirección: {clienteDetail.direccion || 'N/A'}</h2>
            <h2>Teléfono: {clienteDetail.telefono || 'N/A'}</h2>
            <h2>Obras Sociales: </h2>
            <ul>
              {clienteDetail.obraSocials && clienteDetail.obraSocials.length > 0 ? (
                clienteDetail.obraSocials.map((os) => (
                  <li key={os.id} className="fw-semibold">{os.nombre.toUpperCase()}</li>
                ))
              ) : (
                <li>Sin obra social</li>
              )}
            </ul>
            <Link to={`/clientes/editar/${id}`}>
              <Button className="first-button mt-3">Editar Cliente</Button>
            </Link>
          </div>
        </Card>
      ) : (
        <p>No se encontró el cliente</p>
      )}
    </Container>
  );
}