import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import "./calendario.scss";
import esLocale from "@fullcalendar/core/locales/es";
import { Button, Form, Spinner } from "react-bootstrap";
import CitasModal from "../citas/modal/CitasModal";
import { useGetVeterinariansAppointmentQuery, useGetVeterinariansQuery } from "../../../../services/ApiServices";
import Loader from "../../../Components/loader/Loader";

function Calendario() {
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [veteId, setVeteId] = useState();
  const [appointmentData, setAppointmentData] = useState([]);
  const veterines = useGetVeterinariansQuery(null, { refetchOnMountOrArgChange: true });
  const appointments = useGetVeterinariansAppointmentQuery(veteId ? veteId : "", { refetchOnMountOrArgChange: true });

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

  const handleClose = () => {
    setShow(false);
    appointments.refetch();
  };

  return (
    <>
      {loading === true ? (
        <Loader />
      ) : error === true ? (
        "Some Error Occured"
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
                      onChange={(e) => {
                        setVeteId(e.target.value);
                      }}
                    >
                      <option disabled>Seleccionar el doctor</option>
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
                    const hour = new Date(arg.date).getHours();
                    const minute = new Date(arg.date).getMinutes();
                    return `${hour === 0 ? "12" : hour > 12 ? hour - 12 : hour}:${minute === 0 ? "00" : minute} ${hour < 12 ? "AM" : "PM"};`;
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
