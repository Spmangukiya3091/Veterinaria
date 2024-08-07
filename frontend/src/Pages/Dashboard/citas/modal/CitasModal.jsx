import React, { useState, useEffect } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import "./citasModal.scss";
import { failer, success } from "../../../../Components/alert/success";
import {
  useAddAppoinmentMutation,
  useGetOwnersListQuery,
  useGetPetByOwnerQuery,
  useGetSingleAppointmentQuery,
  useGetVeterinariansQuery,
  useUpdateAppointmentMutation,
} from "../../../../services/ApiServices";
import moment from "moment";

const CitasModal = ({ id, show, handleClose }) => {
  const [formData, setFormData] = useState({
    owner: "",
    ownerId: "",
    pet: "",
    petId: "",
    veterinarian: "",
    veterinarianId: "",
    date: "",
    scheduleStart: "",
    scheduleEnd: "",
    observation: "",
  });

  const owners = useGetOwnersListQuery({ refetchOnMountOrArgChange: true });
  const pets = useGetPetByOwnerQuery(formData?.ownerId, { refetchOnMountOrArgChange: true, skip: formData.ownerId === "" });
  const veterinarians = useGetVeterinariansQuery({ refetchOnMountOrArgChange: true });
  const citasDetail = useGetSingleAppointmentQuery(id, { refetchOnMountOrArgChange: true, skip: !id });
  const [addCitas, response] = useAddAppoinmentMutation();
  const [updateCitas, response2] = useUpdateAppointmentMutation();
  const [validated, setValidated] = useState(false); // State for form validation

  useEffect(() => {
    if (id && !citasDetail.isLoading && citasDetail.data?.appointments[0]) {
      const { owner, ownerId, pet, petId, veterinarian, veterinarianId, date, scheduleStart, scheduleEnd, observation } = citasDetail.data.appointments[0];
      setFormData({
        owner,
        ownerId,
        pet,
        petId,
        veterinarian,
        veterinarianId,
        date,
        scheduleStart,
        scheduleEnd,
        observation,
      });
    } else if (!id) {
      clearForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, citasDetail, show]);

  const clearForm = () => {
    setFormData({
      owner: "",
      ownerId: "",
      pet: "",
      petId: "",
      veterinarian: "",
      veterinarianId: "",
      date: "",
      scheduleStart: "",
      scheduleEnd: "",
      observation: "",
    });
    setValidated(false); // Reset validated state
  };

  useEffect(() => {
    // Reset petId when ownerId changes, but preserve if petId is already set
    if (formData.ownerId && !formData.petId) {
      setFormData((prevFormData) => ({ ...prevFormData, petId: "", pet: "" }));
    }
  }, [formData.ownerId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleOwnerChange = (e) => {
    const ownerId = e.target.value;
    const owner = e.target.options[e.target.selectedIndex].text;
    setFormData({
      ...formData,
      owner,
      ownerId,
      petId: "",
      pet: "",
    });
  };

  const handlePetChange = (e) => {
    const pet = e.target.options[e.target.selectedIndex].text;
    const petId = e.target.value;
    setFormData({
      ...formData,
      pet,
      petId,
    });
  };

  const handleVetChange = (e) => {
    const veterinarianId = e.target.value;
    const veterinarian = e.target.options[e.target.selectedIndex].text;
    setFormData({
      ...formData,
      veterinarianId,
      veterinarian,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    setValidated(true); // Set validated to true only when the submit button is clicked
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      if (id) {
        const body = {
          id,
          ...formData,
        };
        await updateCitas(body);
      } else {
        await addCitas(formData);
      }
    }
  };

  useEffect(() => {
    if (id) {
      if (!response2.isLoading && response2.isSuccess) {
        clearForm();
        handleClose();
        success();
      } else if (response2.isError && response2.status === "rejected" && response2?.error?.status !== 400) {
        failer(response2?.error?.data?.message);
      }
    } else {
      if (!response.isLoading && response.isSuccess) {
        clearForm();
        handleClose();
        success();
      } else if (response.isError && response.status === "rejected" && response?.error?.status !== 400) {
        failer(response?.error?.data?.message);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response, response2]);

  return (
    <Modal size="lg" show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Información de cita</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit} autoComplete="new-password">
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Propietario</Form.Label>
                <Form.Select name="owner" onChange={handleOwnerChange} value={formData.ownerId} required>
                  <option value={""} disabled>
                    Seleccione Propietario
                  </option>
                  {owners?.data?.ownersList.map((owner) => (
                    <option key={owner.id} value={owner.id}>
                      {owner.name + " " + owner.surname}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  Por favor seleccione propietario
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Mascota</Form.Label>
                <Form.Select name="pet" onChange={handlePetChange} value={formData.petId} required>
                  <option value={""} disabled>
                    Seleccione Mascota
                  </option>
                  {pets?.data?.pets.map((pet) => (
                    <option key={pet.id} value={pet.id}>
                      {pet.name}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  Por favor seleccione mascota
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Veterinario</Form.Label>
                <Form.Select aria-label="Default select example" name="veterinarian" onChange={handleVetChange} value={formData.veterinarianId} required>
                  <option value={""} disabled>
                    Seleccione Veterinario
                  </option>
                  {veterinarians?.data?.veterinarianList.map((vet) => (
                    <option key={vet.id} value={vet.id}>
                      {vet.name + " " + vet.surname}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  Por favor seleccione veterinario
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Fecha</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="DD/MM/AAAA"
                  value={formData.date ? moment(formData.date).format("YYYY-MM-DD") : ""}
                  name="date"
                  onChange={handleChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Por favor seleccione Fecha
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Horario - inicio</Form.Label>
                <Form.Control type="time" placeholder="HH:MM" value={formData.scheduleStart} name="scheduleStart" onChange={handleChange} required />
                <Form.Control.Feedback type="invalid">
                  Por favor seleccione Horario - inicio
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Horario - fin</Form.Label>
                <Form.Control type="time" placeholder="HH:MM" value={formData.scheduleEnd} name="scheduleEnd" onChange={handleChange} required />
                <Form.Control.Feedback type="invalid">
                  Por favor seleccione Horario - fin
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Observaciones de cita</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Observaciones de cita"
                  name="observation"
                  onChange={handleChange}
                  value={formData.observation}
                  style={{ height: "100px" }}
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => { handleClose(); clearForm() }} className="footer-btn btn btn-secondary">
          Cancelar
        </Button>
        <Button
          variant="primary"
          type="submit"
          className="footer-btn btn btn-primary"
          onClick={handleSubmit}
          disabled={response.isLoading || response2.isLoading}
        >
          Guardar Cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CitasModal;
