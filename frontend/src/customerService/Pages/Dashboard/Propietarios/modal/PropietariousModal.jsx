import React, { useEffect } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import departamentoData from "../../../../../Department.json";
import { useState } from "react";
import { failer, success } from "../../../../Components/alert/success";
import { useAddOwnerMutation, useEditOwnerMutation, useGetSingleOwnerQuery } from "../../../../../services/ApiServices";
import moment from "moment";
import validator from "validator";

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

  const [addPropritario, response] = useAddOwnerMutation();
  const [editPropritario, response2] = useEditOwnerMutation();
  const getOwner = useGetSingleOwnerQuery(props.id, { refetchOnMountOrArgChange: true, skip: props.id === undefined });

  useEffect(() => {
    clearForm(); // Clear form fields when the modal is opened
  }, [props.show]);

  useEffect(() => {
    if (props.id !== undefined) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        name: getOwner?.data?.ownerData.name || "",
        surname: getOwner?.data?.ownerData.surname || "",
        phone_1: getOwner?.data?.ownerData.phone_1 || "",
        phone_2: getOwner?.data?.ownerData.phone_2 || "",
        doc_identity: getOwner?.data?.ownerData.doc_identity || "",
        email: getOwner?.data?.ownerData.email || "",
        address: getOwner?.data?.ownerData.address || "",
        department: getOwner?.data?.ownerData.department || "",
        district: getOwner?.data?.ownerData.district || "",
        dob: getOwner?.data?.ownerData.dob || "",
      }));
    } else {
      clearForm(); // Clear form fields when there is no owner ID
    }
  }, [props.id, getOwner, props.show]);

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
    let processedValue = value;

    if (name === "name" || name === "surname") {
      // Replace multiple spaces with a single space
      processedValue = value;
    } else {
      processedValue = value.trim(); // Trim leading and trailing spaces
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: processedValue,
    }));
  };

  const validateEmail = () => {
    // Check if the email field is not empty
    if (formData.email !== "") {
      // Implement custom email validation logic
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regular expression for basic email validation
      return emailPattern.test(formData.email);
    }
    // If the email field is empty, return true
    return true;
  };
  const validateIdentification = (identification) => {
    if (identification !== "") {
      return validator.isMobilePhone(identification.toString(), 'any', { strictMode: false }) && identification.length === 8;
    }
    return true; // Return true if identification is empty
  };

  const handleDepartamentoChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedDepartamento(selectedValue);

    setFormData((prevData) => ({
      ...prevData,
      department: selectedValue,
      district: "", // Reset district when department changes
    }));

    const selectedDepartamentoData = departamentoData.find((departamento) => departamento.Department === selectedValue);

    if (selectedDepartamentoData) {
      // Sort the DISTRITOS array alphabetically
      const sortedDistritos = [...selectedDepartamentoData.DISTRITOS].sort((a, b) => a.localeCompare(b));
      //console.log(sortedDistritos);
      setDistritos(sortedDistritos);
    } else {
      setDistritos([]);
      setFormData((prevData) => ({
        ...prevData,
        department: "", // Reset department when no option is selected
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    setValidated(true); // Set validated to true only when the submit button is clicked
    if (form.checkValidity() === false && validateEmail() && validateIdentification()) {
      e.stopPropagation();
    } else {

      if (props.id !== undefined) {
        const body = {
          id: props.id,
          ...formData,
        };
        await editPropritario(body);
      } else {
        await addPropritario(formData);
      }
    }
  };

  useEffect(() => {
    if (props.id !== undefined) {
      if (!response2.isLoading && response2.isSuccess) {
        clearForm(); // Clear form fields on successful submission
        props.onHide();
        success();
      } else if (response2.isError && response2.status === "rejected" && response2?.error?.status !== 400) {
        // console.log(response2.error)
        failer(response2?.error?.data?.message);
      }
    } else {
      if (!response.isLoading && response.isSuccess) {
        clearForm(); // Clear form fields on successful submission
        props.onHide();
        success();
      } else if (response.isError && response.status === "rejected" && response?.error?.status !== 400) {
        // console.log(response?.error)
        failer(response?.error?.data?.message);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response, response2]);

  return (
    <>
      <Modal show={props.show} onHide={props.onHide} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Información de Propietario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit} autoComplete="new-password">
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
                    maxLength={9} // Set maxLength attribute to 10
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
                    maxLength={9} // Set maxLength attribute to 10
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
                <Form.Group className="mb-3">
                  <Form.Label>Correo electrónico</Form.Label>
                  <Form.Control
                    aria-label="Default"
                    placeholder="Correo electrónico"
                    value={formData.email || ""}
                    pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                    }}
                    autoComplete="new-password"
                    // required
                    isInvalid={!validateEmail()}
                  />
                  <Form.Control.Feedback type="invalid">
                    {!validateEmail() && "Por favor proporcione un Correo electrónico válido."}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Doc. Identidad</Form.Label>
                  <Form.Control
                    aria-label="Default"
                    placeholder="Doc. de Identificación"
                    value={formData.doc_identity || ""}
                    pattern="[0-9]{8}"
                    maxLength={8}
                    type="tel"
                    onChange={(e) => {
                      setFormData({ ...formData, doc_identity: e.target.value });
                    }}
                    required
                    isInvalid={validated && formData.doc_identity !== "" && !validateIdentification(formData.doc_identity)}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formData.doc_identity !== "" && !validateIdentification(formData.doc_identity) && "El número de identificación debe ser de 8 dígitos."}
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
          <Button onClick={() => { props.onHide(); clearForm() }}className="footer-btn btn btn-secondary">
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
