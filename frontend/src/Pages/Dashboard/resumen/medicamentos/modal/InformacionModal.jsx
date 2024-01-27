import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { success } from "../../../../../Components/alert/success";
import { useAddCategoryMutation, useUpdateCategoryMutation } from "../../../../../services/ApiServices";

function InformacionModal({ show, handleClose, id }) {
  const [formData, setFormData] = useState({ category: "" });
  const [addCategory] = useAddCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();

  const handleSubmit = () => {
    if (id !== undefined) {
      const body = {
        id: id,
        category: formData.category,
      };
      updateCategory(body);
      handleClose();
      success();
    } else {
      addCategory(formData);
      handleClose();
      success();
    }
  };
  return (
    <div>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Información de Categoría</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3 w-100" controlId="formBasicSelect">
            <Form.Label>Categoría</Form.Label>
            <Form.Control
              aria-label="Default"
              value={formData.category}
              placeholder="Categoría"
              onChange={(e) => {
                setFormData({ ...formData, category: e.target.value });
              }}
              required
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" className="footer-btn btn btn-secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button
            variant="primary"
            className="footer-btn btn btn-primary"
            onClick={() => {
              handleSubmit();
            }}
          >
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default InformacionModal;
