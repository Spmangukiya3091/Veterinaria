import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { failer, success } from "../../alert/success";
import { useAddPaymentMutation, useGetOwnersListQuery, useGetVeterinariansQuery } from "../../../../services/ApiServices";

const PagoModal = (props) => {
  const [formData, setFormData] = useState({
    payment_no: 0,
    transfer_no: 0,
    owner: "",
    doctor: "",
    service: "",
    amount: 0,
    discount: 0,
    payment_method: "",
    final_amount: 0,
    description: "",
  });

  const owners = useGetOwnersListQuery(null, { refetchOnMountOrArgChange: true });
  const doctors = useGetVeterinariansQuery(null, { refetchOnMountOrArgChange: true });

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

  const handleSubmit = async () => {
    // console.log(formData);
    await addPayment(formData);
  };

  useEffect(() => {
    if (!response.isLoading && response.isSuccess) {
      props.onHide();
      success();
    } else if (response.isError && response.status === "rejected") {
      failer(response?.error?.data?.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  return (
    <>
      <Modal show={props.show} onHide={props.onHide} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Información de Pagos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
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
                  />
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
                  <Form.Select aria-label="Default select example" name="owner" onChange={handleChange} value={formData.owner}>
                    <option disabled>Propietario</option>
                    {owners?.data?.ownersList.map(({ id, name, surname }) => (
                      <option key={id} value={name + " " + surname}>
                        {name + " " + surname}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Doctor</Form.Label>
                  <Form.Select aria-label="Default select example" name="doctor" onChange={handleChange} value={formData.doctor}>
                    <option disabled>Doctor</option>
                    {doctors?.data?.veterinarianList.map(({ id, name, surname }) => (
                      <option key={id} value={name + " " + surname}>
                        {name + " " + surname}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Servicio</Form.Label>
                  <Form.Control aria-label="Default" placeholder="Servicio" name="service" onChange={handleChange} value={formData.service} />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Monto</Form.Label>
                  <Form.Control type="number" aria-label="Default" placeholder="Monto" name="amount" onChange={totalAmount} value={formData.amount} />
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
                  />
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
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Método de Pago</Form.Label>
                  <Form.Select name="payment_method" onChange={handleChange} value={formData.payment_method}>
                    <option disabled>Método de Pago</option>
                    <option value="cash">Efectivo</option>
                    <option value="credit card">Tarjeta de Crédito</option>
                    <option value="debit card">Tarjeta de Débito</option>
                  </Form.Select>
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
          <Button onClick={props.onHide} className="footer-btn btn btn-secondary">
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
    </>
  );
};

export default PagoModal;
