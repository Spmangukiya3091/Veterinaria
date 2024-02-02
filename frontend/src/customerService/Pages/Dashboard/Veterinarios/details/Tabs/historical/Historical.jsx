import React, { useState } from "react";
import { ButtonGroup, Dropdown, Form } from "react-bootstrap";
import { historicalData } from "./historicalData";
import "./historical.scss";
import SingleInputDateRangePicker from "../../../../../../Components/date-picker/DatePicker";
import CitasPagination from "../../../../../../Components/pagination/citas-pagination/Citas-Pagination";

const Historical = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  const indexOfLastPost = currentPage * postsPerPage;

  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  const adjustedIndexOfFirstPost = Math.max(0, indexOfFirstPost);

  const currentPosts = historicalData.slice(adjustedIndexOfFirstPost, indexOfLastPost);
  return (
    <>
      <div className="historical-table-container">
        <div className="card card-flush">
          <div className="card-header align-items-center py-5 gap-2 gap-md-5 gap-2 gap-md-5">
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
                          <label className="form-label fw-bold">Estado</label>
                          <div>
                            <select
                              className="form-select form-select-solid"
                              data-kt-select2="true"
                              data-placeholder="Select option"
                              data-dropdown-parent="#kt_menu_62444587ce1ee"
                              data-allow-clear="true"
                            >
                              <option disabled >Seleccionar</option>
                              <option value="Completado">Completado</option>
                              <option value="Pendiente">Pendiente</option>
                              <option value="No asistió">No asistió</option>
                            </select>
                          </div>
                        </div>
                        <div className="calender">
                          <Form.Label className="fw-bold">Fecha</Form.Label>
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
            <p className="text-gray-400 fw-bolder fs-5">121 Pacientes</p>
          </div>
          <div className="card-body pt-0">
            <table className="table align-middle table-row-dashed fs-6 gy-5" id="kt_ecommerce_products_table">
              <thead>
                <tr className="text-start text-gray-400 fw-bolder fs-7 text-uppercase gs-0">
                  <th className="">COD</th>
                  <th className="text-start ">MASCOTA</th>
                  <th className="text-start ">HORARIO</th>
                  <th className="text-start ">FECHA</th>
                  <th className="text-start ">ESTADO</th>
                  <th className="text-end ">ACCIONES</th>
                </tr>
              </thead>
              <tbody>
                {currentPosts ? (
                  currentPosts.map(({ COD, MASCOTA, HORARIO, FECHA, ESTADO, ACCIONES }, i) => (
                    <tr key={i}>
                      <td className="text-start pe-0">
                        <span className=" text-gray-600 ">{COD}</span>
                      </td>
                      <td className="text-start pe-0">{MASCOTA}</td>

                      <td className="text-start pe-0" data-order="16">
                        {HORARIO}
                      </td>
                      <td className="text-start pe-0">
                        <div className=" fecha">{FECHA}</div>
                      </td>
                      <td>
                        <div className="status-wrapper">
                          <div
                            className={ESTADO === "Pendiente" ? "badge badge-light-warning text-warning" : "badge badge-light-success text-success"}
                          >
                            <p className="status-p mb-0">{ESTADO}</p>
                          </div>
                        </div>
                      </td>
                      <td className="text-end">
                        <a
                          href={`/customerservice/citas-view?status=${ESTADO}`}
                          className="btn btn-sm btn-light btn-active-light-primary"
                          data-kt-menu-trigger="click"
                          data-kt-menu-placement="bottom-end"
                        >
                          {ACCIONES}
                        </a>
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
      <CitasPagination current={currentPage} total={Math.ceil(historicalData.length / postsPerPage)} onPageChange={setCurrentPage} />
    </>
  );
};

export default Historical;
