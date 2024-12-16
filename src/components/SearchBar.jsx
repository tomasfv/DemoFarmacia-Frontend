import React from "react";
import { useState} from 'react';
import { useDispatch } from "react-redux";
import { getNombreCliente, getNombreObraSocial } from "../redux/actions";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Input, InputGroup } from 'reactstrap';

export default function SearchBar({inHome, inObrasSociales}){
  const dispatch = useDispatch();
  const [nombre, setNombre] = useState('');


  function handleInputChange(e){
    e.preventDefault();
    setNombre(e.target.value);
    console.log(nombre);
  };

  function handleDelete(){
    setNombre('')
  }

  function handleSubmit(e){
    e.preventDefault();
    if(inHome === true){
      dispatch(getNombreCliente(nombre));
    } else if(inObrasSociales === true){
      dispatch(getNombreObraSocial(nombre));
    }
    
  };

  function handleOnEnter(e){
    if(e.key === "Enter"){
      handleSubmit(e)
    }
  }

  return(
    
      <InputGroup>
        <Input type="text" placeholder="buscar..." value={nombre} onChange={handleInputChange} onKeyDown={handleOnEnter}/>
          <Button className="second-button" type="button" onClick={handleDelete}>X</Button>
          <Button className="first-button" type="submit" onClick={(e) => handleSubmit(e)}>Buscar</Button>
      </InputGroup>
    
  )
}