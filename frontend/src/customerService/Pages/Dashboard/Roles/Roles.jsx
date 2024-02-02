import React, { useState } from "react";
import "./roles.scss";
import { Link } from "react-router-dom";
import { Button, ButtonGroup, Col, Collapse, Dropdown, Form, Row } from "react-bootstrap";
import { RolesData } from "./RolesData";
import UserModal from "./Modals/UserModal";
import UpdPwdModal from "./Modals/UpdPwdModal";
import SingleInputDateRangePicker from "../../../Components/date-picker/DatePicker";
import Alert from "../../../Components/alert/Alert";
import CitasPagination from "../../../Components/pagination/citas-pagination/Citas-Pagination";

const Roles = () => {
  const [showDropdown, setShowDropdown] = useState(true);
  const [showPwd, setShowPwd] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [dropdowns, setDropdown] = useState(new Array(RolesData.length).fill(false));

  const handleClose = () => setShow(false);
  const handlePwdClose = () => setShowPwd(false);
  const handleShow = () => setShow(true);
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };
  const closeDropdown = () => {
    setDropdownOpen(false);
  };
  const toggleDropdowns = (i) => {
    const updatedDropdowns = [...dropdowns];
    updatedDropdowns[i] = !updatedDropdowns[i];
    setDropdown(updatedDropdowns);
  };
  const closeDropdowns = (i) => {
    const updatedDropdowns = [...dropdowns];
    updatedDropdowns[i] = false;
    setDropdown(updatedDropdowns);
  };

  const handleHide = () => {
    setModalShow(false);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const adjustedIndexOfFirstPost = Math.max(0, indexOfFirstPost);
  const currentPosts = RolesData.slice(adjustedIndexOfFirstPost, indexOfLastPost);

  return (
    <>
      <div className="roles">
        <div className="main-title-box">
          <p className="roles-main-title">Roles de Usuarios</p>
          <p className="roles-sub-title">Roles de Usuarios</p>
        </div>
        <div className="roles-section">
          <Row className="flex-column flex-lg-row">
            <Col lg={2} xl={3} className="w-lg-250px w-xl-350px">
              <div className="head container-sm">
                <div className="img mb-7">
                  <img width={"82px"} className="round-image" src="/images/avatarImg.png" alt="" />
                </div>
                <p className="fs-3 text-gray-800 text-hover-primary fw-bold mb-3">Nombre completo de Admin</p>

                <div className="information">
                  <div className="fs-6 pb-5">
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
                            setShowDropdown(!showDropdown);
                          }}
                        >
                          Details
                          <span className="ms-2 rotate-180">
                            <i className={`fa-solid fa-chevron-${showDropdown ? "up" : "down"} fs-8`}></i>
                          </span>
                        </div>
                      </div>
                      <div className="separator"></div>
                      <Collapse in={showDropdown}>
                        <div id="kt_user_view_details" className="pb-5 fs-6">
                          <div className="fw-bold mt-5">Tipo de Usuario</div>
                          <div className="text-gray-600">Administrador</div>

                          <div className="fw-bold mt-5">Correo electrónico</div>
                          <div className="text-gray-600">ejemplo@gmail.com</div>

                          <div className="fw-bold mt-5">Doc. de Identidad</div>
                          <div className="text-gray-600">71454196</div>

                          <div className="fw-bold mt-5">Teléfono</div>
                          <div className="text-gray-600">1234 567 890</div>

                          <div className="fw-bold mt-5">Fecha creación</div>
                          <div className="text-gray-600">10 Nov 2023, 2:40 pm</div>
                          <div className="d-flex flex-column mt-9">
                            <Button
                              className="btn btn-primary p-5 my-2"
                              onClick={() => {
                                setShow(true);
                              }}
                            >
                              Editar datos
                            </Button>
                            <Button
                              className="btn btn-secondary p-5 my-2"
                              onClick={() => {
                                setShowPwd(true);
                              }}
                            >
                              Actualizar contraseña
                            </Button>
                          </div>
                        </div>
                      </Collapse>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col className="ms-lg-15">
              {/* <div className="second"> */}
              <div className="roles-table-container">
                <div className="card card-flush">
                  <div className="card-header align-items-center py-5 gap-2 gap-md-5">
                    <div className="card-title">
                      <div className="d-flex align-items-center position-relative my-1">
                        <span className="svg-icon svg-icon-1 position-absolute ms-4">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <rect
                              opacity="0.5"
                              x="17.0365"
                              y="15.1223"
                              width="8.15546"
                              height="2"
                              rx="1"
                              transform="rotate(45 17.0365 15.1223)"
                              fill="currentColor"
                            />
                            <path
                              d="M11 19C6.55556 19 3 15.4444 3 11C3 6.55556 6.55556 3 11 3C15.4444 3 19 6.55556 19 11C19 15.4444 15.4444 19 11 19ZM11 5C7.53333 5 5 7.53333 5 11C5 14.4667 7.53333 17 11 17C14.4667 17 17 14.4667 17 11C17 7.53333 14.4667 5 11 5Z"
                              fill="currentColor"
                            />
                          </svg>
                        </span>
                        <input
                          type="text"
                          data-kt-ecommerce-product-filter="search"
                          className="form-control form-control-solid ps-12 w-250px"
                          placeholder="Buscar"
                        />
                      </div>
                    </div>
                    <div className="card-toolbar flex-row-fluid justify-content-start gap-5">
                      <div className="w-100 mw-150px d-flex flex-start">
                        <Dropdown
                          as={ButtonGroup}
                          show={isDropdownOpen}
                          onClose={closeDropdown}
                          onToggle={toggleDropdown}
                          align={"end"}
                          className="filter-dropdown"
                        >
                          <Dropdown.Toggle className={`filter-btn`}>
                            <i className="bi bi-funnel-fill"></i>
                            Filtros
                          </Dropdown.Toggle>
                          <Dropdown.Menu
                            className={`menu menu-sub menu-sub-dropdown w-250px w-md-300px ${isDropdownOpen ? "show" : ""}`}
                            id="kt_menu_62444587ce1ee"
                          >
                            <div className="px-7 py-5">
                              <div className="fs-5 text-dark fw-bolder">Filtros</div>
                            </div>
                            {/* <div className="separator border-gray-200"></div> */}
                            <Dropdown.Divider className=" border-gray-200" />
                            <div>
                              <div className="px-7 py-5">
                                <div className="mb-5 ">
                                  <label className="form-label fw-bold">Tipo de usuario</label>
                                  <div>
                                    <select
                                      className="form-select form-select-solid"
                                      data-kt-select2="true"
                                      data-placeholder="Select option"
                                      data-dropdown-parent="#kt_menu_62444587ce1ee"
                                      data-allow-clear="true"
                                    >
                                      <option disabled >Seleccionar</option>
                                      <option value="Administrador Estandar">Administrador Estandar</option>

                                      <option value="Servicio al Cliente">Servicio al Cliente</option>
                                    </select>
                                  </div>
                                </div>
                                <div className="calender">
                                  <Form.Label className="fw-bold">Fecha de creación</Form.Label>
                                  <SingleInputDateRangePicker />
                                </div>
                              </div>
                              <Dropdown.Divider className=" border-gray-200" />
                              <div className="d-flex justify-content-end dropdown-btns px-7 py-5">
                                <button
                                  type="reset"
                                  className="btn btn-sm btn-light btn-active-light-primary me-2"
                                  data-kt-menu-dismiss="true"
                                  onClick={() => {
                                    closeDropdown();
                                  }}
                                >
                                  Resetear
                                </button>
                                <button
                                  type="submit"
                                  className="btn btn-sm btn-primary"
                                  data-kt-menu-dismiss="true"
                                  onClick={() => {
                                    closeDropdown();
                                  }}
                                >
                                  Aplicar
                                </button>
                              </div>
                            </div>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                    </div>
                    <div className="header-right">
                      <Button onClick={handleShow} className="new-btn">
                        + Nuevo Usuario
                      </Button>
                    </div>
                  </div>
                  <div className="card-body pt-0">
                    <table className="table align-middle table-row-dashed fs-6 gy-5" id="kt_ecommerce_products_table">
                      <thead>
                        <tr className="text-start text-gray-400 fw-bolder fs-7 text-uppercase gs-0">
                          <th className="">COD.</th>
                          <th className="text-start ">NOMBRE</th>
                          <th className="text-start ">USUARIO</th>
                          <th className="text-start ">CORREO</th>
                          <th className="text-start ">Ú. CONEXIÓN</th>
                          <th className="text-end ">DETALLES</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentPosts ? (
                          currentPosts.map(({ COD, NOMBRE, USUARIO, CORREO, UCONEXION, DETALLES }, i) => (
                            <tr key={i}>
                              <td className="text-start pe-0">
                                <span className=" text-gray-600 ">{COD}</span>
                              </td>
                              <td className="text-start pe-0">{NOMBRE}</td>

                              <td className="text-start pe-0" data-order="16">
                                {USUARIO}
                              </td>
                              <td className="text-start pe-0">{CORREO}</td>
                              <td className="text-start pe-0">{UCONEXION}</td>
                              <td className="text-end">
                                <Dropdown as={ButtonGroup} show={dropdowns} onClose={() => closeDropdowns(i)} onToggle={() => toggleDropdowns(i)}>
                                  <Dropdown.Toggle
                                    className={`dropdown-toggle btn btn-sm  btn-flex btn-center  ${dropdowns[i] === true ? "active" : ""}`}
                                    id="dropdown-basic"
                                  >
                                    {DETALLES}
                                    <i className="fa-solid fa-chevron-down"></i>
                                  </Dropdown.Toggle>
                                  {dropdowns[i] && (
                                    <Dropdown.Menu className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semibold fs-7 w-125px py-4">
                                      <Dropdown.Item className="menu-item px-3">
                                        <Link to="#" className="menu-link px-3">
                                          Contraseña a correo
                                        </Link>
                                      </Dropdown.Item>
                                      <Dropdown.Item className="menu-item px-3">
                                        <Link to="#" className="menu-link px-3" onClick={handleShow}>
                                          Editar
                                        </Link>
                                      </Dropdown.Item>
                                      <Dropdown.Item className="menu-item px-3">
                                        <Link to="#" className="menu-link px-3 delete" onClick={() => setModalShow(true)}>
                                          Eliminar usuario
                                        </Link>
                                      </Dropdown.Item>
                                    </Dropdown.Menu>
                                  )}
                                </Dropdown>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="7">No data available</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <Alert show={modalShow} onHide={handleHide} msg={"¿Seguro de completar esta operación?"} />
              <UserModal show={show} onHide={handleClose} />
              <CitasPagination current={currentPage} total={Math.ceil(RolesData.length / postsPerPage)} onPageChange={setCurrentPage} />

              <UpdPwdModal show={showPwd} onHide={handlePwdClose} />
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default Roles;
