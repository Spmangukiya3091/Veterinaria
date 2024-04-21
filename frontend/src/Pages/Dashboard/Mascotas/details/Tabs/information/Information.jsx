import React from "react";
import { Table } from "react-bootstrap";
import "./information.scss";
import moment from "moment";

const Information = ({ data }) => {
  return (
    <>
      <div className="details">
        <h4>Información</h4>
        <div className="info-details">
          <Table className="info-table" borderless={true}>
            <tbody>
              <tr>
                <td className="info-head">ID Mascota</td>
                <td className="info-details">{data?.id || "-"}</td>
              </tr>
              <tr>
                <td className="info-head">Nombre</td>
                <td className="info-details">{data?.name || "-"}</td>
              </tr>
              <tr>
                <td className="info-head">Fecha de Nacimiento</td>
                <td className="info-details">{moment(data?.dob || "-").format("DD MMM YYYY, HH:MM A")}</td>
              </tr>
              <tr>
                <td className="info-head">Especie</td>
                <td className="info-details">{data?.Species || "-"}</td>
              </tr>
              <tr>
                <td className="info-head">Raza</td>
                <td className="info-details">{data?.breed || "-"}</td>
              </tr>
              <tr>
                <td className="info-head">Sexo</td>
                <td className="info-details">{data?.sex || "-"}</td>
              </tr>
              <tr>
                <td className="info-head">Color</td>
                <td className="info-details">{data?.color || "-"}</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default Information;
