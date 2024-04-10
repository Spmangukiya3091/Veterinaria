import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { failer, success } from "../../../../Components/alert/success";
import moment from "moment";
import { useAddPetMutation, useGetOwnersListQuery, useGetSinglePetQuery, useUpdatePetMutation } from "../../../../../services/ApiServices";

function MascotasModal({ show, handleClose, id }) {
  const [formData, setFormData] = useState({
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
  const [addPet, response] = useAddPetMutation();
  const [editPet, response2] = useUpdatePetMutation();
  const petDetails = useGetSinglePetQuery(id, { refetchOnMountOrArgChange: true, skip: id === undefined });
  const ownersList = useGetOwnersListQuery(null, { refetchOnMountOrArgChange: true });

  useEffect(() => {
    if (id !== undefined && !petDetails.isLoading && petDetails.data) {
      const { name, owner, ownerId, sex, dob, Species, breed, hair, color } = petDetails?.data?.pet;
      setFormData({
        name,
        owner,
        ownerId,
        sex,
        dob,
        Species,
        breed,
        hair,
        color,
      });
    } else if (id === undefined) {
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
    }
  }, [id, petDetails]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "ownerId") {
      const ownerText = e.target.options[e.target.selectedIndex].text;
      setFormData({
        ...formData,
        [name]: value,
        owner: ownerText,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async () => {
    if (id !== undefined) {
      // Update existing pet
      const body = { id: id, ...formData };
      await editPet(body);
    } else {
      // Add new pet
      await addPet(formData);
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
    <>
      <Modal size="lg" show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Información de Mascota</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicSelect">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control aria-label="Default" placeholder="Nombre" name="name" onChange={handleChange} value={formData.name} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Propietario</Form.Label>
                  <Form.Select aria-label="Default select" name="ownerId" onChange={handleChange} value={formData.ownerId}>
                    <option disabled="true" value={""} selected="true">Propietario</option>
                    {ownersList?.data?.ownersList.map((owner) => (
                      <option key={owner.id} value={owner.id}>
                        {owner.name + " " + owner.surname}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Sexo</Form.Label>
                  <Form.Select aria-label="Default select example" name="sex" onChange={handleChange} value={formData.sex}>
                    <option disabled="true" value={""} selected="true">Sexo</option>
                    <option value="Macho">Macho</option>
                    <option value="Hembra">Hembra</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col>
                <Form.Group className="mb-3" controlId="formBasicDate">
                  <Form.Label>F. de Nacimiento</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="DD/MM/YYYY"
                    name="dob"
                    onChange={handleChange}
                    value={formData.dob ? moment(formData.dob).format("YYYY-MM-DD") : ""}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicSelect">
                  <Form.Label>Especie</Form.Label>
                  <Form.Control aria-label="Default " placeholder="Especie" name="Species" onChange={handleChange} value={formData.Species} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicSelect">
                  <Form.Label>Raza</Form.Label>
                  <Form.Control aria-label="Default" placeholder="Raza" name="breed" onChange={handleChange} value={formData.breed} />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicSelect">
                  <Form.Label>Pelo</Form.Label>
                  <Form.Control aria-label="Default" placeholder="Pelo" name="hair" onChange={handleChange} value={formData.hair} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicSelect">
                  <Form.Label>Color</Form.Label>
                  <Form.Control placeholder="Color" aria-label="Default " name="color" onChange={handleChange} value={formData.color} />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="footer-btn btn btn-secondary"
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
            className="footer-btn btn btn-primary"
            disabled={response.isLoading || response2.isLoading}
          >
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default MascotasModal;
