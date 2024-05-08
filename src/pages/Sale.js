import { Col, Container, Dropdown, DropdownButton, Row } from "react-bootstrap";
import CardNumber from "../components/CardNumber";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useNavigate, useParams } from "react-router-dom";
import { getRifaAction, sellCotaAction } from "../context/action";
import { useAppContext } from "../context/AppContext";
import { getRifaSuccessType } from "../context/types";
import { useCookies } from "react-cookie";
import Loader from "../components/Loader";
import { EllipsisOutlined } from "@ant-design/icons";

function Sale() {
  const [show, setShow] = useState(false);
  const { state, dispatch } = useAppContext();
  const [cookies] = useCookies(["User", "Token"]);
  const { id } = useParams();
  const navigate = useNavigate();
  const [showCota, setCota] = useState();
  const [showCotas, setCotas] = useState();
  const [showLoader, setLoader] = useState(false);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const sellCota = async (body) => {
    await sellCotaAction(dispatch, body, state.token);
    return setCota(undefined);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cota = showCota;
    cota.client.nome = e.target.nome.value;
    cota.client.telefone = e.target.telefone.value;
    cota.status = e.target.pagamento.value;
    cota.seller.nome = e.target.sellerName.value;
    cota.seller.telefone = e.target.sellerNumber.value;

    const body = { id, cota };

    sellCota(body);
    handleClose();
  };

  const handleQuit = (cota) => {
    const cotaLimpa = cota;
    cotaLimpa.client.nome = "";
    cotaLimpa.client.telefone = "";
    cotaLimpa.status = "free";
    cotaLimpa.seller.nome = "";
    cotaLimpa.seller.telefone = "";

    const body = { id, cota: cotaLimpa };

    console.log(body);

    sellCota(body);
  };

  const handleEdit = (cota) => {
    const cotaEditada = cota;
    cotaEditada.status = "payd";

    const body = { id, cota: cotaEditada };

    sellCota(body);
  };

  const handlefilter = (filter = "all") => {
    let cotas = [];
    if (filter === "available") {
      for (const cota of state.rifa.cotas) {
        if (cota.status === "free") {
          cotas.push(cota);
        }
      }
      return setCotas(cotas);
    }
    setCotas(state.rifa.cotas);
  };

  const handleClick = (cota) => {
    if (cota.status !== "free") return;
    handleShow();
    setCota(cota);
  };

  const quotaStatus = (status) => {
    if (status === "payd") {
      return "bg-success";
    }
    if (status === "pending") {
      return "bg-warning";
    }
    return "bg-light";
  };

  useEffect(() => {
    if (!state.token && !cookies.Token) navigate("/login");
  });

  useEffect(() => {
    if (!state.type) return;
    if (state.type !== getRifaSuccessType) {
      setLoader(true);
      getRifaAction(dispatch, id, state.token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, state.token, JSON.stringify(showCota)]);

  useEffect(() => {
    if (state.rifa) {
      setCotas(state.rifa.cotas);
      setLoader(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(state.rifa)]);

  return (
    <>
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form id="cotas" autoComplete="off" onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="nome">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Insira o nome do comprador"
                  autoFocus
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="telefone">
                <Form.Label>Telefone</Form.Label>
                <Form.Control
                  type="tel"
                  placeholder="Insira o telefone do comprador"
                  autoFocus
                  required
                />
              </Form.Group>
              {state.user.admin && (
                <>
                  <Form.Group className="mb-3" controlId="sellerName">
                    <Form.Label>Nome do vendedor</Form.Label>
                    <Form.Control
                      type="name"
                      placeholder="Insira o nome do vendedor"
                      autoFocus
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="sellerNumber">
                    <Form.Label>Telefone do vendedor</Form.Label>
                    <Form.Control
                      type="tel"
                      placeholder="Insira o telefone do vendedor"
                      autoFocus
                      required
                    />
                  </Form.Group>
                </>
              )}
              <Form.Group className="mb-3" controlId="pagamento">
                <Form.Select aria-label="Default select example">
                  <option value="payd">Pagamento Confirmado</option>
                  {state.user.admin && (
                    <option value="pending">Pagamento Pendente</option>
                  )}
                </Form.Select>
              </Form.Group>
            </Form>
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
      {showLoader ? (
        <Loader />
      ) : (
        <Container>
          <Row className="m-3 gx-3" sm={2}>
            {showCotas &&
              showCotas.map((cota, index) => (
                <Col
                  key={index}
                  className="col-sm-3 col-md-4 col-lg-2 mt-2 d-flex justify-content-center"
                >
                  {state.user.admin && cota.status !== "free" && (
                    <DropdownButton
                      id="dropdown-basic-button"
                      title={<EllipsisOutlined />}
                      className="bg-transparent"
                      variant="outline-secondary"
                    >
                      <Dropdown.Item onClick={() => handleQuit(cota)}>
                        Desistir
                      </Dropdown.Item>
                      {cota.status === "pending" && (
                        <Dropdown.Item onClick={() => handleEdit(cota)}>
                          Confirmar Pagamento
                        </Dropdown.Item>
                      )}
                    </DropdownButton>
                  )}
                  <div
                    onClick={() => {
                      handleClick(cota);
                    }}
                  >
                    <CardNumber
                      style={{ cursor: "pointer" }}
                      number={
                        cota.number < 10 ? `0${cota.number}` : cota.number
                      }
                      variant={
                        cota.status ? quotaStatus(cota.status) : "bg-light"
                      }
                      admin={state.user.admin}
                    />
                  </div>
                </Col>
              ))}
          </Row>
        </Container>
      )}
    </>
  );
}

export default Sale;
