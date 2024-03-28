import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { success } from "../../../../Components/alert/success";
import { useChangePasswordMutation } from "../../../../services/ApiServices";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { showToast } from "../../../../store/tostify";

const UpdPwdModal = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cookie, , removeCookie] = useCookies(["user"]);

  const [formData, setFormData] = useState({
    id: props.id,
    currentPassword: "",
    password: "",
    confirmPassword: "",
  });
  const [updPwd, response] = useChangePasswordMutation();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      formData.password === formData.confirmPassword &&
      formData.password !== "" &&
      formData.confirmPassword !== "" &&
      formData.currentPassword !== ""
    ) {
      await updPwd(formData);
    } else {
      dispatch(showToast("Password does not match", "FAIL_TOAST"));
    }
  };
  useEffect(() => {
    if (!response.isLoading && response.status === "fulfilled") {
      props.onHide();
      success();
      navigate("/");
      removeCookie("user");
    } else if (response.isError) {
      // console.log(response.error);
      dispatch(showToast(response.error.message, "FAIL_TOAST"));
    }
  }, [dispatch, navigate, props, removeCookie, response]);

  return (
    <>
      <Modal show={props.show} onHide={props.onHide} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Actualizar contraseña</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicSelect">
              <Form.Label>Contraseña actual</Form.Label>
              <Form.Control
                aria-label="Default"
                placeholder="Contraseña actual"
                name="currentPassword"
                onChange={handleChange}
                value={formData.currentPassword}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicSelect">
              <Form.Label>Nueva contraseña</Form.Label>
              <Form.Control aria-label="Default" placeholder="Nueva contraseña" onChange={handleChange} value={formData.password} name="password" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicSelect">
              <Form.Label>Confirmar contraseña</Form.Label>
              <Form.Control
                aria-label="Default "
                placeholder="Confirmar contraseña"
                onChange={handleChange}
                value={formData.confirmPassword}
                name="confirmPassword"
              />
            </Form.Group>
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

export default UpdPwdModal;
