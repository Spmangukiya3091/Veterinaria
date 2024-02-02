import React, { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { Button, ButtonGroup, Col, Dropdown, Row, Spinner } from "react-bootstrap";
import "./resumen.scss";
import Medicamentos from "./medicamentos/Medicamentos";
import Metricas from "./metricas/Metricas";
import ProximasCitas from "./proximas-citas/ProximasCitas";
import { Link } from "react-router-dom";
import CitasChart from "./linechart/CitasChart";
import Column from "./column/Column";
import PtientesChart from "./doughnutchart/PtientesChart";
import {
  useGetAppoinmentGraphQuery,
  useGetMetricsQuery,
  useGetOwnerGraphQuery,
  useGetPaymentGraphQuery,
  useGetPendingAppoinmentQuery,
  useGetCategoryWithProductsQuery,
} from "../../../../services/ApiServices";

function Resumen() {
  const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  const [appoinmentData, setAppoinmentData] = useState([]);
  const [paymentData, setPaymentData] = useState([]);
  const [ownerData, setOwnerData] = useState([]);
  const [categoryListData, setCategoryListData] = useState([]);
  const [pendingAppointments, setPendingAppointments] = useState([]);

  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth());

  function getCurrentMonth() {
    const currentDate = new Date();
    const currentMonthIndex = currentDate.getMonth();
    return currentMonthIndex + 1; // Adding 1 to convert to 1-based index
  }

  const metricasData = useGetMetricsQuery(selectedMonth, { refetchOnMountOrArgChange: true });
  const appoinmentGraph = useGetAppoinmentGraphQuery(null, { refetchOnMountOrArgChange: true });
  const paymentGraph = useGetPaymentGraphQuery(null, { refetchOnMountOrArgChange: true });
  const ownerGraph = useGetOwnerGraphQuery(null, { refetchOnMountOrArgChange: true });
  const categoryList = useGetCategoryWithProductsQuery(null, { refetchOnMountOrArgChange: true });
  const pendingAppointmentsList = useGetPendingAppoinmentQuery(null, { refetchOnMountOrArgChange: true });

  useEffect(() => {
    if (
      !metricasData.isLoading &&
      !appoinmentGraph.isLoading &&
      !paymentGraph.isLoading &&
      !ownerGraph.isLoading &&
      !categoryList.isLoading &&
      !pendingAppointmentsList.isLoading
    ) {
      setLoading(false);
      setError(false);
      setData(metricasData.data);
      setAppoinmentData(appoinmentGraph.data);
      setPaymentData(paymentGraph.data);
      setOwnerData(ownerGraph.data);
      setCategoryListData(categoryList.data);
      setPendingAppointments(pendingAppointmentsList.data);
    } else if (
      metricasData.isError ||
      appoinmentGraph.isError ||
      paymentGraph.isError ||
      ownerGraph.isError ||
      categoryList.isError ||
      pendingAppointmentsList.isError
    ) {
      setLoading(false);
      setError(true);
    }
  }, [metricasData, appoinmentGraph, paymentGraph, ownerGraph, categoryList, pendingAppointmentsList]);

  const handleMonthChange = (event) => {
    const selectedMonthName = event.target.text;
    const selectedMonthIndex = months.findIndex((month) => month === selectedMonthName);
    setSelectedMonth(selectedMonthIndex + 1); // Adding 1 to convert to 1-based index
    setLoading(true); // Set loading to true when changing the month
  };
  return (
    <div className="resumen">
      <div className="resumen-top-container">
        <div className="main-title-box">
          <p className="resumen-main-title">Resumen</p>
          <p className="resumen-sub-title">Resumen</p>
        </div>
        <div className="calendar-box">
          <Dropdown as={ButtonGroup} align="end" className="filter-dropdown">
            <Dropdown.Toggle className="filter-btn">
              {`Mes: ${months[selectedMonth - 1]}`}
              <i className="fa-solid fa-chevron-down"></i>
            </Dropdown.Toggle>

            <Dropdown.Menu className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semibold fs-7 w-125px py-4">
              {months.map((month, index) => (
                <Dropdown.Item key={index} className="menu-item px-3" onClick={(e) => handleMonthChange(e)}>
                  <Link className="menu-link px-3">{month}</Link>
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>

      <div className="card-wrapper">
        {loading ? <Spinner animation="border" variant="primary" /> : error ? "Some Error Occured" : <Metricas month={selectedMonth} data={data} />}
      </div>

      <div className="calendar-section">
        <Row>
          <Col sm={12} md={6} lg={6}>
            <div className="calendar-card-wrapper">
              {loading ? <Spinner animation="border" variant="primary" /> : error ? "Some Error Occured" : <CitasChart data={appoinmentData} />}
            </div>
          </Col>
          <Col sm={12} md={6} lg={6}>
            <div className="calendar-card-wrapper">
              {loading ? <Spinner animation="border" variant="primary" /> : error ? "Some Error Occured" : <Column data={paymentData} />}
            </div>
          </Col>
        </Row>
      </div>

      <div>
        <div className="calendar-section">
          <Row>
            <Col sm={12} md={6} lg={6}>
              <div className="calendar-card-wrapper">
                {loading ? <Spinner animation="border" variant="primary" /> : error ? "Some Error Occured" : <PtientesChart data={ownerData} />}
              </div>
            </Col>
            <Col sm={12} md={6} lg={6}>
              {loading ? (
                <Spinner animation="border" variant="primary" />
              ) : error ? (
                "Some Error Occured"
              ) : (
                <Medicamentos data={categoryListData} filter={categoryList} />
              )}
            </Col>
          </Row>
          <div>
            {loading ? <Spinner animation="border" variant="primary" /> : error ? "Some Error Occured" : <ProximasCitas data={pendingAppointments} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Resumen;
