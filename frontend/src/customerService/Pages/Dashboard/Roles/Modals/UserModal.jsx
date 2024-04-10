import React, { useRef, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import "./modal.scss";
import { success } from "../../../../Components/alert/success";
const UserModal = (props) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleUploadButtonClick = () => {
    // Trigger a click on the hidden file input field
    fileInputRef.current.click();
  };

  return (
    <>
      {" "}
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Información de usuario
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col>
                {/* <Form.Group className="mb-3" controlId="formBasicSelect">
                                <div className='d-flex gap-10'>
                                    <div className='image mx-4'>
                                        <img className="round-image" src={selectedImage || "../images/Elipse3.png"} alt="" />
                                    </div>
                                    <div className="form-field">
                                        <p className="mb-5">Adjunta una foto de perfil para completar datos adicionales.</p>
                                        <Form.Control type='file' onChange={handleImageChange} />
                                    </div>
                                </div>
                            </Form.Group> */}
                <Form.Group className="mb-3" controlId="formBasicSelect">
                  <div className="d-flex gap-10">
                    <div className="image mx-4">
                      {/* Display the selected image or a default placeholder */}
                      <img
                        className="round-image"
                        src={
                          selectedFile
                            ? URL.createObjectURL(selectedFile)
                            : "../images/Elipse3.png"
                        }
                        alt=""
                      />
                    </div>
                    <div className="form-field">
                      <Form.Control
                        type="file"
                        onChange={(e) => {
                          handleImageChange(e);
                        }}
                        ref={fileInputRef}
                        style={{ display: "none" }} // Hide the file input
                      />
                      <div className="info">
                        <p>
                          Adjunta una foto de perfil para completar datos
                          adicionales.
                        </p>
                        {selectedFile && (
                          <p className="mt-3 filename">
                            {selectedFile !== null
                              ? selectedFile.name
                              : "no file found"}
                          </p>
                        )}
                      </div>
                      <Button onClick={handleUploadButtonClick}>
                        Adjuntar
                      </Button>
                    </div>
                  </div>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicDate">
                  <Form.Label>Nombre completo</Form.Label>
                  <Form.Control type="text" placeholder="Apellidos y Nombres" />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Tipo de usuario</Form.Label>
                  <Form.Select aria-label="Default select example">
                    <option disabled="true" value={""} selected="true">Tipo de usuario</option>
                    <option value="Administrador Estandar">
                      Administrador Estandar
                    </option>
                    <option value="Servicio al Cliente">
                      Servicio al Cliente
                    </option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicSelect">
                  <Form.Label>Correo electrónico</Form.Label>
                  <Form.Control
                    aria-label="Default"
                    placeholder="Correo electrónico"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicSelect">
                  <Form.Label>Doc. de Identificación</Form.Label>
                  <Form.Control
                    aria-label="Default "
                    placeholder="Doc. de Identificación"
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicSelect">
                  <Form.Label>Nro. de Teléfono</Form.Label>
                  <Form.Control
                    aria-label="Default"
                    placeholder="Nro. de Teléfono"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicSelect">
                  <Form.Label>Crear contraseña</Form.Label>
                  <Form.Control
                    aria-label="Default"
                    placeholder="Crear contraseña"
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicSelect">
                  <Form.Label>Confirmar contraseña</Form.Label>
                  <Form.Control
                    aria-label="Default"
                    placeholder="Confirmar contraseña"
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
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
    </>
  );
};

export default UserModal;
