import { Col, Container, InputGroup, Row } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import CardNumber from "../components/CardNumber";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useParams } from "react-router-dom";
import { getCotaAction, getRifaAction } from "../context/action";
import { useAppContext } from "../context/AppContext";
import { getRifaSuccessType } from "../context/types";

function Sale() {
  const [show, setShow] = useState(false);
  const { state, dispatch } = useAppContext();
  const { id } = useParams();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    const cota = state.cota;
    cota.client.nome = e.target.form.nome.value;
    cota.client.telefone = e.target.form.telefone.value;
    cota.payd = true;
    cota.seller.nome = state.user.name;
    cota.seller.telefone = state.user.email ? "" : state.user.telephone;
    console.log(state, cota);
  };

  const handleClick = (cota) => {
    if (cota.payd) return;
    if (cota.pendig) return;
    handleShow();
    getCotaAction(dispatch, cota);
  };

  useEffect(() => {
    if (state.type !== getRifaSuccessType) {
      getRifaAction(dispatch, id, state.token);
    }
  }, [id, dispatch, state.token, state.type]);

  return (
    <>
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form id="cotas">
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
              <Form.Group className="mb-3" controlId="payd">
                <Form.Label>Confirmar pagamento</Form.Label>
                <InputGroup.Checkbox
                  type="checkbox"
                  aria-label="Confirmar pagamento"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="pending">
                <Form.Label>Pagamento Pendente</Form.Label>
                <InputGroup.Checkbox aria-label="Pagamento Pendente" />
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

      <>
        {state.type === getRifaSuccessType && (
          <>
            <Container className="p-5 text-capitalize">
              <Row className="my-3 text-center">
                <h4>{state.rifa.title}</h4>
              </Row>
              <Row>
                <div className="mt-3 text-capitalize text-center">
                  <Dropdown>
                    <Dropdown.Toggle variant="light" id="dropdown-basic">
                      Filtrar
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item>Todos</Dropdown.Item>
                      <Dropdown.Item>Disponiveis</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </Row>
            </Container>
            <Container>
              <Row className="m-3 gx-3" sm={2}>
                {state.rifa.cotas.map((cota, index) => (
                  <Col
                    key={index}
                    className="col-sm-3 col-md-4 col-lg-2 mt-2"
                    onClick={() => {
                      handleClick(cota);
                    }}
                  >
                    <CardNumber
                      style={{ cursor: "pointer" }}
                      number={
                        cota.number < 10 ? `0${cota.number}` : cota.number
                      }
                      varint={
                        cota.payd
                          ? "danger"
                          : cota.pendig
                          ? "warning"
                          : "success"
                      }
                    />
                  </Col>
                ))}
              </Row>
            </Container>
          </>
        )}
      </>
    </>
  );
}

export default Sale;
