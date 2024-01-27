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
                <td className="info-head">Apellidos</td>
                <td className="info-details">{data?.veterinarianData?.surname}</td>
              </tr>
              <tr>
                <td className="info-head">Nombre</td>
                <td className="info-details">{data?.veterinarianData?.name}</td>
              </tr>
              <tr>
                <td className="info-head">Especialidad</td>
                <td className="info-details">{data?.veterinarianData?.speciality}</td>
              </tr>
              <tr>
                <td className="info-head">Teléfono</td>
                <td className="info-details">{data?.veterinarianData?.phone}</td>
              </tr>
              <tr>
                <td className="info-head">Correo electrónico</td>
                <td className="info-details">{data?.veterinarianData?.email}</td>
              </tr>
              <tr>
                <td className="info-head">Doc. Identidad</td>
                <td className="info-details">{data?.veterinarianData?.identity}</td>
              </tr>
              <tr>
                <td className="info-head">Sexo</td>
                <td className="info-details">{data?.veterinarianData?.sex}</td>
              </tr>
              <tr>
                <td className="info-head">F. de Nacimiento</td>
                <td className="info-details">{moment(data?.veterinarianData?.dob).format("DD MMM YYYY")}</td>
              </tr>
              <tr>
                <td className="info-head">Dirección</td>
                <td className="info-details">{data?.veterinarianData?.address}</td>
              </tr>
              <tr>
                <td className="info-head">Distrito</td>
                <td className="info-details ">{data?.veterinarianData?.district}</td>
              </tr>
              <tr>
                <td className="info-head">Departamento</td>
                <td className="info-details">{data?.veterinarianData?.department}</td>
              </tr>
              <tr>
                <td className="info-head">Provincia</td>
                <td className="info-details">{data?.veterinarianData?.department}</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default Information;
