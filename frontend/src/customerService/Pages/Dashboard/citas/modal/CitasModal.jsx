import React, { useEffect, useState } from "react";
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
} from "../../../../../services/ApiServices";
import moment from "moment";
function CitasModal({ show, handleClose, id }) {
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
  const owners = useGetOwnersListQuery(null, { refetchOnMountOrArgChange: true });
  const pets = useGetPetByOwnerQuery(formData.ownerId, { refetchOnMountOrArgChange: true });
  const veterinarians = useGetVeterinariansQuery(null, { refetchOnMountOrArgChange: true });
  const citasDetail = useGetSingleAppointmentQuery(id, { refetchOnMountOrArgChange: true });
  const [addCitas, response] = useAddAppoinmentMutation();
  const [updateCitas, response2] = useUpdateAppointmentMutation();

  useEffect(() => {
    if (id !== undefined && !citasDetail.isLoading && citasDetail.data?.appointment[0]) {
      const { owner, ownerId, pet, petId, veterinarian, veterinarianId, date, scheduleStart, scheduleEnd, observation } =
        citasDetail?.data?.appointment[0];
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
    } else if (id === undefined) {
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
    }
  }, [citasDetail, id]);

  useEffect(() => {
    // Reset petId when ownerId changes
    setFormData((prevFormData) => ({ ...prevFormData, petId: "" }));
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

  const handleSubmit = async () => {
    if (id !== undefined) {
      const body = {
        id,
        ...formData,
      };
      updateCitas(body);
    } else {
      console.log(formData);
      addCitas(formData);
    }
  };
  useEffect(() => {
    if ((id !== undefined && response2.isSuccess) || (id === undefined && response.isSuccess)) {
      handleClose();
      success();
      setFormData({
        name: "",
        owner: "",
        ownerId: "",
        sex: "",
        dob: "",
        Species: "",
        breed: "",
        hair: "",
        color: "",
      });
    } else if ((id !== undefined && response2.isError) || (id === undefined && response.isError)) {
      failer(response?.error?.data?.message || response2?.error?.data?.message);
      console.error("Error occured: ", response?.error || response2?.error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response, response2, id]);

  return (
    <Modal size="lg" show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Información de cita</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Propietario</Form.Label>
                <Form.Select aria-label="Default select example" name="owner" onChange={handleOwnerChange} value={formData.ownerId}>
                  <option>Seleccione Propietario</option>
                  {owners?.data?.ownersList.map((owner) => (
                    <option key={owner.id} value={owner.id}>
                      {owner.name + " " + owner.surname}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Mascota</Form.Label>
                <Form.Select aria-label="Default select example" name="pet" onChange={handlePetChange} value={formData.petId}>
                  <option>Seleccione Mascota</option>
                  {pets?.data?.pets.map((pet) => (
                    <option key={pet.id} value={pet.id}>
                      {pet.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Veterinario</Form.Label>
                <Form.Select aria-label="Default select example" name="veterinarian" onChange={handleVetChange} value={formData.veterinarianId}>
                  <option>Seleccione Veterinario</option>
                  {veterinarians?.data?.veterinarianList.map((vet) => (
                    <option key={vet.id} value={vet.id}>
                      {vet.name + " " + vet.surname}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col lg={8}>
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Fecha</Form.Label>
                    <Form.Control
                      type="date"
                      placeholder="DD/MM/AAAA"
                      value={formData.date ? moment(formData.date).format("YYYY-MM-DD") : ""}
                      name="date"
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Horario - inicio</Form.Label>
                    <Form.Control type="time" placeholder="HH:MM" value={formData.scheduleStart} name="scheduleStart" onChange={handleChange} />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Horario - fin</Form.Label>
                    <Form.Control type="time" placeholder="HH:MM" value={formData.scheduleEnd} name="scheduleEnd" onChange={handleChange} />
                  </Form.Group>
                </Col>
              </Row>
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
        <Button
          variant="secondary"
          onClick={() => {
            handleClose();
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
          }}
        >
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Guardar Cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CitasModal;
