import React from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";
import "./datePicker.scss";

function SingleInputDateRangePicker({ value, onChange }) {
  const handleDateChange = (selectedDates) => {
    if (onChange) {
      onChange(selectedDates);
    }
  };

  return (
    <div className="picker">
      <Flatpickr
        options={{
          mode: "range",
          format: "y-m-d",
        }}
        value={value}
        onChange={handleDateChange}
      />
      <span className="fa-regular fa-calendar icon"></span>
    </div>
  );
}

export default SingleInputDateRangePicker;
