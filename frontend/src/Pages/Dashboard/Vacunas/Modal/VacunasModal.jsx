import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { failer, success } from "../../../../Components/alert/success";
import { useAddVaccineMutation, useGetSingleVaccineQuery, useUpdateVaccineMutation } from "../../../../services/ApiServices";

const VacunasModal = ({ id, onHide, show }) => {
  const [formData, setFormData] = useState({
    name: "",
    stock: "",
    validity: "",
  });
  const [validated, setValidated] = useState(false); // State for form validation

  const [addVaccine, response] = useAddVaccineMutation();
  const [updateVaccine, response2] = useUpdateVaccineMutation();
  const vaccineDetails = useGetSingleVaccineQuery(id, { refetchOnMountOrArgChange: true, skip: id === undefined });

  useEffect(() => {
    if (!vaccineDetails.isLoading && id !== undefined) {
      const { name, stock, validity } = vaccineDetails?.data?.vaccine;
      setFormData({
        name: name,
        stock: stock,
        validity: validity,
      });
    } else {
      clearForm()
    }
  }, [id, show, vaccineDetails]);

  const clearForm = () => {
    setFormData({
      name: "",
      stock: "",
      validity: "",
    });
    setValidated(false); // Reset validated state
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    setValidated(true); // Set validated to true only when the submit button is clicked
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      if (id !== undefined) {
        // Update existing pet
        const body = { id: id, ...formData };
        await updateVaccine(body);
      } else {
        await addVaccine(formData);
      }
    }
  };

  useEffect(() => {
    if (id !== undefined) {
      if (!response2.isLoading && response2.status === "fulfilled") {
        clearForm()
        onHide();
        success();

      } else if (response2.isError && response2.status === "rejected" && response2?.error?.status !== 400) {
        // console.log(response2.error);
        failer(response2?.error?.data?.message);
      }
    } else {
      if (!response.isLoading && response.status === "fulfilled") {
        // console.log(response);
        clearForm()
        success();
        onHide();
      } else if (response.isError && response.status === "rejected" && response?.error?.status !== 400) {
        // console.log(response.error);
        failer(response?.error?.data?.message);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response, response2]);

  return (
    <>
      <Modal show={show} onHide={onHide} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Información de Vacuna</Modal.Title>
        </Modal.Header>
        <Modal.Body className="px-9">
          <Form noValidate validated={validated} onSubmit={handleSubmit} autoComplete="new-password">
            <Form.Group className="mb-3" controlId="formBasicSelect">
              <Form.Label>Nombre (Tipo)</Form.Label>
              <Form.Control placeholder="Nombre (Tipo)" name="name" value={formData.name} onChange={handleChange} required />
              <Form.Control.Feedback type="invalid">
                Por favor proporcione un Nombre.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Stock</Form.Label>
              <Form.Control type="number" placeholder="Stock" name="stock" value={formData.stock} onChange={handleChange} required />
              <Form.Control.Feedback type="invalid">
                Por favor proporcione un stock.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Tiempo validez (Meses)</Form.Label>
              <Form.Control type="number" placeholder="Tiempo validez (Meses)" name="validity" value={formData.validity} onChange={handleChange} required />
              <Form.Control.Feedback type="invalid">
                Por favor proporcione un Tiempo validez.
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => { onHide(); clearForm() }} className="footer-btn btn btn-secondary">
            Cancelar
          </Button>
          <Button
            variant="primary"
            type="submit"
            onClick={handleSubmit}
            className="footer-btn btn btn-primary"
          >
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal >
    </>
  );
};

export default VacunasModal;
