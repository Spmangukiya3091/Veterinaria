import React, { useEffect, useState } from "react";
import "./citas.scss";
import { Button, ButtonGroup, Dropdown, Form } from "react-bootstrap";
import { citasData } from "./citasData";
import { Link } from "react-router-dom";
import CitasModal from "./modal/CitasModal";
import SingleInputDateRangePicker from "../../../Components/date-picker/DatePicker";
import Alert from "../../../Components/alert/Alert";
import CitasPagination from "../../../Components/pagination/citas-pagination/Citas-Pagination";
import moment from "moment";
import StarRating from "../../../../Components/star/StarRating";
import DeleteVerifyModal from "../../../Components/alert/VerifyModal/DeleteVerifyModal";

import { useGetAppointmentFilterQuery, useRemoveAppointmentMutation } from "../../../../services/ApiServices";
import { failer, success } from "../../../Components/alert/success";
import Loader from "../../../Components/loader/Loader";

function Citas({ email }) {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [dropdowns, setDropdown] = useState(new Array(citasData?.length).fill(false));
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [appId, setAppId] = useState();
  const [searchValue, setSearchValue] = useState("");
  const [searchData, setSearchData] = useState({
    status: "",
    startDate: "",
    endDate: "",
  });
  const [searchQuery, setSearchQuery] = useState("");

  const appointmentsByFilter = useGetAppointmentFilterQuery(searchQuery, { refetchOnMountOrArgChange: true });
  const [openform, setOpenform] = useState(false);
  const [dltCitas, response] = useRemoveAppointmentMutation();
  const [dltData, setDltData] = useState({
    id: "",
    pass: "",
    email: email,
  });

  useEffect(() => {
    if (!appointmentsByFilter.isLoading) {
      setLoading(false);
      setData(appointmentsByFilter?.data?.appointmentList);
    } else if (appointmentsByFilter.isError) {
      setLoading(false);
      setError(true);
    }
  }, [appointmentsByFilter]);

  const handleClose = () => {
    setShow(false);
    setAppId("")
    appointmentsByFilter.refetch()
  };
  
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
    setSearchData({
      status: "",
      startDate: "",
      endDate: "",
    });
    setSearchQuery("");
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
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  const filteredData = data.filter(({ pet, veterinarian }) => {
    const searchString = searchValue;
    return pet?.toLowerCase().includes(searchString) || veterinarian?.toLowerCase().includes(searchString);
  });

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const adjustedIndexOfFirstPost = Math.max(0, indexOfFirstPost);
  const currentPosts = filteredData.slice(adjustedIndexOfFirstPost, indexOfLastPost);
  const [modalShow, setModalShow] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchData({
      ...searchData,
      [name]: value,
    });
  };
  const handleChangeDate = (selectedDates) => {
    if (selectedDates && selectedDates?.length === 2) {
      setSearchData({
        ...searchData,
        startDate: selectedDates[0] || "",
        endDate: selectedDates[1] || "",
      });
    }
  };

  const handleSearchFilter = () => {
    // Refetch data based on the search criteria
    setSearchQuery(
      searchData.status === ""
        ? `?startDate=${searchData.startDate}&endDate=${searchData.endDate}`
        : searchData.startDate === "" && searchData.endDate === ""
          ? `?status=${searchData.status}`
          : searchData.status === "" && searchData.startDate === "" && searchData.endDate === ""
            ? ""
            : `?status=${searchData.status}&startDate=${searchData.startDate}&endDate=${searchData.endDate}`,
    );
    // appointmentsByFilter.refetch();
    setDropdownOpen(false);
  };

  // Delete functionality

  const handleConfirmDelete = () => {
    // Close the alert modal
    setModalShow(false);

    // Set the appointment ID in dltData
    setDltData({
      ...dltData,
      id: appId,
      email: email,
    });

    // Open the DeleteVerifyModal
    setOpenform(true);
  };

  const handleDeleteVerify = async (enteredPassword) => {
    if (enteredPassword !== "" || null) {
      // Close the DeleteVerifyModal
      setOpenform(false);

      // Use the callback function provided by setDltData
      const body = {
        id: dltData.id,
        email: dltData.email,
        pass: enteredPassword,
      };

      // Now you can use the updated state

      // Call the dltCitas API
      await dltCitas(body);
    } else {
      failer("Invalid Password ");
    }
  };

  useEffect(() => {
    if (!response.isLoading && response.status === "fulfilled") {
      success();
      setDltData({
        id: "",
        pass: "",
        email: "",
      });
      // Refetch or update data if needed
      appointmentsByFilter.refetch();
    } else if (response.isError) {
      // console.log(response.error);
      // dispatch(showToast(response?.error?.data?.message, "FAIL_TOAST"));
      failer(response?.error?.data?.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  return (
    <>
      {loading === true ? (
        <Loader />
      ) : error === true ? (
        "Some Error Occured"
      ) : (
        <div className="citas">
          <div className="main-title-box">
            <p className="citas-main-title">Citas agendadas</p>
            <p className="citas-sub-title">Citas agendadas</p>
          </div>
          <div className="citas-table-container">
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
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
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
                                <select className="form-select form-select-solid" name="status" onChange={handleChange} value={searchData.status}>
                                  <option disabled="true" value={""} selected="true">Seleccionar</option>
                                  <option value="complete">Completado</option>
                                  <option value="pending">Pendiente</option>
                                  <option value="no attempt">No asistió</option>
                                </select>
                              </div>
                            </div>
                            <div className="calender">
                              <Form.Label className="fw-bold">Fecha de creación</Form.Label>
                              <SingleInputDateRangePicker
                                value={searchData.startDate && searchData.endDate ? [searchData.startDate, searchData.endDate] : null}
                                onChange={handleChangeDate}
                              />
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
                                handleSearchFilter();
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
                  <Button onClick={() => setShow(true)} className="new-btn">
                    + Nueva Cita
                  </Button>
                </div>
              </div>
              <div className="card-body pt-0">
                <table className="table align-middle table-row-dashed fs-6 gy-5" id="kt_ecommerce_products_table">
                  <thead>
                    <tr className="text-start text-gray-400 fw-bolder fs-7 text-uppercase gs-0">
                      <th className="min-w-100px">COD</th>
                      <th className="text-start min-w-200px">MASCOTA</th>
                      <th className="text-start min-w-200px">VETERINARIO</th>
                      <th className="text-start min-w-70px">HORARIO</th>
                      <th className="text-start min-w-100px">FECHA</th>
                      <th className="text-start min-w-100px">CALIFICACIÓN</th>
                      <th className="text-start min-w-100px">ESTADO</th>
                      <th className="text-end min-w-70px">ACCIONES</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentPosts?.length > 0 ? (
                      currentPosts.map(({ id, pet, veterinarian, scheduleStart, scheduleEnd, date, status, rating }, i) => (
                        <tr key={i}>
                          <td className="text-start pe-0">
                            <span className="fw-bold text-gray-600 fw-bolder">{i + 1}</span>
                          </td>
                          <td className="text-start pe-0">{pet ? pet : "-"}</td>
                          <td className="text-start pe-0">{veterinarian ? veterinarian : "-"}</td>

                          <td className="text-start pe-0" data-order="16">
                            {scheduleStart ? moment(`2023-01-01 ${scheduleStart}`, "YYYY-MM-DD HH:mm:ss").format("h:mm A") +
                              " - " +
                              moment(`2023-01-01 ${scheduleEnd}`, "YYYY-MM-DD HH:mm:ss").format("h:mm A") : "-"}
                          </td>
                          <td className="text-start pe-0">
                            <div className=" fecha">{date ? moment(date).format("DD MMM YYYY") : "-"}</div>
                          </td>
                          <td className="text-start pe-0" data-order="rating-5">
                            <div className="rating justify-content-start">
                              <StarRating rating={rating} />
                            </div>
                          </td>
                          <td className="text-start pe-0" data-order="status">
                            <div
                              className={`${status === "pending"
                                ? "badge badge-light-warning text-warning"
                                : status === "no attempt"
                                  ? "badge badge-light-dark"
                                  : "badge badge-light-success text-success "
                                } `}
                            >
                              <p className="mb-0">{status === "pending" ? "Pendiente" : status === "no attempt" ? "No asistió" : "Completado"}</p>
                            </div>
                          </td>
                          <td className="text-end">
                            <Dropdown as={ButtonGroup} show={dropdowns} onClose={() => closeDropdowns(i)} onToggle={() => toggleDropdowns(i)}>
                              <Dropdown.Toggle
                                className={`dropdown-toggle btn btn-sm  btn-flex btn-center  ${dropdowns[i] === true ? "active" : ""}`}
                                id="dropdown-basic"
                              >
                                {"Acción"}
                                <i className="fa-solid fa-chevron-down"></i>
                              </Dropdown.Toggle>
                              {dropdowns[i] && (
                                <Dropdown.Menu
                                  key={dropdowns[i]}
                                  className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semibold fs-7 w-125px py-4"
                                >
                                  <Dropdown.Item className="menu-item px-3">
                                    <Link to={`/customerservice/citas-view/${id}`} className="menu-link px-3">
                                      Ver detalles
                                    </Link>
                                  </Dropdown.Item>
                                  <Dropdown.Item className="menu-item px-3">
                                    <Link
                                      onClick={() => {
                                        setAppId(id);
                                        setShow(true);
                                      }}
                                      to="#"
                                      className="menu-link px-3"
                                    >
                                      Editar
                                    </Link>
                                  </Dropdown.Item>
                                  <Dropdown.Item className="menu-item px-3">
                                    <Link
                                      onClick={() => {
                                        setAppId(id);
                                        setModalShow(true);
                                      }}
                                      className="menu-link px-3 delete"
                                    >
                                      Eliminar cita
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
                        <td colSpan="8">No data available</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            <CitasModal show={show} handleClose={handleClose} id={appId} filter={appointmentsByFilter} />
            <Alert
              show={modalShow}
              onHide={() => setModalShow(false)}
              msg={"¿Seguro de completar esta operación?"}
              opendltModal={handleConfirmDelete}
            />
            <DeleteVerifyModal
              show={openform}
              onHide={() => {
                setOpenform(false);
                setDltData({
                  id: "",
                  pass: "",
                  email: "",
                });
              }}
              onDelete={handleDeleteVerify}
            />
          </div>
          <CitasPagination current={currentPage} total={Math.ceil(filteredData?.length / postsPerPage)} onPageChange={setCurrentPage} />
        </div>
      )}
    </>
  );
}

export default Citas;
