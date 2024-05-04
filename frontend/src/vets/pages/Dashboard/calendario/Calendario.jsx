import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import "./calendario.scss";
import esLocale from "@fullcalendar/core/locales/es";
import { useGetVeterinariansAppointmentQuery } from "../../../../services/ApiServices";
import Loader from "../../../components/loader/Loader";
import moment from "moment";
import Error from "../../../components/error/Error";

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
  const newData = appointmentData.map(appointment => ({
    ...appointment,
    start: moment.utc(appointment.start).format('YYYY-MM-DDTHH:mm:ss'), // Using 'HH:mm:ss' for 24-hour format
    end: moment.utc(appointment.end).format('YYYY-MM-DDTHH:mm:ss')
  }));
  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Error message={appointments.isError ? appointments.error?.data.message : "Error Interno del Servidor"} />
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
              events={newData}
              locales={[esLocale]}
              locale="es"
              dayHeaderFormat={{ weekday: "short", day: "numeric" }}
              slotLabelFormat={{
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
              }}
              timeZone="UTC" // Set the time zone here
              slotLabelContent={(arg) => {
                const date = new Date(arg.date);
                let hour = date.getHours();
                const minute = date.getMinutes();
                const meridiem = hour >= 12 ? 'PM' : 'AM';
                hour = hour % 12 || 12; // Convert hour to 12-hour format
                const formattedHour = hour < 10 ? '0' + hour : hour;
                const formattedMinute = minute < 10 ? '0' + minute : minute;
                return `${formattedHour}:${formattedMinute} ${meridiem}`;
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
