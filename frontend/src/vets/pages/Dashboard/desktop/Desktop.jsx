import React, { useState } from "react";
import { Button, Dropdown, DropdownButton, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./desktop.scss";

function Desktop() {
  const [show, setShow] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);

  const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  const handleMaximize = () => setIsMaximized(!isMaximized);
  const handleMinimize = () => setIsMaximized(false);

  return (
    <div className={`desktop-window${isMaximized ? " maximized" : ""}`}>
      <div className="title-bar">
        <div className="title">Desktop Window</div>
        <div className="window-controls">
          <Button className="minimize" onClick={handleMinimize}></Button>
          <Button className="maximize" onClick={handleMaximize}></Button>
          <Button className="close" onClick={handleClose}></Button>
        </div>
      </div>
      <div className="content">
        <h3>Content Goes Here</h3>
        <p>This is the main content area of the desktop window.</p>
        <DropdownButton id="dropdown-basic-button" title="Dropdown Menu">
          <Dropdown.Item href="#/action-1">Option 1</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Option 2</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Option 3</Dropdown.Item>
        </DropdownButton>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal Title</Modal.Title>
        </Modal.Header>
        <Modal.Body>Modal Content Goes Here</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Desktop;
