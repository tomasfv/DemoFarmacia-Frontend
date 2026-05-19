import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Input, InputGroup } from 'reactstrap';

export default function SearchBar({ onSearch, placeholder }) {
  const [nombre, setNombre] = useState('');

  function handleInputChange(e) {
    setNombre(e.target.value);
  }

  function handleDelete() {
    setNombre('');
    onSearch('');
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSearch(nombre);
  }

  function handleOnEnter(e) {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  }

  return (
    <InputGroup>
      <Input
        type="text"
        placeholder={placeholder || "buscar..."}
        value={nombre}
        onChange={handleInputChange}
        onKeyDown={handleOnEnter}
      />
      <Button className="second-button" type="button" onClick={handleDelete}>X</Button>
      <Button className="first-button" type="submit" onClick={handleSubmit}>Buscar</Button>
    </InputGroup>
  );
}