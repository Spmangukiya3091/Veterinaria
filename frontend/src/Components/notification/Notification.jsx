import React from "react";
import { Badge, Offcanvas } from "react-bootstrap";
import "./notification.scss";

function Notification({ handleClose, show }) {
  return (
    <div className="notification">
      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Notificaciones</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="badge-box">
            <p>JOY</p>
            <Badge pill bg="secondary">
              1
            </Badge>
          </div>
          <div className="notification-box">
            <i className="fa-solid fa-circle  active "></i>
            <div className="notification-text-box">
              <p className="notification-title">Ejemplo de Notificación</p>
              <p className="notification-body">10 Nov 2023, 2:40 pm</p>
            </div>
          </div>
          <div className="notification-box">
            <i className="fa-solid fa-circle"></i>
            <div className="notification-text-box">
              <p className="notification-title">Ejemplo de Notificación</p>
              <p className="notification-body">10 Nov 2023, 2:40 pm</p>
            </div>
          </div>
          <div className="badge-box box-padding">
            <p>Ayer</p>
            <Badge pill bg="secondary">
              1
            </Badge>
          </div>
          <div className="notification-box">
            <i className="fa-solid fa-circle  active "></i>
            <div className="notification-text-box">
              <p className="notification-title">Ejemplo de Notificación</p>
              <p className="notification-body">10 Nov 2023, 2:40 pm</p>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default Notification;
