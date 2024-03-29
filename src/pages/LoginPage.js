import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function Login() {
  return (
    <Container className="p-5">
      <Row>
        <Col>
          <Form>
            <h1 className="text-center mb-5">Conecte-se</h1>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Nome</Form.Label>
              <Form.Control type="name" placeholder="" />
             
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Senha</Form.Label>
              <Form.Control type="password" placeholder="" />
            </Form.Group>
            <Button className="w-100 mt-3" variant="primary" size="lg" type="submit">
            Acessar
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
