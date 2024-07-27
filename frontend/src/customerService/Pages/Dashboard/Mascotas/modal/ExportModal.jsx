import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { usePetSummaryPdfQuery } from "../../../../../services/ApiServices";

const ExportModal = (props) => {
  const [skip, setSkip] = useState(true);
  const generatePdf = usePetSummaryPdfQuery(props.id, { skip });

  useEffect(() => {
    if (props.show) {
      setSkip(false);
    } else {
      setSkip(true);
    }
  }, [props.show]);

  return (
    <>
      <Modal size="md" show={props.show} onHide={props.onHide} centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Visualizar Cartilla</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex justify-content-around w-100 m-auto align-items-center">
            <a
              href={`${process.env.REACT_APP_SERVER_URL}/profile/pets/pdfs/resumen_de_mascotas_${props.id}.pdf`}
              download={`resumen_de_mascotas_${props.id}.pdf`}
              className="btn btn-primary"
              target="_blank"
              referrerPolicy="no-referrer"
              rel="noreferrer"
            >
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
