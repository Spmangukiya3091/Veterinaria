import React from "react";
import { Tab, Tabs } from "react-bootstrap";
import Diagnostic from "../diagnostic/Diagnostic";
import Historical from "../historial/Historical";

import "./mainTab.scss";
import DiagnosticForm from "../diagnostic-form/DiagnosticForm";

function MainTab({ data, petId, refetch }) {
  console.log(data)
  return (
    <div className="main-tab">
      <Tabs defaultActiveKey="Diagnóstico" >
        <Tab eventKey="Diagnóstico" title="Diagnóstico">
          {data?.status === "pending" ? <DiagnosticForm data={data} refetch={refetch} /> : <Diagnostic data={data} />}
        </Tab>
        <Tab eventKey="Historial" title="Historial de mascota">
          <Historical id={petId} />
        </Tab>
      </Tabs>
    </div>
  );
}

export default MainTab;
