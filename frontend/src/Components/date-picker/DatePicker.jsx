import React, { useEffect, useRef } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";
import "./datePicker.scss";
import { Spanish } from "flatpickr/dist/l10n/es.js"; // Import Spanish locale

function SingleInputDateRangePicker({ value, onChange }) {
  const pickerRef = useRef(null);

  const handleDateChange = (selectedDates) => {
    if (onChange) {
      onChange(selectedDates);
    }
  };

  useEffect(() => {
    const pickerElement = pickerRef.current?.flatpickr?.calendarContainer;

    const stopPropagation = (e) => {
      e.stopPropagation();
    };

    if (pickerElement) {
      pickerElement.addEventListener("click", stopPropagation);
    }

    return () => {
      if (pickerElement) {
        pickerElement.removeEventListener("click", stopPropagation);
      }
    };
  }, []);

  return (
    <div className="picker">
      <Flatpickr
        options={{
          mode: "range",
          locale: Spanish, // Set Spanish locale
          dateFormat: "Y-m-d",
        }}
        value={value}
        onChange={handleDateChange}
        ref={pickerRef}
      />
      <span className="fa-regular fa-calendar icon"></span>
    </div>
  );
}

export default SingleInputDateRangePicker;
