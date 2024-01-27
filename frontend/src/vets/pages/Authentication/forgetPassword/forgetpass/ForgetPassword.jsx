import React from 'react'
import { Button, Form } from 'react-bootstrap'
import "../../scss/main.scss"
import { useNavigate } from 'react-router-dom'
function ForgetPassword() {
    const navigate = useNavigate()
  return (
    <div>
   <div className="main-auth-container">
    <div className="background" >
      <img src="../images/login.png" alt="held" />
    </div>
    <div className="d-flex flex-column flex-root" id="kt_app_root">
     

      <div className="d-flex flex-column flex-column-fluid flex-lg-row">
        <div className="d-flex flex-center w-lg-50 pt-15 pt-lg-0 px-10">
          <div className="d-flex flex-center flex-lg-start flex-column main-section-auth">
          <div className='left-container'>
<div className='left-inner-container'>
    <p className='main-heading'>Veterinaria <sup>ODS</sup></p>
    <p className='sub-heading'>Inicia sesión para entrar a tu cuenta</p>
</div>
    </div>
          </div>
        </div>

        <div className="d-flex flex-column-fluid flex-lg-row-auto justify-content-center justify-content-lg-end p-12 p-lg-20">
          <div className="bg-body d-flex flex-column align-items-stretch flex-center rounded-4 w-md-600px p-20 main-section-auth">
          <div className='right-container'>
       <div className='right-inner-container'>
         <div className='d-flex flex-center flex-column flex-column-fluid px-lg-10 pb-15 pb-lg-20'>
           <div className='form-title'>
<p>Recupera tu  <br/>contraseña</p>
           </div>
           <p className='forget-sub-title'>Ingresa tu correo para enviar tu contraseña.</p>
   <Form>
     <Form.Group className="mb-3" controlId="formBasicEmail">
       <Form.Label>Correo electrónico</Form.Label>
       <Form.Control type="email" placeholder="Correo electrónico" />
       
     </Form.Group>

    
    
     <Button onClick={() => {navigate("/verification")}} className='send-email-btn' variant="primary" type="submit">
     Enviar
     </Button>

    
   </Form>
  
   </div>
   </div>
   </div>

          
          </div>
        </div>
      </div>
    </div>
    </div>
   </div>
  )
}

export default ForgetPassword