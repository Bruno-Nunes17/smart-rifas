import { Col, Container, Row, Button, Card, CardText } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import { CheckCircleOutlined } from "@ant-design/icons";

function Awards() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/detail");
  };

  return (
    <>
      <div className="mt-3 text-capitalize text-center">
        <Dropdown>
          <Dropdown.Toggle variant="light" id="dropdown-basic">
            Filtrar
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item>Finalizados</Dropdown.Item>
            <Dropdown.Item>Em andamento</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <Container className="p-5" fluid="sm">
        <Row>
          <Col
            xs={12}
            md={4}
            sm={1}
            className="p-0 d-flex justify-content-center"
          >
            <Card
              style={{ width: "15rem" }}
              className="text-capitalize text-center "
            >
              <CardText className="p-2 text-center">
                Status:{" "}
                <p className="bg-success text-light text-center rounded-2 my-auto">
                  Finalizado <CheckCircleOutlined className="p-1" />{" "}
                </p>{" "}
              </CardText>
              <Card.Img
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/sale")}
                className="mx-auto w-50"
                variant="top"
                src="https://casasfreire.agilecdn.com.br/celular-motorola-moto-e13-64g-branco_331121.png?v=28-398561947"
              />
              <Card.Body>
                <Card.Title>Iphone 8 plus 256gb</Card.Title>
                <Card.Text> uma breve descição</Card.Text>
                <Button onClick={() => handleClick()} variant="warning">
                  Mais Detalhes
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Awards;
