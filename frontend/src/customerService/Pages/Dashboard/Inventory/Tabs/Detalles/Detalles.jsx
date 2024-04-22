import React from "react";
import "./detalles.scss";
import { Col, Row } from "react-bootstrap";
import moment from "moment";

const Detalles = ({ data, historyData }) => {
  return (
    <>
      <div className="details">
        <h4>Detalles</h4>
        <div className="details">
          <h4>Detalles</h4>
          <div className="info-details" lg={8}>
            <Row>
              <Col className="info-head" lg={4}>
                Nombre
              </Col>
              <Col className="info-details" lg={8}>
                {data?.product || "-"}
              </Col>
            </Row>

            <Row>
              <Col className="info-head" lg={4}>
                SKU
              </Col>
              <Col className="info-details" lg={8}>
                {data?.sku || "-"}
              </Col>
            </Row>
            <Row>
              <Col className="info-head" lg={4}>
                Categoría
              </Col>
              <Col className="info-details" lg={8}>
                {data?.category || "-"}
              </Col>
            </Row>
            <Row>
              <Col className="info-head" lg={4}>
                Marca
              </Col>
              <Col className="info-details" lg={8}>
                {data?.brand || "-"}
              </Col>
            </Row>
            <Row>
              <Col className="info-head" lg={4}>
                Laboratorio
              </Col>
              <Col className="info-details" lg={8}>
                {data?.laboratory || "-"}
              </Col>
            </Row>
            <Row>
              <Col className="info-head" lg={4}>
                Composición
              </Col>
              <Col className="info-details" lg={8}>
                {data?.composition || "-"}
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
      </div>
      <div className="details my-3">
        <h4>Actualizaciones</h4>
        {historyData?.productHistory?.length > 0 ? (
          historyData?.productHistory.map(({ id, reason, createdAt }) => (
            <div className="detail-wrapper" key={id}>
              <div className="detail-title-box">
                <p className="detail-title-main">{reason ? reason : "-"}</p>
                <p className="detail-title-sub">{createdAt ? moment(createdAt).format("DD MMM YYYY, hh:mm A") : "-"}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="detail-wrapper">No history Available</div>
        )}
      </div>
    </>
  );
};

export default Detalles;
