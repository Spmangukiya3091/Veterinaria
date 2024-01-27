import React from "react";
import { Button, Modal } from "react-bootstrap";
import "./alert.scss";

function Alert(props) {
  return (
    <>
      <Modal show={props.show} onHide={props.onHide} aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <i className="bi bi-question-circle"></i>
          <p>{props.msg}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="closebtn"
            onClick={() => {
              props.onHide();
              props.opendltModal();
            }}
          >
            Si
          </Button>
          <Button className="btn btn-secondary" onClick={props.onHide}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
      {/* <DeleteVerifyModal show={openform} onHide={() => props.setOpenform(false)} /> */}
    </>
  );
}

export default Alert;
