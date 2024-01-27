import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import "./alert.scss"
function Alert(props) {
  return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      size="md"
      centered>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <img src="../images/check.png" alt="CheckIcon" />
        <p>{props.msg}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button className="closebtn" onClick={props.onHide}>
          OK
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default Alert