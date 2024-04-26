import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "../components/Alert";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { loginAction } from "../context/action";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

function Login() {
  const { state, dispatch } = useAppContext();
  const [, setCookie] = useCookies(["User", "Token"]);
  const [, setShowFeedBack] = useState(false);
  const navigate = useNavigate();

  const expirationDate = new Date();
  expirationDate.setTime(expirationDate.getTime() + 2 * 60 * 60 * 1000);

  const login = async (body) => {
   await loginAction(dispatch, body);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const body = {
      email: e.target.form.email.value,
      password: e.target.form.password.value,
    };
    login(body);
    setShowFeedBack(true);
  };

  useEffect(() => {
    if (state.token) {
      navigate("/rifas");
      setCookie("User", state.user, { path: "/", expires: expirationDate });
      setCookie("Token", state.token, { path: "/", expires: expirationDate });
    }
  });

  return (
    <Container className="p-5">
      <Row>
        <Col>
          {state.error.length > 0 && (
            <Alert
              message={state.error ? state.error : "Logado com sucesso"}
              onClose={() => setShowFeedBack(false)}
              variant={state.error ? "danger" : "success"}
            />
          )}

          <Form autoComplete="off">
            <h1 className="text-center mb-5">Conecte-se</h1>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Insira seu email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Senha</Form.Label>
              <Form.Control type="password" placeholder="Insira sua senha" />
            </Form.Group>
            <Button
              onClick={(e) => handleLogin(e)}
              className="w-100 mt-3"
              variant="dark"
              size="lg"
              type="submit"
            >
              Entrar
            </Button>
          </Form>
        </Col>
        <p
          onClick={() => navigate("/login/vendedor")}
          className="mt-3 text-primary"
          style={{ cursor: "pointer" }}
        >
          Entrar como vendedor
        </p>
      </Row>
    </Container>
  );
}

export default Login;
