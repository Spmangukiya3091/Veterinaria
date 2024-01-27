import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
function ProximasCitas({ data }) {
  return (
    <div className="proximas">
      <div className="proximas-top-heading">
        <p>Próximas citas agendadas</p>
      </div>
      <div className="owners-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>MASCOTAS</th>
              <th>VETERINARIO</th>
              <th>HORARIO</th>
              <th>FECHA</th>
              <th>ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {data ? (
              data.appointments.map(({ id, pet, veterinarian, scheduleStart, scheduleEnd, date }, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{pet}</td>
                  <td>{veterinarian}</td>
                  <td>
                    {moment(`2023-01-01 ${scheduleStart}`, "YYYY-MM-DD HH:mm:ss").format("h:mm A") +
                      " - " +
                      moment(`2023-01-01 ${scheduleEnd}`, "YYYY-MM-DD HH:mm:ss").format("h:mm A")}
                  </td>
                  <td>{moment(date).format("DD MMM YYYY")}</td>

                  <td className="text-center">
                    <Link
                      to="/dashboard/citas-view?status=Pendiente"
                      className="btn btn-sm btn-light btn-active-light-primary"
                      data-kt-menu-trigger="click"
                      data-kt-menu-placement="bottom-end"
                    >
                      {"Ver detalles"}
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProximasCitas;
