import React, { useEffect, useState } from "react";
import { ButtonGroup, Col, Dropdown, Row, Spinner } from "react-bootstrap";
import "./resumen.scss";
import Medicamentos from "./medicamentos/Medicamentos";
import Metricas from "./metricas/Metricas";
import ProximasCitas from "./proximas-citas/ProximasCitas";
import { Link } from "react-router-dom";
import CitasChart from "./linechart/CitasChart";
import Column from "./column/Column";
import PtientesChart from "./doughnutchart/PtientesChart";
import axios from "axios";

import {
  useGetAppoinmentGraphQuery,
  useGetMetricsQuery,
  useGetOwnerGraphQuery,
  useGetPaymentGraphQuery,
  useGetPendingAppoinmentQuery,
  useGetCategoryWithProductsQuery,
} from "../../../services/ApiServices";

function Resumen() {

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  const [appoinmentData, setAppoinmentData] = useState([]);
  const [paymentData, setPaymentData] = useState([]);
  const [ownerData, setOwnerData] = useState([]);
  const [categoryListData, setCategoryListData] = useState([]);
  const [pendingAppointments, setPendingAppointments] = useState([]);
  const getCurrentMonth2 = () => {
    const date = new Date();

    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1
    };

  };
  const [selectedMonth, setSelectedMonth] = useState({
    year: getCurrentMonth2().year,
    month: getCurrentMonth2().month
  });

  const getMonthName = (monthNumber) => {
    const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    return months[monthNumber - 1];
  };

  const getPastMonths = () => {
    const currentMonth = getCurrentMonth2();
    const months = [];

    for (let i = 0; i < 12; i++) {
      let year = currentMonth.year;
      let month = currentMonth.month - i;

      if (month <= 0) {
        month += 12;
        year -= 1;
      }

      months.unshift({
        year: year,
        month: month,
        monthName: getMonthName(month)
      });
    }

    // // Add default option "All" as the first item
    // months.unshift({ year: "", month: "", monthName: "All" });

    return months;
  };

  const pastMonths = getPastMonths().reverse();
  // console.log(pastMonths.reverse())
  const metricasData = useGetMetricsQuery(selectedMonth, { refetchOnMountOrArgChange: true });
  const appoinmentGraph = useGetAppoinmentGraphQuery({ refetchOnMountOrArgChange: true });
  const paymentGraph = useGetPaymentGraphQuery({ refetchOnMountOrArgChange: true });
  const ownerGraph = useGetOwnerGraphQuery({ refetchOnMountOrArgChange: true });
  const categoryList = useGetCategoryWithProductsQuery({ refetchOnMountOrArgChange: true });
  const pendingAppointmentsList = useGetPendingAppoinmentQuery({ refetchOnMountOrArgChange: true });

  const exportLink = "#";

  const handleExportData = async () => {
    try {
      const cookies = document.cookie.split(";");
      let jwtCookie = null;

      cookies.forEach((cookie) => {
        if (cookie.includes("authToken=")) {
          jwtCookie = "Bearer " + cookie.split("authToken=")[1].trim();
        }
      });

      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/dashboard/dashboardSummaryExcel`, {
        headers: {
          Authorization: jwtCookie,
        },
        responseType: "blob", // Specify the response type as blob
      });

      // Create a Blob URL and initiate download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Summary.xlsx");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      // Handle errors
      console.error("Error exporting data:", error);
    }
  };

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

  const handleMonthChange = (e, month, year) => {
    // console.log("e", e);
    // console.log("year", year);
    // console.log("month", month);
    setSelectedMonth({
      ...selectedMonth,
      month: month,
      year: year
    })
    setLoading(true);
  };
  return (
    <div className="resumen">
      <div className="resumen-top-container">
        <div className="main-title-box">
          <p className="resumen-main-title">Resumen</p>
          <p className="resumen-sub-title">Resumen</p>
        </div>
        <div className="calendar-box">
          <Link className="export-btn btn btn-primary" to={exportLink} onClick={() => handleExportData()}>
            <svg className="me-2" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
              <defs>
                <clipPath id="a">
                  <path data-name="Rect ngulo 11046" fill="#1d2328" stroke="#707070" d="M17 15h16v16H17z" />
                </clipPath>
              </defs>
              <g data-name="Enmascarar grupo 57952" transform="translate(-17 -15)" clipPath="url(#a)">
                <path
                  d="M26.6 15h-6.4a1.6 1.6 0 0 0-1.6 1.6v12.8a1.6 1.6 0 0 0 1.6 1.6h9.6a1.6 1.6 0 0 0 1.6-1.6v-9.6L26.6 15m3.2 14.4h-9.6V16.6h5.6v4h4v8.8m-1.6-7.2v5.68l-1.68-1.68-2.24 2.24-2.24-2.24 2.24-2.24-1.76-1.76Z"
                  fill="#1d2328"
                />
              </g>
            </svg>
            Exportar datos
          </Link>
          <Dropdown as={ButtonGroup} align="end" className="filter-dropdown">
            <Dropdown.Toggle className="filter-btn">
              {`Mes: ${selectedMonth?.month === "" ? "Todo" : pastMonths.find((month) => month.month === selectedMonth?.month).monthName}`}
              <i className="fa-solid fa-chevron-down"></i>
            </Dropdown.Toggle>

            <Dropdown.Menu className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semibold fs-7 w-125px py-4">
              <Dropdown.Item className="menu-item px-3" onClick={(e) => handleMonthChange(e, "", "")}>
                <Link className="menu-link px-3">Todo</Link>
              </Dropdown.Item>
              {pastMonths.map((month, index) => (
                <Dropdown.Item key={index} className="menu-item px-3" onClick={(e) => handleMonthChange(e, month?.month, month?.year)}>
                  <Link className="menu-link px-3">{month?.monthName}</Link>
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>

      <div className="card-wrapper">
        {loading ? <Spinner animation="border" variant="primary" /> : error ? "Some Error Occured" : <Metricas month={selectedMonth.month} data={data} />}
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
