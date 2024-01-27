import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Button, Form, Modal } from "react-bootstrap";
import { success } from "../../../../Components/alert/success";
import { useAddVaccinationRecordMutation, useGetAllVaccinesQuery } from "../../../../../services/ApiServices";

function AddVacunaModal({ show, handleClose }) {
  const location = useLocation();
  const [formData, setFormData] = useState({
    id: "",
    vaccine: "",
    vaccineId: "",
  });
  const vaccines = useGetAllVaccinesQuery(null, { refetchOnMountOrArgChange: true });
  const [addVaccineRecord, response] = useAddVaccinationRecordMutation();
  const petId = location.pathname.split("/")[4];

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "vaccineId") {
      const vaccineText = e.target.options[e.target.selectedIndex].text;
      setFormData({
        ...formData,
        [name]: value,
        id: petId,
        vaccine: vaccineText,
      });
    }
  };

  const handleSubmit = async () => {
    console.log(formData);
    await addVaccineRecord(formData);
    if (!response.isLoading) {
      handleClose();
      success();
    } else if (response.isError) {
      console.log("error", response.error);
    }
  };

  return (
    <div>
      <Modal size="md" show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Agregar Vacuna</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicSelect">
              <Form.Label>Vacuna</Form.Label>
              <Form.Select aria-label="Default select example" name="vaccineId" onChange={handleChange}>
                <option>Vacuna</option>
                {vaccines?.data?.vaccineList.map((vaccine) => (
                  <option key={vaccine.id} value={vaccine.id}>
                    {vaccine.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className="footer-btn btn btn-secondary" onClick={handleClose}>
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
    </div>
  );
}

export default AddVacunaModal;
