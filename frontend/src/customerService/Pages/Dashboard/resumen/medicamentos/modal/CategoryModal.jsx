import React from "react";
import { Button, Modal } from "react-bootstrap";
import "./category.scss";
import { useState } from "react";
import InformacionModal from "./InformacionModal";
import { Link } from "react-router-dom";
function CategoryModal({ show, handleClose }) {
  const [open, setOpen] = useState(false);

  const handleCloses = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  return (
    <div>
      <Modal
        className="category-modal"
        show={show}
        onHide={handleClose}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Categorías de Productos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modal-top-container">
            <Button
              onClick={() => {
                handleOpen();
                handleClose();
              }}
              className="new-btn"
            >
              + Crear categoría
            </Button>
          </div>
          <div className="modal-bottom-container">
            <div className="calendar-card-wrapper-medicamentos">
              <table>
                <thead>
                  <tr>
                    <th>CATEGORÍA</th>
                    <th>PRODUCTOS</th>
                    <th>F. DE CREACIÓN</th>
                    <th>OPCIONES</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>BIENESTAR</td>
                    <td>123</td>
                    <td>10 Feb 2021</td>
                    <td>
                      <Link
                        onClick={() => {
                          handleOpen();
                          handleClose();
                        }}
                        to="#"
                        className="btn btn-bg-light btn-active-color-primary btn-sm"
                      >
                        <i className="fa-solid fa-pen"></i>
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td>BIENESTAR</td>
                    <td>123</td>
                    <td>10 Feb 2021</td>
                    <td>
                      <Link
                        onClick={() => {
                          handleOpen();
                          handleClose();
                        }}
                        to="#"
                        className="btn btn-bg-light btn-active-color-primary btn-sm"
                      >
                        <i className="fa-solid fa-pen"></i>
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td>BIENESTAR</td>
                    <td>123</td>
                    <td>10 Feb 2021</td>
                    <td>
                      <Link
                        onClick={() => {
                          handleOpen();
                          handleClose();
                        }}
                        to="#"
                        className="btn btn-bg-light btn-active-color-primary btn-sm"
                      >
                        <i className="fa-solid fa-pen"></i>
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td>BIENESTAR</td>
                    <td>123</td>
                    <td>10 Feb 2021</td>
                    <td>
                      <Link
                        onClick={() => {
                          handleOpen();
                          handleClose();
                        }}
                        to="#"
                        className="btn btn-bg-light btn-active-color-primary btn-sm"
                      >
                        <i className="fa-solid fa-pen"></i>
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <InformacionModal show={open} handleClose={handleCloses} />
    </div>
  );
}

export default CategoryModal;
