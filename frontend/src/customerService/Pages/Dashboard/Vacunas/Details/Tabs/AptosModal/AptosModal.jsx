import React from 'react'
import './aptosModal.scss'
import { Button, Form, Modal } from 'react-bootstrap'
import { success } from '../../../../../../Components/alert/success'


const AptosModal = (props) => {
    return (
        <>
            <Modal
                {...props}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Información de Aptos
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>


                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Propietario</Form.Label>
                            <Form.Select aria-label="Default select example">
                                <option>Propietario</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Nombre de mascota</Form.Label>
                            <Form.Select aria-label="Default select example">
                                <option>Nombre</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </Form.Select>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide} className='footer-btn btn btn-secondary'>Cancelar</Button>
                    <Button variant="primary" type="submit" onClick={() => { props.onHide(); success() }} className='footer-btn btn btn-primary'>Guardar Cambios</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AptosModal