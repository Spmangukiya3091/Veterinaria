import React, { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { success } from "../../../../Components/alert/success";
import { useUpdateStockMutation } from "../../../../services/ApiServices";

function ActualizerModal({ show, handleClose, id, status }) {
  const [formData, setFormData] = useState({
    stock: 0,
    reason: "",
  });

  const [updateStock, { isLoading, data, error }] = useUpdateStockMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "stock" ? parseInt(value, 10) : value,
    });
  };

  const handleSubmit = async () => {
    const body = {
      id,
      ...formData,
    };

    try {
      await updateStock(body);

      if (!isLoading) {
        // console.log(data); // Access the updated data
        success("Stock updated successfully!");
        handleClose();
      } else {
        console.error(error); // Handle error appropriately
      }
    } catch (error) {
      console.error("Error updating stock:", error);
      // Handle error if needed
    }
  };

  return (
    <div>
      <Modal show={show} size="md" onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Actualizar Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md={6} lg={6}>
                <Form.Group className="mb-3 w-100">
                  <Form.Label>Stock</Form.Label>
                  <Form.Control type="number" aria-label="Default" placeholder="Stock" name="stock" value={formData.stock} onChange={handleChange} />
                </Form.Group>
              </Col>
              <Col md={6} lg={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Estado</Form.Label>
                  <Form.Select value={status} disabled>
                    <option value="active">Activo</option>
                    <option value="inactive">Inactivo</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Form.Group className="mb-3">
                <Form.Label>Motivo de Actualización</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Motivo de Actualización"
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  style={{ height: "100px" }}
                />
              </Form.Group>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ActualizerModal;
