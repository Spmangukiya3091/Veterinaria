import React from "react";
import { Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
function Metricas({ month, data }) {
  const navigate = useNavigate()
  return (
    <div>
      <p className="card-main-title">Métricas mes actual</p>
      <Row>
        <Col sm={12} md={3} lg={3}>
          <div className="card bg-body hoverable card-xl-stretch mb-xl-8" onClick={() => { navigate('/customerservice/citas') }}>
            <div className="card-body">
              <div className="card-top-box">
                <img src="../images/cita.png" alt="citas" />
                <div>
                  <p className="letf-main-text">Citas agendadas</p>
                  <p className="left-sub-text">{data?.appointment?.totalRecords || 0}</p>
                </div>
              </div>

              <div className="card-bottom-box">
                <div className="card-bottom-text-wrapper">
                  <p className="bottom-left-text">Pendientes</p>
                  <p className="bottom-right-text">{data?.appointment?.pendingRecords || 0}</p>
                </div>
                <hr />
                <div className="card-bottom-text-wrapper">
                  <p className="bottom-left-text">No asistidas</p>
                  <p className="bottom-right-text">{data?.appointment?.noAttemptRecords || 0}</p>
                </div>
              </div>
            </div>
          </div>
        </Col>
        <Col sm={12} md={3} lg={3}>
          <div className="card bg-body hoverable card-xl-stretch mb-xl-8" onClick={() => { navigate('/customerservice/mascotas') }}>
            <div className="card-body">
              <div className="card-top-box">
                <img src="../images/masco.png" alt="masco" />
                <div>
                  <p className="letf-main-text">Mascotas</p>
                  <p className="left-sub-text">{data?.pets?.totalRecordsPets || 0}</p>
                </div>
              </div>

              <div className="card-bottom-box">
                <div className="card-bottom-text-wrapper">
                  <p className="bottom-left-text">Machos</p>
                  <p className="bottom-right-text">{data?.pets?.macho || 0}</p>
                </div>
                <hr />
                <div className="card-bottom-text-wrapper">
                  <p className="bottom-left-text">Hembras</p>
                  <p className="bottom-right-text">{data?.pets?.hembra || 0}</p>
                </div>
              </div>
            </div>
          </div>
        </Col>
        <Col sm={12} md={3} lg={3}>
          <div className="card bg-body hoverable card-xl-stretch mb-xl-8" onClick={() => { navigate('/customerservice/inventario') }}>
            <div className="card-body">
              <div className="card-top-box">
                <img src="../images/produc.png" alt="produc" />
                <div>
                  <p className="letf-main-text">Productos</p>
                  <p className="left-sub-text">{data?.products?.totalRecordsProducts || 0}</p>
                </div>
              </div>

              <div className="card-bottom-box">
                <div className="card-bottom-text-wrapper">
                  <p className="bottom-left-text">Sin stock</p>
                  <p className="bottom-right-text">{data?.products?.OutStock || 0}</p>
                </div>
                <hr />
                <div className="card-bottom-text-wrapper">
                  <p className="bottom-left-text">Con stock</p>
                  <p className="bottom-right-text">{data?.products?.InStock || 0}</p>
                </div>
              </div>
            </div>
          </div>
        </Col>
        <Col sm={12} md={3} lg={3}>
          <div className="card bg-body hoverable card-xl-stretch mb-xl-8">
            <div className="card-body">
              <div className="card-top-box">
                <img src="../images/usua.png" alt="usua" />
                <div>
                  <p className="letf-main-text">Usuarios</p>
                  <p className="left-sub-text">{data?.users?.totalRecordsUsers || 0}</p>
                </div>
              </div>

              <div className="card-bottom-box">
                <div className="card-bottom-text-wrapper">
                  <p className="bottom-left-text">Usuarios</p>
                  <p className="bottom-right-text">{data?.users?.admin || 0}</p>
                </div>
                <hr />
                <div className="card-bottom-text-wrapper">
                  <p className="bottom-left-text">Atención</p>
                  <p className="bottom-right-text">{data?.users?.serviceCenter || 0}</p>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Metricas;
