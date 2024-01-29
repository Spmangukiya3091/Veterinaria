import React, { useEffect, useState } from "react";
import "./PropietariosDetails.scss";
import { Col, Collapse, Row, Spinner } from "react-bootstrap";
import MainTab from "./Tabs/MainTab";
import { useLocation } from "react-router-dom";
import { useGetPetByOwnerQuery, useGetSingleOwnerQuery } from "../../../../../services/ApiServices";
import moment from "moment";

const PropietariosDetails = () => {
  const [show, setShow] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState();
  const [petsData, setPetsData] = useState();

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

  return (
    <>
      {loading === true ? (
        <Spinner animation="border" variant="primary" />
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
                      <div className="text-gray-600">{moment(data.ownerData.dob).format("DD MMM YYYY, HH:MM A")}</div>

                      <div className="fw-bold mt-5">Última Cita</div>
                      <div className="text-gray-600">
                        {data.lastAppointment !== null ? moment(data.lastAppointment).format("DD MMM YYYY, HH:MM A") : "Sin última cita"}
                      </div>
                    </div>
                  </Collapse>
                </div>
              </div>
            </Col>
            <Col className="ms-lg-15">
              <div className="second ">
                <MainTab data={data} petData={petsData} petAppointmentId={id} />
              </div>
            </Col>
          </Row>
        </section>
      )}
    </>
  );
};

export default PropietariosDetails;
