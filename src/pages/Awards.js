import { Col, Container, Form, Row } from "react-bootstrap";
import { CheckCircleOutlined, ClockCircleOutlined } from "@ant-design/icons";
import CardAward from "../components/CardAward";
import { useAppContext } from "../context/AppContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getRifasAction } from "../context/action";
import { getRifasSuccessType, logoutSuccessType } from "../context/types";
import { useCookies } from "react-cookie";

function Awards() {
  const { state, dispatch } = useAppContext();
  const [cookies] = useCookies(["User", "Token"]);
  const navigate = useNavigate();

  const checkDate = (date) => {
    const dataRifa = new Date(date);
    const dataAtual = new Date();
    if (dataAtual > dataRifa) {
      return;
    }
    return dataRifa;
  };

  const handlefilter = (filter) => {
    getRifasAction(dispatch, state.token, filter);
  };

  useEffect(() => {
    if (!state.token && !cookies.Token) navigate("/login");
  });

  useEffect(() => {
    if (state.error.length > 0) navigate("/login");
  });

  useEffect(() => {
    if (state.type === logoutSuccessType) return;
    if (!state.type) return;
    if (state.type !== getRifasSuccessType) {
      getRifasAction(dispatch, state.token);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, state.token]);

  return (
    <>
      <div className="mt-3 text-capitalize text-center d-flex justify-content-center">
        <Form>
          <p>Filtrar:</p>
          <Form.Select
            aria-label="Default select example"
            onChange={(e) => {
              handlefilter(e.target.value);
            }}
          >
            <option value="all">Todos</option>
            <option value="finish">Finalizado</option>
            <option value="current">Em andamento</option>
          </Form.Select>
        </Form>
      </div>

      <Container className="p-5" fluid="sm">
        <Row>
          {state.rifas &&
            state.rifas.map((rifa, index) => (
              <Col
                key={index}
                xs={12}
                md={4}
                sm={1}
                className="p-0 d-flex justify-content-center"
              >
                <CardAward
                  id={rifa._id}
                  clickable={checkDate(rifa.date)}
                  children={
                    !checkDate(rifa.date) ? (
                      <CheckCircleOutlined className="p-1" />
                    ) : (
                      <ClockCircleOutlined className="p-1" />
                    )
                  }
                  status={!checkDate(rifa.date) ? "Finalizado" : "Em andamento"}
                  title={rifa.title}
                  description={rifa.description}
                  image={rifa.image}
                  variant={
                    !checkDate(rifa.date) ? "bg-secondary" : "bg-success"
                  }
                  date={rifa.date}
                  price={rifa.price}
                />
              </Col>
            ))}
        </Row>
      </Container>
    </>
  );
}

export default Awards;
