import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { failer, success } from "../../../../Components/alert/success";
import { useAddVaccineMutation, useGetSingleVaccineQuery } from "../../../../../services/ApiServices";

const VacunasModal = (props) => {
  const [formData, setFormData] = useState({
    name: "",
    stock: "",
    validity: "",
  });
  const [addVaccine, response] = useAddVaccineMutation();
  const vaccineDetails = useGetSingleVaccineQuery(props.id !== undefined ? props.id : "", { refetchOnMountOrArgChange: true });

  useEffect(() => {
    if (!vaccineDetails.isLoading && props.id !== undefined) {
      const { name, stock, validity } = vaccineDetails?.data?.vaccine;
      setFormData({
        name: name,
        stock: stock,
        validity: validity,
      });
    }
  }, [props.id, vaccineDetails, props.show]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    await addVaccine(formData);
    // console.log(response);
  };

  useEffect(() => {
    if (!response.isLoading && response.isSuccess) {
      setFormData({
        name: "",
        stock: "",
        validity: "",
      });
      props.onHide();
      success();
    } else if (response.isError && response.status === "rejected") {
      // console.log("error", response.error);
      failer(response?.error?.data?.message);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  return (
    <>
      <Modal show={props.show} onHide={props.onHide} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
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
              <Form.Control placeholder="Stock" name="stock" value={formData.stock} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Tiempo validez (Meses)</Form.Label>
              <Form.Control type="number" placeholder="Tiempo validez (Meses)" name="validity" value={formData.validity} onChange={handleChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide} className="footer-btn btn btn-secondary">
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
