import { Col, Container, InputGroup, Row } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import CardNumber from "../components/CardNumber";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

function Sale() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
            <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Insira o nome"
                  autoFocus
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Telefone</Form.Label>
                <Form.Control
                  type="tel"
                  placeholder="Insira seu telefone"
                  autoFocus
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Numero</Form.Label>
                <Form.Control
                  type="number"
                  placeholder=""
                  autoFocus
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Confirmar pagamento</Form.Label>
                <InputGroup.Checkbox aria-label="Confirmar pagamento" />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Pagamento Pendente</Form.Label>
                <InputGroup.Checkbox aria-label="Pagamento Pendente"/>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Fechar
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Confirmar
            </Button>
          </Modal.Footer>
        </Modal>
      </>

      <Container className="p-5 text-capitalize">
        <Row className="my-3 text-center">
          <h4>Nome da rifa</h4>
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
          <Col onClick={handleShow} className="col-sm-3 col-md-4 col-lg-2 mt-2" style={{ cursor: "pointer" }}>
            <CardNumber  number={"00"} />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Sale;
