import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { failer, success } from "../../../../Components/alert/success";
import { useUpdateStockMutation } from "../../../../../services/ApiServices";
function ActualizerModal({ show, handleClose, id, status }) {
  const [formData, setFormData] = useState({
    stock: 0,
    reason: "",
  });
  const [validated, setValidated] = useState(false); // State for form validation

  const [updateStock, response] = useUpdateStockMutation();

  useEffect(() => {

    clearForm()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  const clearForm = () => {
    setFormData({
      stock: 0,
      reason: "",
    });
    setValidated(false); // Reset validated state
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "stock" ? parseInt(value, 10) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    setValidated(true); // Set validated to true only when the submit button is clicked
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      const body = {
        id,
        ...formData,
      };
      await updateStock(body);
    }
  };

  useEffect(() => {
    if (!response.isLoading && response.status === "fulfilled") {
      // console.log(response);
      clearForm()
      success();
      handleClose();
    } else if (response.isError && response.status === "rejected" && response?.error?.status !== 400) {
      // console.log(response.error);
      failer(response?.error?.data?.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);
  return (
    <div>
      <Modal show={show} size="md" onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Actualizar Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit} autoComplete="new-password">
            <Row>
              <Col md={6} lg={6}>
                <Form.Group className="mb-3 w-100">
                  <Form.Label>Stock</Form.Label>
                  <Form.Control type="number" aria-label="Default" placeholder="Stock" name="stock" value={formData.stock} onChange={handleChange} required />
                  <Form.Control.Feedback type="invalid">
                    Por favor proporcione un Stock.
                  </Form.Control.Feedback>
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
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Por favor proporcione un Motivo de Actualización.
                </Form.Control.Feedback>
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
