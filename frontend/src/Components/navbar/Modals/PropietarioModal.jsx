import React, { useEffect } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { failer, success } from "../../alert/success";
import departamentoData from "../../../Department.json";
import { useState } from "react";
import { useAddOwnerMutation } from "../../../services/ApiServices";
import moment from "moment";

const PropietarioModal = (props) => {
  const [selectedDepartamento, setSelectedDepartamento] = useState("");
  const [distritos, setDistritos] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    phone_1: "",
    phone_2: "",
    doc_identity: "",
    email: "",
    address: "",
    department: "",
    district: "",
    dob: "",
  });
  const [validated, setValidated] = useState(false); // State for form validation
  const [emailError, setEmailError] = useState("");

  const [addPropritario, response] = useAddOwnerMutation();
  useEffect(() => {
    clearForm(); // Clear form fields when the modal is opened
  }, [props.show]);

  useEffect(() => {

    clearForm(); // Clear form fields when there is no owner ID

  }, [props.show]);

  const clearForm = () => {
    setFormData({
      name: "",
      surname: "",
      phone_1: "",
      phone_2: "",
      doc_identity: "",
      email: "",
      address: "",
      department: "",
      district: "",
      dob: "",
    });
    setValidated(false); // Reset validated state
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value.trim(), // Trim whitespace from the input value
    }));
    // Reset email error when user starts typing again
    setEmailError("");
  };

  const handleDepartamentoChange = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue) {
      setSelectedDepartamento(selectedValue);
      const selectedDepartamentoData = departamentoData.find((departamento) => departamento.Department === selectedValue);
      if (selectedDepartamentoData) {
        setDistritos(selectedDepartamentoData.DISTRITOS);
        setFormData((prevFormData) => ({
          ...prevFormData,
          department: selectedValue,
          district: "", // Reset district when department changes
        }));
      } else {
        setDistritos([]);
        setFormData((prevFormData) => ({
          ...prevFormData,
          department: "", // Reset department when no option is selected
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    setValidated(true); // Set validated to true only when the submit button is clicked
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      await addPropritario(formData);
    }
  };

  useEffect(() => {

    if (!response.isLoading && response.isSuccess) {
      clearForm(); // Clear form fields on successful submission
      props.onHide();
      success();
    } else if (response.isError && response.status === "rejected" && response?.error?.status !== 400) {
      console.log(response?.error)
      failer(response?.error?.data?.message);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  return (
    <>
      <Modal show={props.show} onHide={props.onHide} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Información de Propietario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicSelect">
                  <Form.Label>Nombres</Form.Label>
                  <Form.Control name="name" onChange={(e) => handleOnChange(e)} aria-label="Default" placeholder="Nombres" value={formData.name} required />
                  <Form.Control.Feedback type="invalid">
                    Por favor proporcione un nombre.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicDate">
                  <Form.Label>Apellidos</Form.Label>
                  <Form.Control type="text" placeholder="Apellidos" name="surname" onChange={(e) => handleOnChange(e)} value={formData.surname} required />
                  <Form.Control.Feedback type="invalid">
                    Por favor proporcione un Apellidos.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicSelect">
                  <Form.Label>Teléfono 1</Form.Label>
                  <Form.Control
                    aria-label="Default "
                    type="tel"
                    placeholder="Teléfono"
                    name="phone_1"
                    maxLength={10} // Set maxLength attribute to 10
                    onChange={(e) => handleOnChange(e)}
                    value={formData.phone_1}
                    required

                  />
                  <Form.Control.Feedback type="invalid">
                    Por favor proporcione un Teléfono.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicSelect">
                  <Form.Label>Teléfono 2</Form.Label>
                  <Form.Control
                    aria-label="Default "
                    type="tel" // Change type to 'tel' to support max length attribute
                    maxLength={10} // Set maxLength attribute to 10
                    placeholder="Teléfono"
                    name="phone_2"
                    onChange={(e) => handleOnChange(e)}
                    value={formData.phone_2}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicSelect">
                  <Form.Label>Correo electrónico</Form.Label>
                  <Form.Control
                    aria-label="Default"
                    placeholder="Correo electrónico"
                    name="email"
                    onChange={(e) => handleOnChange(e)}
                    value={formData.email}
                    isInvalid={!!emailError}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Por favor proporcione un Correo electrónico
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicSelect">
                  <Form.Label>Doc. Identidad</Form.Label>
                  <Form.Control
                    aria-label="Default"
                    type="number"
                    placeholder="Doc. Identidad"
                    name="doc_identity"
                    onChange={(e) => handleOnChange(e)}
                    value={formData.doc_identity}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Por favor proporcione un Doc. Identidad
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="departamentoSelect">
                  <Form.Label>Departamento</Form.Label>
                  <Form.Select
                    aria-label="Departamento"
                    onChange={(e) => {
                      handleDepartamentoChange(e);
                    }}
                    name="department"
                    value={selectedDepartamento || formData.department}
                  >
                    <option value="">Select Departamento</option>
                    {departamentoData.map((departamento, i) => (
                      <option key={i} value={departamento.Department}>
                        {departamento.Department}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="distritoSelect">
                  <Form.Label>Distrito</Form.Label>
                  <Form.Select aria-label="Distrito" onChange={(e) => handleOnChange(e)} name="district" value={formData.district}>
                    <option value="">Select Distrito</option>
                    {distritos.map((distrito, i) => (
                      <option key={i} value={distrito}>
                        {distrito}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col lg={6}>
                <Form.Group className="mb-3" controlId="formBasicSelect">
                  <Form.Label>F. de Nacimiento</Form.Label>
                  <Form.Control
                    type="date"
                    aria-label="Default "
                    name="dob"
                    onChange={(e) => handleOnChange(e)}
                    value={formData.dob ? moment(formData.dob).format("YYYY-MM-DD") : ""}
                    // value={moment(formData.dob).format("dd-mm-yyyy")}
                    placeholder="F. de Nacimiento"
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicSelect">
                  <Form.Label>Dirección</Form.Label>
                  <Form.Control
                    placeholder="Dirección"
                    aria-label="Default"
                    name="address"
                    onChange={(e) => handleOnChange(e)}
                    value={formData.address}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide} className="footer-btn btn btn-secondary">
            Cancelar
          </Button>
          <Button
            variant="primary"
            type="submit"
            className="footer-btn btn btn-primary"
            onClick={handleSubmit}
          >
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PropietarioModal;
