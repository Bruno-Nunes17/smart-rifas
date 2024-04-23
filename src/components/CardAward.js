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
      <div className="p-2 text-center">
        Status:{" "}
        <div className={`${variant} text-light text-center rounded-2 my-auto`}>
          {status}: {children}{" "}
        </div>{" "}
      </div>
      <Card.Img
        style={{ cursor: "pointer" }}
        onClick={() => {
          if (clickable) navigate(`/cotas/${id}`);
        }}
        className="mx-auto w-50"
        variant="top"
        src={image}
      />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text> {description}</Card.Text>
        <Button onClick={() => navigate(`/detalhes/${id}`)} variant="warning">
          Mais Detalhes
        </Button>
        <Card.Footer className="text-muted mt-1">
          {date ? formatDate(date) : ""}
        </Card.Footer>
      </Card.Body>
    </Card>
  );
}

export default CardAward;
