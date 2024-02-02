import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { Spinner } from "react-bootstrap";
import "./calendario.scss";
import esLocale from "@fullcalendar/core/locales/es";
import { useGetVeterinariansAppointmentQuery } from "../../../../services/ApiServices";
import Loader from "../../../components/loader/Loader";

function Calendario({ id }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [appointmentData, setAppointmentData] = useState([]);
  const appointments = useGetVeterinariansAppointmentQuery(id, { refetchOnMountOrArgChange: true });

  useEffect(() => {
    if (!appointments.isLoading) {
      setLoading(false);
      setAppointmentData(appointments?.data?.veterinarian);
    } else if (appointments.isError) {
      setError(true);
      setLoading(false);
    }
  }, [appointments]);

  return (
    <>
      {loading === true ? (
        <Loader />
      ) : error === true ? (
        "Some Error Occured"
      ) : (
        <div className="calendario">
          <div className="main-title-box">
            <div>
              <p className="calendario-detail-main-title">Calendario de Citas</p>
              <p className="calendario-detail-sub-title">Pacientes</p>
            </div>
            {/* <Button onClick={handleShow}>Añadir evento</Button> */}
          </div>
          <div className="maincontainer">
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView="timeGridWeek"
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay",
              }}
              events={appointmentData}
              locales={[esLocale]}
              locale="es"
              dayHeaderFormat={{ weekday: "short", day: "numeric" }}
              slotLabelFormat={{
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
              }}
              slotLabelContent={(arg) => {
                const hour = new Date(arg.date).getHours();
                const minute = new Date(arg.date).getMinutes();
                return `${hour === 0 ? "12" : hour > 12 ? hour - 12 : hour}:${minute === 0 ? "00" : minute} ${hour < 12 ? "AM" : "PM"};`;
              }}
              views={{
                dayGridMonth: {
                  buttonText: "Mes",
                  dayHeaderFormat: { weekday: "short" },
                },
                timeGridWeek: {
                  buttonText: "Semana",
                  dayHeaderFormat: {
                    weekday: "short",
                    month: "numeric",
                    day: "2-digit",
                    omitCommas: true,
                  },
                },
                timeGridDay: {
                  buttonText: "Día",
                  dayHeaderFormat: { weekday: "short" },
                },
              }}
            />

            <div></div>
          </div>
        </div>
      )}
    </>
  );
}

export default Calendario;
