import { Card } from "react-bootstrap";

function CardNumber({ number, variant, admin }) {
  return (
    <Card
      style={{ width: "5.5rem", height: "5.5rem", cursor: "pointer" }}
      className={`text-capitalize text-center ${variant} d-flex justify-content-center position-relative`}
    >
      <h1>{number}</h1>
    </Card>
  );
}

export default CardNumber;
