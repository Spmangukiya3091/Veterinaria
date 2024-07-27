import React, { useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import "./dialog.scss";
import { useGetVetsAppointmentsByDateQuery } from "../../../../../services/ApiServices";
import { useCookies } from "react-cookie";
import moment from "moment";
import { Link } from "react-router-dom";

function Dialog() {
  // eslint-disable-next-line no-unused-vars
  const [cookie, , setCookie] = useCookies(["user"]);
  const id = cookie.user;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  const dateQuery = `${id}?date=${new Date()}`;
  const formattedDate = moment().format("dddd DD, MMMM YYYY");
  const nextAppointments = useGetVetsAppointmentsByDateQuery(dateQuery, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (!nextAppointments.isLoading) {
      setLoading(false);
      setData(nextAppointments?.data?.appointments);
    } else if (nextAppointments.isError) {
      setError(true);
      setLoading(false);
    }
  }, [nextAppointments]);

  return (
    <>
      {loading ? (
        <Spinner animation="border" variant="primary" />
      ) : error ? (
        "Some Error Occurred"
      ) : (
        <div className="dialog-content">
          <div className="detail-section">
            <div className="top-date-wrapper">
              <p>Próximas citas agendadas</p>
              <Button className="calendar-btn">
                <i className="fa-regular fa-calendar"></i>
                Ventana de Citas
              </Button>
            </div>
            <p className="detail-heading">{formattedDate}</p>
            {data?.length > 0 ? (
              data.map((appointment) => (
                <div key={appointment.id} className="detail-wrapper active-detail">
                  <div className="fw-semibold ms-5 text-gray-600 text-start">
                    <div className="fs-5">
                      {moment(`2023-01-01 ${appointment.scheduleStart}`, "YYYY-MM-DD HH:mm:ss").format("h:mm A") +
                        " - " +
                        moment(`2023-01-01 ${appointment.scheduleEnd}`, "YYYY-MM-DD HH:mm:ss").format("h:mm A")}
                    </div>
                    <Link to={`/veterine/citas-view/${appointment.id}`} className="fs-5 fw-bold text-gray-800 text-hover-primary mb-2">
                      {`Cita #${appointment.id} - ${appointment.pet}`}
                    </Link>
                  </div>
                  <Link to={`/veterine/citas-view/${appointment.id}`} className="btn btn-bg-light btn-active-color-primary btn-sm">
                    Ver detalles
                  </Link>
                </div>
              ))
            ) : (
              <div className="detail-wrapper">
                <p>No Próximas citas agendadas</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Dialog;
