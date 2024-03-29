import { Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  return (
    <Navbar bg="primary" data-bs-theme="dark">
      <Navbar.Brand className="ms-3 bold" onClick={() => navigate("/")}>
        <h3 style={{ textDecoration: "none", cursor: "pointer" }}>
          Smart Rifas
        </h3>
      </Navbar.Brand>
      <div className="ms-auto me-5 d-flex justify-content-center">
        <h5
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/newseller")}
          className="text-light me-4"
        >
          Cadastrar Vendedor
        </h5>
        <h5
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/newaward")}
          className="text-light"
        >
          Nova Premiação
        </h5>
      </div>
    </Navbar>
  );
}

export default Header;
