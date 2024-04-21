/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { failer, success } from "../../../../Components/alert/success";
import { useAddPetMutation, useGetOwnersListQuery, useGetSinglePetQuery, useUpdatePetMutation } from "../../../../services/ApiServices";
import moment from "moment";

function MascotasModal({ show, handleClose, id }) {
  // console.log(id)
  const currentYear = new Date().getFullYear();
  const startYear = currentYear - 100; // Change the range as needed
  const endYear = currentYear;

  const yearOptions = [];
  for (let year = startYear; year <= endYear; year++) {
    yearOptions.push(year);
  }

  const [formData, setFormData] = useState({
    name: "",
    owner: "",
    ownerId: "",
    sex: "",
    dob: "",
    Species: "",
    breed: "",
    color: "",
  });

  const [validated, setValidated] = useState(false); // State for form validation

  const [addPet, response] = useAddPetMutation();
  const [editPet, response2] = useUpdatePetMutation();
  const petDetails = useGetSinglePetQuery(id, { refetchOnMountOrArgChange: true, skip: id === undefined });
  const ownersList = useGetOwnersListQuery({ refetchOnMountOrArgChange: true });

  useEffect(() => {
    if (id !== undefined && !petDetails.isLoading && petDetails?.data) {
      const { name, owner, ownerId, sex, dob, Species, breed, color } = petDetails?.data?.pet;
      setFormData({
        name,
        owner,
        ownerId,
        sex,
        dob,
        Species,
        breed,
        color,
      });
    } else if (id === undefined) {
      clearForm(); // Clear form fields when there is no owner ID
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, petDetails, show]);

  const clearForm = () => {
    setFormData({
      name: "",
      owner: "",
      ownerId: "",
      sex: "",
      dob: "",
      Species: "",
      breed: "",
      color: "",
    });
    setValidated(false); // Reset validated state
  };

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
        await editPet(body);
      } else {
        // Add new pet
        await addPet(formData);
      }
    }
  };

  useEffect(() => {
    if (id !== undefined) {
      if (!response2.isLoading && response2.status === "fulfilled") {
        clearForm()
        handleClose();
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
        handleClose();
      } else if (response.isError && response.status === "rejected" && response?.error?.status !== 400) {
        // console.log(response.error);
        failer(response?.error?.data?.message);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response, response2]);
  return (
    <>
      <Modal size="lg" show={show} onHide={() => { handleClose(); clearForm() }} centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Información de Mascota</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicSelect">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control aria-label="Default" placeholder="Nombre" name="name" onChange={handleChange} value={formData.name} required />
                  <Form.Control.Feedback type="invalid">
                    Por favor proporcione un Nombre.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Propietario</Form.Label>
                  <Form.Select aria-label="Default select" name="ownerId" onChange={handleChange} value={formData.ownerId} required>
                    <option disabled="true" value={""} selected="true">Propietario</option>
                    {ownersList?.data?.ownersList.map((owner) => (
                      <option key={owner.id} value={owner.id}>
                        {owner.name + " " + owner.surname}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    Por favor proporcione un Propietario.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Sexo</Form.Label>
                  <Form.Select aria-label="Default select example" name="sex" onChange={handleChange} value={formData.sex} required>
                    <option disabled="true" value={""} selected="true" >Sexo</option>
                    <option value="Macho">Macho</option>
                    <option value="Hembra">Hembra</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    Por favor proporcione un Sexo.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col>
                <Form.Group className="mb-3" controlId="formBasicDate">
                  <Form.Label>Año de Nacimiento</Form.Label>
                  <Form.Select
                    onChange={handleChange}
                    value={formData.dob ? moment(formData.dob).format("YYYY") : ""}
                    name="dob"
                  >
                    <option value="">Año</option>
                    {yearOptions.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </Form.Select>
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
                  <Form.Label>Color</Form.Label>
                  <Form.Control placeholder="Color" aria-label="Default " name="color" onChange={handleChange} value={formData.color} />
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
    </>
  );
}

export default MascotasModal;
