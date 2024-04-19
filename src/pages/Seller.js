import React, { useEffect, useState } from "react";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import Alert from "../components/Alert";
import { useAppContext } from "../context/AppContext";
import { sellerRegisterAction } from "../context/action";
import { useNavigate } from "react-router-dom";

function Seller() {
  const [showFeedBack, setShowFeedBack] = useState(false);
  const { state, dispatch } = useAppContext();
  const navigate = useNavigate();

  const register = (body) => {
    sellerRegisterAction(dispatch, body, state.token);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = {
      name: e.target.form.nome.value,
      telephone: e.target.form.telefone.value,
      password: e.target.form.senha.value,
    };
    register(body);
    setShowFeedBack(true);
  };

  useEffect(() => {
    if (!state.token) navigate("/login");
  });

  return (
    <Container className="p-5 text-capitalize">
      <Row className="my-3">
        <h4>Cadastrar Vendedor</h4>
      </Row>
      {showFeedBack && (
        <Alert
          message={
            state.error.length > 0 ? state.error : "Cadastrado com sucesso"
          }
          onClose={() => setShowFeedBack(false)}
          variant={state.error.length > 0 ? "danger" : "success"}
        />
      )}
      <Row>
        <Col>
          <Form autoComplete="off">
            <Form.Group className="mb-3" controlId="nome">
              <Form.Label>Nome</Form.Label>
              <Form.Control type="name" placeholder="Insira o nome" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="telefone">
              <Form.Label>Telefone</Form.Label>
              <Form.Control type="tel" placeholder="Insira seu telefone" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="senha">
              <Form.Label>Senha</Form.Label>
              <Form.Control type="password" placeholder="Insira sua senha" />
            </Form.Group>
            <Button
              onClick={(e) => handleSubmit(e)}
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
