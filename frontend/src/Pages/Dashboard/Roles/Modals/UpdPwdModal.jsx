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
  // eslint-disable-next-line no-unused-vars
  const [cookie, , removeCookie] = useCookies(["user"]);
  const [validated, setValidated] = useState(false); // State for form validation

  const [formData, setFormData] = useState({
    id: props.id,
    password: "",
    currentPassword: "",
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

  const clearForm = () => {
    setFormData({
      id: props.id,
      password: "",
      currentPassword: "",
      confirmPassword: "",
    });
    setValidated(false); // Reset validated state
  };

  const validateCurrentPassword = () => {
    return formData.currentPassword !== "";
  };

  const validatePassword = () => {
    // Check if the password field is not empty
    if (formData.password !== "") {
      // Implement custom password validation logic
      // Password must contain at least one capital letter, one special character, one numeric digit, and have a minimum length of 6 characters
      const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{6,}$/;
      return passwordPattern.test(formData.password);
    }
    // If the password field is empty, return false
    return false;
  };

  const validateConfirmPassword = () => {
    return formData.confirmPassword === formData.password;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const form = e.currentTarget;
    setValidated(true); // Set validated to true only when the submit button is clicked

    if (
      validatePassword() &&
      validateCurrentPassword() &&
      validateConfirmPassword() // Validate confirm password field
    ) {
      await updPwd(formData);
    }
  };

  useEffect(() => {
    clearForm(); // Clear the form fields when the component mounts
  }, []);

  useEffect(() => {
    if (!response.isLoading && response.status === "fulfilled") {
      props.onHide();
      success();
      navigate("/");
      removeCookie("user");
    } else if (response.isError && response.status === "rejected" && response.error.status !== 400) {
      console.log(response.error);
      dispatch(showToast(response.error.message, "FAIL_TOAST"));
    }
  }, [dispatch, navigate, props, removeCookie, response]);

  return (
    <>
      <Modal show={props.show} onHide={() => { props.onHide(); clearForm() }} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Actualizar contraseña</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit} autoComplete="new-password">
            <Form.Group className="mb-3" controlId="formBasicSelect">
              <Form.Label>Contraseña actual</Form.Label>
              <Form.Control
                aria-label="Default"
                placeholder="Contraseña actual"
                name="currentPassword"
                onChange={handleChange}
                value={formData.currentPassword}
                required
                isInvalid={formData.currentPassword && !validateCurrentPassword()}
              />
              <Form.Control.Feedback type="invalid">
                {!validateCurrentPassword() && " Por favor proporcione un Contraseña actual."}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicSelect">
              <Form.Label>Nueva contraseña</Form.Label>
              <Form.Control
                aria-label="Default"
                placeholder="Nueva contraseña"
                onChange={handleChange}
                value={formData.password}
                name="password"
                required
                pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{6,}$"
                isInvalid={formData.password && !validatePassword()}
              />
              <Form.Control.Feedback type="invalid">
                {!validatePassword() && "La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un dígito numérico y tener una longitud mínima de 6 caracteres."}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicSelect">
              <Form.Label>Confirmar contraseña</Form.Label>
              <Form.Control
                aria-label="Default "
                placeholder="Confirmar contraseña"
                onChange={handleChange}
                value={formData.confirmPassword}
                name="confirmPassword"
                required
                isInvalid={!validateConfirmPassword()}
              />
              <Form.Control.Feedback type="invalid">
                {!validateConfirmPassword() && "Las contraseñas no coinciden."}
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => { props.onHide(); clearForm() }} className="footer-btn btn btn-secondary">
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
    </>
  );
};

export default UpdPwdModal;
