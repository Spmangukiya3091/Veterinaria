import React, { useEffect, useState } from "react";
import "./PropietariosDetails.scss";
import { ButtonGroup, Col, Collapse, Dropdown, Row } from "react-bootstrap";
import MainTab from "./Tabs/MainTab";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Alert from "../../../../Components/alert/Alert";
import PropietariousModal from "../modal/PropietariousModal";
import { useGetPetByOwnerQuery, useGetSingleOwnerQuery, useRemoveOwnerMutation } from "../../../../services/ApiServices";
import moment from "moment";
import DeleteVerifyModal from "../../../../Components/alert/VerifyModal/DeleteVerifyModal";
import { failer, success } from "../../../../Components/alert/success";
import Loader from "../../../../Components/loader/Loader";
import Error from "../../../../Components/error/Error";
// import { useDispatch } from "react-redux";
// import { showToast } from "../../../../store/tostify";

const PropietariosDetails = ({ email }) => {
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = useState(true);
  const [open, setOpen] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState();
  const [petsData, setPetsData] = useState();
  const [userID, setUserID] = useState();
  const [openform, setOpenform] = useState(false);
  const [dltOwner, dltResponse] = useRemoveOwnerMutation();
  const [dltData, setDltData] = useState({
    id: "",
    pass: "",
    email: email,
  });

  const location = useLocation();
  const id = location.pathname.split("/")[4];

  const singleOwner = useGetSingleOwnerQuery(id, { refetchOnMountOrArgChange: true, skip: id === undefined });
  const petsByOwner = useGetPetByOwnerQuery(id, { refetchOnMountOrArgChange: true });

  useEffect(() => {
    if (!singleOwner.isLoading && !petsByOwner.isLoading) {
      setLoading(false);
      setData(singleOwner.data);
      setPetsData(petsByOwner.data);
    } else if (singleOwner.isError || petsByOwner.isError) {
      setError(true);
    }
  }, [singleOwner, id, petsByOwner]);

  const handleClose = () => {
    setOpen(false);
    singleOwner.refetch();
  };
  const handleShow = () => {
    setOpen(true);
    setUserID(id);
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

      // Call the dltOwner API
      await dltOwner(body);
    } else {
      failer("Invalid Password");
    }
  };
  useEffect(() => {
    if (!dltResponse.isLoading && dltResponse.status === "fulfilled") {
      success();
      setDltData({
        id: "",
        pass: "",
        email: "",
      });
      // Refetch or update data if needed
      navigate("/dashboard/propietarios");
    } else if (dltResponse.isError) {
      // console.log(dltResponse.error);
      // failer(dltResponse?.error?.data?.message);
      failer("Contraseña incorrecta");

      // dispatch(showToast(dltResponse.error.message, "FAIL_TOAST"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dltResponse]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Error message={singleOwner?.isError ? singleOwner?.error?.data?.message : petsByOwner.isError ? petsByOwner.error?.data.message : "Error Interno del Servidor"} />
      ) : (
        <section className="propietariosdetails-section">
          <div className="heading">
            <p className="p-head">{data?.ownerData?.name + " " + data?.ownerData?.surname}</p>
            <p>Propietarios » {data?.ownerData?.name + " " + data?.ownerData?.surname}</p>
          </div>

          <Row className="flex-column flex-lg-row">
            <Col lg={2} xl={3} className="w-lg-250px w-xl-350px">
              <div className="head container-sm">
                <div className="img mb-7">
                  <i className="bi bi-person"></i>
                </div>

                <p className="fs-3 text-gray-800 text-hover-primary fw-bold mb-3">{data?.ownerData?.name + " " + data?.ownerData?.surname}</p>

                <div className="information">
                  <div className="time  text-center d-flex flex-wrap justify-content-between mb-3">
                    <div className="border border-gray-300 border-dashed rounded py-3 px-3  ">
                      <div className="fs-5 fw-bold text-gray-700">
                        <span className="w-75px fs-4">{data?.totalAppointments || 0}</span>
                      </div>
                      <div className="fw-semibold text-muted text-start fs-8">Agendadas</div>
                    </div>
                    <div className="border border-gray-300 border-dashed rounded py-3 px-3 ">
                      <div className="fs-5 fw-bold text-gray-700">
                        <span className="w-75px fs-4">{data?.completeAppointments || 0}</span>
                      </div>
                      <div className="fw-semibold text-muted text-start fs-8">Completadas</div>
                    </div>
                    <div className="border border-gray-300 border-dashed rounded py-3 px-3  ">
                      <div className="fs-5 fw-bold text-gray-700">
                        <span className="w-75px fs-4">{data?.totalPets || 0}</span>
                      </div>
                      <div className="fw-semibold text-muted text-start fs-8">Animales</div>
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
                      Detalles
                      <span className="ms-2 rotate-180">
                        <i className={`fa-solid fa-chevron-${show ? "up" : "down"} fs-8`}></i>
                      </span>
                    </div>
                  </div>
                  <div className="separator"></div>
                  <Collapse in={show}>
                    <div id="kt_user_view_details" className="pb-5 fs-6">
                      <div className="fw-bold mt-5">Doc. Identidad</div>
                      <div className="text-gray-600">{data?.ownerData?.doc_identity || "-"}</div>

                      <div className="fw-bold mt-5">Fecha creación</div>
                      <div className="text-gray-600">{data?.ownerData?.createdAt ? moment(data?.ownerData?.createdAt).format("DD MMM YYYY, HH:MM A") : "-"}</div>

                      <div className="fw-bold mt-5">Última Cita</div>
                      <div className="text-gray-600">
                        {data?.lastAppointment !== null ? moment(data?.lastAppointment.date).format("DD MMM YYYY, HH:MM A") : "Sin última cita"}
                      </div>
                    </div>
                  </Collapse>
                </div>
              </div>
            </Col>
            <Col className="ms-lg-15">
              <div className="drop-down" style={{ zIndex: 99 }}>
                <Dropdown as={ButtonGroup}>
                  <Dropdown.Toggle className="dropdown-toggle btn btn-sm btn-flex btn-center" id="dropdown-basic">
                    Accion
                    <i className="fa-solid fa-chevron-down"></i>
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semibold fs-7 w-125px py-4">
                    <Dropdown.Item className="menu-item px-3">
                      <Link onClick={handleShow} to="#" className="menu-link px-3">
                        Editar
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item className="menu-item px-3">
                      <div
                        onClick={() => {
                          setModalShow(true);
                        }}
                        className="menu-link px-3 delete"
                      >
                        Eliminar propietario
                      </div>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              <div className="second ">
                <MainTab data={data} petData={petsData} petAppointmentId={id} />
              </div>
            </Col>
          </Row>
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
          <PropietariousModal show={open} id={userID} onHide={handleClose} />
        </section>
      )}
    </>
  );
};

export default PropietariosDetails;
