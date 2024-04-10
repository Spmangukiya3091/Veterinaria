import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { failer, success } from "../../../../Components/alert/success";
import { useUpdateVaccinationStatusMutation } from "../../../../services/ApiServices";

function UpdVacunaStat({ show, handleClose, vaccineId, filter }) {
  const [status, setStatus] = useState();
  const [statusUpdate, response] = useUpdateVaccinationStatusMutation();

  const handleSubmit = async () => {
    const body = {
      id: vaccineId,
      status: status,
    };
    await statusUpdate(body);
  };
  useEffect(() => {
    if (!response.isLoading && response.isSuccess) {
      handleClose();
      success();
      filter.refetch();
    } else if (response.isError && response.status === "rejected") {
      // console.log("error", response.error);
      failer(response?.error?.data?.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);
  return (
    <>
      <Modal size="md" show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Estado de Vacuna</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicSelect">
              <Form.Label>Estado</Form.Label>
              <Form.Select
                aria-label="Default select example"
                name="status"
                onChange={(e) => {
                  setStatus(e.target.value);
                }}
                value={status}
              >
                <option disabled="true" value={""} selected="true">Seleccionar Estado</option>
                <option value="pending">Pendiente</option>
                <option value="rejected">Rechazada</option>
                <option value="vaccinated">Vacunado</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className="footer-btn btn btn-secondary">Cancelar</Button>
          <Button variant="primary" type="submit" onClick={() => handleSubmit()} className="footer-btn btn btn-primary">
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UpdVacunaStat;
