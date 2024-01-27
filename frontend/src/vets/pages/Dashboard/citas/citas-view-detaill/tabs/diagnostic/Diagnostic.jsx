import React from "react";
import "./diagnostic.scss";
import { Col, Row } from "react-bootstrap";

import parse from "html-react-parser";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-solid-svg-icons";

function Diagnostic({ data }) {
  const renderStars = (rating) => {
    const solidStars = Array.from({ length: rating }, (_, index) => (
      <FontAwesomeIcon key={index} icon={solidStar} style={{ color: "rgb(51, 108, 251)" }} />
    ));

    const regularStars = Array.from({ length: 5 - rating }, (_, index) => (
      <FontAwesomeIcon key={index} icon={regularStar} style={{ color: "rgb(220, 220, 220)" }} />
    ));
    return [...solidStars, ...regularStars];
  };

  // console.log(data?.medication, data?.documentation);
  return (
    <div className="diagnostic-container">
      <div className="second container">
        <div className="details">
          <h4>Diagnóstico</h4>
          <div className="diagnos-details">
            <Row>
              <Col lg={3}>Nombre de Padecimiento</Col>
              <Col lg={9}>
                <b>{data?.condition_name}</b>
              </Col>
            </Row>
            <Row>
              <Col lg={3}>Descripción</Col>
              <Col lg={9}>
                <b>{data.description ? parse(data?.description) : ""}</b>
              </Col>
            </Row>
          </div>
        </div>
        <div className="third container">
          <h4>Documentación</h4>
          {data && data.documentation !== null ? (
            data.documentation.length > 0 ? (
              data.documentation.map((document, index) => (
                <div key={index} className="files mb-2">
                  {Object.entries(document).map(([key, value]) => (
                    <div key={key} className="d-flex justify-content-between w-100">
                      <p>{key}</p>
                      <div className="files-inner">
                        <Link to={value} download target="_blank">
                          <i className="bi bi-download"></i>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ))
            ) : (
              <div className="d-flex justify-content-between w-100">No Documentation</div>
            )
          ) : (
            <div className="d-flex justify-content-between w-100">No Documentation</div>
          )}
        </div>

        <div className="third container">
          <h4>Medicación</h4>
          <p>Medicación Recetado</p>
          {data && data.medication ? (
            data.medication.map((med, i) => (
              <div key={i} className="files mb-2">
                <div className="files-inner">
                  {med.Name}
                  <ul>
                    <li key={`intake_${i}`}>{med.intake} unidades</li>
                    <li key={`frequency_${i}`}>{med.frequency} veces al día</li>
                  </ul>
                </div>
              </div>
            ))
          ) : (
            <div className="d-flex justify-content-between w-100">No Medication Data</div>
          )}
        </div>
        <div className="fourth container">
          <h4>Observaciones Internas</h4>
          <Row>
            <Col lg={3}>Observaciones Internas</Col>
            <Col lg={9}>
              <b>{data?.internal_observation}</b>
            </Col>
          </Row>
          <Row>
            <Col lg={3}>
              <h4>Calificación del paciente</h4>
            </Col>
            <Col className="column" lg={9}>
              <div className="rating">{renderStars(data?.rating)}</div>
            </Col>
          </Row>
        </div>
        <button className="printbutton">Imprimir Diagnóstico</button>
      </div>
    </div>
  );
}

export default Diagnostic;
