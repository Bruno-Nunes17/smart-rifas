import { Card } from "react-bootstrap";

function CardNumber({ number, variant }) {
  return (
    <Card
      style={{ width: "5rem", height: "5rem", cursor: "pointer" }}
      className={`text-capitalize text-center ${variant} d-flex justify-content-center`}
    >
      {" "}
      <h1>{number}</h1>
    </Card>
  );
}

export default CardNumber;
