import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import "./modal.scss";
import { success } from "../../../../Components/alert/success";
import axios from "axios";
import { useCookies } from "react-cookie";

const UserModal = (props) => {
  const [cookies] = useCookies(["authToken"]);

  const [userId, setUserId] = useState();
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
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (props.id !== undefined) {
      setUserId(props.id);
      fetchUserData(props.id);
    }
  }, [props.id]);
  const fetchUserData = async (userId) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/users/loginUserDetail/${userId}`);
      if (response.status === 200) {
        const data = response.data;
        if (data.user) {
          setUserData({
            email: data.user.email,
            id: data.user.id,
            identification: data.user.identification,
            name: data.user.name,
            password: data.user.password,
            confirmPassword: data.user.password,
            phone: data.user.phone,
            profile: data.user.profile,
            role: data.user.role,
          });
        }
      } else {
        console.error("Error fetching user data");
      }
    } catch (error) {
      console.error("Error fetching user data", error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleUploadButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async () => {
    if (userId !== undefined) {
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

        const editUserResponse = await axios.put(`${process.env.REACT_APP_SERVER_URL}/users/updateProfile/${userId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + cookies.authToken,
          },
        });

        if (editUserResponse.status === 200) {
          // Handle success
          success();
          props.onHide();
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
        } else {
          // Handle error
          console.error("Error editing user");
        }
      } catch (error) {
        // Handle error
        console.error("Error editing user", error);
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
        } else {
          // Handle error
          console.error("Error creating user");
        }
      } catch (error) {
        // Handle error
        console.error("Error creating user", error);
      }
    }
  };
  return (
    <Modal
      show={props.show}
      onHide={() => {
        props.onHide();
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
      }}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{userId ? "Editar Usuario" : "Crear Nuevo Usuario"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
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
                    <Form.Control type="file" onChange={handleImageChange} ref={fileInputRef} style={{ display: "none" }} />
                    <div className="info">
                      <p>Adjunta una foto de perfil para completar datos adicionales.</p>
                      {selectedFile && <p className="mt-3 filename">{selectedFile !== null ? selectedFile.name : "No file found"}</p>}
                    </div>
                    <Button onClick={handleUploadButtonClick}>Adjuntar</Button>
                  </div>
                </div>
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
                />
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
                  onChange={(e) => {
                    setUserData({ ...userData, role: e.target.value });
                  }}
                >
                  <option value="">Tipo de usuario</option>
                  <option value="masterAdmin">Administrador Estándar</option>
                  <option value="customerService">Servicio al Cliente</option>
                </Form.Select>
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
                />
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
                />
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
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => {
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
            props.onHide();
          }}
          className="footer-btn btn btn-secondary"
        >
          Cancelar
        </Button>
        <Button variant="primary" type="submit" onClick={handleSubmit} className="footer-btn btn btn-primary">
          {userId ? "Guardar Cambios" : "Crear Usuario"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserModal;
