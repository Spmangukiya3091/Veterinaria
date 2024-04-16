import React, { useEffect, useState } from "react";
import "./pagosdetails.scss";
import { ButtonGroup, Col, Collapse, Dropdown, Row } from "react-bootstrap";

import { Link, useLocation, useNavigate } from "react-router-dom";
import MainTab from "./tabs/MainTab";
import Alert from "../../../../Components/alert/Alert";
import { useGetSinglePaymentQuery, useRemovePaymentMutation } from "../../../../services/ApiServices";
import moment from "moment";
import PagosModal from "../Modal/PagosModal";
import DeleteVerifyModal from "../../../../Components/alert/VerifyModal/DeleteVerifyModal";
import { failer, success } from "../../../../Components/alert/success";
import Loader from "../../../../Components/loader/Loader";
// import { showToast } from "../../../../store/tostify";
// import { useDispatch } from "react-redux";

const PagosDetails = ({ email }) => {
  const location = useLocation();
  const navigate = useNavigate();
  // const dispatch = useDispatch();

  const [showDropdown, setShowDropdown] = useState(true);
  const [show, setShow] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const id = location.pathname.split("/")[4];

  const paymentDetails = useGetSinglePaymentQuery(id, { refetchOnMountOrArgChange: true });

  useEffect(() => {
    if (!paymentDetails.isLoading) {
      setLoading(false);
      setError(false);
      setData(paymentDetails?.data?.payment);
    } else if (paymentDetails.isError) {
      setLoading(false);
      setError(false);
    }
  }, [paymentDetails]);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const [openform, setOpenform] = useState(false);
  const [dltPagos, response] = useRemovePaymentMutation();
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

      // Call the dltPagos API
      // console.log(body);
      await dltPagos(body);
    } else {
      failer("Invalid Password");
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
      navigate("/dashboard/pagos");
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
        <section className="pagosdetails-section">
          <div className="heading">
            <div className="main-title-box">
              <p className="pagos-main-title">Pago {data?.payment_no}</p>
              <p className="pagos-sub-title">Pagos registrados » Pago {data?.payment_no}</p>
            </div>
          </div>

          <Row className="flex-column flex-lg-row">
            <Col lg={2} xl={3} className="w-lg-250px w-xl-350px">
              <div className="head container-sm">
                <div className="img mb-7">
                  <i className="bi bi-receipt fs-3x"></i>
                </div>
                <p className="fs-3 text-gray-800 text-hover-primary fw-bold mb-3">{data?.payment_no}</p>

                <div className="information">
                  <div className="d-flex  text-center flex-center">
                    <div className="border border-gray-300 border-dashed rounded py-3 px-3 mb-3">
                      <div className="fs-5 fw-bold text-gray-700">
                        <span className="w-75px">$ {data?.final_amount || "-"}</span>
                      </div>
                      <div className="fw-semibold text-muted">Monto Final</div>
                    </div>
                  </div>

                  <div className="fs-6 pb-5">
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
                            setShowDropdown(!showDropdown);
                          }}
                        >
                          Details
                          <span className="ms-2 rotate-180">
                            <i className={`fa-solid fa-chevron-${showDropdown ? "up" : "down"} fs-8`}></i>
                          </span>
                        </div>
                      </div>
                      <div className="separator"></div>
                      <Collapse in={showDropdown}>
                        <div id="kt_user_view_details" className="pb-5 fs-6">
                          <div className="fw-bold mt-5">Servicio</div>
                          <div className="text-gray-600">{data?.service || "-"}</div>

                          <div className="fw-bold mt-5">Tipo de Pago</div>
                          <div className="text-gray-600">{data?.payment_method || "-"}</div>

                          <div className="fw-bold mt-5">Fecha creación</div>
                          <div className="text-gray-600">{data ? moment(data?.created_at).format("DD MMM YYYY, hh:mm A") : "-"}</div>
                        </div>
                      </Collapse>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col className="ms-lg-15">
              <div className="drop-down">
                <Dropdown as={ButtonGroup}>
                  <Dropdown.Toggle className="dropdown-toggle btn btn-sm  btn-flex btn-center" id="dropdown-basic">
                    Acción
                    <i className="fa-solid fa-chevron-down"></i>
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semibold fs-7 w-125px py-4">
                    <Dropdown.Item className="menu-item px-3">
                      <Link onClick={handleShow} href="#" className="menu-link px-3">
                        Editar
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item className="menu-item px-3">
                      <Link onClick={() => setModalShow(true)} href="#" className="menu-link px-3 delete">
                        Eliminar pago
                      </Link>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              <div className="second ">
                <MainTab data={data} />
              </div>
            </Col>
          </Row>
          <PagosModal show={show} onHide={handleClose} id={id} />
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

export default PagosDetails;
