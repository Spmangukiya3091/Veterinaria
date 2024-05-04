import React, { useEffect, useState } from "react";
import "./calendario.scss";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import esLocale from "@fullcalendar/core/locales/es";
import { Button, Form } from "react-bootstrap";
import CitasModal from "../citas/modal/CitasModal";
import { useGetVeterinariansAppointmentQuery, useGetVeterinariansQuery } from "../../../services/ApiServices";
import Loader from "../../../Components/loader/Loader";
import { useLocation } from "react-router-dom";
import moment from "moment";
import Error from "../../../Components/error/Error";


function Calendario() {
  const location = useLocation()
  const veterineId = location?.search ? location.search.split("?veterine=")[1] : undefined
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [veteId, setVeteId] = useState(veterineId);
  const [appointmentData, setAppointmentData] = useState([]);
  const veterines = useGetVeterinariansQuery({ refetchOnMountOrArgChange: true, });
  const appointments = useGetVeterinariansAppointmentQuery(veteId ? veteId : "", { refetchOnMountOrArgChange: true, skip: veteId === undefined });

  useEffect(() => {
    if (!veterines.isLoading && !appointments.isLoading) {
      setLoading(false);
      setData(veterines?.data?.veterinarianList);
      if (veteId !== undefined) {
        setAppointmentData(appointments?.data?.veterinarian);
      } else {
        setAppointmentData([]);
      }
    } else if (veterines.isError) {
      setError(true);
      setLoading(false);
    }
  }, [appointments, veteId, veterines]);

  const newData = appointmentData.map(appointment => ({
    ...appointment,
    start: moment.utc(appointment.start).format('YYYY-MM-DDTHH:mm:ss'), // Using 'HH:mm:ss' for 24-hour format
    end: moment.utc(appointment.end).format('YYYY-MM-DDTHH:mm:ss')
  }));

  const handleClose = async () => {
    setShow(false);

    // Check if the queries are not loading and there is some data available
    if (!appointments.isLoading && appointments.data) {
      await appointments.refetch();
    }
    if (!veterines.isLoading && veterines.data) {
      await veterines.refetch();
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Error message={veterines?.isError ? veterines?.error?.data?.message : appointmentData.isError ? appointmentData.error?.data.message : "Error Interno del Servidor"} />

      ) : (
        <div className="calendario">
          {/* ... (existing code) */}
          <div className="calendario-main">
            <div className="maincontainer-top">
              <div className="calendario-schedule-btn-group">
                <div>
                  <Form.Group controlId="formBasicPassword">
                    <Form.Select
                      aria-label="Default select example"
                      value={veteId}
                      onChange={(e) => {
                        setVeteId(e.target.value);
                      }}
                    >
                      <option disabled="true" value={""} selected="true">Seleccionar el doctor</option>
                      {data.map(({ id, name, surname }) => (
                        <option key={id} value={id}>
                          {name + " " + surname}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </div>
                <Button onClick={() => setShow(true)}>+ Agendar Cita</Button>
              </div>
            </div>
            <div className="maincontainer-bottom">
              {veteId ? (
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
                    dayGridMonth: { buttonText: "Mes", dayHeaderFormat: { weekday: "short" } },
                    timeGridWeek: { buttonText: "Semana", dayHeaderFormat: { weekday: "short", month: "numeric", day: "2-digit", omitCommas: true } },
                    timeGridDay: { buttonText: "Día", dayHeaderFormat: { weekday: "short" } },
                  }}
                />
              ) : (
                <FullCalendar
                  plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                  initialView="timeGridWeek"
                  headerToolbar={{
                    left: "prev,next today",
                    center: "title",
                    right: "dayGridMonth,timeGridWeek,timeGridDay",
                  }}
                  events={[]}
                  locales={[esLocale]}
                  locale="es"
                  dayHeaderFormat={{ weekday: "short", day: "numeric" }}
                  slotLabelFormat={{
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  }}
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
                    dayGridMonth: { buttonText: "Mes", dayHeaderFormat: { weekday: "short" } },
                    timeGridWeek: { buttonText: "Semana", dayHeaderFormat: { weekday: "short", month: "numeric", day: "2-digit", omitCommas: true } },
                    timeGridDay: { buttonText: "Día", dayHeaderFormat: { weekday: "short" } },
                  }}
                />
              )}
            </div>
          </div>

          <CitasModal show={show} handleClose={handleClose} />
        </div>
      )}
    </>
  );
}

export default Calendario;
