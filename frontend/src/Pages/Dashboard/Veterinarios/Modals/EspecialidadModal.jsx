/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { success } from "../../../../Components/alert/success";
import { useAddSpecialityMutation, useEditSpecialtyMutation, useGetSingleSpecialityQuery } from "../../../../services/ApiServices";

function EspecialidadModal({ show, handleClose, id }) {
  const [formData, setFormData] = useState({
    speciality: "",
  });

  const [addSpeciality] = useAddSpecialityMutation();
  const [updateSpeciality] = useEditSpecialtyMutation();

  const {
    data: singleSpecialty,
    isLoading,
    isError,
  } = useGetSingleSpecialityQuery(id, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (id !== undefined && singleSpecialty && singleSpecialty.speciality.length > 0) {
      // Set form data with fetched specialty when id is not undefined and data is available
      setFormData({ speciality: singleSpecialty.speciality[0].speciality });
    }
  }, [id, singleSpecialty]);

  const handleSubmit = async () => {
    try {
      if (id !== undefined) {
        if (isLoading) {
          console.log("Fetching data...");
          return;
        }

        if (isError) {
          console.error("Error fetching data:", singleSpecialty.error);
          return;
        }

        const body = {
          id,
          speciality: formData.speciality,
        };

        // Update the specialty
        const updateResult = await updateSpeciality(body);

        if (updateResult.error) {
          console.error("Error updating specialty:", updateResult.error);
          //   error("Error updating specialty.");
        } else {
          // Reset form and close modal on success
          setFormData({ speciality: "" });
          handleClose();
          success("Specialty updated successfully!");
        }
      } else {
        // Add new specialty logic
        const addResult = await addSpeciality(formData);

        if (addResult.error) {
          console.error("Error adding specialty:", addResult.error);
          //   error("Error adding specialty.");
        } else {
          // Reset form and close modal on success
          setFormData({ speciality: "" });
          handleClose();
          success("Specialty added successfully!");
        }
      }
    } catch (error) {
      // Handle general error
      console.error("Error occurred:", error);
      error("An unexpected error occurred.");
    }
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Información de Especialidad</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3 w-100" controlId="formBasicSelect">
              <Form.Label>Especialidad</Form.Label>
              <Form.Control
                aria-label="Default"
                value={formData.speciality}
                onChange={(e) => setFormData({ ...formData, speciality: e.target.value })}
                placeholder="Especialidad"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" className="footer-btn btn btn-secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" className="footer-btn btn btn-primary" onClick={handleSubmit}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EspecialidadModal;
