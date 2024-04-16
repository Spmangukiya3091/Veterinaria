import React, { useState } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import "./diagnosticForm.scss";
import "quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { Button, Col, Form, Row } from "react-bootstrap";
import StarRating from "./StarRating";
import { useGetALlProductListQuery } from "../../../../../../services/ApiServices";
import axios from "axios";
import { useDispatch } from "react-redux";
import { showToast } from "../../../../../../store/tostify";
import { useCookies } from "react-cookie";

function DiagnosticForm({ data, refetch, historyRefetch }) {
  const [cookies] = useCookies(["authToken"]);
  const [list, setList] = useState({ intake: "", Name: "", frequency: "" });
  const [lists, setLists] = useState([]);
  const [star, setStar] = useState();
  const [selectedOption, setSelectedOption] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [formData, setFormData] = useState({
    condition_name: "",
    description: "",
    rating: "",
    internal_observation: "",
  });
  const dispatch = useDispatch();
  const medicines = useGetALlProductListQuery("", { refetchOnMountOrArgChange: true });
  const option = medicines?.data?.productList?.filter((product) => product.product !== undefined).map((product) => product.product);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleChangeQuill = (value) => {
    setFormData({
      ...formData,
      description: value,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setList({
      ...list,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    setSelectedFiles([...selectedFiles, ...files]);
  };

  const handleFileRemove = (index) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);
  };

  const handleAddTodo = () => {
    if (list.intake.trim() !== "" && selectedOption.length > 0) {
      setLists([...lists, { ...list, Name: selectedOption[0] }]);
      setList({ intake: "", Name: "", frequency: "" });
    }
  };

  const handleDeleteTodo = (index) => {
    const updatedTodos = [...lists];
    updatedTodos.splice(index, 1);
    setLists(updatedTodos);
  };

  const ratingChanged = (newRating) => {
    setStar(newRating);
  };

  const handleSubmit = async () => {
    try {
      const formApiData = new FormData();
      formApiData.append("condition_name", formData.condition_name);
      formApiData.append("description", formData.description);
      formApiData.append("rating", star);
      formApiData.append("internal_observation", formData.internal_observation);

      // Append selected files to the "documentation" field
      selectedFiles.forEach((file, index) => {
        formApiData.append("documentation", file); // Use the same key for all files
      });

      // Append medication list
      // console.log(JSON.stringify(lists));
      formApiData.append("medication", JSON.stringify(lists));

      // console.log("Submitted FormData:", formApiData);

      const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/appointment/registerDiagnostic/${data.id}`, formApiData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + cookies.authToken,
        },
      });

      // console.log(response);

      if (response.status === 200) {
        // API call successful
        // You can show a success message or perform any other actions
        refetch();
        historyRefetch()
        dispatch(showToast("Diagnóstico guardado exitosamente!", "SUCCESS_TOAST"));
      }
    } catch (error) {
      // console.log(error);
      // failer(error?.response?.message)
      dispatch(showToast(error?.response?.message, "FAIL_TOAST"));
    }
  };

  const modules = {
    toolbar: [[{ header: [1, 2, 3, 4, 5, 6, false] }], ["bold", "italic", "underline", "image", "code"]],
  };
  return (
    <div className="diagnostic-container">
      <div className="second ">
        <Form>
          <div className="details">
            <h4>Diagnóstico de Cita</h4>
            <div className="diagnos-details">
              <Form.Group className="mb-3">
                <Form.Label>Nombre de Padecimiento</Form.Label>
                <Form.Control required type="text" placeholder="Nombre de Padecimiento" name="condition_name" onChange={handleChange} />
                <Form.Text className="text-muted">Se requiere un nombre de Padecimiento del paciente.</Form.Text>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Descripción</Form.Label>
                <ReactQuill
                  placeholder="Type your text here..."
                  name="description"
                  className="text-start min-h-200px"
                  modules={modules}
                  theme="snow"
                  onChange={handleChangeQuill} // Use the onChange callback
                  required
                />
                <Form.Text className="text-muted">Establezca una descripción para el padecimiento.</Form.Text>
              </Form.Group>
            </div>
          </div>
          <div className="third container upload-hide">
            <h4>Documentación</h4>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="documentation">
                <div className="file-upload-box">
                  <div className="file-upload-box-wrapper">
                    <img src="/images/fileAdd.png" className="uploadFile" alt="upload file" />
                    <div className="file-upload-text">
                      <p className="fs-5 fw-bold text-gray-900 mb-1">Suelte los archivos aquí o haga clic para cargar.</p>
                      <p className="fs-7 fw-semibold text-gray-400 mb-0">Sube hasta 10 archivos</p>
                    </div>
                  </div>
                </div>
              </Form.Label>
              <Form.Control type="file" name="documentation" onChange={handleFileChange} id="documentation" multiple />
              <Form.Text className="text-muted">Suba la documentación necesaria para registrar la cita en el historial del paciente.</Form.Text>
            </Form.Group>
            <div>
              {selectedFiles.map((file, index) => (
                <div key={index} className="files mb-2">
                  <div className="files-inner">{file?.name}</div>
                  <img onClick={() => handleFileRemove(index)} src="/images/delete.png" alt="delete" />
                </div>
              ))}
            </div>
          </div>
          {/* <div className="third container upload-hide">
            <h4>Documentación</h4>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="documentation">Documentación</Form.Label>
              <Form.Control type="file" name="documentation" id="documentation" onChange={handleFileChange} multiple />
              <Form.Text className="text-muted">Suba la documentación necesaria para registrar la cita en el historial del paciente.</Form.Text>
            </Form.Group>
          </div> */}
          <div className="third container">
            <h4>Medicación</h4>
            <Form.Group className="mb-3">
              <Form.Label>Choose an Option</Form.Label>
              <Typeahead
                id="exampleTypeahead"
                labelKey="name" // Key to display in the dropdown
                options={option}
                selected={selectedOption}
                onChange={setSelectedOption}
                placeholder="Escribe o selecciona el nombre de Medicamento."
              />
              <Form.Text className="text-muted">Escribir medicación para tratar el Padecimiento del paciente.</Form.Text>
            </Form.Group>

            <Row>
              <Col sm={12} md={6} lg={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Tomas de medicamento</Form.Label>
                  <Form.Control type="text" name="intake" value={list.intake} onChange={handleInputChange} placeholder="Tomas de medicamento" />
                  <Form.Text className="text-muted">Cantidad de tomas que debe injerir del medicamento.</Form.Text>
                </Form.Group>
              </Col>

              <Col sm={12} md={6} lg={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Frecuencia de medicación</Form.Label>
                  <Form.Control name="frequency" value={list.frequency} onChange={handleInputChange} placeholder="Frecuencia de medicación" />
                  <Form.Text className="text-muted">Frecuencia en que debe injerir el medicamento.</Form.Text>
                </Form.Group>
              </Col>
            </Row>
            <Button onClick={handleAddTodo} className="add-list-btn">
              +Añadir Medicamento
            </Button>
            <p>Medicación Recetado</p>
            {lists
              ? lists.map((ele, ind) => (
                <div className="files mb-2">
                  <div className="files-inner">
                    {ele.Name}
                    <ul>
                      <li>{ele.intake} unidades</li>
                      <li>{ele.frequency} veces al día</li>
                    </ul>
                  </div>
                  <img onClick={() => handleDeleteTodo(ind)} src="/images/delete.png" alt="delete" />
                </div>
              ))
              : ""}
          </div>
          <div className="third container">
            <h4>
              Observaciones Internas <span className="grey-text">(No se imprimirá en el Diagnóstico)</span>
            </h4>
            <Form.Group className="mb-3">
              <Form.Label>Observaciones Internas</Form.Label>
              <Form.Control as="textarea" placeholder="Observaciones Internas" rows={4} onChange={handleChange} name="internal_observation" />
              <Form.Text className="text-muted">
                Agregar observaciones internas del paciente y/o padecimiento. Se guardará en el historial del paciente.
              </Form.Text>
            </Form.Group>
            <div className="calificacion-box">
              <h4>
                Calificación del paciente <span className="grey-text"> (No se imprimirá en el Diagnóstico)</span>
              </h4>
              <div className="d-flex align-items-center justify-content-center fs-2 star-wrapper">
                <StarRating rating={star} onChange={ratingChanged} />
              </div>
            </div>
          </div>
          <div className="diagnostic-btn-group">
            <Button className="btn-imprimir bg-white">Imprimir Diagnóstico</Button>
            <Button className="btn-guardar" onClick={handleSubmit}>
              Guardar Diagnóstico
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default DiagnosticForm;
