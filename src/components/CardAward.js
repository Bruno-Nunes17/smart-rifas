import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

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
}) {
  const navigate = useNavigate();

  const formatDate = (date) => {
    const dataRifa = new Date(date);
    const dataFormatada = dataRifa.toLocaleString("pt-BR");
    return dataFormatada;
  };

  return (
    <Card
      style={{ width: "15rem" }}
      className="text-capitalize text-center mt-2"
    >
      <div className="text-center">
        Status:{" "}
        <div className={`${variant} text-light text-center  my-auto`}>
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
  );
}

export default CardAward;
