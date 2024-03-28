import React from "react";
import { Modal } from "react-bootstrap";

const ExportModal = (props) => {

  return (
    <>
      <Modal size="md" show={props.show} onHide={props.onHide} centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Visualizar Cartilla</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex justify-content-around w-100 m-auto align-items-center">
            <a href={`${process.env.REACT_APP_SERVER_URL}/profile/pets/pdfs/pet_summary_${props.id}.pdf`} download className="btn btn-primary" target="_blank" referrerPolicy="no-referrer" rel="noreferrer">
              Descargar
            </a>
            <div>
              <img src={`${process.env.REACT_APP_SERVER_URL}/profile/pets/images/qr_code_${props.id}.png`} alt="qrCode" />
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ExportModal;
