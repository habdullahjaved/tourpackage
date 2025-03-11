import { useState, useRef } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format } from "date-fns";

function DatePicker() {
  const [selected, setSelected] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef(null);

  const handleSelect = (date) => {
    setSelected(date);
    setIsOpen(false);
  };

  return (
    <div className="position-relative w-100">
      <input
        ref={inputRef}
        type="text"
        value={selected ? format(selected, "PPP") : "Select a date"}
        onFocus={() => setIsOpen(true)}
        readOnly
        className="form-control"
      />

      {isOpen && (
        <div
          className="position-absolute mt-2 shadow bg-white border rounded"
          style={{ zIndex: 1050 }}
        >
          <DayPicker
            mode="single"
            selected={selected}
            onSelect={handleSelect}
            onDayClick={() => inputRef.current?.focus()}
          />
        </div>
      )}
    </div>
  );
}

export default DatePicker;
