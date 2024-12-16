import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, ButtonToolbar, ButtonGroup} from 'reactstrap';

export default function Paginado({itemsPorPagina, allItems, paginado}){
  const pageNumbers = [];

  for(let i=1; i<=Math.ceil(allItems/itemsPorPagina); i++){
    pageNumbers.push(i);
  };

  return(
    
    <nav>
      <ButtonToolbar>
        <ButtonGroup>
          { pageNumbers && pageNumbers.map(number => (
              
                <Button className="first-button" key={number} onClick={() => paginado(number)}>{number}</Button>
              
            ))}
        </ButtonGroup>
      </ButtonToolbar>
    </nav>
    
  )
};