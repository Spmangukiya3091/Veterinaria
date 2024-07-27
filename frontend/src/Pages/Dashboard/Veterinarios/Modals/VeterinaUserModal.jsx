/* eslint-disable no-use-before-define */
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import "./modal.scss";
import { failer, success } from "../../../../Components/alert/success";
import departamentoData from "../../../../Department.json";
import { useGetSingleVeterinQuery } from "../../../../services/ApiServices";
import axios from "axios";
import moment from "moment";
import { useCookies } from "react-cookie";
import validator from "validator";

const VeterinaUserModal = (props) => {
  const [cookies] = useCookies(["authToken"]);

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    avatar: "",
    speciality: "",
    identity: "",
    dob: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    sex: "",
    address: "",
    department: "",
    district: "",
    workingDays: [],
    start_time: "",
    end_time: "",
    specialityId: "",
  });
  const [validated, setValidated] = useState(false); // State for form validation
  const [specialities, setSpecialities] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedDepartamento, setSelectedDepartamento] = useState("");
  const [distritos, setDistritos] = useState([]);
  const fileInputRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [isAnyChecked, setIsAnyChecked] = useState(false)

  const getVeterinDetails = useGetSingleVeterinQuery(props.id, { refetchOnMountOrArgChange: true, skip: props.id === undefined });

  useEffect(() => {
    if (!props.specialityList.isLoading) {
      console.log(props.specialityList.data)
      setSpecialities(props.specialityList.data?.specialityList || []);
    }
  }, [props.specialityList, props.show]);

  useEffect(() => {
    if (props.id !== undefined && !getVeterinDetails.isLoading && getVeterinDetails?.data) {
      const {
        name,
        surname,
        avatar,
        speciality,
        identity,
        dob,
        phone,
        email,
        password,
        sex,
        address,
        department,
        district,
        workingDays,
        start_time,
        end_time,
        specialityId,
      } = getVeterinDetails.data.veterinarianData;

      setFormData({
        name,
        surname,
        avatar,
        speciality,
        identity,
        dob,
        phone: phone.toString(),
        email,
        password,
        confirmPassword: password,
        sex,
        address,
        department,
        district,
        workingDays: workingDays !== null ? workingDays : [],
        start_time,
        end_time,
        specialityId,
      });
    } else {
      clearForm()
    }
  }, [props.id, getVeterinDetails, props.show]);

  const clearForm = () => {
    setFormData({
      name: "",
      surname: "",
      avatar: "",
      speciality: "",
      identity: "",
      dob: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
      sex: "",
      address: "",
      department: "",
      district: "",
      workingDays: "",
      start_time: "",
      end_time: "",
      specialityId: "",
    });
    setValidated(false); // Reset validated state
  };



  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setFormData((prevData) => ({
      ...prevData,
      avatar: file,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "specialityId") {
      console.log(name)
      const specialityText = e.target.options[e.target.selectedIndex]?.text || "";
      // console.log(speciality)
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        speciality: specialityText,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleCheckboxChange = useCallback(
    (label) => {
      const isChecked = formData.workingDays.includes(label);

      if (isChecked) {
        const updatedWorkingDays = formData.workingDays.filter((day) => day !== label);
        setFormData((prevData) => ({
          ...prevData,
          workingDays: updatedWorkingDays,
        }));
      } else {
        setFormData((prevData) => ({
          ...prevData,
          workingDays: [...prevData.workingDays, label],
        }));
      }
    },
    [formData.workingDays],
  );

  const handleUploadButtonClick = () => {
    fileInputRef.current.click();
  };
  const validatePassword = (password) => {
    return password.length >= 6 && /^(?=.*[a-zA-Z])(?=.*\d).*$/.test(password);
  };

  const validateConfirmPassword = () => {
    return formData?.confirmPassword === formData?.password;
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

  const handleModalHide = () => {
    clearForm()
    props.onHide();
    props.filter.refetch()
  };
  const validateEmail = () => {
    // Check if the email field is not empty
    if (formData?.email !== "") {
      // Implement custom email validation logic
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      // Check if the email field is not empty and follows the proper format
      return emailPattern.test(formData?.email);
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

  const validatePhone = (phone) => {
    if (phone !== "") {
      return validator.isMobilePhone(phone.toString(), 'any', { strictMode: false }) && phone.length === 9;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const allUnchecked = formData?.workingDays.length === 0;

    setValidated(true); // Set validated to true only when the submit button is clicked
    if (allUnchecked || e.currentTarget.checkValidity() === false) {
      e.stopPropagation();
    } else {
      if (form.checkValidity() === false && validateIdentification(formData.identity) && validatePhone(formData.phone) && validateConfirmPassword() && validatePassword() && validateEmail() && !allUnchecked) {
        e.stopPropagation();
      } else {
        try {

          if (props.id !== undefined) {
            // Handle update logic
            const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/veterinarian/UpdateVeterinarian/${props.id}`, formData, {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: "Bearer " + cookies.authToken,
              },
            });

            if (response.status === 200) {
              // Handle success
              clearForm()
              success();
              handleModalHide();
            }
          } else {
            // Handle create logic
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/veterinarian/createVeterinarian`, formData, {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: "Bearer " + cookies.authToken,
              },
            });

            if (response.status === 201) {
              // Handle success
              success();
              handleModalHide();
              clearForm()
            }
          }
        } catch (error) {
          // console.log(error);
          if (error?.response?.status !== 400) {
            failer(error?.response?.data?.message);
          }
          // dispatch(showToast("Error Interno del Servidor", "FAIL_TOAST"));
        }
      }
    }
  };

  return (
    <>
      <Modal show={props.show} onHide={handleModalHide} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">{props.id !== undefined ? "Editar" : "Crear"} Información de Doctor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit} autoComplete="new-password">
            <Row>
              <Col>
                <Form.Group className="mb-3" >
                  <div className="d-flex gap-10">
                    <div className="image mx-4">
                      <img
                        className="round-image"
                        src={selectedFile ? URL.createObjectURL(selectedFile) : formData?.avatar || "/images/avatarImg.png"}
                        alt=""
                      />
                    </div>
                    <div className="form-field">
                      <Form.Control type="file" onChange={(e) => handleImageChange(e)} ref={fileInputRef} style={{ display: "none" }} />
                      <div className="info">
                        <p>Adjunta una foto de perfil para completar datos adicionales.</p>
                        {selectedFile && <p className="mt-3 filename">{selectedFile !== null ? selectedFile.name : "no file found"}</p>}
                      </div>
                      <Button onClick={handleUploadButtonClick}>Adjuntar</Button>
                    </div>
                  </div>
                </Form.Group>
              </Col>
              <Col>
                <Row className="flex-column">
                  <Col>
                    <Form.Group className="mb-3" controlId="formBasicDate">
                      <Form.Label>Nombres</Form.Label>
                      <Form.Control type="text" onChange={(e) => handleChange(e)} name="name" placeholder="Nombres" value={formData?.name} required />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3" controlId="formBasicDate">
                      <Form.Label>Apellidos</Form.Label>
                      <Form.Control type="text" onChange={(e) => handleChange(e)} name="surname" placeholder="Apellidos" value={formData?.surname} required />
                    </Form.Group>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" >
                  <Form.Label>Especialidad</Form.Label>

                  <Form.Select
                    aria-label="Default select example"
                    value={formData?.specialityId}
                    onChange={(e) => handleChange(e)}
                    name="specialityId"
                    required
                  >
                    <option disabled="true" selected="true" value={""} >Seleccionar</option>
                    {specialities.length > 0
                      ? specialities.map((speciality, i) => (
                        <option key={i} value={speciality.id}>
                          {speciality.speciality}
                        </option>
                      ))
                      :
                      ""
                    }
                  </Form.Select>
                  {specialities.length === 0 && <div style={{ color: 'red' }}>por favor agregue especialidad para ver aquí</div>}
                </Form.Group>
              </Col>
              <Col>
                <Row>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>F. de Nacimiento</Form.Label>
                      <Form.Control
                        type="date"
                        value={formData?.dob ? moment(formData?.dob).format("YYYY-MM-DD") : ""}
                        onChange={(e) => handleChange(e)}
                        name="dob"
                        className="text-gray-400"
                        placeholder="F. de Nacimiento"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>Doc. Identidad</Form.Label>
                      <Form.Control
                        aria-label="Default"
                        placeholder="Doc. de Identificación"
                        value={formData.identity || ""}
                        pattern="[0-9]{8}"
                        maxLength={8}
                        type="tel"
                        required
                        onChange={(e) => {
                          setFormData({ ...formData, identity: e.target.value });
                        }}
                        isInvalid={validated && formData.identity !== "" && !validateIdentification(formData.identity)}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formData.identity !== "" && !validateIdentification(formData.identity) && "El número de identificación debe ser de 8 dígitos."}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Teléfono</Form.Label>
                  <Form.Control
                    aria-label="Default"
                    value={formData?.phone}
                    type="tel" // Change type to 'tel' to support max length attribute
                    pattern="[0-9]{9}"
                    maxLength={9} // Set maxLength attribute to 10
                    onChange={(e) => handleChange(e)}
                    name="phone"
                    placeholder="Teléfono"
                    required
                    isInvalid={validated && formData.phone !== "" && !validatePhone(formData.phone)}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formData.phone !== "" && !validatePhone(formData.phone) && "Proporcione un número de teléfono válido en formato de 9 dígitos."}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="email" className="mb-3">
                  <Form.Label>Correo electrónico</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    autoComplete="new-email"
                    placeholder="Correo electrónico"
                    value={formData.email}
                    pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                    }}
                    required
                    isInvalid={validated && formData.email !== "" && !validateEmail(formData.email)}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formData.email !== "" && !validateEmail(formData.email) && "Por favor proporcione un Correo electrónico válido."}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Sexo</Form.Label>
                  <Form.Select aria-label="Default select example" value={formData?.sex} onChange={(e) => handleChange(e)} name="sex" required>
                    <option disabled selected="true" value={""}>Sexo</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Dirección</Form.Label>
                  <Form.Control
                    aria-label="Default"
                    value={formData?.address}
                    onChange={(e) => handleChange(e)}
                    name="address"
                    placeholder="Dirección"
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
                    value={selectedDepartamento || formData?.department}
                  >
                    <option selected="true" value={""} disabled>Select Departamento</option>
                    {departamentoData.sort().map((departamento, i) => (
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
                  <Form.Select aria-label="Distrito" onChange={(e) => handleChange(e)} name="district" value={formData?.district} >
                    <option disabled="true" selected="true" value={""} >Select Distrito</option>
                    {distritos.sort().map((distrito, i) => (
                      <option key={i} value={distrito}>
                        {distrito}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Horario de trabajo</Form.Label>
                  <Row>
                    <Col>
                      <Form.Check
                        className="my-2"
                        type="checkbox"
                        checked={formData?.workingDays?.includes("Lunes")}
                        label="Lunes"
                        isInvalid={!formData?.workingDays.length === 0}
                        onChange={() => handleCheckboxChange("Lunes")}
                        required={formData?.workingDays?.length !== 0 ? false : true}
                      />
                      <Form.Check
                        className="my-2"
                        type="checkbox"
                        checked={formData?.workingDays?.includes("Martes")}
                        label="Martes"
                        isInvalid={!formData?.workingDays.length === 0}
                        onChange={() => handleCheckboxChange("Martes")}
                        required={formData?.workingDays?.length !== 0 ? false : true}
                      />
                      <Form.Check
                        className="my-2"
                        type="checkbox"
                        checked={formData?.workingDays?.includes("Miércoles")}
                        label="Miércoles"
                        isInvalid={!formData?.workingDays.length === 0}
                        onChange={() => handleCheckboxChange("Miércoles")}
                        required={formData?.workingDays?.length !== 0 ? false : true}
                      />
                      <Form.Check
                        className="my-2"
                        type="checkbox"
                        checked={formData?.workingDays?.includes("Jueves")}
                        label="Jueves"
                        isInvalid={!formData?.workingDays.length === 0}
                        onChange={() => handleCheckboxChange("Jueves")}
                        required={formData?.workingDays?.length !== 0 ? false : true}
                      />
                    </Col>
                    <Col>
                      <Form.Check
                        className="my-2"
                        type="checkbox"
                        checked={formData?.workingDays?.includes("Viernes")}
                        label="Viernes"
                        isInvalid={!formData?.workingDays.length === 0}
                        onChange={() => handleCheckboxChange("Viernes")}
                        required={formData?.workingDays?.length !== 0 ? false : true}
                      />
                      <Form.Check
                        className="my-2"
                        type="checkbox"
                        checked={formData?.workingDays?.includes("Sábado")}
                        label="Sábado"
                        isInvalid={!formData?.workingDays.length === 0}
                        onChange={() => handleCheckboxChange("Sábado")}
                        required={formData?.workingDays?.length !== 0 ? false : true}
                      />
                      <Form.Check
                        className="my-2"
                        type="checkbox"
                        checked={formData?.workingDays?.includes("Domingo")}
                        label="Domingo"
                        isInvalid={!formData?.workingDays.length === 0}
                        onChange={() => handleCheckboxChange("Domingo")}
                        required={formData?.workingDays?.length !== 0 ? false : true}
                      />
                    </Col>
                    {isAnyChecked && (
                      <div style={{ color: "red", width: "100%" }}>
                        Por favor seleccione días laborables
                      </div>
                    )}
                  </Row>
                </Form.Group>
              </Col>
              <Col>
                <Row>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>Ingreso</Form.Label>
                      <Form.Control
                        type="time"
                        aria-label="Default"
                        value={formData?.start_time}
                        onChange={(e) => handleChange(e)}
                        name="start_time"
                        placeholder="Ingreso"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>Salida</Form.Label>
                      <Form.Control
                        type="time"
                        aria-label="Default"
                        value={formData?.end_time}
                        onChange={(e) => handleChange(e)}
                        name="end_time"
                        placeholder="Salida"
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
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
                      value={formData?.password}
                      autoComplete="new-password"
                      onChange={(e) => {
                        setFormData({ ...formData, password: e.target.value });
                      }}
                      pattern="^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,}$"
                      required
                      isInvalid={validated && formData.password !== "" && !validatePassword(formData.password)}
                    />
                    <button
                      className="btn btn-secondary btn-outline-secondary border-secondary border-1 rounded-end"
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <i className={`fa-solid ${showPassword ? "fa-eye" : "fa-eye-slash"}`}></i>
                    </button>
                    <Form.Control.Feedback type="invalid">
                      {formData.password !== "" && !validatePassword(formData.password) && "La contraseña debe contener al menos una letra y un número, y tener una longitud mínima de 6 caracteres."}
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
                      autoComplete="new-password"
                      value={formData?.confirmPassword}
                      onChange={(e) => {
                        setFormData({ ...formData, confirmPassword: e.target.value });
                      }}
                      required
                      pattern="^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,}$"
                      isInvalid={formData.confirmPassword !== "" && !validateConfirmPassword(formData.password, formData.confirmPassword)}
                    />
                    <button
                      className="btn btn-secondary btn-outline-secondary border-secondary border-1  rounded-end"
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      <i className={`fa-solid ${showConfirmPassword ? "fa-eye" : "fa-eye-slash"}`}></i>
                    </button>
                    <Form.Control.Feedback type="invalid">
                      {formData.confirmPassword !== "" && !validateConfirmPassword(formData.password, formData.confirmPassword) && "Las contraseñas no coinciden."}
                    </Form.Control.Feedback>
                  </div>
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleModalHide} className="footer-btn btn btn-secondary">
            Cancelar
          </Button>
          <Button variant="primary" type="submit" onClick={handleSubmit} className="footer-btn btn btn-primary">
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal >
    </>
  );
};

export default VeterinaUserModal;