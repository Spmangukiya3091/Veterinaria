import React, { useEffect, useState } from "react";
import "./PropietariosDetails.scss";
import { ButtonGroup, Col, Collapse, Dropdown, Row, Spinner } from "react-bootstrap";
import MainTab from "./Tabs/MainTab";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Alert from "../../../../Components/alert/Alert";
import PropietariousModal from "../modal/PropietariousModal";
import moment from "moment";
import { useGetPetByOwnerQuery, useGetSingleOwnerQuery, useRemoveOwnerMutation } from "../../../../../services/ApiServices";
import { failer, success } from "../../../../Components/alert/success";
import DeleteVerifyModal from "../../../../Components/alert/VerifyModal/DeleteVerifyModal";
import Loader from "../../../../Components/loader/Loader";

const PropietariosDetails = ({ email }) => {
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

  const response = useGetSingleOwnerQuery(id, { refetchOnMountOrArgChange: true });
  const petsByOwner = useGetPetByOwnerQuery(id, { refetchOnMountOrArgChange: true });

  useEffect(() => {
    if (!response.isLoading && !petsByOwner.isLoading) {
      setLoading(false);
      setData(response.data);
      setPetsData(petsByOwner.data);
    } else if (response.isError || petsByOwner.isError) {
      setError(true);
    }
  }, [response, id, petsByOwner]);

  const handleClose = () => {
    setOpen(false);
    response.refetch();
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
        id: dltData.id,
        email: dltData.email,
        pass: enteredPassword,
      };

      // Now you can use the updated state

      // Call the dltOwner API
      await dltOwner(body);

      navigate("/customerservice/propietarios");
    } else {
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
      navigate("/customerservice/propietarios");
    } else if (dltResponse.isError) {
      console.log(dltResponse.error);
      failer(dltResponse?.error?.data?.message);
      // dispatch(showToast(dltResponse.error.message, "FAIL_TOAST"));
    }
    // }, [dispatch, response]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  return (
    <>
      {loading === true ? (
        <Loader />
      ) : error === true ? (
        "Some Error Occured"
      ) : (
        <section className="propietariosdetails-section">
          <div className="heading">
            <p className="p-head">{data.ownerData.name + " " + data.ownerData.surname}</p>
            <p>Propietarios » {data.ownerData.name + " " + data.ownerData.surname}</p>
          </div>

          <Row className="flex-column flex-lg-row">
            <Col lg={2} xl={3} className="w-lg-250px w-xl-350px">
              <div className="head container-sm">
                <div className="img mb-7">
                  <i className="bi bi-person"></i>
                </div>

                <p className="fs-3 text-gray-800 text-hover-primary fw-bold mb-3">{data.ownerData.name + " " + data.ownerData.surname}</p>

                <div className="information">
                  <div className="time  text-center d-flex flex-wrap justify-content-between mb-3">
                    <div className="border border-gray-300 border-dashed rounded py-3 px-3  ">
                      <div className="fs-5 fw-bold text-gray-700">
                        <span className="w-75px fs-4">{data.totalAppointments}</span>
                      </div>
                      <div className="fw-semibold text-muted text-start fs-8">Agendadas</div>
                    </div>
                    <div className="border border-gray-300 border-dashed rounded py-3 px-3 ">
                      <div className="fs-5 fw-bold text-gray-700">
                        <span className="w-75px fs-4">{data.completeAppointments}</span>
                      </div>
                      <div className="fw-semibold text-muted text-start fs-8">Completadas</div>
                    </div>
                    <div className="border border-gray-300 border-dashed rounded py-3 px-3  ">
                      <div className="fs-5 fw-bold text-gray-700">
                        <span className="w-75px fs-4">{data.totalPets}</span>
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
                      Details
                      <span className="ms-2 rotate-180">
                        <i className={`fa-solid fa-chevron-${show ? "up" : "down"} fs-8`}></i>
                      </span>
                    </div>
                  </div>
                  <div className="separator"></div>
                  <Collapse in={show}>
                    <div id="kt_user_view_details" className="pb-5 fs-6">
                      <div className="fw-bold mt-5">Doc. Identidad</div>
                      <div className="text-gray-600">{data.ownerData.doc_identity}</div>

                      <div className="fw-bold mt-5">Fecha creación</div>
                      <div className="text-gray-600">{moment(data.ownerData.createdAt).format("DD MMM YYYY, HH:MM A")}</div>

                      <div className="fw-bold mt-5">Última Cita</div>
                      <div className="text-gray-600">
                        {data.lastAppointment.date !== "" ? moment(data.lastAppointment.date).format("DD MMM YYYY, HH:MM A") : "Sin última cita"}
                      </div>
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

                  <Dropdown.Menu
                    className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semibold fs-7 w-125px py-4"
                    
                    
                  >
                    <Dropdown.Item className="menu-item px-3">
                      <Link onClick={handleShow} to="#" className="menu-link px-3" >
                        Editar
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item className="menu-item px-3">
                      <Link onClick={() => setModalShow(true)} to="#" className="menu-link px-3 delete" >
                        Eliminar propietario
                      </Link>
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
