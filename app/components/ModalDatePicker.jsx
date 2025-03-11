import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";

const ModalDatePicker = ({
  selectedDate,
  onDateChange,
  dateType,
  datePosition,
}) => {
  const WEEKDAYS_SHORT = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  const today = new Date();
  const todayDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  const [showModal, setShowModal] = useState(false);
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());

  // Utility to format date in local time
  const getLocalDate = (date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(date.getDate()).padStart(2, "0")}`;
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  // Render calendar days
  const renderCalendarDays = () => {
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="empty-cell"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(currentYear, currentMonth, day);
      const isDisabled = currentDate < todayDate;

      days.push(
        <div
          key={`day-${day}`}
          className={`date ${isDisabled ? "disabled" : ""} ${
            selectedDate === getLocalDate(currentDate) ? "active" : ""
          }`}
          onClick={() => {
            if (!isDisabled) {
              const formattedDate = getLocalDate(currentDate);
              onDateChange(formattedDate);
              setShowModal(false);
            }
          }}
        >
          <span>{day}</span>
        </div>
      );
    }

    return days;
  };

  const changeMonth = (direction) => {
    if (direction === "prev") {
      const newMonth = (currentMonth - 1 + 12) % 12;
      const newYear = newMonth === 11 ? currentYear - 1 : currentYear;
      setCurrentMonth(newMonth);
      setCurrentYear(newYear);
    } else if (direction === "next") {
      const newMonth = (currentMonth + 1) % 12;
      const newYear = newMonth === 0 ? currentYear + 1 : currentYear;
      setCurrentMonth(newMonth);
      setCurrentYear(newYear);
    }
  };
  return (
    <div
      className={
        datePosition === "sideBar"
          ? `date-modal date-modal-sidebar`
          : `date-modal`
      }
    >
      {/* d-flex justify-content-around */}
      <button
        className={
          datePosition === "sideBar"
            ? `date-input bordered-dateinput d-flex justify-content-start `
            : `date-input `
        }
        onClick={() => setShowModal(true)}
      >
        <Calendar className="me-2" />
        {formatDate(selectedDate)}
      </button>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{dateType}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="calendar-header">
            <Button variant="link" onClick={() => changeMonth("prev")}>
              <ChevronLeft />
            </Button>
            <span className="month-year">
              {new Date(currentYear, currentMonth).toLocaleString("default", {
                month: "long",
              })}{" "}
              {currentYear}
            </span>
            <Button variant="link" onClick={() => changeMonth("next")}>
              <ChevronRight />
            </Button>
          </div>
          <div className="calendar-grid">
            {WEEKDAYS_SHORT.map((day, index) => (
              <div key={`weekday-${index}`} className="day">
                {day}
              </div>
            ))}
            {renderCalendarDays()}
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ModalDatePicker;
