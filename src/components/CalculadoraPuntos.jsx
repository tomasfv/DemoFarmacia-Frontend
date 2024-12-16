import React, {useState, useEffect} from "react";
import { Form, FormGroup, Label, Col, Input, Button, Container, Card, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';


export default function CalculadoraPuntos({argPuntos, sumarPuntos, canjearPuntos}){
  const [puntosSumados, setPuntosSumados] = useState(0);
  const [puntosTotal, setPuntosTotal] = useState(0);
  const [dineroTotal, setDineroTotal] = useState(0);
  const [puntosRestantes, setPuntosRestantes] = useState(0);
  const [calculadora, setCalculadora] = useState(false);
  const [canje, setCanje] = useState(false);
  const [input, setInput] = useState({
    dineroPorPunto: "",
    nuevaCompra: "",
    puntoCanjeado: "",
    puntosACanjear: "",
  })
  

  function handleInputChange(e){
    const { name, value} = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  }

  function handleOpenCalculator(e){
    if(e === false){
      setCalculadora(false);
    }
    if(e === true){
      setCalculadora(true)
    }
  }

  function handleCanje(e){
    if(e === false){
      setCanje(false)
    }
    if(e === true){
      setCanje(true)
    }
  }

  function limpiarInputs() {
    setInput({
      dineroPorPunto: "",
      nuevaCompra: "",
      puntoCanjeado: "",
      puntosACanjear: "",
    });
  }

  useEffect(() => {
    const dineroPorPunto = parseFloat(input.dineroPorPunto) || 0;
    const nuevaCompra = parseFloat(input.nuevaCompra) || 0;
    const puntoCanjeado = parseFloat(input.puntoCanjeado) || 0;
    const puntosACanjear = parseFloat(input.puntosACanjear) || 0;
    const puntosActuales = parseFloat(argPuntos) || 0;

    const nuevosPuntos = dineroPorPunto > 0 ? Math.round(nuevaCompra / dineroPorPunto) : 0;
    
    setPuntosSumados(nuevosPuntos);
    setPuntosTotal(puntosActuales + nuevosPuntos);
    setDineroTotal(puntosACanjear * puntoCanjeado);
    setPuntosRestantes(puntosActuales - puntosACanjear);




  }, [input, argPuntos]);
  
  
  
  return (
    <Container>
    <div>
      <div>
        <Button className="w-50 first-button" onClick={(e) => handleOpenCalculator(e = true)}>sumar puntos</Button>{' '}
      </div>
      <br/>
      {/*MODAL SUMAR PUNTOS*/}
      <Modal isOpen={calculadora} toggle={() => handleOpenCalculator(false)} size="lg">
          <ModalHeader toggle={() => handleOpenCalculator(false)}>
            Calculadora de Puntos
          </ModalHeader>
          <ModalBody>
            <Card color="light" className="p-2 shadow">
              <Form>
                <FormGroup row>
                  <Label for="dineroPorPunto" sm={5}>
                    <h5>Dinero necesario por punto: $</h5>
                  </Label>
                  <Col sm={6}>
                    <Input
                      type="number"
                      name="dineroPorPunto"
                      value={input.dineroPorPunto}
                      onChange={handleInputChange}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="nuevaCompra" sm={5}>
                    <h5>Monto de la nueva compra: $</h5>
                  </Label>
                  <Col sm={6}>
                    <Input
                      type="number"
                      name="nuevaCompra"
                      value={input.nuevaCompra}
                      onChange={handleInputChange}
                    />
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Label for="puntosDelCliente" sm={6}>
                    <h5>Puntos del cliente: {argPuntos}</h5>
                  </Label>
                </FormGroup>
                <FormGroup>
                  <Label for="puntosSumados" sm={6}>
                    <h5>Puntos sumados en esta compra: {puntosSumados}</h5>
                  </Label>
                </FormGroup>
                <FormGroup>
                  <Label for="puntosTotal" sm={6}>
                    <h5>Puntos totales del cliente: {puntosTotal}</h5>
                  </Label>
                </FormGroup>
              </Form>
            </Card>
          </ModalBody>
          <ModalFooter>
            <Button
              className="first-button"
              onClick={() => {
                const confirmar = window.confirm("¿Está seguro que quiere sumar los puntos?");
                if (confirmar) sumarPuntos(puntosTotal);
                limpiarInputs();
                handleOpenCalculator(false);
              }}
            >
              sumar puntos
            </Button>
            <Button color="dark" onClick={() => handleOpenCalculator(false)}>
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
    


    <div>
        <Button className="w-50 first-button" onClick={(e) => handleCanje(e = true)}>canjear puntos</Button>
    </div>
      <br/>
      {/*MODAL CANJEAR PUNTOS*/}
      <Modal isOpen={canje} toggle={() => handleCanje(false)} size="lg">
          <ModalHeader toggle={() => handleCanje(false)}>
            Canje de Puntos
          </ModalHeader>
          <ModalBody>
          <Card color="light" className="p-2 shadow">
            <Form>
              <FormGroup row>
                <Label for="puntoCanjeado" sm={5}>
                  <h5>Valor de punto canjeado: $</h5>
                </Label>
                <Col sm={6}>
                  <Input
                    type="number"
                    name="puntoCanjeado"
                    value={input.puntoCanjeado}
                    onChange={handleInputChange}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="puntosACanjear" sm={5}>
                  <h5>Puntos a canjear: </h5>
                </Label>
                <Col sm={6}>
                  <Input
                    type="number"
                    name="puntosACanjear"
                    value={input.puntosACanjear}
                    onChange={handleInputChange}
                  />
                </Col>
              </FormGroup>
              <FormGroup>
                <Label sm={7}>
                  <h5>Puntos del cliente: {argPuntos}</h5>
                </Label>
                <Label sm={7}>
                  <h5>Puntos restantes: {puntosRestantes}</h5>
                </Label>
                <Label sm={7}>
                  <h5>Valor de puntos totales en dinero: {dineroTotal}</h5>
                </Label>
              </FormGroup>
            </Form>
            </Card>
          </ModalBody>
          <ModalFooter>
            <Button
              className="first-button"
              onClick={() => {
                const confirmar = window.confirm("¿Está seguro que quiere canjear los puntos?");
                if (confirmar) canjearPuntos(puntosRestantes);
                limpiarInputs();
                handleCanje(false);
              }}
            >
              canjear Puntos
            </Button>{" "}
            <Button color="dark" onClick={() => handleCanje(false)}>
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
        </div>
    </Container>
  )
}