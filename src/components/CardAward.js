import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function CardAward({
  title,
  description,
  image,
  status,
  children,
  id,
  isAdmin,
}) {
  const navigate = useNavigate();

  return (
    <Card
      style={{ width: "15rem" }}
      className="text-capitalize text-center mt-2"
    >
      <div className="p-2 text-center">
        Status:{" "}
        <div className="bg-success text-light text-center rounded-2 my-auto">
          {status}: {children}{" "}
        </div>{" "}
      </div>
      <Card.Img
        style={{ cursor: "pointer" }}
        onClick={() => navigate(`/cotas/${id}`)}
        className="mx-auto w-50"
        variant="top"
        src={image}
      />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text> {description}</Card.Text>
        {isAdmin && (
          <Button onClick={() => navigate(`/detalhes/${id}`)} variant="warning">
            Mais Detalhes
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}

export default CardAward;
