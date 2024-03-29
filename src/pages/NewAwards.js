import React from "react";
import { Container, Row, Form, Button } from "react-bootstrap";

function NewAwards() {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.form.date.value);
  }


  return (
    <>
      <Container className="text-capitalize">
        <Row className="my-3">
          <h4>Informações basicas</h4>
        </Row>
        <Form>
          <Row>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>titulo da Rifa</Form.Label>
              <Form.Control type="name" placeholder="" />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Descrição</Form.Label>
              <Form.Control type="name" placeholder="" />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Imagen</Form.Label>
              <Form.Control type="url" placeholder="" />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Quantidade de numeros</Form.Label>
              <Form.Control type="number" placeholder="" />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Valor do bilhete</Form.Label>
              <Form.Control type="number" placeholder="" />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group className="mb-3" controlId="date">
              <Form.Label>Data da premiação</Form.Label>
              <Form.Control type="date" placeholder="" />
            </Form.Group>
          </Row>
          <Button
            className="w-100 mt-3"
            variant="success"
            size="lg"
            type="submit"
            onClick={(e) => handleSubmit(e)}
          >
            Criar Premiação
          </Button>
        </Form>
      </Container>
    </>
  );
}

export default NewAwards;
