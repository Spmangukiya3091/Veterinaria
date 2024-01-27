import React from "react";
import { Tab, Tabs } from "react-bootstrap";

import "./mainTab.scss";
import Information from "./information/Information";
import Historical from "./historical/Historical";
import SubMascotas from "./SubMascotas/SubMascotas";

function MainTab({ data, petData, petAppointmentId }) {
  return (
    <div className="main-tab">
      <Tabs defaultActiveKey="Información" id="uncontrolled-tab-example" className="mb-3">
        <Tab eventKey="Información" title="Información">
          <Information data={data} />
        </Tab>
        <Tab eventKey="Mascotas" title="Mascotas">
          <SubMascotas data={petData} />
        </Tab>
        <Tab eventKey="Historial" title="Historial de mascota">
          <Historical id={petAppointmentId} />
        </Tab>
      </Tabs>
    </div>
  );
}

export default MainTab;
