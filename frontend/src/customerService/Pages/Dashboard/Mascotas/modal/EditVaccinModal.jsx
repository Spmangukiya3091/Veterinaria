import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { failer, success } from "../../../../Components/alert/success";
import { useUpdateVaccinationValidityMutation } from "../../../../../services/ApiServices";
import moment from "moment";

function EditVaccinModal({ show, handleClose, vaccineId, dates }) {
  console.log(dates)
  const [formState, setFormState] = useState({
    F_vaccination: "",
    validity: "",
  });

  const [validityUpdate, response] = useUpdateVaccinationValidityMutation();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const body = {
      id: vaccineId,
      F_vaccination: formState.F_vaccination,
      validity: formState.validity,
    };

    await validityUpdate(body);
  };

  useEffect(() => {
    if (!response.isLoading && response.isSuccess) {
      handleClose();
      success();
      setFormState({
        F_vaccination: "",
        validity: ""
      });
    } else if (response.isError && response.status === "rejected") {
      failer(response?.error?.data?.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  useEffect(() => {
    if (dates) {
      setFormState({
        F_vaccination: dates.fvaccination ? moment(dates.fvaccination).local().format("YYYY-MM-DD") : "",
        validity: dates.validity ? moment(dates.validity).local().format("YYYY-MM-DD") : "",
      });
    }
  }, [dates]);

  return (
    <Modal
      size="md"
      show={show}
      onHide={() => {
        handleClose();
        setFormState({
          F_vaccination: "",
          validity: ""
        });
      }}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Editar fechas</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="F_vaccination">
                <Form.Label>F. de Vacunación</Form.Label>
                <Form.Control
                  type="date"
                  name="F_vaccination"
                  value={formState.F_vaccination}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="validity">
                <Form.Label>F. de Validez</Form.Label>
                <Form.Control
                  type="date"
                  name="validity"
                  value={formState.validity}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          className="footer-btn btn btn-secondary"
          onClick={() => {
            handleClose();
            setFormState({
              F_vaccination: "",
              validity: ""
            });
          }}
        >
          Cancelar
        </Button>
        <Button
          variant="primary"
          type="submit"
          onClick={handleSubmit}
          className="footer-btn btn btn-primary"
        >
          Guardar Cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
}


export default EditVaccinModal;
