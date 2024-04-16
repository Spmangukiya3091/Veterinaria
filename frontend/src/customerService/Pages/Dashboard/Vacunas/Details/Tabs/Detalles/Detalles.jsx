import React from "react";
import "./detalles.scss";
import { Col, Row } from "react-bootstrap";

const Detalles = ({ data }) => {
  return (
    <>
      <div className="details mb-6">
        <h4>Información</h4>
        <div className="info-details" lg={8}>
          <Row>
            <Col className="info-head" lg={4}>
              Código
            </Col>
            <Col className="info-details" lg={8}>
              05436873
            </Col>
          </Row>

          <Row>
            <Col className="info-head" lg={4}>
              Tipo
            </Col>
            <Col className="info-details" lg={8}>
              {data?.vaccine?.name || "-"}
            </Col>
          </Row>
          <Row>
            <Col className="info-head" lg={4}>
              Stock
            </Col>
            <Col className="info-details" lg={8}>
              {data?.vaccine?.stock || "-"}
            </Col>
          </Row>
          <Row>
            <Col className="info-head" lg={4}>
              Tiempo validez
            </Col>
            <Col className="info-details" lg={8}>
              {data?.vaccine?.validity || "-"} meses
            </Col>
          </Row>
          <Row>
            <Col className="info-head" lg={4}>
              N. de Aptos
            </Col>
            <Col className="info-details" lg={8}>
              {data?.apto || "-"}
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default Detalles;
