import React, { useEffect, useState } from "react";
import "./mascotas.scss";
import { ButtonGroup, Dropdown, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import SingleInputDateRangePicker from "../citas/date-picker/DatePicker";
import CitasPagination from "../../../components/pagination/citas-pagination/Citas-Pagination";
import { useGetPetsByVeterinarianQuery } from "../../../../services/ApiServices";
import Loader from "../../../components/loader/Loader";

const Mascotas = ({ id }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchData, setSearchData] = useState({
    startDate: "",
    endDate: "",
  });
  const [searchQuery, setSearchQuery] = useState(`/${id}`);
  const petList = useGetPetsByVeterinarianQuery(searchQuery, { refetchOnMountOrArgChange: true });
  useEffect(() => {
    if (!petList.isLoading) {
      setLoading(false);
      setData(petList?.data?.pets);
    } else if (petList.isError) {
      setLoading(false);
      setError(false);
      console.error(petList.error);
    }
  }, [petList]);

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

  const filteredData = data.filter(({ name, owner, Species, sex }) => {
    const searchString = searchValue;
    return (
      name?.toLowerCase().includes(searchString) ||
      owner?.toLowerCase().includes(searchString) ||
      Species?.toLowerCase().includes(searchString) ||
      sex?.toLowerCase().includes(searchString)
    );
  });

  const handleSearchFilter = () => {
    // Refetch data based on the search criteria
    setSearchQuery(
      searchData.startDate === "" && searchData.endDate === "" ? `/${id}` : `/${id}?startDate=${searchData.startDate}&endDate=${searchData.endDate}`,
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
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  const indexOfLastPost = currentPage * postsPerPage;

  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  const adjustedIndexOfFirstPost = Math.max(0, indexOfFirstPost);

  const currentPosts = filteredData.slice(adjustedIndexOfFirstPost, indexOfLastPost);
  return (
    <>
      {loading === true ? (
        <Loader />
      ) : error === true ? (
        "Some Error Occured"
      ) : (
        <div className="mascotas">
          <div className="main-title-box">
            <p className="mascotas-main-title">Mascotas</p>
            <p className="mascotas-sub-title">Mascotas</p>
          </div>
          <div className="mascotas-table-container">
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
                <p className="text-gray-400 fw-bolder fs-5">{data?.length} mascotas</p>
              </div>
              <div className="card-body pt-0">
                <table className="table align-middle table-row-dashed fs-6 gy-5" id="kt_ecommerce_products_table">
                  <thead>
                    <tr className="text-start text-gray-400 fw-bolder fs-7 text-uppercase gs-0">
                      <th className="">ID</th>
                      <th className="text-start ">NOMBRE</th>
                      <th className="text-start ">PROPIETARIO</th>
                      <th className="text-start ">ESPECIE</th>
                      <th className="text-start ">SEXO</th>
                      <th className="text-start ">EDAD</th>
                      <th className="text-start ">CALIFICACIÓN</th>
                      <th className="text-end ">ACCIONES</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentPosts?.length > 0 ? (
                      currentPosts.map(({ id, name, owner, ownerId, Species, sex, age, rating }, i) => (
                        <tr key={i}>
                          <td className="text-start pe-0">
                            <span className=" text-gray-600 ">{i + 1}</span>
                          </td>
                          <td className="text-start pe-0">{name}</td>

                          <td className="text-start pe-0" data-order="16">
                            {owner}
                          </td>
                          <td className="text-start pe-0">
                            <div className=" fecha">{Species}</div>
                          </td>
                          <td className="text-start pe-0" data-order="estado">
                            {sex}
                          </td>
                          <td className="text-start pe-0" data-order="estado">
                            {age}
                          </td>
                          <td className="text-start pe-0" data-order="rating-5">
                            <div className="star-icon-wrapper">
                              <i className={"bi bi-star-fill grey"}></i> {rating === "NaN" || rating === null ? "0.0" : rating}
                            </div>
                          </td>
                          <td className="text-end">
                            <Link
                              to={`/veterine/mascotas/details/${id}`}
                              className="btn btn-sm btn-light btn-active-light-primary view-btn"
                              data-kt-menu-trigger="click"
                              data-kt-menu-placement="bottom-end"
                            >
                              Ver detalles
                            </Link>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="8" className="text-center">No data available</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <CitasPagination current={currentPage} total={Math.ceil(filteredData?.length / postsPerPage)} onPageChange={setCurrentPage} />
        </div>
      )}
    </>
  );
};

export default Mascotas;
