import React from "react";
import "./mainTab.scss";
import { Tab, Tabs } from "react-bootstrap";
import Historical from "./historical/Historical";
import Information from "./information/Information";
import Vaccination from "./Vaccination/Vaccination";
import { useLocation } from "react-router-dom";

function MainTab({ data, appointmentId }) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const status = searchParams.get("tab");
  return (
    <div className="main-tab">
      <Tabs defaultActiveKey={status === "vacunas" ? "Vaccination" : "Información"}  className="mb-3">
        <Tab eventKey="Información" title="Información">
          <Information data={data} />
        </Tab>
        <Tab eventKey="Historial" title="Historial de mascota">
          <Historical id={appointmentId} />
        </Tab>
        <Tab eventKey="Vaccination" title="Vacunación">
          <Vaccination id={data?.id} />
        </Tab>
      </Tabs>
    </div>
  );
}
export default MainTab;
