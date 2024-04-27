import { Col, Container, Row } from "react-bootstrap";
import CardNumber from "../components/CardNumber";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useNavigate, useParams } from "react-router-dom";
import {
  getCotaAction,
  getRifaAction,
  sellCotaAction,
} from "../context/action";
import { useAppContext } from "../context/AppContext";
import { getRifaSuccessType } from "../context/types";
import { useCookies } from "react-cookie";

function Sale() {
  const [show, setShow] = useState(false);
  const { state, dispatch } = useAppContext();
  const [cookies] = useCookies(["User", "Token"]);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const sellCota = async (body) => {
    await sellCotaAction(dispatch, body, state.token);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      e.target.form.nome.value === "" ||
      e.target.form.telefone.value === ""
    ) {
      return;
    }
    const cota = state.cota;
    cota.client.nome = e.target.form.nome.value;
    cota.client.telefone = e.target.form.telefone.value;
    cota.status = e.target.form.pagamento.value;
    cota.seller.nome = state.user.name;
    cota.seller.telefone = state.user.email ? "" : state.user.telephone;

    const body = { id, cota };

    sellCota(body);
    handleClose();
  };

  const handlefilter = (filter) => {
    getRifaAction(dispatch, id, state.token, filter);
  };

  const handleClick = (cota) => {
    if (cota.status !== "free") return;
    handleShow();
    getCotaAction(dispatch, cota);
  };

  const quotaStatus = (status) => {
    if (status === "payd") {
      return "bg-success";
    }
    if (status === "pending") {
      return "bg-danger";
    }
    return "bg-light";
  };

  useEffect(() => {
    if (!state.token && !cookies.Token) navigate("/login");
  });

  useEffect(() => {
    if (!state.type) return;
    if (state.type !== getRifaSuccessType) {
      getRifaAction(dispatch, id, state.token);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, dispatch, state.token, state.rifa]);

  return (
    <>
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form id="cotas" autoComplete="off">
              <Form.Group className="mb-3" controlId="nome">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Insira o nome do comprador"
                  autoFocus
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="telefone">
                <Form.Label>Telefone</Form.Label>
                <Form.Control
                  type="tel"
                  placeholder="Insira o telefone do comprador"
                  autoFocus
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="pagamento">
                <Form.Select aria-label="Default select example">
                  <option value="payd">Pagamento Confirmado</option>
                  <option value="pending">Pagamento Pendente</option>
                </Form.Select>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Fechar
            </Button>
            <Button
              variant="primary"
              type="submit"
              form="cotas"
              onClick={(e) => handleSubmit(e)}
            >
              Confirmar
            </Button>
          </Modal.Footer>
        </Modal>
      </>
      <Container className="p-5 text-capitalize">
        <Row className="my-3 text-center">
          <h4>{state.rifa ? state.rifa.title : "titulo"}</h4>
        </Row>
        <Row>
          <div className="mt-3 text-capitalize text-center d-flex justify-content-center">
            <Form>
              <p>Filtrar:</p>
              <Form.Select
                aria-label="Default select example"
                onChange={(e) => {
                  handlefilter(e.target.value);
                }}
              >
                <option value="all">Todos</option>
                <option value="available">Disponivels</option>
              </Form.Select>
            </Form>
          </div>
        </Row>
      </Container>
      {state.type === getRifaSuccessType && (
        <Container>
          <Row className="m-3 gx-3" sm={2}>
            {state.rifa &&
              state.rifa.cotas.map((cota, index) => (
                <Col
                  key={index}
                  className="col-sm-3 col-md-4 col-lg-2 mt-2 d-flex justify-content-center"
                  onClick={() => {
                    handleClick(cota);
                  }}
                >
                  <CardNumber
                    style={{ cursor: "pointer" }}
                    number={cota.number < 10 ? `0${cota.number}` : cota.number}
                    variant={
                      cota.status ? quotaStatus(cota.status) : "bg-light"
                    }
                  />
                </Col>
              ))}
          </Row>
        </Container>
      )}
    </>
  );
}

export default Sale;
