import React, { useEffect, useState } from "react";
import { Container, Row, Form, Button } from "react-bootstrap";
import Alert from "../components/Alert";
import { useAppContext } from "../context/AppContext";
import { newRifaAction } from "../context/action";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { newRifaSuccessType } from "../context/types";

function NewAwards() {
  const [showFeedBack, setShowFeedBack] = useState(false);
  const [cookies] = useCookies(["User", "Token"]);
  const { state, dispatch } = useAppContext();
  const navigate = useNavigate();

  const newRifa = (body) => {
    newRifaAction(dispatch, body, state.token);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataPremio = new Date(e.target.date.value);
    const body = {
      title: e.target.title.value,
      description: e.target.description.value,
      image: e.target.image.value,
      numbers: e.target.numbers.value,
      price: e.target.price.value,
      date: dataPremio,
    };
    newRifa(body);
    setShowFeedBack(true);
  };

  useEffect(() => {
    if (state.type === newRifaSuccessType) navigate("/rifas");
  });

  useEffect(() => {
    if (!state.token && !cookies.Token) navigate("/login");
  });

  return (
    <>
      <Container className="text-capitalize">
        {showFeedBack && (
          <Alert
            message={
              state.error !== state.type ? "Nova premiação criada" : state.error
            }
            onClose={() => setShowFeedBack(false)}
            variant={state.error !== state.type ? "success" : "danger"}
          />
        )}
        <Row className="my-3">
          <h4>Informações basicas</h4>
        </Row>
        <Form autoComplete="off" onSubmit={handleSubmit}>
          <Row>
            <Form.Group className="mb-3" controlId="title">
              <Form.Label>titulo da Rifa</Form.Label>
              <Form.Control type="name" placeholder="Iphone 8s" required />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Descrição</Form.Label>
              <Form.Control type="name" placeholder="Lacrado, 128gb" required />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group className="mb-3" controlId="image">
              <Form.Label>Imagen</Form.Label>
              <Form.Control
                type="url"
                placeholder="https://picsum.photos/200/300"
                required
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group className="mb-3" controlId="numbers">
              <Form.Label>Quantidade de numeros</Form.Label>
              <Form.Control type="number" placeholder="100" required />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group className="mb-3" controlId="price">
              <Form.Label>Valor do bilhete</Form.Label>
              <Form.Control type="number" placeholder="25" required />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group className="mb-3" controlId="date">
              <Form.Label>Data da premiação</Form.Label>
              <Form.Control type="datetime-local" placeholder="" required />
            </Form.Group>
          </Row>
          <Button className="w-100 mt-3" variant="dark" size="lg" type="submit">
            Criar Premiação
          </Button>
        </Form>
      </Container>
    </>
  );
}

export default NewAwards;
