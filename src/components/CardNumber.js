import { Card } from "react-bootstrap";

function CardNumber({number}) {
  return (
    <Card style={{ width: "5rem", height: "5rem" }} className="text-capitalize text-center bg-success d-flex justify-content-center"> <h1>{number}</h1>
    </Card>
  );
}

export default CardNumber;
