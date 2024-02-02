import React from "react";
import { Tab, Tabs } from "react-bootstrap";
import "./mainTab.scss";
import Detalles from "./Detalles/Detalles";
import ListAptos from "./ListAptos/ListAptos";

function MainTab({ data, id }) {
  return (
    <>
      <div className="main-tab">
        <Tabs defaultActiveKey="Información" className="mb-3">
          <Tab eventKey="Información" title="Información">
            <Detalles data={data} />
          </Tab>
          <Tab eventKey="Lista de aptos" title="Lista de aptos">
            <ListAptos id={id} />
          </Tab>
        </Tabs>
      </div>
    </>
  );
}

export default MainTab;
