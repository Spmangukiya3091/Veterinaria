import React, { useEffect, useState } from "react";
import "./citasDetail.scss";
import { ButtonGroup, Col, Collapse, Dropdown, Row } from "react-bootstrap";

import MainTab from "./tabs/main/MainTab";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CitasModal from "../modal/CitasModal";
import Alert from "../../../../Components/alert/Alert";
import { useGetSingleAppointmentQuery, useRemoveAppointmentMutation } from "../../../../services/ApiServices";
import moment from "moment";
import DeleteVerifyModal from "../../../../Components/alert/VerifyModal/DeleteVerifyModal";
import { failer, success } from "../../../../Components/alert/success";
import { useDispatch } from "react-redux";
import { showToast } from "../../../../store/tostify";
import Loader from "../../../../Components/loader/Loader";

function CitasDetail({ email }) {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const id = location.pathname.split("/")[3];
  const [show, setShow] = useState(true);
  const [open, setOpen] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const singleCita = useGetSingleAppointmentQuery(id, { refetchOnMountOrArgChange: true });

  useEffect(() => {
    if (!singleCita.isLoading) {
      setLoading(false);
      setData(singleCita?.data?.appointments[0]);
      // console.log(singleCita?.data?.appointments[0])
    } else if (singleCita.isError) {
      setLoading(false);
      setError(true);
    }
  }, [singleCita]);

  const refetchApi = () => {
    singleCita.refetch();
  };
  const handleClose = () => {
    setOpen(false);
    singleCita.refetch();
  };
  const handleShow = () => {
    setOpen(true);
  };

  const [openform, setOpenform] = useState(false);
  const [dltCitas, response] = useRemoveAppointmentMutation();
  const [dltData, setDltData] = useState({
    id: "",
    pass: "",
    email: email,
  });

  const handleConfirmDelete = () => {
    // Close the alert modal
    setModalShow(false);

    // Set the appointment ID in dltData
    setDltData({
      ...dltData,
      id: data?.id,
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
      success();
      navigate("/dashboard/citas");
    } else {
      failer("Invalid Password ");
    }
  };

  useEffect(() => {
    if (!response.isLoading && response.status === "fulfilled") {
      setDltData({
        id: "",
        pass: "",
        email: "",
      });
      success();
      navigate("/dashboard/citas");
    } else if (response.isError) {
      // console.log(response.error);
      failer(response?.error?.data?.message);
      // dispatch(showToast(response.error.message, "FAIL_TOAST"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, response]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        "Some Error Occured"
      ) : (
        <div className="citas-detail-container">
          <div className="main-title-box">
            <p className="citas-detail-main-title">Citas {data?.id}</p>
            <p className="citas-detail-sub-title">Citas agendadas » Cita {data?.id}</p>
          </div>

          <Row className="flex-column flex-lg-row">
            <Col lg={2} xl={3} className="w-lg-250px w-xl-350px">
              <div className="head container-sm">
                <div className="d-flex flex-center w-100">
                  <div className="img mb-7">
                    <img src="/images/CitasAgendasIcon.svg" alt="citas" />
                  </div>
                </div>
                <p className="fs-3 text-gray-800 text-hover-primary fw-bold mb-3">Cita {data?.id}</p>

                <div className="mb-9">
                  <div className="mb-9">
                    <p
                      className={`d-inline fs-6 ${data?.status === "pending"
                        ? "badge badge-light-warning text-warning"
                        : data?.status === "complete"
                          ? "badge badge-light-success text-success"
                          : "badge badge-secondary text-dark"
                        }`}
                    >
                      {data?.status === "pending" ? "Pendiente" : data?.status === "complete" ? "Completado" : "No asistió"}
                    </p>
                  </div>
                </div>
                <div className="d-flex text-center flex-center">
                  <div className="border border-gray-300 border-dashed rounded py-3 px-3 mb-3">
                    <div className="fs-5 fw-bold text-gray-700">
                      <span className="w-75px">
                        {moment(`2023-01-01 ${data?.scheduleStart}`, "YYYY-MM-DD HH:mm:ss").format("h:mm ") +
                          " - " +
                          moment(`2023-01-01 ${data?.scheduleEnd}`, "YYYY-MM-DD HH:mm:ss").format("h:mm ")}
                      </span>
                    </div>
                    <div className="fw-semibold text-muted ">Horario</div>
                  </div>

                  <div className="border border-gray-300 border-dashed rounded py-3 px-3 mx-4 mb-3">
                    <div className="fs-5 fw-bold text-gray-700">
                      <span className="w-50px">{moment(data?.date).format("DD MMM YYYY")}</span>
                    </div>
                    <div className="fw-semibold text-muted ">Fecha</div>
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

                    <span
                      data-bs-toggle="tooltip"
                      data-bs-trigger="hover"
                      data-bs-original-title="Edit customer details"
                      data-kt-initialized="1"
                    ></span>
                  </div>
                  <div className="separator"></div>
                  <Collapse in={show}>
                    <div id="kt_user_view_details" className="pb-5 fs-6">
                      <div className="fw-bold mt-5">Mascota</div>
                      <div className="text-gray-600">{data?.pet}</div>

                      <div className="fw-bold mt-5">Propietario</div>
                      <div className="text-gray-600">{data?.owner}</div>

                      <div className="fw-bold mt-5">Doctor</div>
                      <div className="text-gray-600">{data?.veterinarian}</div>

                      <div className="fw-bold mt-5">Fecha creación</div>
                      <div className="text-gray-600">{moment(data?.createdAt).format("DD MMM YYYY, h:mm a")}</div>
                    </div>
                  </Collapse>
                </div>
              </div>
            </Col>
            <Col className="ms-lg-15">
              <div className="drop-down">
                <Dropdown as={ButtonGroup}>
                  <Dropdown.Toggle className="dropdown-toggle btn btn-sm btn-flex btn-center" id="dropdown-basic">
                    Accion
                    <i className="fa-solid fa-chevron-down"></i>
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semibold fs-7 w-125px py-4">
                    <Dropdown.Item className="menu-item px-3">
                      {data?.status === "pending" ? (
                        <Link
                          // to={`/dashboard/citas-view/`}
                          onClick={handleShow}
                          className="menu-link px-3"
                        >
                          Editar cita
                        </Link>
                      ) : (
                        <Link
                          // to={`/dashboard/citas-view/${data?.id}`}
                          onClick={handleShow}
                          className="menu-link px-3"
                        >
                          Editar cita
                        </Link>
                      )}
                    </Dropdown.Item>
                    <Dropdown.Item className="menu-item px-3">
                      <Link onClick={() => setModalShow(true)} className="menu-link px-3 delete">
                        Eliminar cita
                      </Link>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              <MainTab data={data} petId={data?.petId} refetch={refetchApi} />
            </Col>
          </Row>
          <CitasModal show={open} handleClose={handleClose} id={id} />
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
      )}
    </>
  );
}

export default CitasDetail;
