import moment from "moment";
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useGetVetsAppointmentsByDateQuery } from "../../../../../services/ApiServices";

function ProximasCitas({ id }) {
  const [selectedDate, setSelectedDate] = useState(moment(new Date()).format("YYYY-MM-DD"));
  const [dateQuery, setDateQuery] = useState(`${id}?date=${moment(new Date()).format("YYYY-MM-DD")}`);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  const nextAppointments = useGetVetsAppointmentsByDateQuery(dateQuery, {
    refetchOnMountOrArgChange: true,
  });

  const handleDateClick = async (date) => {
    const formattedDate = moment(date).format("YYYY-MM-DD");
    setDateQuery(`${id}?date=${formattedDate}`);

    // Update the selected date in the state
    setSelectedDate(formattedDate);
  };

  const generateDateRange = () => {
    const dates = [];
    const currentDate = moment();
    for (let i = -15; i <= 15; i++) {
      const date = currentDate.clone().add(i, "days");
      dates.push(date);
    }
    return dates;
  };

  const dateRange = generateDateRange();

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
        <>
          <div className="calendar-card-wrapper2">
            <div className="card card-flush h-lg-100">
              <div className="header-section align-items-start">
                <p className="calendar-p">Próximas citas agendadas</p>
                <div className="calendar-box">
                  <Link to="/veterine/calendario" className="calendar-btn btn btn-primary">
                    <i className="fa-regular fa-calendar"></i>
                    Ver Calendario
                  </Link>
                </div>
              </div>
              <div className="card-body">
                <ul className="nav nav-pills d-flex flex-nowrap hover-scroll-x py-2" role="tablist">
                  {dateRange.map((date) => (
                    <li className="nav-item me-1" key={date.format("YYYY-MM-DD")} role="presentation">
                      <Link
                        className={`nav-link btn d-flex flex-column flex-center rounded-pill min-w-45px me-2 py-4 px-3 ${
                          date.format("YYYY-MM-DD") === selectedDate ? "btn-active-primary" : ""
                        }`}
                        data-bs-toggle="tab"
                        onClick={() => handleDateClick(date)}
                        to={`#kt_schedule_day_${date.format("YYYY-MM-DD")}`}
                        aria-selected="false"
                        tabIndex="-1"
                        role="tab"
                      >
                        <span className="opacity-50 fs-7 fw-semibold">{date.format("ddd")}</span>
                        <span className="fs-6 fw-bold">{date.format("DD")}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <div id={`kt_schedule_day_${selectedDate}`} className="tab-panel fade show active" role="tabpanel">
                  {data?.length > 0 ? (
                    data.map((appointment) => (
                      <div key={appointment.id} className="d-flex flex-stack position-relative mt-8">
                        <div className="position-absolute h-100 w-4px bg-secondary rounded top-0 start-0"></div>
                        <div className="fw-semibold ms-5 text-gray-600 text-start">
                          <div className="fs-5">
                            {moment(`2023-01-01 ${appointment.scheduleStart}`, "YYYY-MM-DD HH:mm:ss").format("h:mm A") +
                              " - " +
                              moment(`2023-01-01 ${appointment.scheduleEnd}`, "YYYY-MM-DD HH:mm:ss").format("h:mm A")}
                          </div>
                          <Link to="#" className="fs-5 fw-bold text-gray-800 text-hover-primary mb-2">
                            {`Cita #${appointment.id} - ${appointment.pet}`}
                          </Link>
                        </div>
                        <Link to="#" className="btn btn-bg-light btn-active-color-primary btn-sm">
                          Ver detalles
                        </Link>
                      </div>
                    ))
                  ) : (
                    <div>No Appointments</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default ProximasCitas;
