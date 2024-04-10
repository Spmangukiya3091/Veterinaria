import React from "react";
import { Table } from "react-bootstrap";
import "./information.scss";

const Information = ({ data }) => {
  return (
    <>
      <div className="details">
        <h4>Información</h4>
        <div className="info-details">
          <Table className="info-table" borderless={true}>
            <tbody>
              <tr>
                <td className="info-head">Apellidos</td>
                <td className="info-details">{data.ownerData?.surname || "-"}</td>
              </tr>
              <tr>
                <td className="info-head">Nombre</td>
                <td className="info-details">{data.ownerData?.name || "-"}</td>
              </tr>
              <tr>
                <td className="info-head">Dirección</td>
                <td className="info-details">{data.ownerData?.address || "-"}</td>
              </tr>
              <tr>
                <td className="info-head">Distrito</td>
                <td className="info-details">{data.ownerData?.district || "-"}</td>
              </tr>
              <tr>
                <td className="info-head">Teléfono 1</td>
                <td className="info-details">{data.ownerData?.phone_1 || "-"}</td>
              </tr>
              <tr>
                <td className="info-head">Teléfono 2</td>
                <td className="info-details">{data.ownerData?.phone_2 || "-"}</td>
              </tr>
              <tr>
                <td className="info-head">Correo electrónico</td>
                <td className="info-details">{data.ownerData?.email || "-"}</td>
              </tr>
              <tr>
                <td className="info-head">Doc. Identidad</td>
                <td className="info-details">{data.ownerData?.doc_identity || "-"}</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default Information;
