import { Col, Container, Row } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import { CheckCircleOutlined, ClockCircleOutlined } from "@ant-design/icons";
import CardAward from "../components/CardAward";
import { useAppContext } from "../context/AppContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getRifasAction } from "../context/action";
import { getRifasSuccessType } from "../context/types";

function Awards() {
  const { state, dispatch } = useAppContext();
  const navigate = useNavigate();

  const checkDate = (date) => {
    const dataRifa = new Date(date);
    const dataAtual = new Date();
    if (dataAtual > dataRifa) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (!state.token) navigate("/login");
  });

  useEffect(() => {
    if (state.type !== getRifasSuccessType) {
      getRifasAction(dispatch, state.token);
    }
  }, [dispatch, state.token, state.type]);

  return (
    <>
      <div className="mt-3 text-capitalize text-center">
        <Dropdown>
          <Dropdown.Toggle variant="light" id="dropdown-basic">
            Filtrar
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item>Finalizados</Dropdown.Item>
            <Dropdown.Item>Em andamento</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <Container className="p-5" fluid="sm">
        <Row>
          {state.rifas.map((rifa, index) => (
            <Col
              key={index}
              xs={12}
              md={4}
              sm={1}
              className="p-0 d-flex justify-content-center"
            >
              <CardAward
                isAdmin={state.user.admin}
                id={rifa._id}
                children={checkDate(rifa.date) ? <CheckCircleOutlined className="p-1" /> : <ClockCircleOutlined className="p-1"/>}
                status={checkDate(rifa.date) ? "Finalizado" : "Em andamento"}
                title={rifa.title}
                description={rifa.description}
                image={rifa.image}
                variant={checkDate(rifa.date) ? "bg-success" : "bg-warning"}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default Awards;
