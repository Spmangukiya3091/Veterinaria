import React, { useEffect, useState } from "react";
import "./vacunasDetail.scss";
import { Col, Collapse, Row, } from "react-bootstrap";
import MainTab from "./Tabs/MainTab";
import { useLocation } from "react-router-dom";
import VacunasModal from "../Modal/VacunasModal";
import Alert from "../../../../Components/alert/Alert";
import { useGetSingleVaccineQuery } from "../../../../../services/ApiServices";
import moment from "moment";
import Loader from "../../../../Components/loader/Loader";
import Error from "../../../../Components/error/Error";

const VacunasDetails = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[4];

  const [showDropdown, setShowDropdown] = useState(true);
  const [show, setShow] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const vaccineDetail = useGetSingleVaccineQuery(id, { refetchOnMountOrArgChange: true });

  useEffect(() => {
    if (!vaccineDetail.isLoading) {
      setLoading(false);
      setData(vaccineDetail.data);
    } else if (vaccineDetail.isError) {
      setLoading(false);
      setError(true);
    }
  }, [vaccineDetail]);

  const handleClose = () => setShow(false);
  const handleHide = () => {
    setModalShow(false);
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Error message={vaccineDetail?.isError ? vaccineDetail?.error?.data?.message : "Error Interno del Servidor"} />

      ) : (
        <section className="vacunasDetails-section">
          <div className="heading">
            <h1>{data?.vaccine?.name}</h1>
            <p>Vacunas » {data?.vaccine?.name}</p>
          </div>

          <Row className="flex-column flex-lg-row">
            <Col lg={2} xl={3} className="w-lg-250px w-xl-350px">
              <div className="head container-sm">
                <div className="img mb-7">
                  <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 32 32" className="fs-5x">
                    <defs>
                      <clipPath id="a">
                        <path data-name="Rectángulo 11095" fill="#8a98a5" stroke="#707070" d="M155 50h32v32h-32z" />
                      </clipPath>
                    </defs>
                    <g data-name="Enmascarar grupo 57966" transform="translate(-155 -50)" clipPath="url(#a)">
                      <path
                        data-name="Trazado 64979"
                        d="m186.725 54.285-4.01-4.01a.937.937 0 0 0-1.326 1.325l.006.006-4.022 4.022-2.954-2.953A.937.937 0 0 0 173.094 54l1.171 1.171-13.286 13.286a3.464 3.464 0 0 0-.539 4.193l-1.155 1.15a2.2 2.2 0 0 0-.239 2.824l-3.771 3.776a.937.937 0 0 0 1.325 1.325l3.764-3.764a2.2 2.2 0 0 0 2.876-.2l1.167-1.167a3.462 3.462 0 0 0 4.136-.571l13.286-13.287 1.064 1.064a.938.938 0 0 0 1.326-1.326l-2.847-2.847 4.022-4.022a.938.938 0 1 0 1.331-1.32Zm-25.267 22.148-.847-.847a.323.323 0 0 1 0-.457l1.075-1.075 1.3 1.3-1.071 1.079a.323.323 0 0 1-.457 0Zm5.76-1.738a1.585 1.585 0 0 1-2.239 0l-2.63-2.629-.049-.044a1.585 1.585 0 0 1 0-2.239l6.909-6.909 4.913 4.913-1.3 1.3-1.05-1.05a.938.938 0 0 0-1.326 1.326l1.05 1.05-1.343 1.347-1-1a.938.938 0 0 0-1.326 1.326l1 1Zm8.234-8.234-4.913-4.913 5.051-5.048 4.91 4.91Zm4.594-8.161-1.346-1.346 4.02-4.022 1.348 1.348Z"
                        fill="#8a98a5"
                      />
                    </g>
                  </svg>
                </div>
                <p className="fs-3 text-gray-800 text-hover-primary fw-bold mb-3">{data?.vaccine?.name || "-"}</p>
                <div className="information">
                  <div className="d-flex  text-center flex-center">
                    <div className="border border-gray-300 border-dashed rounded py-3 px-3 mb-3">
                      <div className="fs-5 fw-bold text-gray-700">
                        <span className="w-75px">{data?.apto || "-"}</span>
                      </div>
                      <div className="fw-semibold text-muted">N. de Aptos</div>
                    </div>

                    <div className="border border-gray-300 border-dashed rounded py-3 px-3 mx-4 mb-3">
                      <div className="fs-5 fw-bold text-gray-700">
                        <span className="w-50px">{data?.vaccinated || "-"}</span>
                      </div>
                      <div className="fw-semibold text-muted">Vacunados</div>
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

                          <div className="fw-bold mt-5">Fecha creación</div>
                          <div className="text-gray-600">{moment(data?.vaccine?.creation).format("DD MMM YYYY, hh:mm A") || "-"}</div>

                          <div className="fw-bold mt-5">Tiempo validez</div>
                          <div className="text-gray-600">{data?.vaccine?.validity || "-"} meses</div>
                        </div>
                      </Collapse>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col className="ms-lg-15">
              <div className="second ">
                <MainTab data={data} id={id} />
              </div>
            </Col>
          </Row>
          <Alert show={modalShow} onHide={handleHide} msg={"¿Seguro de completar esta operación?"} />
          <VacunasModal show={show} onHide={handleClose} />
        </section>
      )}
    </>
  );
};

export default VacunasDetails;
