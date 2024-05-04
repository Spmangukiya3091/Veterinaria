import React from "react";
import "./detalles.scss";
import { Col, Row } from "react-bootstrap";

const Detalles = ({ data }) => {
  return (
    <>
      <div className="details mb-6">
        <h4>Detalles</h4>
        <div className="info-details" lg={8}>
          <Row>
            <Col className="info-head" lg={4}>
              Nro. de Pago
            </Col>
            <Col className="info-details" lg={8}>
              {data?.payment_no || "-"}
            </Col>
          </Row>

          <Row>
            <Col className="info-head" lg={4}>
              Nro. de Transferencia
            </Col>
            <Col className="info-details" lg={8}>
              {data?.transfer_no || "-"}
            </Col>
          </Row>
          <Row>
            <Col className="info-head" lg={4}>
              Propietarios
            </Col>
            <Col className="info-details" lg={8}>
              {data?.owner || "-"}
            </Col>
          </Row>
          <Row>
            <Col className="info-head" lg={4}>
              Doctor
            </Col>
            <Col className="info-details" lg={8}>
              DR. {data?.doctor || "-"}
            </Col>
          </Row>
          <Row>
            <Col className="info-head" lg={4}>
              Servicio
            </Col>
            <Col className="info-details" lg={8}>
              {data?.service || "-"}
            </Col>
          </Row>
          <Row>
            <Col className="info-head" lg={4}>
              Monto
            </Col>
            <Col className="info-details" lg={8}>
              {data?.amount || "-"}
            </Col>
          </Row>
          <Row>
            <Col className="info-head" lg={4}>
              DCTO.
            </Col>
            <Col className="info-details" lg={8}>
              {data?.discount || "-"}%
            </Col>
          </Row>
          <Row>
            <Col className="info-head" lg={4}>
              Monto Final
            </Col>
            <Col className="info-details" lg={8}>
              S/  {data?.final_amount || "-"}
            </Col>
          </Row>
          <Row>
            <Col className="info-head" lg={4}>
              Método de Pago
            </Col>
            <Col className="info-details" lg={8}>
              {data?.payment_method || "-"}
            </Col>
          </Row>
          <Row>
            <Col className="info-head" lg={4}>
              Descripción
            </Col>
            <Col className="info-details" lg={8}>
              {data?.description || "-"}
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default Detalles;
