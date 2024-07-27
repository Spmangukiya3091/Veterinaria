import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { failer, success } from "../../alert/success";
import { useAddPetMutation, useGetOwnersListQuery } from "../../../../services/ApiServices";
import moment from "moment";

const MascotaModal = ({ onHide, show }) => {
  const [formData, setFormData] = useState({
    name: "",
    owner: "",
    ownerId: "",
    sex: "",
    dob: "",
    Species: "",
    breed: "",
    color: "",
    weight: ""
  });

  const [validated, setValidated] = useState(false); // State for form validation

  const [addPet, response] = useAddPetMutation();
  const ownersList = useGetOwnersListQuery({ refetchOnMountOrArgChange: true });

  useEffect(() => {

    clearForm()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);
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
      weight: ""
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
      await addPet(formData);

    }
  };

  useEffect(() => {

    if (!response.isLoading && response.status === "fulfilled") {
      // console.log(response);
      clearForm()
      success();
      onHide();
    } else if (response.isError && response.status === "rejected" && response?.error?.status !== 400) {
      // console.log(response.error);
      failer(response?.error?.data?.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);
  return (
    <>
      <Modal size="lg" show={show} onHide={onHide} centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Información de Mascota</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit} autoComplete="new-password">
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
                  <Form.Label>Color</Form.Label>
                  <Form.Control placeholder="Color" aria-label="Default " name="color" onChange={handleChange} value={formData.color} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicSelect">
                  <Form.Label>Peso</Form.Label>
                  <Form.Control placeholder="Peso" aria-label="Default " type="number" name="weight" onChange={handleChange} value={formData.weight} />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => {
            onHide();
            clearForm()
          }} className="footer-btn btn btn-secondary">
            Cancelar
          </Button>
          <Button
            variant="primary"
            type="submit"
            className="footer-btn btn btn-primary"
            onClick={handleSubmit}
            disabled={response.isLoading}
          >
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}



export default MascotaModal;
