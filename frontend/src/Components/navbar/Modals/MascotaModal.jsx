import React, { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { success } from "../../alert/success";
import { useAddPetMutation, useGetOwnersListQuery } from "../../../services/ApiServices";
import moment from "moment";

const MascotaModal = (props) => {
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
  const [addPet, { isLoading: isAddPetLoading }] = useAddPetMutation();
  const ownersList = useGetOwnersListQuery(null, { refetchOnMountOrArgChange: true });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "ownerId") {
      const ownerText = name === "ownerId" ? e.target.options[e.target.selectedIndex].text : "";
      console.log(ownerText);
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
    try {
      // Add new pet
      console.log(formData);
      await addPet(formData);
      if (!isAddPetLoading) {
        props.onHide();
        success();
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };
  return (
    <>
      <Modal size="lg" show={props.show} onHide={props.onHide} centered>
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
                    <option>Propietario</option>
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
                    <option>Sexo</option>
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
              props.onHide();
            }}
          >
            Cancelar
          </Button>
          <Button variant="primary" type="submit" onClick={handleSubmit} className="footer-btn btn btn-primary" disabled={isAddPetLoading}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MascotaModal;
