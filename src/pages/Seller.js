import React from "react";
import { Col, Container, Row, Form, Button } from "react-bootstrap";

function Seller() {
  return (
    <Container className="p-5 text-capitalize">
      <Row className="my-3">
        <h4>Cadastrar Vendedor</h4>
      </Row>
      <Row>
        <Col>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Nome</Form.Label>
              <Form.Control type="name" placeholder="Insira o nome" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Telefone</Form.Label>
              <Form.Control type="tel" placeholder="Insira seu telefone" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Senha</Form.Label>
              <Form.Control type="password" placeholder="Insira sua senha" />
            </Form.Group>
            <Button
              className="w-100 mt-3"
              variant="primary"
              size="lg"
              type="submit"
            >
              Cadastrar Vendedor
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Seller;
