import React from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { success } from "../../../../../Components/alert/success";
import { useState } from "react";

function InventoryModal(props) {
  const [price, setPrice] = useState(0);

  const handlePriceChange = (e) => {
    const enteredValue = e.target.value;

    // Ensure the entered value is a valid number
    if (!isNaN(enteredValue)) {
      // Convert the input string to a floating-point number with two decimal places
      const formattedPrice = parseFloat(enteredValue).toFixed(2);
      setPrice(formattedPrice);
    }
  };
  return (
    <div>
      <Modal size="lg" {...props} centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Información de Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicSelect">
                  <Form.Label>Producto</Form.Label>
                  <Form.Control aria-label="Default" placeholder="Producto" />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Categoría</Form.Label>
                  <Form.Select aria-label="Default select example">
                    <option disabled="true" value={""} selected="true">Categoría</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Marca</Form.Label>
                  <Form.Control type="text" placeholder="Marca" />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicDate">
                  <Form.Label>Composición</Form.Label>
                  <Form.Control type="text" placeholder="Composición" />
                </Form.Group>
              </Col>
              <Col>
                <Row>
                  <Col>
                    <Form.Group className="mb-3" controlId="formBasicSelect">
                      <Form.Label>Stock</Form.Label>
                      <Form.Control aria-label="Default " placeholder="Stock" />
                    </Form.Group>
                  </Col>
                  <Col>
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
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicSelect">
                  <Form.Label>SKU</Form.Label>
                  <Form.Control aria-label="Default " placeholder="SKU" />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicSelect">
                  <Form.Label>Laboratorio</Form.Label>
                  <Form.Control aria-label="Default" placeholder="Laboratorio" />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicSelect">
                  <Form.Label>PRESENTACIÓN</Form.Label>
                  <Form.Control type="text" aria-label="Default " placeholder="PRESENTACIÓN" />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicSelect">
                  <Form.Label>PRECIO</Form.Label>
                  <Form.Control
                    type="number"
                    id="price"
                    name="price"
                    value={price === 0 ? "0.00" : price} // Show 0.00 if price is 0, otherwise show the formatted price
                    onChange={handlePriceChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Descripción</Form.Label>
                  <Form.Control as="textarea" placeholder="Descripción" style={{ height: "100px" }} />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => { props.onHide();  }} className="footer-btn btn btn-secondary">
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
    </div>
  );
}

export default InventoryModal;
