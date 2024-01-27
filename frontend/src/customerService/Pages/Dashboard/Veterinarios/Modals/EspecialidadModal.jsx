import React from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { success } from '../../../../Components/alert/success';


function EspecialidadModal({ show, handleClose }) {

    return (
        <div>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Información de Especialidad</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3 w-100" controlId="formBasicSelect">
                        <Form.Label>Especialidad</Form.Label>
                        <Form.Control aria-label="Default" placeholder='Especialidad' />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" className='footer-btn btn btn-secondary' onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="primary" className='footer-btn btn btn-primary' onClick={() => { handleClose(); success(); }}>
                        Guardar Cambios
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default EspecialidadModal