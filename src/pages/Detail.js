import { UserOutlined } from "@ant-design/icons";
import {
  Col,
  Container,
  Row,
  Card,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import { useAppContext } from "../context/AppContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getRifaAction, getSellersAction } from "../context/action";
import { getRifaSuccessType } from "../context/types";
import { useCookies } from "react-cookie";
import Loader from "../components/Loader";
import { checkDate } from "../services/services";

function Detail() {
  const { state, dispatch } = useAppContext();
  const [cookies] = useCookies(["User", "Token"]);
  const [showLoader, setLoader] = useState(false);
  const [show, setShow] = useState(false);
  const [showWinner, setShowWinner] = useState(false);
  const [winner, setWinner] = useState();
  const { id } = useParams();
  const navigate = useNavigate();

  const quotaFilter = (params, cotas) => {
    const freeQuota = cotas.filter((cota) => cota.status === params);

    return freeQuota.length;
  };

  const sellerFilter = (params, cotas) => {
    const sellers = cotas.filter((cota) => cota.seller.telefone === params);

    return sellers.length;
  };

  const calcProfit = (params, cotas, value) => {
    const paydQuota = quotaFilter(params, cotas);
    const profit = paydQuota * value;

    return profit;
  };

  const handleClose = () => {
    setShow(false);
    setShowWinner(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cota = state.rifa.cotas[e.target.text.value];
    if (cota.client.telefone === "") return;
    setWinner(cota);
    setShowWinner(true);
    console.log(cota);
  };

  const handleDrawer = () => {
    const data = checkDate(state.rifa.date);
    if (data) return;
    setShow(true);
  };

  useEffect(() => {
    if (!state.token && !cookies.Token) navigate("/login");
  });

  useEffect(() => {
    if (!state.type) return;
    if (state.type !== getRifaSuccessType) {
      setLoader(true);
      getRifaAction(dispatch, id, state.token);
      getSellersAction(dispatch, state.token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, dispatch, state.token, showLoader]);

  useEffect(() => {
    if (state.rifa) {
      setLoader(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(state.rifa)]);

  return (
    <>
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Sortear Ganhador</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form id="cotas" autoComplete="off" onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="text">
                <Form.Label>Numero sorteado</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Insira o numero sorteado"
                  autoFocus
                  required
                />
              </Form.Group>
            </Form>
            {showWinner && (
              <Container>
                <Row>
                  <Col>Ganhador</Col>
                  <Col>{winner.client.nome}</Col>
                </Row>
                <Row>
                  <Col>Telefone</Col>
                  <Col>{winner.client.telefone}</Col>
                </Row>
                <Row>
                  <Col>Status</Col>
                  <Col>{winner.status === "payd" ? "Pago" : "Não pago"}</Col>
                </Row>
              </Container>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Fechar
            </Button>
            <Button variant="primary" type="submit" form="cotas">
              Confirmar
            </Button>
          </Modal.Footer>
        </Modal>
      </>
      {showLoader ? (
        <Loader />
      ) : (
        <div>
          {state.user.admin && (
            <Container className="text-center text-capitalize mt-3 p-5">
              <Row>
                <h1>{state.rifa ? state.rifa.title : "titulo"}</h1>
              </Row>
              <Row className="text-center my-3">
                <h2>Numeros</h2>
              </Row>
              <Row className="mt-3 bg-success text-start">
                <Col>
                  <h3>Numeros vendidos</h3>
                </Col>
                <Col>
                  <h4>
                    {state.rifa.cotas
                      ? quotaFilter("payd", state.rifa.cotas)
                      : "indisponivel"}
                  </h4>
                </Col>
              </Row>
              <Row className="bg-warning text-start">
                <Col>
                  <h3>Numeros Pendentes</h3>
                </Col>
                <Col>
                  <h4>
                    {state.rifa.cotas
                      ? quotaFilter("pending", state.rifa.cotas)
                      : "indisponivel"}
                  </h4>
                </Col>
              </Row>
              <Row className="bg-primary text-start">
                <Col>
                  <h3>Numeros livres</h3>
                </Col>
                <Col>
                  <h4>
                    {state.rifa.cotas
                      ? quotaFilter("free", state.rifa.cotas)
                      : "indisponivel"}
                  </h4>
                </Col>
              </Row>
              <Row className="bg-success-subtle text-start">
                <Col>
                  <h3>total Ganho</h3>
                </Col>
                <Col>
                  <h4>
                    {state.rifa.cotas
                      ? `R$ ${calcProfit(
                          "payd",
                          state.rifa.cotas,
                          state.rifa.price
                        )}`
                      : "indisponivel"}
                  </h4>
                </Col>
              </Row>

              {!checkDate(state.rifa.date) && (
                <Row className="mt-5">
                  <Col>
                    <Button
                      className="w-100 p-2 h1"
                      variant="success"
                      size="lg"
                      onClick={() => handleDrawer()}
                    >
                      Sortear
                    </Button>
                  </Col>
                </Row>
              )}
            </Container>
          )}
          {state.sellers && (
            <Container className="text-center text-capitalize mt-3 p-5">
              <Row className="text-center my-3 text-start">
                <h2>Vendedores</h2>
              </Row>
              <Row>
                {state.sellers.map((seller, index) => (
                  <Col
                    key={index}
                    className="col-sm-3 d-flex justify-content-center"
                  >
                    <Card style={{ width: "15rem" }} className="m-1">
                      <UserOutlined className=" p-2" />
                      <Card.Body className="text-center">
                        <Card.Title>{seller.name}</Card.Title>
                        <div>
                          <h4>Total Vendido</h4>
                          <div>
                            <p>
                              {state.rifa.cotas
                                ? `${sellerFilter(
                                    seller.telephone,
                                    state.rifa.cotas
                                  )} de 10`
                                : "indisponivel"}
                            </p>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Container>
          )}
        </div>
      )}
    </>
  );
}

export default Detail;
