import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { failer, success } from "../../../../Components/alert/success";
import { useAddVaccineMutation, useGetSingleVaccineQuery, useUpdateVaccineMutation } from "../../../../services/ApiServices";

const VacunasModal = ({ id, onHide, filter, show }) => {
  const [formData, setFormData] = useState({
    name: "",
    stock: "",
    validity: "",
  });
  const [addVaccine, response] = useAddVaccineMutation();
  const [updateVaccine, response2] = useUpdateVaccineMutation();
  const vaccineDetails = useGetSingleVaccineQuery(id !== undefined ? id : "", { refetchOnMountOrArgChange: true });

  useEffect(() => {
    if (!vaccineDetails.isLoading && id !== undefined) {
      const { name, stock, validity } = vaccineDetails?.data?.vaccine;
      setFormData({
        name: name,
        stock: stock,
        validity: validity,
      });
    }
  }, [id, vaccineDetails]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    if (id !== undefined) {
      // Update existing pet
      const body = { id: id, ...formData };
      await updateVaccine(body);
    } else {
      await addVaccine(formData);
    }
  };

  useEffect(() => {
    if ((id !== undefined && response2.isSuccess) || (id === undefined && response.isSuccess)) {
      setFormData({
        name: "",
        stock: "",
        validity: "",
      });
      filter.refetch();
      onHide();
      success();
    } else if ((id !== undefined && response2.isError) || (id === undefined && response.isError)) {
      failer(response?.error?.data?.message || response2?.error?.data?.message);
      console.error("Error occured: ", response?.error || response2?.error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response, response2, id]);
  return (
    <>
      <Modal show={show} onHide={onHide} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Información de Vacuna</Modal.Title>
        </Modal.Header>
        <Modal.Body className="px-9">
          <Form>
            <Form.Group className="mb-3" controlId="formBasicSelect">
              <Form.Label>Nombre (Tipo)</Form.Label>
              <Form.Control placeholder="Nombre (Tipo)" name="name" value={formData.name} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Stock</Form.Label>
              <Form.Control type="number" placeholder="Stock" name="stock" value={formData.stock} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Tiempo validez (Meses)</Form.Label>
              <Form.Control type="number" placeholder="Tiempo validez (Meses)" name="validity" value={formData.validity} onChange={handleChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide} className="footer-btn btn btn-secondary">
            Cancelar
          </Button>
          <Button
            variant="primary"
            type="submit"
            onClick={() => {
              handleSubmit();
            }}
            className="footer-btn btn btn-primary"
          >
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default VacunasModal;
