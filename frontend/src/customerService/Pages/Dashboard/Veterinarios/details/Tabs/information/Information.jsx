import React from "react";
import { Table } from "react-bootstrap";
import "./information.scss";

const Information = () => {
  return (
    <>
      <div className="details">
        <h4>Información</h4>
        <div className="info-details">
          <Table className="info-table" borderless={true}>
            <tbody>
              <tr>
                <td className="info-head">Apellidos</td>
                <td className="info-details">CABELLO GONZALES</td>
              </tr>
              <tr>
                <td className="info-head">Nombre</td>
                <td className="info-details">CAMILA ESTER</td>
              </tr>
              <tr>
                <td className="info-head">Especialidad</td>
                <td className="info-details">Pediatría</td>
              </tr>
              <tr>
                <td className="info-head">Teléfono</td>
                <td className="info-details">+51 987654321</td>
              </tr>
              <tr>
                <td className="info-head">Correo electrónico</td>
                <td className="info-details">ejemplo@gmail.com</td>
              </tr>
              <tr>
                <td className="info-head">Doc. Identidad</td>
                <td className="info-details">1234567</td>
              </tr>
              <tr>
                <td className="info-head">Sexo</td>
                <td className="info-details">Femenino</td>
              </tr>
              <tr>
                <td className="info-head">F. de Nacimiento</td>
                <td className="info-details">23 Abr 2020</td>
              </tr>
              <tr>
                <td className="info-head">Dirección</td>
                <td className="info-details">Av. Paz Soldán 290, San Isidro 15073, Lima.</td>
              </tr>
              <tr>
                <td className="info-head">Distrito</td>
                <td className="info-details">San Isidro</td>
              </tr>
              <tr>
                <td className="info-head">Departamento</td>
                <td className="info-details">Lima</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default Information;
