import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { failer, success } from "../../alert/success";
import { useAddPaymentMutation, useGetOwnersListQuery, useGetVeterinariansQuery } from "../../../services/ApiServices";

const PagoModal = ({ id, show, onHide }) => {
  const [formData, setFormData] = useState({
    payment_no: null,
    transfer_no: null,
    owner: "",
    doctor: "",
    service: "",
    amount: null,
    discount: null,
    payment_method: "",
    final_amount: null,
    description: "",
  });
  const [validated, setValidated] = useState(false); // State for form validation

  const owners = useGetOwnersListQuery( { refetchOnMountOrArgChange: true });
  const doctors = useGetVeterinariansQuery( { refetchOnMountOrArgChange: true });

  useEffect(() => {
    clearForm()
  }, [show]);

  const clearForm = () => {
    setFormData({
      payment_no: null,
      transfer_no: null,
      owner: "",
      doctor: "",
      service: "",
      amount: null,
      discount: null,
      payment_method: "",
      final_amount: null,
      description: "",
    });
    setValidated(false); // Reset validated state
  };


  const [addPayment, response] = useAddPaymentMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "payment_no" ? parseInt(value) : name === "transfer_no" ? parseInt(value) : value,
    });
  };

  const totalAmount = (e) => {
    const { name, value } = e.target;
    const amount = name === "amount" ? parseFloat(value) : parseFloat(formData.amount);
    const discount = name === "discount" ? parseFloat(value) : parseFloat(formData.discount);

    const discounted_value = 100 - discount;
    const discounted_amount = (amount * discounted_value) / 100;

    setFormData({
      ...formData,
      [name]: name === "amount" ? parseFloat(value) : parseFloat(value),
      final_amount: discounted_amount,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    setValidated(true); // Set validated to true only when the submit button is clicked
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {

      await addPayment(formData);
    }
  };

  useEffect(() => {

    if (!response.isLoading && response.isSuccess) {
      // console.log(response);
      success();
      clearForm()
      onHide();
    } else if (response.isError && response.status === "rejected" && response.error.status !== 400) {
      console.log(response);
      // console.log(response.error);
      failer(response?.error?.data?.message);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  return (
    <>
      <Modal show={show} onHide={onHide} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Información de Pagos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit} autoComplete="new-password">
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Nro. de Pago</Form.Label>
                  <Form.Control
                    type="number"
                    aria-label="Default"
                    placeholder="Nro. de Pago"
                    name="payment_no"
                    onChange={handleChange}
                    value={parseInt(formData.payment_no)}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Por favor proporcione un Nro. de Pago.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Nro. de Transferencia</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Nro. de Transferencia"
                    name="transfer_no"
                    onChange={handleChange}
                    value={parseInt(formData.transfer_no)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Propietario</Form.Label>
                  <Form.Select aria-label="Default select example" name="owner" onChange={handleChange} value={formData.owner} required>
                    <option disabled="true" value={""} selected="true"  >Propietario</option>
                    {owners?.data?.ownersList.map(({ id, name, surname }) => (
                      <option key={id} value={name + " " + surname}>
                        {name + " " + surname}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    Por favor proporcione un Propietario.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Doctor</Form.Label>
                  <Form.Select aria-label="Default select example" name="doctor" onChange={handleChange} value={formData.doctor} required>
                    <option disabled="true" value={""} selected="true"  >Doctor</option>
                    {doctors?.data?.veterinarianList.map(({ id, name, surname }) => (
                      <option key={id} value={name + " " + surname}>
                        {name + " " + surname}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    Por favor proporcione un Doctor.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Servicio</Form.Label>
                  <Form.Control aria-label="Default" placeholder="Servicio" name="service" onChange={handleChange} value={formData.service} required />
                  <Form.Control.Feedback type="invalid">
                    Por favor proporcione un Servicio.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Monto</Form.Label>
                  <Form.Control type="number" aria-label="Default" placeholder="Monto" name="amount" onChange={totalAmount} required value={formData.amount} />
                  <Form.Control.Feedback type="invalid">
                    Por favor proporcione un Monto.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Descuento</Form.Label>
                  <Form.Control
                    type="number"
                    aria-label="Default"
                    placeholder="Descuento"
                    name="discount"
                    onChange={totalAmount}
                    value={formData.discount}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Por favor proporcione un Descuento.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Monto Final</Form.Label>
                  <Form.Control
                    disabled
                    type="number"
                    aria-label="Default"
                    placeholder="Monto Final"
                    name="final_amount"
                    value={formData.final_amount}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Por favor proporcione un Monto Final.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Método de Pago</Form.Label>
                  <Form.Select name="payment_method" onChange={handleChange} value={formData.payment_method} required>
                    <option disabled="true" value={""} selected="true">Método de Pago</option>
                    <option value="cash">Efectivo</option>
                    <option value="credit card">Tarjeta de Crédito</option>
                    <option value="debit card">Tarjeta de Débito</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    Por favor proporcione un Método de Pago.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Descripción</Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder="Descripción"
                    style={{ height: "100px" }}
                    name="description"
                    onChange={handleChange}
                    value={formData.description}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => {
            onHide()
            clearForm()
          }} className="footer-btn btn btn-secondary">
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
      </Modal >
    </>
  );
};

export default PagoModal;
