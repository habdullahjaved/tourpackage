import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import "./custom-datepicker.css"; // Custom CSS for styling
import "../assets/sass/custom.css";

const CustomeDatePicker = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [formattedDate, setFormattedDate] = useState("");

  const handleDateChange = (date) => {
    setStartDate(date);

    // Format the date for display (e.g., Sunday, August 20, 2025)
    const displayDate = date.toLocaleDateString("en-US", {
      weekday: "long", // Full weekday name
      month: "long", // Full month name
      day: "numeric", // Day of the month
      year: "numeric", // Full year
    });
    setFormattedDate(displayDate);
  };

  const handleSubmit = () => {
    // Format the date for sending (yyyy-mm-dd)
    const formattedForSubmit = startDate.toISOString().split("T")[0];
    console.log("Formatted date for submission:", formattedForSubmit);
    // Send `formattedForSubmit` for submission
  };

  return (
    <div className="custom-date-picker">
      <DatePicker
        selected={startDate}
        onChange={handleDateChange}
        dateFormat="EEEE, MMMM d, yyyy"
        className="form-control custom-datepicker-input"
        popperClassName="custom-datepicker-popper"
        placeholderText="Select a date"
      />
      <p>Selected date: {formattedDate}</p>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default CustomeDatePicker;
