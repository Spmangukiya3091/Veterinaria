import React from "react";
import { Tab, Tabs } from "react-bootstrap";

import "./mainTab.scss";
import Information from "./information/Information";
import Historical from "./historical/Historical";
import Vaccination from "./Vaccination/Vaccination";
import { useLocation } from "react-router-dom";

function MainTab({ data, appointmentId }) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const status = searchParams.get("tab");
  return (
    <div className="main-tab">
      <Tabs defaultActiveKey={status === "vacunas" ? "Vaccination" : "Información"} id="uncontrolled-tab-example" className="mb-3">
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
