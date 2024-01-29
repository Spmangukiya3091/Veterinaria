import React, { useEffect, useState } from "react";
import "./inventoryDetail.scss";
import { Col, Collapse, Row, Spinner } from "react-bootstrap";
import MainTab from "../Tabs/MainTab";
import { useLocation } from "react-router-dom";
import { useGetProductHistoryQuery, useGetSingleProductQuery } from "../../../../../services/ApiServices";
import moment from "moment";
const InventoryDetails = () => {
  const location = useLocation();
  const [show, setShow] = useState(true);
  const [data, setData] = useState([]);
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const id = location.pathname.split("/")[4];
  const productDetails = useGetSingleProductQuery(id, { refetchOnMountOrArgChange: true });
  const productHistory = useGetProductHistoryQuery(id, { refetchOnMountOrArgChange: true });

  useEffect(() => {
    if (!productDetails.isLoading && !productHistory.isLoading) {
      setData(productDetails?.data?.product[0]);
      setHistoryData(productHistory.data);
      setLoading(false);
    } else if (productDetails.isError || productHistory.isError) {
      setError(true);
      setLoading(false);
    }
  }, [productDetails, productHistory]);
  return (
    <>
      {loading === true ? (
        <Spinner animation="border" variant="primary" />
      ) : error === true ? (
        "Some Error Occured"
      ) : (
        <section className="inventorydetails-section">
          <div className="heading">
            <h1>{data.product}</h1>
            <p>Inventario Productos » {data.product}</p>
          </div>
          <Row className="flex-column flex-lg-row">
            <Col lg={2} xl={3} className="w-lg-250px w-xl-350px">
              <div className="head container-sm">
                <div className="img mb-7">
                  <i className="bi bi-capsule-pill"></i>
                </div>
                <p className="fs-3 text-gray-800 text-hover-primary fw-bold mb-3">{data.product}</p>
                <div className={`mb-9 fs-6 ${data.status === "active" ? "badge badge-light-primary" : "badge badge-light-danger"}`}>
                  {data.status === "active" ? "Activo" : "Inactivo"}
                </div>

                <div className="information">
                  <div className="d-flex  text-center flex-center">
                    <div className="border border-gray-300 border-dashed rounded py-3 px-3 mb-3">
                      <div className="fs-5 fw-bold text-gray-700">
                        <span className="w-75px">$ {data.price + ".00"}</span>
                      </div>
                      <div className="fw-semibold text-muted">Precio</div>
                    </div>

                    <div className="border border-gray-300 border-dashed rounded py-3 px-3 mx-4 mb-3">
                      <div className="fs-5 fw-bold text-gray-700">
                        <span className="w-50px">{data.stock}</span>
                      </div>
                      <div className="fw-semibold text-muted">Stock</div>
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
                          <div className="fw-bold mt-5">Presentación</div>
                          <div className="text-gray-600">{data.presentation}</div>

                          <div className="fw-bold mt-5">Fecha creación</div>
                          <div className="text-gray-600">{moment(data.createdAt).format("DD MMM YYYY, hh:mm A")}</div>

                          <div className="fw-bold mt-5">Última actualización</div>
                          <div className="text-gray-600">{moment(data.updatedAt).format("DD MMM YYYY, hh:mm A")}</div>
                        </div>
                      </Collapse>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col className="ms-lg-15">
              <div className="second ">
                <MainTab data={data} historyData={historyData} />
              </div>
            </Col>
          </Row>
        </section>
      )}
    </>
  );
};

export default InventoryDetails;
