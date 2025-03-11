"use client";

import React, { useState, useRef, useEffect } from "react";
import { Minus, Plus, Users } from "lucide-react";

const PassengerOption = ({
  peopleOptions,
  openOption,
  setOpenOption,
  handleOption,
  handleSearch,
}) => {
  const wrapperRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpenOption(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="options-wrapper mt-2 cursor-pointer" ref={wrapperRef}>
      <div className="" onClick={() => setOpenOption(!openOption)}>
        {/* <span className="option-top-text">Passengers</span>z */}
        <span className="option-main-text">
          <Users />
          <span className="option-text-internal">{`${peopleOptions?.adults} Adults ${peopleOptions?.children} Childs ${peopleOptions?.infants} Infants`}</span>
        </span>
      </div>

      {openOption && (
        <div className="options ">
          <div className="option-item flex justify-between items-center p-2">
            <span className="option-text">Adult</span>
            <div className="option-counter flex items-center">
              <button
                disabled={peopleOptions?.adults <= 1}
                className="option-counter-button px-2 py-1 border rounded"
                onClick={(e) => {
                  e.stopPropagation();
                  handleOption("adults", "d");
                }}
              >
                <Minus />
              </button>
              <span className="option-counter-number mx-2">
                {peopleOptions?.adults}
              </span>
              <button
                className="option-counter-button px-2 py-1 border rounded"
                onClick={(e) => {
                  e.stopPropagation();
                  handleOption("adults", "i");
                }}
              >
                <Plus />
              </button>
            </div>
          </div>

          <div className="option-item flex justify-between items-center p-2">
            <span className="option-text">Children</span>
            <div className="option-counter flex items-center">
              <button
                disabled={peopleOptions?.children < 1}
                className="option-counter-button px-2 py-1 border rounded"
                onClick={(e) => {
                  e.stopPropagation();
                  handleOption("children", "d");
                }}
              >
                <Minus />
              </button>
              <span className="option-counter-number mx-2">
                {peopleOptions?.children}
              </span>
              <button
                className="option-counter-button px-2 py-1 border rounded"
                onClick={(e) => {
                  e.stopPropagation();
                  handleOption("children", "i");
                }}
              >
                <Plus />
              </button>
            </div>
          </div>

          <div className="option-item flex justify-between items-center p-2">
            <span className="option-text">Infants</span>
            <div className="option-counter flex items-center">
              <button
                disabled={peopleOptions?.infants < 1}
                className="option-counter-button px-2 py-1 border rounded"
                onClick={(e) => {
                  e.stopPropagation();
                  handleOption("infants", "d");
                }}
              >
                <Minus />
              </button>
              <span className="option-counter-number mx-2">
                {peopleOptions?.infants}
              </span>
              <button
                className="option-counter-button px-2 py-1 border rounded"
                onClick={(e) => {
                  e.stopPropagation();
                  handleOption("infants", "i");
                }}
              >
                <Plus />
              </button>
            </div>
          </div>

          {/* <div className="d-flex justify-content-center mb-2">
            <button
              className="mt-2 search-button"
              onClick={(e) => {
                e.stopPropagation();
                handleSearch();
              }}
            >
              Search / Update Search
            </button>
          </div> */}
        </div>
      )}
    </div>
  );
};

export default PassengerOption;
