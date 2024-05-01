import { Navbar, Nav, Container, Offcanvas } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { logoutAction } from "../context/action";
import * as types from "../context/types";
import { useEffect } from "react";
import { useCookies } from "react-cookie";

function Header() {
  const navigate = useNavigate();
  const { state, dispatch } = useAppContext();
  const [, , removeCookie] = useCookies();

  const login = async () => {
    logoutAction(dispatch);
    removeCookie("User", { path: "/" });
    removeCookie("Token", { path: "/" });
  };

  const handleLogout = () => {
    login();
  };

  useEffect(() => {
    if (state.type === types.logoutSuccessType) navigate("/login");
  }, [navigate, state]);

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="dark"
      data-bs-theme="dark"
      sticky="top"
    >
      <Container fluid>
        <Navbar.Brand
          style={{ cursor: "pointer" }}
          className="ms-3 bold"
          onClick={() => {
            if (state.token) {
              navigate("/rifas");
            }
          }}
        >
          <h3 style={{ textDecoration: "none", cursor: "pointer" }}>
            Smart Rifas
          </h3>
        </Navbar.Brand>

        {state.token && (
          <>
            <Navbar.Toggle aria-controls="offcanvasNavbar-expand-sm" />
            <Navbar.Offcanvas
              id="offcanvasNavbar-expand-sm"
              aria-labelledby="offcanvasNavbarLabel-expand-sm"
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id="offcanvasNavbarLabel-expand-sm">
                  Smart Rifas
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body className="bg-dark">
                {state.user.admin && (
                  <Nav className="ms-auto">
                    <Nav.Link
                      style={{ cursor: "pointer" }}
                      onClick={() => navigate("/rifas")}
                      className="text-light ms-1"
                    >
                      Inicio
                    </Nav.Link>
                    <Nav.Link
                      style={{ cursor: "pointer" }}
                      onClick={() => navigate("/cadastrar/vendedor")}
                      className="text-light ms-1"
                    >
                      Cadastrar Vendedor
                    </Nav.Link>
                    <Nav.Link
                      style={{ cursor: "pointer" }}
                      onClick={() => navigate("/novarifa")}
                      className="text-light ms-1"
                    >
                      Nova Premiação
                    </Nav.Link>
                  </Nav>
                )}

                <Nav className="me-5 ms-auto ">
                  {state.token && (
                    <Nav.Link
                      className="text-light ms-1"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleLogout()}
                    >
                      Sair
                    </Nav.Link>
                  )}
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </>
        )}
      </Container>
    </Navbar>
  );
}

export default Header;
