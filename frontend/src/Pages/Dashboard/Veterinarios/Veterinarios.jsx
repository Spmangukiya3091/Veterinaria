import React, { useEffect, useState } from "react";
import { Button, ButtonGroup, Card, Col, Dropdown, Form, Row } from "react-bootstrap";
import "./veterinarios.scss";
import VeterinaModal from "./Modals/VeterinaModal";
import { useNavigate } from "react-router-dom";
import VeterinaUserModal from "./Modals/VeterinaUserModal";
import SingleInputDateRangePicker from "../../../Components/date-picker/DatePicker";
import Alert from "../../../Components/alert/Alert";
import CitasPagination from "../../../Components/pagination/citas-pagination/Citas-Pagination";
import { useGetSpecialitiesQuery, useGetVeterinariansFilterQuery } from "../../../services/ApiServices";
import Loader from "../../../Components/loader/Loader";

const Veterinarios = ({ email }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  const [specialityData, setSpecialityData] = useState([]);
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchData, setSearchData] = useState({
    speciality: "",
    startDate: "",
    endDate: "",
  });
  const veterinList = useGetVeterinariansFilterQuery(searchQuery, { refetchOnMountOrArgChange: true });
  const specialities = useGetSpecialitiesQuery({ refetchOnMountOrArgChange: true });

  useEffect(() => {
    if (!veterinList.isLoading && !specialities.isLoading) {
      setLoading(false);
      setData(veterinList?.data?.veterinarianList);
      setSpecialityData(specialities?.data?.specialityList);
    } else if (veterinList.isError || specialities.isError) {
      setError(true);
      setLoading(false);
      console.error("error occured", veterinList.error);
    }
  }, [specialities, veterinList]);

  const handleClose = () => {
    setShow(false)
    veterinList.refetch();
    specialities.refetch()
  };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };
  const closeDropdown = () => {
    setDropdownOpen(false);
    setSearchData({
      speciality: "",
      startDate: "",
      endDate: "",
    });
    setSearchQuery("");
  };
  const filteredData = data.filter(({ name, surname }) => {
    const searchString = searchValue.toLowerCase();
    return (
      name?.toLowerCase().includes(searchString) || surname?.toLowerCase().includes(searchString)
    );
  });
  const handleHide = () => {
    setModalShow(false);
  };
  const [openModal, setOpenModal] = useState(false);
  const handleModalHide = () => {
    setOpenModal(false);
    veterinList.refetch();
    specialities.refetch()
  };
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 12;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const adjustedIndexOfFirstPost = Math.max(0, indexOfFirstPost);
  const currentPosts = filteredData.slice(adjustedIndexOfFirstPost, indexOfLastPost);

  const handleSearchFilter = () => {
    // Refetch data based on the search criteria
    setSearchQuery(
      searchData.speciality === ""
        ? `?startDate=${searchData.startDate}&endDate=${searchData.endDate}`
        : searchData.startDate === "" && searchData.endDate === ""
          ? `?speciality=${searchData.speciality}`
          : searchData.speciality === "" && searchData.startDate === "" && searchData.endDate === ""
            ? ""
            : `?speciality=${searchData.speciality}&startDate=${searchData.startDate}&endDate=${searchData.endDate}`,
    );
    // veterinList.refetch();
    setDropdownOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchData({
      ...searchData,
      [name]: value,
    });
  };

  const handleChangeDate = (selectedDates) => {
    if (selectedDates && selectedDates.length === 2) {
      setSearchData({
        ...searchData,
        startDate: selectedDates[0] || "",
        endDate: selectedDates[1] || "",
      });
    }
  };
  return (
    <>
      <div className="veterinario">
        <div className="main-title-box">
          <p className="veterinario-main-title">Veterinarios</p>
          <p className="veterinario-sub-title">Veterinarios</p>
        </div>
        <div className="veterinario-table-container">
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
                            <label className="form-label fw-bold">Especialidad</label>
                            <div>
                              <select
                                className="form-select form-select-solid"
                                name="speciality"
                                onChange={handleChange}
                                value={searchData.speciality}
                              >
                                <option disabled="true" value={""} selected="true">Seleccionar</option>
                                {specialityData.map((speciality, i) => (
                                  <option key={i} value={speciality.speciality}>
                                    {speciality.speciality}
                                  </option>
                                ))}
                                {/* <option value="General medicine">General medicine</option> */}
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
                <Button className="export-btn" onClick={() => setShow(true)}>
                  Ver Especialidades
                </Button>
                <Button onClick={() => setOpenModal(true)} className="new-btn">
                  + Nueva Doctor
                </Button>
              </div>
            </div>
            {loading ? (
              <Loader />
            ) : error ? (
              "Some Error Occured"
            ) : (
              <div className="card-body">
                <Row>
                  {currentPosts.length > 0 ? (
                    currentPosts.map(({ id, avatar, name, surname, speciality }, i) => (
                      <Col sm={6} md={4} lg={3} key={i}>
                        <Card className="doctor-card">
                          <div className="image-container">
                            <Card.Img variant="top" src={avatar} />
                          </div>
                          <Card.Body>
                            <Card.Title>DR. {name + " " + surname}</Card.Title>
                            <Card.Text>{speciality}</Card.Text>
                            <div className="d-flex justify-content-center">
                              <Button variant="primary" onClick={() => navigate(`/dashboard/calendario?veterine=${id}`)} className="me-4">
                                {"Ver Calendario"}
                              </Button>
                              <Button variant="secondary" onClick={() => navigate(`/dashboard/veterinarios/details/${id}`)}>
                                {"Ver Perfil"}
                              </Button>
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>
                    ))
                  ) : (
                    <div>
                      <p>No records Found</p>
                    </div>
                  )}
                </Row>
              </div>
            )}
          </div>
        </div>
        <Alert show={modalShow} onHide={handleHide} msg={"¿Seguro de completar esta operación?"} />
        <VeterinaModal show={show} onHide={handleClose} email={email} />
        <CitasPagination current={currentPage} total={Math.ceil(filteredData.length / postsPerPage)} onPageChange={setCurrentPage} />
        <VeterinaUserModal show={openModal} onHide={handleModalHide} filter={veterinList} />
      </div>
    </>
  );
};

export default Veterinarios;
