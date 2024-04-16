/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "./veterinaProfileDetails.scss";
import { ButtonGroup, Col, Collapse, Dropdown, Image, Row, Spinner } from "react-bootstrap";
import MainTab from "./Tabs/MainTab";

import { Link, useLocation, useNavigate } from "react-router-dom";
import Alert from "../../../../Components/alert/Alert";
import VeterinaUserModal from "../Modals/VeterinaUserModal";
import CitaModal from "../Modals/CitaModal";
import { useGetSingleVeterinQuery, useRemoveVeterineMutation } from "../../../../services/ApiServices";
import moment from "moment";
import DeleteVerifyModal from "../../../../Components/alert/VerifyModal/DeleteVerifyModal";
import { failer, success } from "../../../../Components/alert/success";
import { showToast } from "../../../../store/tostify";
import { useDispatch } from "react-redux";
import axios from "axios";
import Loader from "../../../../Components/loader/Loader";

const VeterinaProfileDetails = ({ email }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const id = location.pathname.split("/")[4];
  const [show, setShow] = useState(true);
  const [shown, setShown] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [openform, setOpenform] = useState(false);
  const [dltData, setDltData] = useState({
    id: "",
    pass: "",
    email: email,
  });
  const [dltMascotas, response] = useRemoveVeterineMutation();

  const veterinDetail = useGetSingleVeterinQuery(id, { refetchOnMountOrArgChange: true });

  useEffect(() => {
    if (!veterinDetail.isLoading) {
      setLoading(false);
      setData(veterinDetail.data);
    } else if (veterinDetail.isError) {
      setError(true);
      setLoading(false);
    }
  }, [veterinDetail]);

  const handleCloseMascota = () => setShown(false);
  const handleHide = () => {
    setModalShow(false);
  };
  const [open, setOpen] = useState(false);

  const handleCloseCitas = () => {
    setOpen(false);
    veterinDetail.refetch();
  };

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
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
        id: dltData?.id,
        email: dltData?.email,
        pass: enteredPassword,
      };

      // Now you can use the updated state

      // Call the dltMascotas API
      await dltMascotas(body);
    } else {
      failer("Invalid Password ");
    }
  };

  const handleExportData = async () => {
    try {
      const cookies = document.cookie.split(";");
      let jwtCookie = null;

      cookies.forEach((cookie) => {
        if (cookie.includes("authToken=")) {
          jwtCookie = "Bearer " + cookie.split("authToken=")[1].trim();
        }
      });

      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/veterinarian/veterinariansExcelSheet/${id}`, {
        headers: {
          Authorization: jwtCookie,
        },
        responseType: "blob", // Specify the response type as blob
      });

      // Create a Blob URL and initiate download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `DoctorData_${id}.xlsx`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      // Handle errors
      console.error("Error exporting data:", error);
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
      navigate("/dashboard/veterinarios");
    } else if (response.isError && response.status === "rejected") {
      // console.log(response.error);
      // dispatch(showToast(response.error.message, "FAIL_TOAST"));
      failer(response?.error?.data?.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        "Some Error Occured"
      ) : (
        <section className="mascotasdetails-section">
          <div className="heading">
            <p className="p-head">DR. {data?.veterinarianData?.name + " " + data?.veterinarianData?.surname || "-"}</p>
            <p>Veterinarios » DR. {data?.veterinarianData?.name + " " + data?.veterinarianData?.surname || "-"}</p>
          </div>

          <Row className="flex-column flex-lg-row">
            <Col lg={2} xl={3} className="w-lg-250px w-xl-350px">
              <div className="head container-sm">
                <div className="symbol symbol-100px symbol-circle mb-7">
                  <Image src={data?.veterinarianData?.avatar || "/images/doctor1.png"} className="object-fit-cover" alt="image" />
                </div>
                <p className="fs-3 text-gray-800 text-hover-primary fw-bold mb-3">
                  DR. {data?.veterinarianData?.name + " " + data?.veterinarianData?.surname || "-"}
                </p>
                <div className="information">
                  <div className="d-flex  text-start flex-center">
                    <div className="border border-gray-300 border-dashed rounded py-3 px-3 mb-3">
                      <div className="fs-5 fw-bold text-gray-700">
                        <span className="w-75px">{data?.totalAppointments || 0} citas</span>
                      </div>
                      <div className="fw-semibold text-muted">Citas totales</div>
                    </div>

                    <div className="border border-gray-300 border-dashed rounded py-3 px-3 mx-4 mb-3">
                      <div className="fs-5 fw-bold text-gray-700">
                        <span className="w-50px">{data?.pendingAppointments || 0} citas</span>
                      </div>
                      <div className="fw-semibold text-muted">Citas pendientes</div>
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
                        <i className={`fa-solid fa-chevron-${show ? "up" : "down"} fs-8`}></i>
                      </span>
                    </div>
                  </div>
                  <div className="separator"></div>
                  <Collapse in={show}>
                    <div id="kt_user_view_details" className="pb-5 fs-6">
                      <div className="fw-bold mt-5">Especialidad</div>
                      <div className="text-gray-600">{data?.veterinarianData?.speciality || "-"}</div>

                      <div className="fw-bold mt-5">Doc. Identidad</div>
                      <div className="text-gray-600">{data?.veterinarianData?.identity || "-"}</div>

                      <div className="fw-bold mt-5">Fecha creación</div>
                      <div className="text-gray-600">{moment(data?.veterinarianData?.createdAt).format("DD MMM YYYY, HH:mm A") || "-"}</div>

                      <div className="fw-bold mt-5">Última Cita</div>
                      <div className="text-gray-600">
                        {data?.lastAppointment === null ? "Sin cita" : moment(data?.lastAppointment).format("DD MMM YYYY, HH:mm A")}
                      </div>
                    </div>
                  </Collapse>
                </div>
              </div>
            </Col>
            <Col className="ms-lg-15">
              <div className="drop-down">
                <Dropdown as={ButtonGroup} show={isDropdownOpen} onClose={closeDropdown} onToggle={toggleDropdown} className="dropdown">
                  <Dropdown.Toggle className={`dropdown-toggle btn btn-sm btn-flex btn-center ${isDropdownOpen ? "active" : ""}`} id="dropdown-basic">
                    Accion
                    <i className="fa-solid fa-chevron-down"></i>
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semibold fs-7 w-125px py-4">
                    <Dropdown.Item className="menu-item px-3">
                      <Link
                        to={"#"}
                        onClick={() => {
                          setShown(true);
                        }}
                        href="#"
                        className="menu-link px-3"
                      >
                        Agenda cita
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item className="menu-item px-3">
                      <Link
                        to={"#"}
                        onClick={() => {
                          setOpen(true);
                        }}
                        href="#"
                        className="menu-link px-3"
                      >
                        Editar
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item className="menu-item px-3">
                      <Link to={"#"} href="#" className="menu-link px-3" onClick={() => { handleExportData() }}>
                        Exportar datos
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item className="menu-item px-3">
                      <Link to={"#"} onClick={() => setModalShow(true)} href="#" className="menu-link px-3 delete">
                        Eliminar
                      </Link>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              <div className="second ">
                <MainTab data={data} appoinmentID={id} />
              </div>
            </Col>
          </Row>
          <CitaModal show={shown} onHide={handleCloseMascota} />

          <VeterinaUserModal show={open} onHide={handleCloseCitas} id={data?.veterinarianData?.id} filter={veterinDetail} />
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
        </section>
      )}
    </>
  );
};

export default VeterinaProfileDetails;
