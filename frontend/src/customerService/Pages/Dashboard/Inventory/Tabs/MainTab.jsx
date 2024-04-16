import React from "react";
import { Tab, Tabs } from "react-bootstrap";
import "./mainTab.scss";
import Detalles from "./Detalles/Detalles";

function MainTab({ data, historyData }) {
  return (
    <div className="main-tab">
      <Tabs defaultActiveKey="Detalles" className="mb-3">
        <Tab eventKey="Detalles" title="Detalles">
          <Detalles data={data} historyData={historyData} />
        </Tab>
      </Tabs>
    </div>
  );
}

export default MainTab;
