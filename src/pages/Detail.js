import { UserOutlined } from "@ant-design/icons";
import { Col, Container, Row, Card } from "react-bootstrap";
import { useAppContext } from "../context/AppContext";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getRifaAction } from "../context/action";
import { getRifaSuccessType } from "../context/types";

function Detail() {
  const { state, dispatch } = useAppContext();
  const { id } = useParams();

  useEffect(() => {
    if (state.type !== getRifaSuccessType) {
      getRifaAction(dispatch, id, state.token);
    }
  }, [id, dispatch, state.token, state.type]);

  return (
    <>
      {state.type === getRifaSuccessType && (
        <Container className="text-center text-capitalize mt-3 p-5">
          <Row>
            <h1>{state.rifa.title}</h1>
          </Row>
          <Row className="text-center my-3">
            <h2>Numeros</h2>
          </Row>
          <Row className="mt-3 bg-success text-start">
            <Col>
              <h3>Numeros Vendidos</h3>
            </Col>
            <Col>
              <h4>5</h4>
            </Col>
          </Row>
          <Row className="bg-warning text-start">
            <Col>
              <h3>Numeros Pendentes</h3>
            </Col>
            <Col>
              <h4>5</h4>
            </Col>
          </Row>
          <Row className="bg-primary text-start">
            <Col>
              <h3>Numeros livres</h3>
            </Col>
            <Col>
              <h4>80</h4>
            </Col>
          </Row>
          <Row className="bg-success-subtle text-start">
            <Col>
              <h3>total Ganho</h3>
            </Col>
            <Col>
              <h4>R$ 125</h4>
            </Col>
          </Row>
          <Row className="text-center my-3 text-start">
            <h2>Vendedores</h2>
          </Row>
          <Row>
            <Col>
              <Card style={{ width: "15rem" }}>
                <UserOutlined className=" p-2" />
                <Card.Body className="text-center">
                  <Card.Title>João</Card.Title>
                  <div>
                    <h4>Total Vendido</h4>
                    <div>
                      <p>10 de 10</p>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
}

export default Detail;
