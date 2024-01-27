import React from "react";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

const ExportModal = (props) => {
  return (
    <>
      <Modal size="md" show={props.show} onHide={props.onHide} centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Visualizar Cartilla</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex justify-content-around w-100 m-auto align-items-center">
            <Link className="btn btn-primary" to={`${process.env.REACT_APP_SERVER_URL}/pet`}>
              descargar
            </Link>
            <div>
              {/* <img src={`${process.env.REACT_APP_SERVER_URL}/profile/pets/images/qr_code_${props.id}.png`} alt="qrCode" /> */}
              <img src={`http://192.168.1.11:2000/profile/pets/images/qr_code_${props.id}.png`} alt="qrCode" />
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ExportModal;
