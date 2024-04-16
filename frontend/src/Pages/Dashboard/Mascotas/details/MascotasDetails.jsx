import React, { useEffect, useState } from "react";
import "./mascotasDetails.scss";
import { Button, ButtonGroup, Col, Collapse, Dropdown, Row } from "react-bootstrap";
import MainTab from "./Tabs/MainTab";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CitasModal from "../../citas/modal/CitasModal";
import MascotasModal from "../modal/MascotasModal";
import Alert from "../../../../Components/alert/Alert";
import { useGetSinglePetQuery, usePetSummaryPdfQuery, useRemovePetMutation } from "../../../../services/ApiServices";
import moment from "moment";
import ExportModal from "../modal/ExportModal";
import DeleteVerifyModal from "../../../../Components/alert/VerifyModal/DeleteVerifyModal";
import { failer, success } from "../../../../Components/alert/success";
// import { showToast } from "../../../../store/tostify";
// import { useDispatch } from "react-redux";
import Loader from "../../../../Components/loader/Loader";

const MascotasDetails = ({ email }) => {
  const location = useLocation();
  const id = location.pathname.split("/")[4];
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const [show, setShow] = useState(true);
  const [shown, setShown] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [exportMdl, setExport] = useState(false);
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);
  const [openform, setOpenform] = useState(false);
  const [dltData, setDltData] = useState({
    id: "",
    pass: "",
    email: email,
  });
  const [dltMascotas, response] = useRemovePetMutation();

  const petDetails = useGetSinglePetQuery(id, { refetchOnMountOrArgChange: true });
  const generatePdf = usePetSummaryPdfQuery(id, { refetchOnMountOrArgChange: true })

  useEffect(() => {
    if (!petDetails.isLoading) {
      setLoading(false);
      setData(petDetails.data);
    } else if (petDetails.isError) {
      setLoading(false);
      setError(true);
      // console.log("error", petDetails.error);
    }
  }, [id, petDetails]);

  const handleCloseMascota = () => {
    setShown(false);
    petDetails.refetch();
  };
  const handleShowMascota = () => setShown(true);
  const handleExpClose = () => setExport(false);

  const handleCloseCitas = () => setOpen(false);
  const handleShowCitas = () => setOpen(true);

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

  const handleOpenPdfModal = async () => {
    setExport(true)
    await generatePdf.refetch()
  }

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

      // Call the dltMascotas API
      await dltMascotas(body);
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
      navigate("/dashboard/mascotas");
    } else if (response.isError && response.status === "rejected") {
      // console.log(response.error);
      // dispatch(showToast(response.error.message, "FAIL_TOAST"));
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
        <section className="mascotasdetails-section">
          <div className="heading d-flex justify-content-between align-items-center">
            <div>
              <p className="p-head">{data?.pet?.name}</p>
              <p>Mascotas » {data?.pet?.name}</p>
            </div>
            <div className="">
              <Button onClick={() => handleOpenPdfModal()}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" className="me-4">
                  <defs>
                    <clipPath id="a">
                      <path data-name="Rectángulo 11082" fill="#fff" stroke="#707070" d="M-19193 2265h18v18h-18z" />
                    </clipPath>
                  </defs>
                  <g data-name="Enmascarar grupo 57961" transform="translate(19193 -2265)" clipPath="url(#a)">
                    <path
                      d="M-19179.091 2267.455a6.4 6.4 0 0 0-2.741.5 4.959 4.959 0 0 0-4.336 0 6.4 6.4 0 0 0-2.741-.5c-2.454 0-4.091 6.545-4.091 8.182 0 .679 1.08 1.3 2.569 1.555.524 1.833 2.995 3.232 6.022 3.355v-3.5c-.483-.3-1.227-.851-1.227-1.407 0-.818 1.636-.818 1.636-.818s1.636 0 1.636.818c0 .556-.745 1.1-1.227 1.407v3.5c3.027-.123 5.5-1.522 6.022-3.355 1.489-.254 2.569-.875 2.569-1.555 0-1.636-1.636-8.182-4.091-8.182m-11.327 8.075a6.1 6.1 0 0 1-.941-.3c.2-2.266 1.8-5.809 2.5-6.136a7.427 7.427 0 0 1 1.071.088 13.038 13.038 0 0 0-2.63 6.348m3.968-1.53a.818.818 0 1 1 .814-.818.818.818 0 0 1-.818.818m4.909 0a.818.818 0 1 1 .818-.818.818.818 0 0 1-.818.818m3.968 1.53a13.038 13.038 0 0 0-2.635-6.348 7.427 7.427 0 0 1 1.08-.09c.7.327 2.291 3.87 2.5 6.136a5.551 5.551 0 0 1-.945.302Z"
                      fill="#fff"
                    />
                  </g>
                </svg>
                Visualizar Cartilla
              </Button>
            </div>
          </div>

          <Row className="flex-column flex-lg-row">
            <Col lg={2} xl={3} className="w-lg-250px w-xl-350px">
              <div className="head container-sm">
                <div className="img mb-7">
                  <img src="/images/DogIcon.svg" alt="mascota" height={"50px"} />
                </div>
                <p className="fs-3 text-gray-800 text-hover-primary fw-bold mb-3">{data?.pet?.name || "-"}</p>
                <div className="information">
                  <div className="time  text-center d-flex flex-wrap justify-content-center mb-3">
                    <div className="border border-gray-300 border-dashed rounded py-3 px-3 mx-2 ">
                      <div className="fs-5 fw-bold text-gray-700">
                        <span className="w-75px fs-4">{data?.totalAppointments || "0"} citas</span>
                      </div>
                      <div className="fw-semibold text-muted text-start fs-8">Agendadas</div>
                    </div>
                    <div className="border border-gray-300 border-dashed rounded py-3 px-3 mx-2">
                      <div className="fs-5 fw-bold text-gray-700">
                        <span className="w-75px fs-4">{data?.completeAppointments || "0"} citas</span>
                      </div>
                      <div className="fw-semibold text-muted text-start fs-8">Completadas</div>
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
                      <div className="fw-bold mt-5">Edad</div>
                      <div className="text-gray-600">{data?.pet?.age || "-"}</div>
                      <div className="fw-bold mt-5">Calificación</div>
                      <div className="text-gray-600 fw-bold fs-4">
                        <i className="bi bi-star-fill grey fs-2 text-primary me-2"></i>
                        {data?.pet?.rating === "NaN" || data?.pet?.rating === null ? "0.0" : data?.pet?.rating}
                      </div>

                      <div className="fw-bold mt-5">Propietario</div>
                      <Link to="/dashboard/propietarios/details">
                        {" "}
                        <div className="text-gray-600"> {data?.pet?.owner || "-"}</div>
                      </Link>

                      <div className="fw-bold mt-5">Fecha creación</div>
                      <div className="text-gray-600">{data?.pet?.dob ? moment(data?.pet?.dob).format("DD MMM YYYY, HH:MM A") : "-"}</div>

                      <div className="fw-bold mt-5">Última Cita</div>
                      <div className="text-gray-600">{data?.lastAppointment?.date ? moment(data?.lastAppointment?.date).format("DD MMM YYYY, HH:MM A") : "-"}</div>
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
                      <Link onClick={handleShowCitas} to="#" className="menu-link px-3">
                        Agenda cita
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item className="menu-item px-3">
                      <Link onClick={handleShowMascota} to="#" className="menu-link px-3">
                        Editar
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item className="menu-item px-3">
                      <Link onClick={() => setModalShow(true)} to="#" className="menu-link px-3 delete">
                        Eliminar
                      </Link>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              <div className="second ">
                <MainTab data={data?.pet} appointmentId={id} email={email} />
              </div>
            </Col>
          </Row>
          <ExportModal show={exportMdl} onHide={handleExpClose} id={id} />
          <MascotasModal show={shown} handleClose={handleCloseMascota} id={id} />
          <CitasModal show={open} handleClose={handleCloseCitas} />
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

export default MascotasDetails;
