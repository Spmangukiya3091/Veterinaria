import React from "react";
import { Button } from "react-bootstrap";
import "./dialog.scss";
function Dialog() {
  return (
    <div className="dialog-content">
      <div className="detail-section">
        <div className="top-date-wrapper">
          <p>Próximas citas agendadas</p>
          <Button className="calendar-btn">
            <i className="fa-regular fa-calendar"></i>
            Ventana de Citas
          </Button>
        </div>
        <p className="detail-heading">Viernes 13, Agosto 2023</p>
        <div className="detail-wrapper active-detail">
          <div className="detail-title-box ">
            <p className="detail-title-main active-text">8:00 AM</p>
            <p className="detail-title-sub active-text">Cita #12323 - CUBAS TORRES, CARLOS ENRIQUE ...</p>
          </div>

          <div className="detail-btn-wrapper">
            <Button className="detail-btn">Ver detalles</Button>
          </div>
        </div>
        <div className="detail-wrapper">
          <div className="detail-title-box">
            <p className="detail-title-main">8:00 AM</p>
            <p className="detail-title-sub">Cita #12323 - CUBAS TORRES, CARLOS ENRIQUE ...</p>
          </div>

          <div className="detail-btn-wrapper">
            <Button className="detail-btn">Ver detalles</Button>
          </div>
        </div>
        <div className="detail-wrapper">
          <div className="detail-title-box">
            <p className="detail-title-main">8:00 AM</p>
            <p className="detail-title-sub">Cita #12323 - CUBAS TORRES, CARLOS ENRIQUE ...</p>
          </div>

          <div className="detail-btn-wrapper">
            <Button className="detail-btn">Ver detalles</Button>
          </div>
        </div>
        <div className="detail-wrapper">
          <div className="detail-title-box">
            <p className="detail-title-main">8:00 AM</p>
            <p className="detail-title-sub">Cita #12323 - CUBAS TORRES, CARLOS ENRIQUE ...</p>
          </div>

          <div className="detail-btn-wrapper">
            <Button className="detail-btn">Ver detalles</Button>
          </div>
        </div>
        <div className="detail-wrapper">
          <div className="detail-title-box">
            <p className="detail-title-main">8:00 AM</p>
            <p className="detail-title-sub">Cita #12323 - CUBAS TORRES, CARLOS ENRIQUE ...</p>
          </div>

          <div className="detail-btn-wrapper">
            <Button className="detail-btn">Ver detalles</Button>
          </div>
        </div>
        <div className="detail-wrapper ">
          <div className="detail-title-box">
            <p className="detail-title-main">8:00 AM</p>
            <p className="detail-title-sub">Cita #12323 - CUBAS TORRES, CARLOS ENRIQUE ...</p>
          </div>

          <div className="detail-btn-wrapper">
            <Button className="detail-btn">Ver detalles</Button>
          </div>
        </div>
        <div className="detail-wrapper">
          <div className="detail-title-box">
            <p className="detail-title-main">8:00 AM</p>
            <p className="detail-title-sub">Cita #12323 - CUBAS TORRES, CARLOS ENRIQUE ...</p>
          </div>
          <div className="detail-btn-wrapper">
            <Button className="detail-btn">Ver detalles</Button>
          </div>
        </div>
        <div className="detail-wrapper">
          <div className="detail-title-box">
            <p className="detail-title-main">8:00 AM</p>
            <p className="detail-title-sub">Cita #12323 - CUBAS TORRES, CARLOS ENRIQUE ...</p>
          </div>
          <div className="detail-btn-wrapper">
            <Button className="detail-btn">Ver detalles</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dialog;
