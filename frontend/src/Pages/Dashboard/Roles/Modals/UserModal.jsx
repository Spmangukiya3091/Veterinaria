import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import "./modal.scss";
import { failer, success } from "../../../../Components/alert/success";
import axios from "axios";
import { useCookies } from "react-cookie";
import Loader from "../../../../Components/loader/Loader";
import validator from 'validator';

const UserModal = (props) => {
  const [cookies] = useCookies(["authToken"]);
  const [loading, setLoading] = useState(true);
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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [emailError, setEmailError] = useState(false)

  const [validated, setValidated] = useState(false); // State for form validation
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (props.id !== undefined) {
      setLoading(true);
      fetchUserData(props.id);
    } else {
      setLoading(false);
    }
  }, [props.id, props.show]);

  const fetchUserData = async (userId) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/users/loginUserDetail/${userId}`);
      if (response.status === 200) {
        const data = response.data;
        setLoading(false);
        if (data.user) {
          setUserData({
            email: data?.user?.email,
            id: data?.user?.id,
            identification: data?.user?.identification,
            name: data?.user?.name,
            password: data?.user?.password,
            confirmPassword: data?.user?.password,
            phone: data?.user?.phone.toString(),
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

  const validateRole = (role) => {
    return role !== "";
  };
  const validateEmail = (email) => {
    return validator.isEmail(email);
  };

  // Validation function for full name (at least two words)
  const validateName = (name) => {
    const words = name.trim().split(/\s+/);
    return words?.length >= 2;
  };

  const validatePassword = (password) => {
    return password?.length >= 6 && /^(?=.*[a-zA-Z])(?=.*\d).*$/.test(password);
  };
  // Validation function for confirming password (matches password)
  const validateConfirmPassword = (password, confirmPassword) => {
    console.log(password, confirmPassword)
    return password === confirmPassword;
  };

  // Validation function for identification document (maximum length of 8 characters)
  const validateIdentification = (identification) => {
    if (identification !== "") {
      return validator.isMobilePhone(identification.toString(), 'any', { strictMode: false }) && identification.length === 8;
    }
    return true; // Return true if identification is empty
  };


  // Validation function for phone number (9-digit number)
  const validatePhone = (phone) => {
    if (phone !== "") {
      return validator.isMobilePhone(phone.toString(), 'any', { strictMode: false }) && phone.length === 9;
    }
    return true;
  };

  // Updated handleSubmit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    setValidated(true); // Set validated to true only when the submit button is clicked

    if (
      validateRole(userData.role) &&
      validateName(userData.name) &&
      validateEmail(userData.email) &&
      validatePassword(userData.password) &&
      validateConfirmPassword(userData.password, userData.confirmPassword) &&
      validatePhone(userData.phone) &&
      validateIdentification(userData.identification)
    ) {
      // If all validations pass, proceed with the API call
      try {
        if (props.id !== undefined) {
          // Edit user API endpoint
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

          if (editUserResponse.status === 200) {
            // Handle success
            clearForm();
            success();
            props.onHide();
          }
        } else {
          // Create user API endpoint
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
            clearForm();
          }
        }
      } catch (error) {
        // Handle error
        if (error.response.status !== 400) {
          if (error.response.status === 409) {
            setEmailError(true)
            failer(error.response.data.message);
          } else {
            failer(error);
            console.error("Error creating user", error);
          }
        }
        console.error("Error creating user", error);
      }
    } else {
      // If any validation fails, prevent form submission
      console.log('Validation failed', "role" + validateRole(userData.role),
        "name" + validateName(userData.name),
        "email" + validateEmail(userData.email),
        "phone" + validatePhone(userData.phone),
        "inden" + validateIdentification(userData.identification),
        "pass" + validatePassword(userData.password),
        "conf" + validateConfirmPassword(userData.password, userData.confirmPassword))
    }
  };
  return (
    <Modal
      show={props.show}
      onHide={() => {
        props.onHide();
        clearForm();
      }}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {loading ? (
        <Loader />
      ) : (
        <>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">{props.id ? "Editar Usuario" : "Crear Nuevo Usuario"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="profilePic">
                    <div className="d-flex gap-10">
                      <div className="image mx-4">
                        <img
                          className="round-image"
                          src={selectedFile ? URL.createObjectURL(selectedFile) : userData.profile || "/images/avatarImg.png"}
                          alt="Profile"
                        />
                      </div>
                      <div className="form-field">
                        {(!selectedFile && !userData.profile) && (
                          <>
                            <Form.Control type="file" onChange={handleImageChange} ref={fileInputRef} style={{ display: "none" }} />
                            <div className="info">
                              <p>Adjunta una foto de perfil para completar datos adicionales.</p>
                            </div>
                          </>
                        )}
                        {selectedFile && (
                          <div className="info">
                            <p>Adjunta una foto de perfil para completar datos adicionales.</p>
                            <p className="mt-3 filename">{selectedFile.name}</p>
                          </div>
                        )}
                        {userData.profile && (
                          <div className="info">
                            <p>Ya has adjuntado una foto de perfil.</p>
                          </div>
                        )}
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
                      placeholder="Nombre completo"
                      value={userData.name || ""}
                      pattern="^\w+\s+\w+.*$"
                      onChange={(e) => {
                        setUserData({ ...userData, name: e.target.value });
                      }}
                      required
                      isInvalid={validated && userData.name !== "" && !validateName(userData.name)}
                    />

                    <Form.Control.Feedback type="invalid">
                      {userData.name !== "" && !validateName(userData.name) && "Por favor proporcione un Nombre completo con al menos dos palabras."}
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
                      <option value="admin">Administrador Estándar</option>
                      <option value="customerService">Servicio al Cliente</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {userData.role === "" && "Por favor proporcione un Tipo de usuario."}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group controlId="email" className="mb-3">
                    <Form.Label>Correo electrónico</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Correo electrónico"
                      value={userData.email}
                      onChange={(e) => {
                        setUserData({ ...userData, email: e.target.value });
                      }}
                      required
                      // Check emailError state along with other email validation
                      isInvalid={validated && userData.email !== "" && (!validateEmail(userData.email) || emailError)}
                    />
                    <Form.Control.Feedback type="invalid">
                      {userData.email !== "" && !validateEmail(userData.email) && "Por favor proporcione un Correo electrónico válido."}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Doc. de Identificación</Form.Label>
                    <Form.Control
                      aria-label="Default"
                      placeholder="Doc. de Identificación"
                      value={userData.identification || ""}
                      pattern="[0-9]{8}"
                      maxLength={8}
                      type="tel"
                      required
                      onChange={(e) => {
                        setUserData({ ...userData, identification: e.target.value });
                      }}
                      isInvalid={validated && userData.identification !== "" && !validateIdentification(userData.identification)}
                    />
                    <Form.Control.Feedback type="invalid">
                      {userData.identification !== "" && !validateIdentification(userData.identification) && "El número de identificación debe ser de 8 dígitos."}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicSelect">
                    <Form.Label>Nro. de Teléfono</Form.Label>
                    <Form.Control
                      aria-label="Default"
                      type="tel"
                      maxLength={9}
                      placeholder="Nro. de Teléfono"
                      required
                      pattern="[0-9]{9}"
                      value={userData.phone || ""}
                      onChange={(e) => {
                        setUserData({ ...userData, phone: e.target.value });
                      }}
                      isInvalid={validated && userData.phone !== "" && !validatePhone(userData.phone)}
                    />
                    <Form.Control.Feedback type="invalid">
                      {userData.phone !== "" && !validatePhone(userData.phone) && "Proporcione un número de teléfono válido en formato de 9 dígitos."}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Contraseña</Form.Label>
                    <div className="input-group">
                      <Form.Control
                        type={showPassword ? "text" : "password"} // Update type attribute based on showPassword state
                        placeholder="Ingrese su contraseña"
                        value={userData?.password}
                        onChange={(e) => {
                          setUserData({ ...userData, password: e.target.value });
                        }}
                        pattern="^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,}$"
                        required
                        isInvalid={validated && userData.password !== "" && !validatePassword(userData.password)}
                      />
                      <button
                        className="btn btn-secondary btn-outline-secondary border-secondary border-1 rounded-end"
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <i className={`fa-solid ${showPassword ? "fa-eye" : "fa-eye-slash"}`}></i>
                      </button>
                      <Form.Control.Feedback type="invalid">
                        {userData.password !== "" && !validatePassword(userData.password) && "La contraseña debe contener al menos una letra y un número, y tener una longitud mínima de 6 caracteres."}
                      </Form.Control.Feedback>
                    </div>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Confirmar contraseña</Form.Label>
                    <div className="input-group">
                      <Form.Control
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirmar contraseña"
                        value={userData?.confirmPassword}
                        onChange={(e) => {
                          setUserData({ ...userData, confirmPassword: e.target.value });
                        }}
                        required
                        pattern="^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,}$"
                        isInvalid={userData.confirmPassword !== "" && !validateConfirmPassword(userData.password, userData.confirmPassword)}
                      />
                      <button
                        className="btn btn-secondary btn-outline-secondary border-secondary border-1  rounded-end"
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        <i className={`fa-solid ${showConfirmPassword ? "fa-eye" : "fa-eye-slash"}`}></i>
                      </button>
                      <Form.Control.Feedback type="invalid">
                        {userData.confirmPassword !== "" && !validateConfirmPassword(userData.password, userData.confirmPassword) && "Las contraseñas no coinciden."}
                      </Form.Control.Feedback>
                    </div>
                  </Form.Group>
                </Col>
              </Row>

            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => { clearForm(); props.onHide(); }} className="footer-btn btn btn-secondary">Cancelar</Button>
            <Button variant="primary" type="submit" onClick={handleSubmit} className="footer-btn btn btn-primary">
              {props.id ? "Guardar Cambios" : "Crear Usuario"}
            </Button>
          </Modal.Footer>
        </>
      )}
    </Modal>
  );
};

export default UserModal;
