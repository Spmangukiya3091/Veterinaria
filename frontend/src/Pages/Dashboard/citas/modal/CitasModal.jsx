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

function CitasModal({ show, handleClose, id, filter }) {
  console.log(id)
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
  const pets = useGetPetByOwnerQuery(formData?.ownerId, { refetchOnMountOrArgChange: true });
  const veterinarians = useGetVeterinariansQuery(null, { refetchOnMountOrArgChange: true });
  const citasDetail = useGetSingleAppointmentQuery(id, { refetchOnMountOrArgChange: true });
  const [addCitas, response] = useAddAppoinmentMutation();
  const [updateCitas, response2] = useUpdateAppointmentMutation();
  console.log(citasDetail?.data)
  useEffect(() => {
    if (id !== undefined && id !== "" && !citasDetail.isLoading && citasDetail.data?.appointment) {
      const { owner, ownerId, pet, petId, veterinarian, veterinarianId, date, scheduleStart, scheduleEnd, observation } =
        citasDetail?.data?.appointment;
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
    } else if (id === undefined || id === "") {
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
  }, [citasDetail, id, show]);

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
      petId: ""
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
    } else if (id === undefined) {
      addCitas(formData);
    }
  };
  useEffect(() => {
    if (id !== undefined && id !== " ") {
      if (!response2.isLoading && response2.isSuccess) {
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
        filter.refetch();
        handleClose();
        success();
      } else if (response2.isError && response2.status === "rejected") {
        failer(response2?.error?.data?.message);
      }
    } else if (id === undefined || id === " ") {
      if (!response.isLoading && response.isSuccess) {
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
        filter.refetch();
        handleClose();
        success();
      } else if (response.isError && response.status === "rejected") {
        failer(response?.error?.data?.message);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response, response2]);
  console.log(formData)
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
                <Form.Select name="owner" onChange={handleOwnerChange} value={formData.ownerId}>
                  <option value={""} disabled="true" selected="true">Seleccione Propietario</option>
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
                <Form.Select name="pet" onChange={handlePetChange} value={formData.petId}>
                  <option value={""} disabled="true" selected="true">Seleccione Mascota</option>
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
          }}
        >
          Cancelar
        </Button>
        <Button
          variant="primary"
          type="submit"
          onClick={handleSubmit}
          className=" btn btn-primary"
          disabled={response.isLoading || response2.isLoading}
        >
          Guardar Cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CitasModal;
