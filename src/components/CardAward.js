import { Button, Card, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButtonBS from "react-bootstrap/DropdownButton";
import { EllipsisOutlined } from "@ant-design/icons";
import { useAppContext } from "../context/AppContext";
import { deleteRifaAction } from "../context/action";
import { useState } from "react";

function CardAward({
  title,
  description,
  image,
  status,
  children,
  id,
  variant,
  date,
  clickable,
  price,
  admin,
}) {
  const navigate = useNavigate();
  const { state, dispatch } = useAppContext();
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  const formatDate = (date) => {
    const dataRifa = new Date(date);
    const dataFormatada = dataRifa.toLocaleString("pt-BR");
    return dataFormatada;
  };

  const handleShow = () => {
    setShow(true);
  };

  const handleDelete = () => {
    const body = { id: id };
    setShow(false);
    deleteRifaAction(dispatch, body, state.token);
    window.location.reload();
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body className="text-center">
          <div>
            <h3>Deseja Excluir a Rifa?</h3>
          </div>
          <Button variant="primary" className="m-2" onClick={handleClose}>
            Não
          </Button>
          <Button
            variant="danger"
            className="m-2"
            onClick={() => handleDelete()}
          >
            Sim
          </Button>
        </Modal.Body>
      </Modal>
      <Card
        style={{ width: "15rem" }}
        className="text-capitalize text-center mt-2 position-relative"
      >
        {admin && (
          <DropdownButtonBS
            id="dropdown-basic-button"
            title={<EllipsisOutlined />}
            className="position-absolute bg-transparent"
            variant="outline-secondary"
          >
            <Dropdown.Item onClick={() => handleShow()}>Exluir</Dropdown.Item>
          </DropdownButtonBS>
        )}
        <div className="text-center">
          Status:{" "}
          <div className={`${variant} text-light text-center  my-auto mt-3`}>
            {status}: {children}{" "}
          </div>{" "}
        </div>

        <div className="d-flex justify-content-center">
          <Card.Img
            style={{ cursor: "pointer" }}
            onClick={() => {
              if (clickable) navigate(`/cotas/${id}`);
            }}
            className="mx-auto w-50 m-2"
            variant="top"
            src={image}
          />
        </div>
        <Card.Body className="d-flex justify-content-end flex-column">
          <Card.Title>{title}</Card.Title>
          <Card.Text> {description}</Card.Text>
          <Button onClick={() => navigate(`/detalhes/${id}`)} variant="dark">
            Mais Detalhes
          </Button>
        </Card.Body>
        <div className="text-center">
          <div className={"bg-success py-1  text-light text-center my-auto"}>
            Valor: R$ {Number.isInteger(price) ? `${price},00` : price}
          </div>
        </div>
        <Card.Footer className="text-muted">
          {date ? formatDate(date) : ""}
        </Card.Footer>
      </Card>
    </>
  );
}

export default CardAward;
