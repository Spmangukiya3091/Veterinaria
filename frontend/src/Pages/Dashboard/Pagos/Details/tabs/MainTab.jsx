import React from "react";
import { Tab, Tabs } from "react-bootstrap";
import "./mainTab.scss";
import Detalles from "./Detalles/Detalles";

function MainTab({ data }) {
  return (
    <>
      <div className="main-tab">
        <Tabs defaultActiveKey="Información" className="mb-3">
          <Tab eventKey="Información" title="Información">
            <Detalles data={data} />
          </Tab>
        </Tabs>
      </div>
    </>
  );
}

export default MainTab;
