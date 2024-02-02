import React from "react";
import { Tab, Tabs } from "react-bootstrap";
import "./mainTab.scss";
import Information from "./information/Information";
import Historical from "./historical/Historical";

function MainTab() {
  return (
    <div className="main-tab">
      <Tabs defaultActiveKey="Información"  className="mb-3">
        <Tab eventKey="Información" title="Información">
          <Information />
        </Tab>
        <Tab eventKey="Historial" title="Historial de citas">
          <Historical />
        </Tab>
      </Tabs>
    </div>
  );
}

export default MainTab;
