import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { failer, success } from "../../../../Components/alert/success";
import { useUpdatePasswordMutation } from "../../../../services/ApiServices";

function UpdatePassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [updatePassword, response] = useUpdatePasswordMutation();
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
    token: location.search.split("=")[1],
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updatePassword(formData);
  };

  useEffect(() => {
    if (!response.isLoading && response.status === "fulfilled") {
      success();
      navigate("/");
      // dispatch(showToast("Password Updated Successfully", "SUCCESS_TOAST"));
    } else if (response.isError && response.status === "rejected") {
      // console.log(response)
      failer(response?.error?.data?.message)
    }
  }, [dispatch, navigate, response]);

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
                <div className="right-inner-container">
                  <div className="d-flex flex-center flex-column flex-column-fluid px-lg-10 pb-15 pb-lg-20">
                    <div className="form-title">
                      <p>
                        Actualizar tu <br />
                        contraseña
                      </p>
                    </div>
                    <p className="form-subtitle">Ingresa tu nueva contraseña</p>
                    <Form>
                      <Form.Group className="form-control-wrapper">
                        <Form.Label>Crear contraseña</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Crear contraseña"
                          name="password"
                          onChange={handleOnChange}
                          value={formData.passwordds}
                        />
                      </Form.Group>

                      <Form.Group className="form-control-wrapper">
                        <Form.Label>Confirmar contraseña</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Confirmar contraseña"
                          name="confirmPassword"
                          onChange={handleOnChange}
                          value={formData.confirmPassword}
                        />
                      </Form.Group>

                      <Button
                        variant="primary"
                        onClick={(e) => {
                          handleSubmit(e);
                        }}
                      >
                        Actualizar
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
  );
}

export default UpdatePassword;
