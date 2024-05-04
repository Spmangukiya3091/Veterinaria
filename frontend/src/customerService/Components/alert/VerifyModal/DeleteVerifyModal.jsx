import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { failer } from "../../../../Components/alert/success";

const DeleteVerifyModal = (props) => {
  const [password, setPassword] = useState("");
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleContinue = () => {
    // Pass the entered password back to the parent component
    if (password.trim() !== "") {
      props.onHide();
      props.onDelete(password);
    } else {
      // You can display an error message or prevent submission
      // console.log("Password cannot be empty");
      failer("La contraseña no puede estar vacía");
    }
  };

  return (
    <>
      <Modal show={props.show} onHide={props.onHide} aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title>Verificación de identidad</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Por motivos de seguridad, ingresa tu contraseña actual y completaremos la operación.
          <Form.Group className="form-group">
            <Form.Label>Contraseña actual</Form.Label>
            <Form.Control required type="password" placeholder="Contraseña actual" value={password} onChange={handlePasswordChange} autocomplete="off" />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn btn-secondary"
            onClick={() => {
              props.onHide();
            }}
          >
            Cancelar
          </Button>
          <Button className="closebtn" onClick={handleContinue} disabled={password.trim() === ""}>
            Continuar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteVerifyModal;
