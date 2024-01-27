/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "./veterinaProfileDetails.scss";
import {
  ButtonGroup,
  Col,
  Collapse,
  Dropdown,
  Image,
  Row,
} from "react-bootstrap";
import MainTab from "./Tabs/MainTab";

import { Link } from "react-router-dom";
import Alert from "../../../../Components/alert/Alert";

const VeterinaProfileDetails = () => {
  const [show, setShow] = useState(true);
  const [shown, setShown] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  // const handleCloseMascota = () => setShown(false);
  const handleShowMascota = () => setShown(true);
  const handleHide = () => {
    setModalShow(false);
  };
  const [open, setOpen] = useState(false);

  // const handleCloseCitas = () => setOpen(false);
  const handleShowCitas = () => setOpen(true);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };
  return (
    <>
      <section className="mascotasdetails-section">
        <div className="heading">
          <p className="p-head">DR. APELLIDOS DE DOCTOR</p>
          <p>Veterinarios » DR. APELLIDOS DE DOCTOR</p>
        </div>

        <Row className="flex-column flex-lg-row">
          <Col lg={2} xl={3} className="w-lg-250px w-xl-350px">
            <div className="head container-sm">
              <div className="symbol symbol-100px symbol-circle mb-7">
                <Image src="/images/doctor1.png" alt="image" />
              </div>
              <p className="fs-3 text-gray-800 text-hover-primary fw-bold mb-3">
                DR. APELLIDOS DE DOCTOR
              </p>
              <div className="information">
                <div className="d-flex  text-start flex-center">
                  <div className="border border-gray-300 border-dashed rounded py-3 px-3 mb-3">
                    <div className="fs-4 fw-bold text-gray-700">
                      <span className="w-75px">25 citas</span>
                    </div>
                    <div className="fw-semibold text-muted">Citas totales</div>
                  </div>

                  <div className="border border-gray-300 border-dashed rounded py-3 px-3 mx-4 mb-3">
                    <div className="fs-4 fw-bold text-gray-700">
                      <span className="w-50px">5 citas</span>
                    </div>
                    <div className="fw-semibold text-muted">
                      Citas pendientes
                    </div>
                  </div>
                </div>
              </div>
              <div className="information">
                <div className="d-flex flex-stack fs-4 py-3">
                  <div
                    className="fw-bold rotate collapsible collapsed"
                    data-bs-toggle="collapse"
                    href="#kt_user_view_details"
                    role="button"
                    aria-expanded="false"
                    aria-controls="kt_user_view_details"
                    onClick={() => {
                      setShow(!show);
                    }}
                  >
                    Details
                    <span className="ms-2 rotate-180">
                      <i
                        className={`fa-solid fa-chevron-${
                          show ? "up" : "down"
                        } fs-8`}
                      ></i>
                    </span>
                  </div>
                </div>
                <div className="separator"></div>
                <Collapse in={show}>
                  <div id="kt_user_view_details" className="pb-5 fs-6">
                    <div className="fw-bold mt-5">Especialidad</div>
                    <div className="text-gray-600">Pediatría</div>

                    <div className="fw-bold mt-5">Doc. Identidad</div>
                    <div className="text-gray-600">1234567</div>

                    <div className="fw-bold mt-5">Fecha creación</div>
                    <div className="text-gray-600">10 Nov 2023, 2:40 pm</div>

                    <div className="fw-bold mt-5">Última Cita</div>
                    <div className="text-gray-600">10 Nov 2023, 2:40 pm</div>
                  </div>
                </Collapse>
              </div>
            </div>
          </Col>
          <Col className="ms-lg-15">
            <div className="drop-down">
              <Dropdown
                as={ButtonGroup}
                show={isDropdownOpen}
                onClose={closeDropdown}
                onToggle={toggleDropdown}
                className="dropdown"
              >
                <Dropdown.Toggle
                  className={`dropdown-toggle btn btn-sm btn-flex btn-center ${
                    isDropdownOpen ? "active" : ""
                  }`}
                  id="dropdown-basic"
                >
                  Accion
                  <i className="fa-solid fa-chevron-down"></i>
                </Dropdown.Toggle>

                <Dropdown.Menu
                  className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semibold fs-7 w-125px py-4"
                  
                  
                >
                  <Dropdown.Item className="menu-item px-3">
                    <Link
                      to={"#"}
                      onClick={handleShowCitas}
                      href="#"
                      className="menu-link px-3"
                      
                    >
                      Agenda cita
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item className="menu-item px-3">
                    <Link
                      to={"#"}
                      onClick={handleShowMascota}
                      href="#"
                      className="menu-link px-3"
                      
                    >
                      Editar
                    </Link>
                  </Dropdown.Item>
                  {/* <Dropdown.Item className="menu-item px-3">
                    <Link
                      to={"#"}
                      onClick={handleShowMascota}
                      href="#"
                      className="menu-link px-3"
                      
                    >
                      Exportar datos
                    </Link>
                  </Dropdown.Item> */}
                  <Dropdown.Item className="menu-item px-3">
                    <Link
                      to={"#"}
                      onClick={() => setModalShow(true)}
                      href="#"
                      className="menu-link px-3 delete"
                      
                    >
                      Eliminar
                    </Link>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <div className="second ">
              <MainTab />
            </div>
          </Col>
        </Row>
        {/* <MascotasModal show={shown} handleClose={handleCloseMascota} /> */}
        {/* <CitasModal show={open} handleClose={handleCloseCitas} /> */}
        <Alert
          show={modalShow}
          onHide={handleHide}
          msg={"¿Seguro de completar esta operación?"}
        />
      </section>
    </>
  );
};

export default VeterinaProfileDetails;
