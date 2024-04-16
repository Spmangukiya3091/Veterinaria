import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import "./modal.scss";
import { failer, success } from "../../../../Components/alert/success";
import axios from "axios";
import { useCookies } from "react-cookie";
import Loader from "../../../../Components/loader/Loader";

const UserModal = (props) => {
  const [cookies] = useCookies(["authToken"]);
  const [loading, setLoading] = useState(true)
  // const [error, setError] = useState(false)
  const [userData, setUserData] = useState({
    email: "",
    id: "",
    identification: "",
    name: "",
    password: "",
    confirmPassword: "",
    phone: "",
    profile: "",
    role: "",
  });

  const [validated, setValidated] = useState(false); // State for form validation
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (props.id !== undefined) {
      setLoading(true)
      fetchUserData(props.id);
    } else {
      setLoading(false)
    }
  }, [props.id, props.show]);

  const fetchUserData = async (userId) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/users/loginUserDetail/${userId}`);
      if (response.status === 200) {
        const data = response.data;
        setLoading(false)
        if (data.user) {
          setUserData({
            email: data?.user?.email,
            id: data?.user?.id,
            identification: data?.user?.identification,
            name: data?.user?.name,
            password: data?.user?.password,
            confirmPassword: data?.user?.password,
            phone: data?.user?.phone,
            profile: data?.user?.profile,
            role: data?.user?.role,
          });
          setSelectedFile(null);
        }
      } else {
        console.error("Error fetching user data");
      }
    } catch (error) {
      console.error("Error fetching user data", error);
    }
  };


  const clearForm = () => {
    setUserData({
      email: "",
      id: "",
      identification: "",
      name: "",
      password: "",
      confirmPassword: "",
      phone: "",
      profile: "",
      role: "",
    });
    setValidated(false); // Reset validated state
    setSelectedFile(null);
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };
  const handleUploadButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    const form = e.currentTarget;
    setValidated(true); // Set validated to true only when the submit button is clicked
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      if (props.id !== undefined) {
        // Edit user API endpoint
        try {
          const formData = new FormData();
          formData.append("name", userData.name);
          formData.append("email", userData.email);
          formData.append("password", userData.password);
          formData.append("confirmPassword", userData.confirmPassword);
          formData.append("role", userData.role);
          formData.append("identification", userData.identification);
          formData.append("phone", userData.phone);

          if (selectedFile) {
            formData.append("profile", selectedFile);
          } else {
            formData.append("profile", userData.profile);
          }

          const editUserResponse = await axios.put(`${process.env.REACT_APP_SERVER_URL}/users/updateProfile/${props.id}`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: "Bearer " + cookies.authToken,
            },
          });
          // console.log(editUserResponse)
          if (editUserResponse.status === 200) {
            // Handle success
            clearForm()
            success();
            props.onHide();
          }
        } catch (error) {
          // Handle error
          if (error.response.status !== 400) {
            failer(error)
            console.error("Error creating user", error);
          }
          console.error("Error creating user", error);
        }
      } else {
        // Create user API endpoint
        try {
          const formData = new FormData();
          formData.append("name", userData.name);
          formData.append("email", userData.email);
          formData.append("password", userData.password);
          formData.append("confirmPassword", userData.confirmPassword);
          formData.append("role", userData.role);
          formData.append("identification", userData.identification);
          formData.append("phone", userData.phone);

          if (selectedFile) {
            formData.append("profile", selectedFile);
          }

          const createUserResponse = await axios.post(`${process.env.REACT_APP_SERVER_URL}/users/userRegistration`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: "Bearer " + cookies.authToken,
            },
          });

          if (createUserResponse.status === 201) {
            // Handle success
            success();
            props.onHide();
            clearForm()
          }
        } catch (error) {
          // Handle error
          if (error.response.status !== 400) {
            failer(error)
            console.error("Error creating user", error);
          }
          console.error("Error creating user", error);
        }
      }
    }
  };
  return (

    <Modal
      show={props.show}
      onHide={() => {
        props.onHide();
        clearForm()
      }}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {
        loading ? <Loader /> :
          <>
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">{props.id ? "Editar Usuario" : "Crear Nuevo Usuario"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row>
                  <Col>
                    <Form.Group className="mb-3" controlId="formBasicSelect">
                      <div className="d-flex gap-10">
                        <div className="image mx-4">
                          <img
                            className="round-image"
                            src={selectedFile ? URL.createObjectURL(selectedFile) : userData.profile || "/images/avatarImg.png"}
                            alt="Profile"
                          />
                        </div>
                        <div className="form-field">
                          <Form.Control type="file" onChange={handleImageChange} ref={fileInputRef} style={{ display: "none" }} required />
                          <div className="info">
                            <p>Adjunta una foto de perfil para completar datos adicionales.</p>
                            {selectedFile && <p className="mt-3 filename">{selectedFile !== null ? selectedFile.name : "No file found"}</p>}
                          </div>
                          <Button onClick={handleUploadButtonClick}>Adjuntar</Button>
                        </div>
                      </div>
                      <Form.Control.Feedback type="invalid">
                        Por favor proporcione un perfil
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3" controlId="formBasicDate">
                      <Form.Label>Nombre completo</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Apellidos y Nombres"
                        value={userData.name || ""}
                        onChange={(e) => {
                          setUserData({ ...userData, name: e.target.value });
                        }}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Por favor proporcione un Nombre completo.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>Tipo de usuario</Form.Label>
                      <Form.Select
                        aria-label="Default select example"
                        value={userData.role || ""}
                        required
                        onChange={(e) => {
                          setUserData({ ...userData, role: e.target.value });
                        }}
                      >
                        <option value="">Tipo de usuario</option>
                        <option value="standardAdmin">Administrador Estándar</option>
                        <option value="customerService">Servicio al Cliente</option>
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        Por favor proporcione un Tipo de usuario.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3" controlId="formBasicSelect">
                      <Form.Label>Correo electrónico</Form.Label>
                      <Form.Control
                        aria-label="Default"
                        placeholder="Correo electrónico"
                        value={userData.email || ""}
                        onChange={(e) => {
                          setUserData({ ...userData, email: e.target.value });
                        }}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Por favor proporcione un Correo electrónico.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group className="mb-3" controlId="formBasicSelect">
                      <Form.Label>Doc. de Identificación</Form.Label>
                      <Form.Control
                        aria-label="Default"
                        placeholder="Doc. de Identificación"
                        value={userData.identification || ""}
                        onChange={(e) => {
                          setUserData({ ...userData, identification: e.target.value });
                        }}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3" controlId="formBasicSelect">
                      <Form.Label>Nro. de Teléfono</Form.Label>
                      <Form.Control
                        aria-label="Default"
                        type="tel"
                        max={10}
                        placeholder="Nro. de Teléfono"
                        value={userData.phone || ""}
                        onChange={(e) => {
                          setUserData({ ...userData, phone: e.target.value });
                        }}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group className="mb-3" controlId="formBasicSelect">
                      <Form.Label>Crear contraseña</Form.Label>
                      <Form.Control
                        type="text"
                        aria-label="Default"
                        placeholder="Crear contraseña"
                        value={userData.password}
                        onChange={(e) => {
                          setUserData({ ...userData, password: e.target.value });
                        }}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Por favor proporcione un contraseña.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3" controlId="formBasicSelect">
                      <Form.Label>Confirmar contraseña</Form.Label>
                      <Form.Control
                        aria-label="Default"
                        placeholder="Confirmar contraseña"
                        value={userData.confirmPassword}
                        onChange={(e) => {
                          setUserData({ ...userData, confirmPassword: e.target.value });
                        }}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Por favor proporcione un Confirmar contraseña.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                onClick={() => {
                  clearForm()
                  props.onHide();
                }}
                className="footer-btn btn btn-secondary"
              >
                Cancelar
              </Button>
              <Button variant="primary" type="submit" onClick={handleSubmit} className="footer-btn btn btn-primary">
                {props.id ? "Guardar Cambios" : "Crear Usuario"}
              </Button>
            </Modal.Footer>
          </>
      }
    </Modal>
  );
};

export default UserModal;
