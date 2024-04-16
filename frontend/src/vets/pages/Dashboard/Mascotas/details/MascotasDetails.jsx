import React, { useEffect, useState } from "react";
import "./mascotasDetails.scss";
import { Col, Collapse, Row } from "react-bootstrap";
import MainTab from "./Tabs/MainTab";
import { Link, useLocation } from "react-router-dom";
import { useGetSinglePetQuery } from "../../../../../services/ApiServices";
import moment from "moment";
import Loader from "../../../../components/loader/Loader";

const MascotasDetails = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[4];
  const [show, setShow] = useState(true);
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const petDetails = useGetSinglePetQuery(id, { refetchOnMountOrArgChange: true });

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
          </div>

          <Row className="flex-column flex-lg-row">
            <Col lg={2} xl={3} className="w-lg-250px w-xl-350px">
              <div className="head container-sm">
                <div className="img mb-7">
                  <img src="/images/DogIcon.svg" alt="mascota" height={"50px"} />
                </div>
                <p className="fs-3 text-gray-800 text-hover-primary fw-bold mb-3">{data?.pet?.name}</p>
                <div className="information">
                  <div className="time  text-center d-flex flex-wrap justify-content-center mb-3">
                    <div className="border border-gray-300 border-dashed rounded py-3 px-3 mx-2 ">
                      <div className="fs-5 fw-bold text-gray-700">
                        <span className="w-75px fs-4">{data?.totalAppointments} citas</span>
                      </div>
                      <div className="fw-semibold text-muted text-start fs-8">Agendadas</div>
                    </div>
                    <div className="border border-gray-300 border-dashed rounded py-3 px-3 mx-2">
                      <div className="fs-5 fw-bold text-gray-700">
                        <span className="w-75px fs-4">{data?.completeAppointments} citas</span>
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
                      <div className="text-gray-600">{data?.pet?.age}</div>
                      <div className="fw-bold mt-5">Calificación</div>
                      <div className="text-gray-600 fw-bold fs-4">
                        <i className="bi bi-star-fill grey fs-2 text-primary me-2"></i>
                        {data?.pet?.rating === "NaN" || data?.pet?.rating === null ? "0.0" : data?.pet?.rating}
                      </div>

                      <div className="fw-bold mt-5">Propietario</div>
                      <Link to="/dashboard/propietarios/details">
                        {" "}
                        <div className="text-gray-600"> {data?.pet?.owner}</div>
                      </Link>

                      <div className="fw-bold mt-5">Fecha creación</div>
                      <div className="text-gray-600">{moment(data?.pet?.dob).format("DD MMM YYYY, HH:MM A")}</div>

                      <div className="fw-bold mt-5">Última Cita</div>
                      <div className="text-gray-600">{moment(data?.lastAppointment?.date).format("DD MMM YYYY, HH:MM A")}</div>
                    </div>
                  </Collapse>
                </div>
              </div>
            </Col>
            <Col className="ms-lg-15">
              <div className="second ">
                <MainTab data={data?.pet} appointmentId={id} />
              </div>
            </Col>
          </Row>
        </section>
      )}
    </>
  );
};

export default MascotasDetails;
