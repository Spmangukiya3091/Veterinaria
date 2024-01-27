import React from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { success } from '../../../../Components/alert/success';


const UpdPwdModal = (props) => {
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
                        Actualizar contraseña
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>

                        <Form.Group className="mb-3" controlId="formBasicSelect">
                            <Form.Label>Contraseña actual</Form.Label>
                            <Form.Control aria-label="Default" placeholder='Contraseña actual' />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicSelect">
                            <Form.Label>Nueva contraseña</Form.Label>
                            <Form.Control aria-label="Default" placeholder='Nueva contraseña' />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicSelect">
                            <Form.Label>Confirmar contraseña</Form.Label>
                            <Form.Control aria-label="Default " placeholder='Confirmar contraseña' />
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

export default UpdPwdModal