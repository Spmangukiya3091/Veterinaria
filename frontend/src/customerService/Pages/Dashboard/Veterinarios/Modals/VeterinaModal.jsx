import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import "./veterinamodal.scss";
import EspecialidadModal from "./EspecialidadModal";
import { success } from "../../../../Components/alert/success";

const VeterinaModal = (props) => {
  // eslint-disable-next-line no-unused-vars
  const [openModal, setOpenModal] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleCloses = () => setOpen(false);

  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Especialidades de Doctores
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="px-9">
          <div className="button">
            <Button
              variant="primary"
              onClick={() => {
                props.onHide();
                handleOpen();
              }}
            >
              + Crear Especialidad
            </Button>
          </div>
          <div className="modal-table">
            <table
              className="table align-middle table-bordered table-row-bordered p-2 fs-6 g-5"
              id="kt_ecommerce_products_table"
            >
              <thead>
                <tr className="text-start text-gray-400 fw-bolder fs-7 text-uppercase gs-0">
                  <th className="">ESPECIALIDAD</th>
                  <th className="text-start ">DOCTORES</th>
                  <th className="text-start ">F. DE CREACIÓN</th>
                  <th className="text-end ">OPCIONES</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-start">PEDIATRÍA</td>
                  <td className="text-start">123</td>
                  <td className="text-start">10 Feb 2021</td>
                  <td className="text-end">
                    <Button
                      onClick={() => {
                        props.onHide();
                        handleOpen();
                      }}
                      className={` btn px-4 btn-secondary btn-center`}
                      id="dropdown-basic"
                    >
                      <i className="fa-solid fa-pen"></i>
                    </Button>
                  </td>
                </tr>
                <tr>
                  <td className="text-start">MEDICINA GENERAL</td>
                  <td className="text-start">123</td>
                  <td className="text-start">10 Feb 2021</td>
                  <td className="text-end">
                    <Button
                      onClick={() => {
                        props.onHide();
                        handleOpen();
                      }}
                      className={` btn px-4 btn-secondary btn-center`}
                      id="dropdown-basic"
                    >
                      <i className="fa-solid fa-pen"></i>
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={props.onHide}
            className="footer-btn btn btn-secondary"
          >
            Cancelar
          </Button>
          <Button
            variant="primary"
            type="submit"
            onClick={() => {
              props.onHide();
              success();
            }}
            className="footer-btn btn btn-primary"
          >
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>
      <EspecialidadModal show={open} handleClose={handleCloses} />
    </>
  );
};

export default VeterinaModal;
