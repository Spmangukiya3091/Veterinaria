import React, { useEffect, useState } from "react";

import { Button, Col, Row, Spinner } from "react-bootstrap";
import "./resumen.scss";

import CitasChart from "../graph/resumen/linechart/CitasChart";
import PtientesChart from "../graph/resumen/doughnutchart/PtientesChart";
import ProximasCitas from "./proximas-citas/ProximasCitas";
import Medicamentos from "./medicamentos/Medicamentos";
import Metricas from "./metricas/Metricas";
import {
  useGetCategoryWithProductsQuery,
  useGetVetsAppoinmentGraphQuery,
  useGetVetsAppointmentsByDateQuery,
  useGetVetsMothlyMetricsQuery,
  useGetVetsOwnerGraphQuery,
} from "../../../../services/ApiServices";

function Resumen({ id }) {
  const openCustomDialog = () => {
    const newTab = window.open("/dialog", "_blank", "width=550,height=600");
    newTab.document.body.innerHTML = '<div id="custom-dialog-root"></div> ';
  };
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  const [nextAppointmentsData, setNextAppointmentsData] = useState([]);
  const [appoinmentData, setAppoinmentData] = useState([]);
  const [patientAgeGraphData, setPatientAgeGraphData] = useState([]);
  const [medicineData, setMedicineData] = useState([]);

  const metricasData = useGetVetsMothlyMetricsQuery(id, { refetchOnMountOrArgChange: true });
  const dateQuery = `${id}?date=${"2024-01-27"}`;
  const nextAppointments = useGetVetsAppointmentsByDateQuery(dateQuery, { refetchOnMountOrArgChange: true });
  const appointments = useGetVetsAppoinmentGraphQuery(id, { refetchOnMountOrArgChange: true });
  const patientsAgeGraph = useGetVetsOwnerGraphQuery(id, { refetchOnMountOrArgChange: true });
  const medicines = useGetCategoryWithProductsQuery("", { refetchOnMountOrArgChange: true });

  useEffect(() => {
    if (!metricasData.isLoading && !nextAppointments.isLoading && !appointments.isLoading && !patientsAgeGraph.isLoading && !medicines.isLoading) {
      setLoading(false);
      setData(metricasData?.data?.data);
      setNextAppointmentsData(nextAppointments?.data?.appointments);
      setAppoinmentData(appointments?.data?.weeklyData);
      setMedicineData(medicines?.data?.categories);
      setPatientAgeGraphData(patientsAgeGraph?.data);
    } else if (metricasData.isError || nextAppointments.isError || appointments.isError || patientsAgeGraph.isError || medicines.isError) {
      setLoading(false);
      setError(true);
    }
  }, [appointments, medicines, metricasData, nextAppointments, patientsAgeGraph]);
  return (
    <>
      {/* {loading ? (
        <Spinner animation="border" variant="primary" />
      ) : error ? (
        "Some Error Occured"
      ) : ( */}
      <div className="resumen">
        <div className="resumen-top-container">
          <div className="main-title-box">
            <p className="resumen-main-title">Resumen</p>
            <p className="resumen-sub-title">Resumen</p>
          </div>
          <div className="calendar-box">
            <Button onClick={openCustomDialog} className="calendar-btn-top">
              <i className="fa-regular fa-calendar"></i>
              Ventana de Citas
            </Button>
          </div>
        </div>

        <div className="card-wrapper">
          {loading ? <Spinner animation="border" variant="primary" /> : error ? "Some Error Occured" : <Metricas data={data} />}
        </div>

        <div className="calendar-section">
          <Row>
            <Col sm={12} md={6} lg={6}>
              {loading ? (
                <Spinner animation="border" variant="primary" />
              ) : error ? (
                "Some Error Occured"
              ) : (
                <ProximasCitas data={nextAppointmentsData} id={id} />
              )}
            </Col>
            <Col sm={12} md={6} lg={6}>
              <div className="calendar-card-wrapper">
                {loading ? <Spinner animation="border" variant="primary" /> : error ? "Some Error Occured" : <CitasChart data={appoinmentData} />}
              </div>
            </Col>
          </Row>
        </div>

        <div>
          <div className="calendar-section">
            <Row>
              <Col sm={12} md={6} lg={6}>
                <div className="calendar-card-wrapper">
                  {loading ? (
                    <Spinner animation="border" variant="primary" />
                  ) : error ? (
                    "Some Error Occured"
                  ) : (
                    <PtientesChart data={patientAgeGraphData} />
                  )}
                </div>
              </Col>
              <Col sm={12} md={6} lg={6}>
                {loading ? <Spinner animation="border" variant="primary" /> : error ? "Some Error Occured" : <Medicamentos data={medicineData} />}
              </Col>
            </Row>
          </div>
        </div>
      </div>
      {/* )} */}
    </>
  );
}

export default Resumen;
