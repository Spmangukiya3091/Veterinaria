import React, { useEffect, useState } from "react";
import "./inventory.scss";
import { Button, ButtonGroup, Dropdown, Form, Spinner } from "react-bootstrap";
import { inventoryData } from "./inventoryData";
import { Link } from "react-router-dom";
import InventoryModal from "./modal/InventoryModal";
import CategoryModal from "./modal/CategoryModal";
import SingleInputDateRangePicker from "../../../Components/date-picker/DatePicker";
import Alert from "../../../Components/alert/Alert";
import CitasPagination from "../../../Components/pagination/citas-pagination/Citas-Pagination";
import { useGetALlProductListQuery, useRemoveProductMutation } from "../../../../services/ApiServices";
import { failer, success } from "../../../Components/alert/success";
import DeleteVerifyModal from "../../../Components/alert/VerifyModal/DeleteVerifyModal";
import Loader from "../../../Components/loader/Loader";

const Inventory = ({ email }) => {
  const [show, setShow] = useState(false);
  const [showCategory, setShowCategory] = useState(false);
  const [dropdowns, setDropdown] = useState(new Array(inventoryData.length).fill(false));
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [PID, setPID] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  const [searchValue, setSearchValue] = useState("");
  const [searchData, setSearchData] = useState({
    status: "",
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
  const [dltInventory, response] = useRemoveProductMutation();

  const products = useGetALlProductListQuery(searchQuery, { refetchOnMountOrArgChange: true });

  useEffect(() => {
    if (!products.isLoading) {
      setLoading(false);
      setData(products?.data?.productList);
    } else if (products.isError) {
      setError(true);
      setLoading(false);
    }
  }, [products]);

  const handleClose = () => {
    setShow(false);
    products.refetch();
  };

  const handleHide = () => {
    setModalShow(false);
  };

  const handleCloseCategory = () => setShowCategory(false);
  const handleShowCategory = () => setShowCategory(true);
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
      status: "",
      startDate: "",
      endDate: "",
    });
    setSearchQuery("");
  };

  const filteredData = data.filter(({ product, category, presentation, sku }) => {
    const searchString = searchValue;
    return (
      product.toLowerCase().includes(searchString) ||
      category.toLowerCase().includes(searchString) ||
      presentation.toLowerCase().includes(searchString) ||
      sku.includes(searchString)
    );
  });

  const postsPerPage = 10;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const adjustedIndexOfFirstPost = Math.max(0, indexOfFirstPost);
  const currentPosts = filteredData.slice(adjustedIndexOfFirstPost, indexOfLastPost);

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
    // products.refetch(searchQuery);
    setDropdownOpen(false);
  };

  // Delete funcitonality
  const handleConfirmDelete = () => {
    // Close the alert modal
    setModalShow(false);

    // Set the appointment ID in dltData
    setDltData({
      ...dltData,
      id: PID,
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

      // Call the dltInventory API
      await dltInventory(body);
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
      products.refetch();
    } else if (response.isError) {
      // console.log(response.error);
      failer(response?.error?.data?.message);

      // dispatch(showToast(response.error.message, "FAIL_TOAST"));
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
        <div className="inventory">
          <div className="main-title-box">
            <p className="inventory-main-title">Inventario Productos</p>
            <p className="inventory-sub-title">Inventario Productos</p>
          </div>
          <div className="inventory-table-container">
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
                                  <option disabled>Seleccionar</option>
                                  <option value="active">Activo</option>
                                  <option value="inactive">Inactivo</option>
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
                              onClick={() => closeDropdown()}
                            >
                              Resetear
                            </button>
                            <button type="submit" className="btn btn-sm btn-primary" data-kt-menu-dismiss="true" onClick={() => handleSearchFilter()}>
                              Aplicar
                            </button>
                          </div>
                        </div>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>
                <div className="header-right">
                  {/* <Link className="export-btn btn btn-primary" to={`${process.env.REACT_APP_SERVER_URL}/product/productExcelSheet`}>
                    {" "}
                    <svg className="me-2" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                      <defs>
                        <clipPath id="a">
                          <path data-name="Rectángulo 11046" fill="#1d2328" stroke="#707070" d="M17 15h16v16H17z" />
                        </clipPath>
                      </defs>
                      <g data-name="Enmascarar grupo 57952" transform="translate(-17 -15)" clipPath="url(#a)">
                        <path
                          d="M26.6 15h-6.4a1.6 1.6 0 0 0-1.6 1.6v12.8a1.6 1.6 0 0 0 1.6 1.6h9.6a1.6 1.6 0 0 0 1.6-1.6v-9.6L26.6 15m3.2 14.4h-9.6V16.6h5.6v4h4v8.8m-1.6-7.2v5.68l-1.68-1.68-2.24 2.24-2.24-2.24 2.24-2.24-1.76-1.76Z"
                          fill="#1d2328"
                        />
                      </g>
                    </svg>{" "}
                    Exportar datos
                  </Link> */}
                  <Button onClick={handleShowCategory} className="export-btn">
                    Ver Categorías
                  </Button>
                  <Button onClick={() => setShow(true)} className="new-btn">
                    + Nuevo Producto
                  </Button>
                </div>
              </div>
              <div className="card-body pt-0">
                <table className="table align-middle table-row-dashed fs-6 gy-5" id="kt_ecommerce_products_table">
                  <thead>
                    <tr className="text-start text-gray-400 fw-bolder fs-7 text-uppercase gs-0">
                      <th className="">SKU</th>
                      <th className="text-start ">PRODUCTO</th>
                      <th className="text-start ">PRESENTACIÓN</th>
                      <th className="text-start ">PRECIO</th>
                      <th className="text-start ">CATEGORÍA</th>
                      <th className="text-start ">STOCK</th>
                      <th className="text-start ">ESTADO</th>
                      <th className="text-end ">ACCIONES</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentPosts.length > 0 ? (
                      currentPosts.map(({ id, sku, product, presentation, price, category, stock, status }, i) => (
                        <tr key={i}>
                          <td className="text-start pe-0">
                            <span className=" text-gray-600 ">{sku}</span>
                          </td>
                          <td className="text-start pe-0">{product}</td>

                          <td className="text-start pe-0" data-order="16">
                            {presentation}
                          </td>
                          <td className="text-start pe-0">{price}</td>
                          <td className="text-start pe-0">{category}</td>
                          <td className="text-start pe-0">{stock}</td>
                          <td className="text-start pe-0" data-order="status">
                            <div
                              className={`${
                                status === "inactive" ? "badge badge-light-danger text-danger" : "badge badge-light-primary text-primary "
                              } `}
                            >
                              <p className="mb-0">{status === "inactive" ? "Inactivo" : "Activo"}</p>
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
                                <Dropdown.Menu className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semibold fs-7 w-125px py-4">
                                  <Dropdown.Item className="menu-item px-3">
                                    <Link to={`/customerservice/Inventario/details/${id}`} className="menu-link px-3">
                                      Ver detalles
                                    </Link>
                                  </Dropdown.Item>
                                  <Dropdown.Item className="menu-item px-3">
                                    <Link
                                      onClick={() => {
                                        setShow(true);
                                        setPID(id);
                                      }}
                                      to="#"
                                      className="menu-link px-3"
                                    >
                                      Editar
                                    </Link>
                                  </Dropdown.Item>
                                  <Dropdown.Item className="menu-item px-3">
                                    <Link onClick={() => setModalShow(true)} to="#" className="menu-link px-3 delete">
                                      Eliminar producto
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
                        <td colSpan="8" className="text-center">
                          No data available
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
          <InventoryModal show={show} onHide={handleClose} id={PID} />
          <CategoryModal show={showCategory} handleClose={handleCloseCategory} email={email} />
          <CitasPagination current={currentPage} total={Math.ceil(filteredData.length / postsPerPage)} onPageChange={setCurrentPage} />
        </div>
      )}
    </>
  );
};

export default Inventory;
