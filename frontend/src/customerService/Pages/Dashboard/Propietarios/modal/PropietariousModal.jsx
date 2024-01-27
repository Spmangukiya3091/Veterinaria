import React, { useEffect } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import departamentoData from "../../../../../Department.json";
import { useState } from "react";
import { success } from "../../../../Components/alert/success";
import { useAddOwnerMutation, useEditOwnerMutation, useGetSingleOwnerQuery } from "../../../../../services/ApiServices";
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

  const [addPropritario, { isLoading, isError }] = useAddOwnerMutation();
  const [editPropritario, response] = useEditOwnerMutation();
  const getOwner = useGetSingleOwnerQuery(props.id, { refetchOnMountOrArgChange: true });
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
    }
  }, [props.id, getOwner]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value !== undefined && value !== null ? String(value) : null,
    }));
  };

  const handleDepartamentoChange = (e) => {
    const selectedValue = e.target.value;

    // Only proceed if a department is selected
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

  const handleSubmit = () => {
    if (props.id !== undefined) {
      const body = {
        id: props.id,
        ...formData,
      };
      // console.log(body);
      editPropritario(body);
      if (!response.isLoading) {
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
        props.onHide();
        success();
      } else if (response.isError) {
        console.log("error");
      }
    } else {
      addPropritario(formData);
      if (!isLoading) {
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
        props.onHide();
        success();
      } else if (isError) {
        console.log("error");
      }
    }
  };
  return (
    <>
      <Modal show={props.show} onHide={props.onHide} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Información de Propietario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicSelect">
                  <Form.Label>Nombres</Form.Label>
                  <Form.Control name="name" onChange={(e) => handleOnChange(e)} aria-label="Default" placeholder="Nombres" value={formData.name} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicDate">
                  <Form.Label>Apellidos</Form.Label>
                  <Form.Control type="text" placeholder="Apellidos" name="surname" onChange={(e) => handleOnChange(e)} value={formData.surname} />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicSelect">
                  <Form.Label>Teléfono 1</Form.Label>
                  <Form.Control
                    aria-label="Default "
                    placeholder="Teléfono"
                    name="phone_1"
                    onChange={(e) => handleOnChange(e)}
                    value={formData.phone_1}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicSelect">
                  <Form.Label>Teléfono 2</Form.Label>
                  <Form.Control
                    aria-label="Default "
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
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicSelect">
                  <Form.Label>Doc. Identidad</Form.Label>
                  <Form.Control
                    aria-label="Default"
                    placeholder="Doc. Identidad"
                    name="doc_identity"
                    onChange={(e) => handleOnChange(e)}
                    value={formData.doc_identity}
                  />
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

export default PropietarioModal;
