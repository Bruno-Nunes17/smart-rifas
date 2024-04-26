import { UserOutlined } from "@ant-design/icons";
import { Col, Container, Row, Card } from "react-bootstrap";
import { useAppContext } from "../context/AppContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { getRifaAction, getSellersAction } from "../context/action";
import { getRifaSuccessType } from "../context/types";
import { useCookies } from "react-cookie";

function Detail() {
  const { state, dispatch } = useAppContext();
  const [cookies] = useCookies(["User", "Token"]);
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

  useEffect(() => {
    if (!state.token && !cookies.Token) navigate("/login");
  });

  useEffect(() => {
    if (!state.type) return;
    if (state.type !== getRifaSuccessType) {
      getRifaAction(dispatch, id, state.token);
      getSellersAction(dispatch, state.token);
    }
  }, [id, dispatch, state.token, state.type]);

  return (
    <>
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
                  ? `R$ ${calcProfit("payd", state.rifa.cotas, state.rifa.price)}`
                  : "indisponivel"}
              </h4>
            </Col>
          </Row>
        </Container>
      )}
      {state.sellers && (
        <Container className="text-center text-capitalize mt-3 p-5">
          <Row className="text-center my-3 text-start">
            <h2>Vendedores</h2>
          </Row>
          <Row>
            {state.sellers.map((seller, index) => (
              <Col key={index}>
                <Card style={{ width: "15rem" }} className="m-1">
                  <UserOutlined className=" p-2" />
                  <Card.Body className="text-center">
                    <Card.Title>{seller.name}</Card.Title>
                    <div>
                      <h4>Total Vendido</h4>
                      <div>
                        <p>
                          {state.rifa.cotas
                            ? `${sellerFilter(seller.telephone, state.rifa.cotas)} de 10`
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
    </>
  );
}

export default Detail;
