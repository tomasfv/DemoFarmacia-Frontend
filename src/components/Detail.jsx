import React from "react";
import { useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetail } from "../redux/actions";

export default function Detail(){
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getDetail(id));
  }, [dispatch, id])

  const miCliente = useSelector((state) => state.detail);

  return (
    <div>
      <Link to={'/home'}><button>volver</button></Link>
      {
        miCliente.length > 0 ?
        <div>
          <h1>Nombre: {miCliente[0].nombre}</h1>
          <h1>Apellido: {miCliente[0].apellido}</h1>
          <h2>Puntos: {miCliente[0].puntos}</h2>
          <h2>DNI: {miCliente[0].dni}</h2>
          <h2>Numero de Afiliado: {miCliente[0].numeroDeAfiliado}</h2>
          <h2>Dirección: {miCliente[0].direccion}</h2>
          <h2>Teléfono: {miCliente[0].telefono}</h2>
          <h2>Obras Sociales: {miCliente[0].obraSocials.map(el => el.nombre.toUpperCase() + (' | '))}</h2>
          <Link to={`/cliente/${id}`}>
              <button>editar cliente</button>
            </Link>
        </div> :
        <p>No se encontró el cliente</p>
      }
    </div>
  )

}