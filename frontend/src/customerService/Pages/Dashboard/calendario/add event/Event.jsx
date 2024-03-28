import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import "./event.scss";

function Event({ lists, setLists, eventData, setEventData, show, handleClose }) {
  const [isChecked, setIsChecked] = useState(false);
  // console.log("eventData", eventData);
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData({
      ...eventData,
      [name]: value,
    });
  };

  const handleAddTask = () => {
    const newEvent = {
      title: eventData.title,
      description: eventData.description,
      location: eventData.location,
      start: eventData.startDate,
      end: eventData.endDate,
    };
    if (!eventData.title) {
      alert("Event Name is required");
      return;
    }
    if (eventData.startTime) {
      newEvent.start += `T${eventData.startTime}`;
    }

    if (eventData.endTime) {
      newEvent.end += `T${eventData.endTime}`;
    }
    setLists([...lists, newEvent]);
    handleClose();
    setEventData({
      title: "",
      description: "",
      location: "",
      startDate: "",
      startTime: "",
      endDate: "",
      endTime: "",
    });
  };

  return (
    <div className="event-main">
      <Modal className="modal-main" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add a New Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="input-wrapper mb-3" controlId="eventName">
            <Form.Label>Nombre del evento</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={eventData.title}
              onChange={handleInputChange}
              placeholder="Introduzca el nombre del evento"
            />
          </Form.Group>
          <Form.Group className="input-wrapper mb-3" controlId="eventDescription">
            <Form.Label>descripción del evento</Form.Label>
            <Form.Control
              type="text"
              name="description"
              value={eventData.description}
              onChange={handleInputChange}
              placeholder="Ingrese la descripción del evento"
            />
          </Form.Group>
          <Form.Group className="input-wrapper mb-3" controlId="eventLocation">
            <Form.Label>Lugar del evento</Form.Label>
            <Form.Control
              type="text"
              name="location"
              value={eventData.location}
              onChange={handleInputChange}
              placeholder="Ingrese la ubicación del evento"
            />
          </Form.Group>
          <Form.Group className="input-wrapper mb-3" controlId="formGridCheckbox">
            <Form.Check type="checkbox" checked={isChecked} onChange={handleCheckboxChange} label="Todo el dia" />
          </Form.Group>
          <div className="date-pick-box">
            <div className="left-date-pick-box">
              <Form.Group className="input-wrapper mb-3" controlId="eventStartDate">
                <Form.Label>Fecha de inicio del evento</Form.Label>
                <Form.Control type="date" name="startDate" value={eventData.startDate} onChange={handleInputChange} />
              </Form.Group>
              <Form.Group className="input-wrapper mb-3" controlId="eventEndDate">
                <Form.Label>Fecha de finalización del evento</Form.Label>
                <Form.Control type="date" name="endDate" value={eventData.endDate} onChange={handleInputChange} />
              </Form.Group>
            </div>
            <div className="right-date-pick-box">
              {isChecked && (
                <div>
                  <Form.Group className="input-wrapper mb-3" controlId="eventStartTime">
                    <Form.Label>Hora de inicio del evento</Form.Label>
                    <Form.Control type="time" name="startTime" value={eventData.startTime} onChange={handleInputChange} />
                  </Form.Group>
                  <Form.Group className="input-wrapper mb-3" controlId="eventEndTime">
                    <Form.Label>Hora de finalización del evento</Form.Label>
                    <Form.Control type="time" name="endTime" value={eventData.endTime} onChange={handleInputChange} />
                  </Form.Group>
                </div>
              )}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="date-cancle-btn" onClick={handleClose}>
            Cancelar
          </Button>
          <Button className="date-select-btn" onClick={handleAddTask}>
            Agregar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Event;
