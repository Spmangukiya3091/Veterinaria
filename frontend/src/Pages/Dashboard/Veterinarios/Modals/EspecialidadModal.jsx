/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { failer, success } from "../../../../Components/alert/success";
import { useAddSpecialityMutation, useEditSpecialtyMutation, useGetSingleSpecialityQuery } from "../../../../services/ApiServices";

function EspecialidadModal({ show, handleClose, id, filter }) {
  const [formData, setFormData] = useState({
    speciality: "",
  });

  const [addSpeciality, response] = useAddSpecialityMutation();
  const [updateSpeciality, response2] = useEditSpecialtyMutation();

  const singleSpecialty = useGetSingleSpecialityQuery(id, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (id !== undefined && !singleSpecialty.isLoading) {
      
      setFormData({ speciality: singleSpecialty?.data?.speciality?.speciality });
    }
  }, [id, singleSpecialty]);

  const handleSubmit = async () => {
    if (id !== undefined) {
      const body = {
        id,
        speciality: formData.speciality,
      };
      // Update the specialty
      await updateSpeciality(body);
    } else {
      // Add new specialty logic
      await addSpeciality(formData);
    }
  };
  useEffect(() => {
    if (id !== undefined) {
      if (!response2.isLoading && response2.isSuccess) {
        setFormData({
          speciality: "",
        });
        handleClose();
        filter.refetch();
        success();
      } else if (response2.isError) {
        failer(response2?.error?.data?.message);
        console.log("error");
      }
    } else {
      if (!response.isLoading && response.isSuccess) {
        setFormData({
          speciality: "",
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
