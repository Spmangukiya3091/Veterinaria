import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "../scss/main.scss";
import { useNavigate } from "react-router-dom";
import { useUserLoginMutation } from "../../../services/ApiServices";
import { useDispatch } from "react-redux";
import { showToast } from "../../../store/tostify";
import { useCookies } from "react-cookie";
function Login() {
  // eslint-disable-next-line no-unused-vars
  const [, setCookie] = useCookies(["user"]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [userLogin] = useUserLoginMutation();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await userLogin(formData);
    const expiresIn = 24 * 60 * 60 * 60;
    if (data !== undefined) {
      if (data.user.role === "user") {
        navigate("/veterine/resumen");
      } else if (data.user.role === "masterAdmin") {
        navigate("/dashboard/resumen");
      } else if (data.user.role === "customerService") {
        navigate("/customerservice/resumen");
      }
      setCookie("user", data.user.id, {
        maxAge: expiresIn,
        path: "/dashboard",
        domain: "localhost",
        sameSite: "Lax",
        secure: false,
      });
      setCookie("user", data.user.id, {
        maxAge: expiresIn,
        path: "/",
        domain: "localhost",
        sameSite: "Lax",
        secure: false,
      });
      setCookie("authToken", data.token, {
        maxAge: expiresIn,
        path: "/dashboard",
        domain: "localhost",
        sameSite: "Lax",
        secure: false,
      });
      setCookie("authToken", data.token, {
        maxAge: expiresIn,
        path: "/",
        domain: "localhost",
        sameSite: "Lax",
        secure: false,
      });
      setCookie("user", data.user.id, {
        maxAge: expiresIn,
        path: "/dashboard",
        domain: "192.168.1.15",
        sameSite: "Lax",
        secure: false,
      });
      setCookie("user", data.user.id, {
        maxAge: expiresIn,
        path: "/",
        domain: "192.168.1.15",
        sameSite: "Lax",
        secure: false,
      });
      setCookie("authToken", data.token, {
        maxAge: expiresIn,
        path: "/dashboard",
        domain: "192.168.1.15",
        sameSite: "Lax",
        secure: false,
      });
      setCookie("authToken", data.token, {
        maxAge: expiresIn,
        path: "/",
        domain: "192.168.1.15",
        sameSite: "Lax",
        secure: false,
      });
      dispatch(showToast("iniciar sesión exitosamente", "SUCCESS_TOAST"));
    } else if (data === undefined) {
      dispatch(showToast("Invalid email or password", "FAIL_TOAST"));
    } else if (data.user.role !== "masterAdmin") {
      dispatch(showToast("invalid user type", "FAIL_TOAST"));
    }
  };

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
                    Administrador <sup>ODS</sup>
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
                    <Form onSubmit={handleSubmit}>
                      <Form.Group className="form-control-wrapper">
                        <Form.Label>Correo electrónico</Form.Label>
                        <Form.Control
                          name="email"
                          onChange={handleOnChange}
                          type="email"
                          autoComplete="current-email"
                          placeholder="Correo electrónico"
                          required
                        />
                      </Form.Group>

                      <Form.Group className="form-control-wrapper">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control
                          name="password"
                          onChange={handleOnChange}
                          autoComplete="current-password"
                          type="password"
                          placeholder="Contraseña"
                          required
                        />
                      </Form.Group>

                      <Button variant="primary" type="submit">
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
