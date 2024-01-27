import React from "react";
import { Button, Form } from "react-bootstrap";
import "../scss/main.scss";
import { useNavigate } from "react-router-dom";
function Login() {
  const navigate = useNavigate();

  return (
    <div className="main-auth-container">
      <div className="background">
        <img src="../images/login.png" alt="held" />
      </div>
      <div className="d-flex flex-column flex-root" id="kt_app_root">
        <div className="d-flex flex-column flex-column-fluid flex-lg-row">
          <div className="d-flex flex-center w-lg-50 pt-15 pt-lg-0 px-10">
            <div className="d-flex flex-center flex-lg-start flex-column main-section-auth">
              <div className="left-container">
                <div className="left-inner-container">
                  <p className="main-heading">
                    Veterinaria <sup>ODS</sup>
                  </p>
                  <p className="sub-heading">Inicia sesión para entrar a tu cuenta</p>
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex flex-column-fluid flex-lg-row-auto justify-content-center justify-content-lg-end p-12 p-lg-20">
            <div className="bg-body d-flex flex-column align-items-stretch flex-center rounded-4 w-md-600px p-20 main-section-auth">
              <div className="right-container">
                <div className="right-inner-container ">
                  <div className="d-flex flex-center flex-column flex-column-fluid px-lg-10 pb-15 pb-lg-20">
                    <div className="form-title">
                      <p>
                        {" "}
                        Bienvenido, <br />
                        Inicia sesión
                      </p>
                    </div>
                    <Form>
                      <Form.Group className="form-control-wrapper" controlId="formBasicEmail">
                        <Form.Label>Correo electrónico</Form.Label>
                        <Form.Control type="email" placeholder="Correo electrónico" />
                      </Form.Group>

                      <Form.Group className="form-control-wrapper" controlId="formBasicPassword">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control type="password" placeholder="Contraseña" />
                      </Form.Group>

                      <Button
                        onClick={() => {
                          navigate("/dashboard/resumen");
                        }}
                        variant="primary"
                        type="submit"
                      >
                        Iniciar Sesión
                      </Button>
                    </Form>
                    <hr></hr>
                    <div className="forget-container">
                      <p className="forget-title">¿Olvidaste tu contraseña?</p>
                      <Button
                        onClick={() => {
                          navigate("/forget");
                        }}
                        className="forget-btn"
                      >
                        Recuperar contraseña
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
