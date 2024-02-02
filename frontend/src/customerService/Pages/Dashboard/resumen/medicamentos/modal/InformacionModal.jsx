import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { failer, success } from "../../../../../Components/alert/success";
import { useAddCategoryMutation, useGetSingleCategoryQuery, useUpdateCategoryMutation } from "../../../../../../services/ApiServices";

function InformacionModal({ show, handleClose, id, filter }) {
  const [formData, setFormData] = useState({ category: "" });
  const [addCategory, response] = useAddCategoryMutation();
  const [updateCategory, response2] = useUpdateCategoryMutation();
  const singleCategory = useGetSingleCategoryQuery(id, { refetchOnMountOrArgChange: true });

  useEffect(() => {
    if (id !== undefined && !singleCategory.isLoading) {
      setFormData({ category: singleCategory?.data?.category[0]?.category });
    }
  }, [singleCategory, id]);

  const handleSubmit = () => {
    if (id !== undefined) {
      const body = {
        id: id,
        category: formData.category,
      };
      updateCategory(body);
    } else {
      addCategory(formData);
    }
  };

  useEffect(() => {
    if (id !== undefined) {
      if (!response2.isLoading && response2.isSuccess) {
        setFormData({
          category: "",
        });
        handleClose();
        success();
        filter.refetch();
      } else if (response2.isError) {
        failer(response2?.error?.data?.message);
        console.log("error");
      }
    } else {
      if (!response.isLoading && response.isSuccess) {
        setFormData({
          category: "",
        });
        handleClose();
        success();
        filter.refetch();
      } else if (response.isError) {
        failer(response?.error?.data?.message);
        console.log("error");
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
