/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import "./propietarios.scss";
import { Button, ButtonGroup, Dropdown, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import SingleInputDateRangePicker from "../citas/date-picker/DatePicker";
import PropietariousModal from "./modal/PropietariousModal";
import Alert from "../../../Components/alert/Alert";
import CitasPagination from "../../../Components/pagination/citas-pagination/Citas-Pagination";
import { useOwnerFilterQuery, useRemoveOwnerMutation } from "../../../../services/ApiServices";
import { failer, success } from "../../../Components/alert/success";
import DeleteVerifyModal from "../../../Components/alert/VerifyModal/DeleteVerifyModal";
import Loader from "../../../Components/loader/Loader";
import Error from "../../../Components/error/Error";

const Propietarios = ({ email }) => {
  const navigate = useNavigate();

  const [modalShow, setModalShow] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [id, setId] = useState();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [dropdowns, setDropdown] = useState(new Array(data?.ownersList?.length).fill(false));
  const [searchValue, setSearchValue] = useState("");
  const [searchData, setSearchData] = useState({
    startDate: "",
    endDate: "",
  });
  const [searchQuery, setSearchQuery] = useState("");

  const [openform, setOpenform] = useState(false);
  const [dltData, setDltData] = useState({
    id: "",
    pass: "",
    email: email,
  });
  const [dltOwner, response] = useRemoveOwnerMutation();

  const allOwnersList = useOwnerFilterQuery(searchQuery, { refetchOnMountOrArgChange: true });

  useEffect(() => {
    if (!allOwnersList.isLoading) {
      setLoading(false);
      setData(allOwnersList?.data?.ownersList);
    } else if (allOwnersList.isError) {
      setError(true);
      setLoading(false);
    }
  }, [allOwnersList]);

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

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
    setSearchData({
      startDate: "",
      endDate: "",
    });
    setSearchQuery("");
  };

  const filteredData = data.filter(({ name, surname, address, phone_1, doc_identity }) => {
    const searchString = searchValue.toLowerCase();

    // Convert phone_1 to a string (if it's not) before using includes
    const formattedPhone = String(phone_1);

    return (
      name?.toLowerCase().includes(searchString) ||
      surname?.toLowerCase().includes(searchString) ||
      address?.toLowerCase().includes(searchString) ||
      formattedPhone.includes(searchString) ||
      doc_identity?.toLowerCase().includes(searchString)
    );
  });

  const handleClose = () => {
    setShow(false);
    allOwnersList.refetch();
  };
  const handleShow = (id) => {
    setShow(true);
    setId(id);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const adjustedIndexOfFirstPost = Math.max(0, indexOfFirstPost);
  const currentPosts = filteredData.slice(adjustedIndexOfFirstPost, indexOfLastPost);

  const handleSearchFilter = () => {
    // Refetch data based on the search criteria
    setSearchQuery(
      searchData.startDate === "" && searchData.endDate === "" ? "" : `?startDate=${searchData.startDate}&endDate=${searchData.endDate}`,
    );
    // petList.refetch();
    setDropdownOpen(false);
  };

  const handleChangeDate = (selectedDates) => {
    if (selectedDates && selectedDates.length === 2) {
      setSearchData({
        startDate: selectedDates[0] || "",
        endDate: selectedDates[1] || "",
      });
    }
  };

  const handleConfirmDelete = () => {
    // Close the alert modal
    setModalShow(false);

    // Set the appointment ID in dltData
    setDltData({
      ...dltData,
      id: id,
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

      // Call the dltOwner API
      await dltOwner(body);
    } else {
      failer("Contraseña invalida");
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
      allOwnersList.refetch();
    } else if (response.isError) {
      // console.log(response.error);
      // failer(response?.error?.data?.message);
      failer("Contraseña incorrecta");

      // dispatch(showToast(response.error.message, "FAIL_TOAST"));
    }
    // }, [dispatch, response]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Error message={allOwnersList?.isError ? allOwnersList?.error?.data?.message : "Error Interno del Servidor"} />
      ) : (
        <div className="propietarios">
          <div className="main-title-box">
            <p className="propietarios-main-title">Propietarios</p>
            <p className="propietarios-sub-title">Propietarios</p>
          </div>
          <div className="propietarios-table-container">
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
                    <form autoComplete="new-password">
                      <input
                        type="text"
                        className="form-control form-control-solid ps-12 w-250px"
                        placeholder="Buscar"
                        value={searchValue}
                        autoComplete="disabled"
                        onChange={(e) => setSearchValue(e.target.value)}
                      />
                    </form>
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
                  <Button onClick={() => handleShow()} className="new-btn">
                    + Nuevo Propietario
                  </Button>
                </div>
              </div>
              <div className="card-body pt-0">
                <table className="table align-middle table-row-dashed fs-6 gy-5" id="kt_ecommerce_products_table">
                  <thead>
                    <tr className="text-start text-gray-400 fw-bolder fs-7 text-uppercase gs-0">
                      <th className="">ID</th>
                      <th className="text-start ">PROPIETARIO</th>
                      <th className="text-start ">DIRECCIÓN</th>
                      <th className="text-start ">TELÉFONO</th>
                      <th className="text-start ">
                        <div className="td-space">DOC. IDENTIDAD</div>
                      </th>
                      <th className="text-end ">ACCIONES</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentPosts?.length > 0 ? (
                      currentPosts.map(({ id, name, surname, address, phone_1, doc_identity }, i) => (
                        <tr key={i}>
                          <td className="text-start pe-0">
                            <span className=" text-gray-600 ">{i + 1 + (currentPage - 1) * postsPerPage}</span>
                          </td>

                          <td className="text-start pe-0" data-order="16">
                            {name && surname ? name + " " + surname : "-"}
                          </td>
                          <td className="text-start pe-0">{address ? address : "-"}</td>
                          <td className="text-start pe-0" data-order="estado">
                            {phone_1 ? phone_1 : "-"}
                          </td>
                          <td className="text-start pe-0" data-order="estado">
                            {doc_identity ? doc_identity : '-'}
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
                                <Dropdown.Menu className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semibold fs-7 w-125px py-4">
                                  <Dropdown.Item className="menu-item px-3">
                                    <div onClick={() => navigate(`/customerservice/propietarios/details/${id}`)} className="menu-link px-3">
                                      Ver detalles
                                    </div>
                                  </Dropdown.Item>
                                  <Dropdown.Item className="menu-item px-3">
                                    <div onClick={() => handleShow(id)} className="menu-link px-3">
                                      Editar
                                    </div>
                                  </Dropdown.Item>
                                  <Dropdown.Item className="menu-item px-3">
                                    <div
                                      onClick={() => {
                                        setModalShow(true);
                                        setId(id);
                                      }}
                                      className="menu-link px-3 delete"
                                    >
                                      Eliminar propietario
                                    </div>
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              )}
                            </Dropdown>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="text-center">
                          Datos no disponibles
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
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
          <PropietariousModal show={show} onHide={handleClose} id={id} />
          <CitasPagination current={currentPage} total={Math.ceil(filteredData?.length / postsPerPage)} onPageChange={setCurrentPage} />
        </div>
      )}
    </>
  );
};

export default Propietarios;
