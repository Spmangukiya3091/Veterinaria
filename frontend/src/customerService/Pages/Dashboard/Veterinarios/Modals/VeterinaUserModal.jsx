import React, { useRef, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import "./modal.scss";
import { success } from "../../../../Components/alert/success";
const VeterinaUserModal = (props) => {
  //   const [selectedImage, setSelectedImage] = useState(null);

  //   // Function to handle the file input change and update the selected image
  //   const handleImageChange = (event) => {
  //     const file = event.target.files[0];
  //     if (file) {
  //       const imageUrl = URL.createObjectURL(file);
  //       setSelectedImage(imageUrl);
  //     }
  //   };
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
            Información de Doctor
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col>
                {/* <Form.Group className="mb-3" controlId="formBasicSelect">
                  <div className="d-flex gap-10">
                    <div className="image mx-4">
                
                      <img
                        className="round-image"
                        src={selectedImage || "../images/Elipse3.png"}
                        alt=""
                      />
                    </div>
                    <div className="form-field">
                      <p className="mb-5">
                        Adjunta una foto de perfil para completar datos
                        adicionales.
                      </p>
                      <Form.Control
                        type="file"
                        onChange={(e) => {
                          handleImageChange(e);
                        }}
                      />
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
                <Row className="flex-column">
                  <Col>
                    <Form.Group className="mb-3" controlId="formBasicDate">
                      <Form.Label>Nombres</Form.Label>
                      <Form.Control type="text" placeholder="Nombres" />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3" controlId="formBasicDate">
                      <Form.Label>Apellidos</Form.Label>
                      <Form.Control type="text" placeholder="Nombres" />
                    </Form.Group>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Especialidad</Form.Label>
                  <Form.Select aria-label="Default select example">
                    <option>Especialidad</option>
                    <option value="1">Administrador</option>
                    <option value="2">Atención</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col>
                <Row>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>F. de Nacimiento</Form.Label>
                      <Form.Control
                        type="date"
                        aria-label="Default"
                        className="text-gray-400"
                        placeholder="F. de Nacimiento"
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>Doc. Identidad</Form.Label>
                      <Form.Control
                        aria-label="Default"
                        placeholder="Doc. Identidad"
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Teléfono</Form.Label>
                  <Form.Control aria-label="Default " placeholder="Teléfono" />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
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
                <Form.Group className="mb-3">
                  <Form.Label>Sexo</Form.Label>
                  <Form.Select aria-label="Default select example">
                    <option>Sexo</option>
                    <option value="1">Administrador</option>
                    <option value="2">Atención</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Dirección</Form.Label>
                  <Form.Control aria-label="Default" placeholder="Dirección" />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Departamento</Form.Label>
                  <Form.Select aria-label="Default select example">
                    <option>Departamento</option>
                    <option value="1">Administrador</option>
                    <option value="2">Atención</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Distrito</Form.Label>
                  <Form.Select aria-label="Default select example">
                    <option>Distrito</option>
                    <option value="1">Administrador</option>
                    <option value="2">Atención</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Horario de trabajo</Form.Label>
                  <Row>
                    <Col>
                      <Form.Check
                        className="my-2"
                        type="checkbox"
                        label="Lunes"
                      />
                      <Form.Check
                        className="my-2"
                        type="checkbox"
                        label="Martes"
                      />
                      <Form.Check
                        className="my-2"
                        type="checkbox"
                        label="Miércoles"
                      />
                      <Form.Check
                        className="my-2"
                        type="checkbox"
                        label="Jueves"
                      />
                    </Col>
                    <Col>
                      <Form.Check
                        className="my-2"
                        type="checkbox"
                        label="Viernes"
                      />
                      <Form.Check
                        className="my-2"
                        type="checkbox"
                        label="Sábado"
                      />
                      <Form.Check
                        className="my-2"
                        type="checkbox"
                        label="Domingo"
                      />
                    </Col>
                  </Row>
                </Form.Group>
              </Col>
              <Col>
                <Row>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>Ingreso</Form.Label>
                      <Form.Control
                        type="time"
                        aria-label="Default"
                        placeholder="Ingreso"
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>Salida</Form.Label>
                      <Form.Control
                        type="time"
                        aria-label="Default"
                        placeholder="Salida"
                      />
                    </Form.Group>
                  </Col>
                </Row>
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

export default VeterinaUserModal;
