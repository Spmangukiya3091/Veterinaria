import React from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { success } from "../../../../../Components/alert/success";

function ActualizerModal({ show, handleClose }) {
  return (
    <div>
      <Modal show={show} size="lg" onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Actualizar Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md={6} lg={6}>
                <Form.Group className="mb-3 w-100" controlId="formBasicSelect">
                  <Form.Label>Stock</Form.Label>
                  <Form.Control aria-label="Default" placeholder="Stock" />
                </Form.Group>
              </Col>
              <Col md={6} lg={6}>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Estado</Form.Label>
                  <Form.Select aria-label="Default select example">
                    <option disabled="true" value={""} selected="true">Estado</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Motivo de Actualización</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Motivo de Actualización"
                  style={{ height: "100px" }}
                />
              </Form.Group>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {" "}
            Cancelar{" "}
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleClose();
              success();
            }}
          >
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ActualizerModal;
