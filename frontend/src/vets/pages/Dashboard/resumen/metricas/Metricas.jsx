import React from "react";
import { Row, Col } from "react-bootstrap";
function Metricas({ data }) {
  return (
    <div>
      <p className="card-main-title">Métricas mes actual</p>
      <Row>
        <Col sm={12} md={3} lg={3}>
          <div className="card bg-body hoverable card-xl-stretch mb-xl-8" >
            <div className="card-body">
              <img src="../images/pendiente.png" alt="pendientes" />

              <div className="main-heading mb-2 mt-4">Citas pendientes</div>

              <div className="sub-heading">{data?.pendingCount} </div>
            </div>
          </div>
        </Col>
        <Col sm={12} md={3} lg={3}>
          <div className="card bg-body hoverable card-xl-stretch mb-xl-8">
            <div className="card-body">
              <img src="../images/totales.png" alt="totales" />

              <div className="main-heading mb-2 mt-4">Citas totales</div>

              <div className="sub-heading">{data?.totalCount}</div>
            </div>
          </div>
        </Col>
        <Col sm={12} md={3} lg={3}>
          <div className="card bg-body hoverable card-xl-stretch mb-xl-8">
            <div className="card-body">
              <img src="../images/asistidas.png" alt="asistidas" />

              <div className="main-heading mb-2 mt-4">Citas no asistidas</div>

              <div className="sub-heading">{data?.noAttemptCount}</div>
            </div>
          </div>
        </Col>
        <Col sm={12} md={3} lg={3}>
          <div className="card bg-body hoverable card-xl-stretch mb-xl-8">
            <div className="card-body">
              <img src="../images/nuevos.png" alt="nuevos" />

              <div className="main-heading mb-2 mt-4">Pacientes nuevos</div>

              <div className="sub-heading">{data?.ownerRecords}</div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Metricas;
