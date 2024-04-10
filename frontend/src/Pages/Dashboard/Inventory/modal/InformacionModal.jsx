import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { failer, success } from "../../../../Components/alert/success";
import { useAddCategoryMutation, useGetSingleCategoryQuery, useUpdateCategoryMutation } from "../../../../services/ApiServices";

const CategoryInput = ({ formData, setFormData, label, name, error }) => {
  return (
    <Form.Group className="mb-3 w-100" controlId={`formBasic${name}`}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        aria-label="Default"
        placeholder={label}
        name={name}
        onChange={(e) => setFormData({ ...formData, [name]: e.target.value })}
        value={formData[name]}
        isInvalid={error}
      />
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
    </Form.Group>
  );
};

function InformacionModal({ show, handleClose, id }) {
  const [formData, setFormData] = useState({
    category: "",
  });

  const [categoryError, setCategoryError] = useState("");

  const { data: categoryData } = useGetSingleCategoryQuery(id, { refetchOnMountOrArgChange: true });
  const [addCategory, response2] = useAddCategoryMutation();
  const [updateCategory, response] = useUpdateCategoryMutation();

  useEffect(() => {
    if (categoryData) {
      setFormData({
        category: categoryData?.category[0]?.category,
      });
    }
  }, [categoryData]);

  const handleSaveChanges = () => {
    if (formData.category.trim().length === 0) {
      setCategoryError("Category is required.");
      return;
    }
    setCategoryError("");

    if (id) {
      updateCategory({ id, ...formData });
    } else {
      addCategory(formData);
    }
  };

  useEffect(() => {
    if (response.isSuccess || response2.isSuccess) {
      handleClose();
      setFormData({
        category: "",
      });
      success("Category updated successfully!");
    } else if (response.isError || response2.isError) {
      failer(response?.error?.data?.message || response2?.error?.data?.message);
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
          <CategoryInput formData={formData} setFormData={setFormData} label="Categoría" name="category" error={categoryError} />
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
