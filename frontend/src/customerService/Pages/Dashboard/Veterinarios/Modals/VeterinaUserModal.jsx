import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import "./modal.scss";
import { failer, success } from "../../../../Components/alert/success";
import departamentoData from "../../../../../Department.json";
import { useGetSingleVeterinQuery, useGetSpecialitiesQuery } from "../../../../../services/ApiServices";
import { useCookies } from "react-cookie";
import moment from "moment";
import axios from "axios";

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

  const specialityList = useGetSpecialitiesQuery(null, { refetchOnMountOrArgChange: true });
  const [specialities, setSpecialities] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedDepartamento, setSelectedDepartamento] = useState("");
  const [distritos, setDistritos] = useState([]);
  const fileInputRef = useRef(null);
  // const dispatch = useDispatch();

  const getVeterinDetails = useGetSingleVeterinQuery(props.id, { refetchOnMountOrArgChange: true });

  useEffect(() => {
    if (!specialityList.isLoading) {
      setSpecialities(specialityList.data?.specialityList || []);
    }
  }, [specialityList]);

  useEffect(() => {
    if (props.id !== undefined && !getVeterinDetails.isLoading && getVeterinDetails.data) {
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
        phone,
        email,
        password,
        confirmPassword: password,
        sex,
        address,
        department,
        district,
        workingDays,
        start_time,
        end_time,
        specialityId,
      });
    }
  }, [props.id, getVeterinDetails]);

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
      const specialityText = e.target.options[e.target.selectedIndex]?.text || "";
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
      setDistritos(selectedDepartamentoData.DISTRITOS || []);
    } else {
      setDistritos([]);
      setFormData((prevData) => ({
        ...prevData,
        department: "", // Reset department when no option is selected
      }));
    }
  };

  const handleModalHide = () => {
    props.onHide();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
        }
      }
    } catch (error) {
      // console.log(error);
      failer(error?.response?.data?.message);
      // dispatch(showToast("Internal Server Error", "FAIL_TOAST"));
    }
  };
  return (
    <>
      <Modal show={props.show} onHide={handleModalHide} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">{props.id !== undefined ? "Editar" : "Crear"} Información de Doctor</Modal.Title>
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
                        src={selectedFile ? URL.createObjectURL(selectedFile) : formData.avatar || "/images/avatarImg.png"}
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
                      <Form.Control type="text" onChange={(e) => handleChange(e)} name="name" placeholder="Nombres" value={formData.name} />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3" controlId="formBasicDate">
                      <Form.Label>Apellidos</Form.Label>
                      <Form.Control type="text" onChange={(e) => handleChange(e)} name="surname" placeholder="Apellidos" value={formData.surname} />
                    </Form.Group>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Especialidad</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    value={formData.specialityId}
                    onChange={(e) => handleChange(e)}
                    name="specialityId"
                  >
                    <option disabled >Seleccionar</option>
                    {specialities
                      ? specialities.map((speciality, i) => (
                          <option key={i} value={speciality.id}>
                            {speciality.speciality}
                          </option>
                        ))
                      : ""}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col>
                <Row>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>F. de Nacimiento</Form.Label>
                      <Form.Control
                        type="date"
                        value={formData.dob ? moment(formData.dob).format("YYYY-MM-DD") : ""}
                        onChange={(e) => handleChange(e)}
                        name="dob"
                        className="text-gray-400"
                        placeholder="F. de Nacimiento"
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>Doc. Identidad</Form.Label>
                      <Form.Control
                        onChange={(e) => handleChange(e)}
                        value={formData.identity}
                        name="identity"
                        aria-label="Default"
                        placeholder="Doc. Identidad"
                      />
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
                    value={formData.phone}
                    type="number"
                    onChange={(e) => handleChange(e)}
                    name="phone"
                    placeholder="Teléfono"
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Correo electrónico</Form.Label>
                  <Form.Control
                    aria-label="Default"
                    onChange={(e) => handleChange(e)}
                    value={formData.email}
                    name="email"
                    placeholder="Correo electrónico"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Sexo</Form.Label>
                  <Form.Select aria-label="Default select example" value={formData.sex} onChange={(e) => handleChange(e)} name="sex">
                    <option disabled>Sexo</option>
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
                    value={formData.address}
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
                  <Form.Select aria-label="Distrito" onChange={(e) => handleChange(e)} name="district" value={formData.district}>
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
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Horario de trabajo</Form.Label>
                  <Row>
                    <Col>
                      <Form.Check
                        className="my-2"
                        type="checkbox"
                        checked={formData.workingDays.includes("Lunes")}
                        label="Lunes"
                        onChange={() => handleCheckboxChange("Lunes")}
                      />
                      <Form.Check
                        className="my-2"
                        type="checkbox"
                        checked={formData.workingDays.includes("Martes")}
                        label="Martes"
                        onChange={() => handleCheckboxChange("Martes")}
                      />
                      <Form.Check
                        className="my-2"
                        type="checkbox"
                        checked={formData.workingDays.includes("Miércoles")}
                        label="Miércoles"
                        onChange={() => handleCheckboxChange("Miércoles")}
                      />
                      <Form.Check
                        className="my-2"
                        type="checkbox"
                        checked={formData.workingDays.includes("Jueves")}
                        label="Jueves"
                        onChange={() => handleCheckboxChange("Jueves")}
                      />
                    </Col>
                    <Col>
                      <Form.Check
                        className="my-2"
                        type="checkbox"
                        checked={formData.workingDays.includes("Viernes")}
                        label="Viernes"
                        onChange={() => handleCheckboxChange("Viernes")}
                      />
                      <Form.Check
                        className="my-2"
                        type="checkbox"
                        checked={formData.workingDays.includes("Sábado")}
                        label="Sábado"
                        onChange={() => handleCheckboxChange("Sábado")}
                      />
                      <Form.Check
                        className="my-2"
                        type="checkbox"
                        checked={formData.workingDays.includes("Domingo")}
                        label="Domingo"
                        onChange={() => handleCheckboxChange("Domingo")}
                      />
                    </Col>
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
                        value={formData.start_time}
                        onChange={(e) => handleChange(e)}
                        name="start_time"
                        placeholder="Ingreso"
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>Salida</Form.Label>
                      <Form.Control
                        type="time"
                        aria-label="Default"
                        value={formData.end_time}
                        onChange={(e) => handleChange(e)}
                        name="end_time"
                        placeholder="Salida"
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicSelect">
                  <Form.Label>Crear contraseña</Form.Label>
                  <Form.Control
                    aria-label="Default"
                    onChange={(e) => handleChange(e)}
                    value={formData.password}
                    name="password"
                    placeholder="Crear contraseña"
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicSelect">
                  <Form.Label>Confirmar contraseña</Form.Label>
                  <Form.Control
                    aria-label="Default"
                    onChange={(e) => handleChange(e)}
                    value={formData.confirmPassword}
                    name="confirmPassword"
                    placeholder="Confirmar contraseña"
                  />
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
      </Modal>
    </>
  );
};

export default VeterinaUserModal;
