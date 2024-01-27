import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { failer, success } from "../../../../Components/alert/success";
import { useAddCategoryMutation, useGetSingleCategoryQuery, useUpdateCategoryMutation } from "../../../../../services/ApiServices";

function InformacionModal({ show, handleClose, id }) {
  const [formData, setFormData] = useState({
    category: "",
  });

  const { data: categoryData } = useGetSingleCategoryQuery(id, { refetchOnMountOrArgChange: true });
  const [addCategory, response] = useAddCategoryMutation();
  const [updateCategory, response2] = useUpdateCategoryMutation();

  // Update form data when categoryData changes (fetch completed)
  useEffect(() => {
    if (categoryData) {
      setFormData({
        category: categoryData?.category[0]?.category, // Assuming categoryData has the appropriate structure
      });
    }
  }, [categoryData]);
  const handleSaveChanges = () => {
    if (id) {
      // If id is provided, it's an update
      updateCategory({ id, ...formData });
    } else {
      // If id is not provided, it's a create
      addCategory(formData);
    }
  };

  useEffect(() => {
    if (id) {
      if (!response2.isLoading && response2.status === "fulfilled") {
        handleClose();
        setFormData({
          category: "",
        });
        success("Category updated successfully!");
      } else if (response2.isError && response2.status === "rejected") {
        failer(response2?.error?.data?.message);
      }
    } else {
      if (!response.isLoading && response.status === "fulfilled") {
        handleClose();
        setFormData({
          category: "",
        });
        success("Category updated successfully!");
      } else if (response.isError && response.status === "rejected") {
        failer(response?.error?.data?.message);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response, response2]);

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
              placeholder="Categoría"
              name="category"
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              value={formData.category}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" className="footer-btn btn btn-secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" className="footer-btn btn btn-primary" onClick={handleSaveChanges}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default InformacionModal;
