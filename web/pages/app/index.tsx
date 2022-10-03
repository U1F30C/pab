import Router from "next/router";
import { Button, Card, Col, Row } from "react-bootstrap";
import LayoutNoAuthenticated from "../../components/layout/layout-no-authenticated";

export default function Home() {
  return (
    <LayoutNoAuthenticated>
      <Card className="p-4">
        <Row>
          <Col lg={4} md={4} sm={5} xs={5} className="py-2 d-flex justify-content-center">
            <img src="/images/LOGOCLUSTER@2x.png" height="45em" />
          </Col>
          <Col lg={4} md={4} sm={5} xs={5} className="py-2 d-flex justify-content-center">
            <img src="/images/Logo Salud.png" height="45em" />
          </Col>
          <Col lg={4} md={4} sm={2} xs={2} className="py-2 d-flex justify-content-center">
            <img src="/images/logo_jalisco_black.svg" height="45em" />
          </Col>
        </Row>
        

        <Row>
          <Col className="p-3">
            <p>
              Sistema de monitoreo contínuo para la prevención del Síndrome
              Metabólico
            </p>
          </Col>
        </Row>

        <Row>
          <Col md={6} className="p-3 d-flex justify-content-center">
            <Button
              variant="primary"
              onClick={() => Router.push("/auth/login")}
            >
              Monitoreo y administración
            </Button>
          </Col>
          <Col md={6} className="p-3 d-flex justify-content-center">
            <Button
              variant="primary"
              onClick={() => Router.push("/data-entry")}
            >
              Captura de datos
            </Button>
          </Col>
          <Col className="p-3"></Col>
        </Row>
      </Card>
    </LayoutNoAuthenticated>
  );
}
