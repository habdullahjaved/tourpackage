<div className="accordion mt-3" id={`timeSlotAccordion${pkgIndex}`}>
  {pkg.time_slots.map((slot, slotIndex) => {
    const slotId = `slot-${pkgIndex}-${slotIndex}`;
    return (
      <div className="accordion-item mb-2" key={slotId}>
        <h2 className="accordion-header" id={`heading-${slotId}`}>
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={`#collapse-${slotId}`}
            aria-expanded="false"
            aria-controls={`collapse-${slotId}`}
          >
            Time Slot {slotIndex + 1}
          </button>
        </h2>
        <div
          id={`collapse-${slotId}`}
          className="accordion-collapse collapse"
          aria-labelledby={`heading-${slotId}`}
          data-bs-parent={`#timeSlotAccordion${pkgIndex}`}
        >
          <div className="accordion-body bg-light">
            <div className="card card-body bg-light mb-3" key={slotIndex}>
              <h6 className="mb-3">Time Slot {slotIndex + 1}</h6>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">Start Time</label>
                  <input
                    type="time"
                    className="form-control"
                    value={slot.start_time}
                    onChange={(e) =>
                      handleTimeSlotChange(
                        pkgIndex,
                        slotIndex,
                        "start_time",
                        e.target.value
                      )
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">End Time</label>
                  <input
                    type="time"
                    className="form-control"
                    value={slot.end_time}
                    onChange={(e) =>
                      handleTimeSlotChange(
                        pkgIndex,
                        slotIndex,
                        "end_time",
                        e.target.value
                      )
                    }
                  />
                </div>
                <div className="col-md-6 mb-1 mt-1">
                  <label htmlFor="is_prime">Prime Time</label>
                  <select
                    className="form-select"
                    name="is_prime"
                    value={slot.is_prime}
                    onChange={(e) =>
                      handleTimeSlotChange(
                        slotIndex,
                        "is_prime",
                        e.target.value
                      )
                    }
                  >
                    <option value="">Select</option>
                    {timeSlotTypes.map((timeSlotType) => (
                      <option
                        value={timeSlotType.value}
                        key={timeSlotType.value}
                      >
                        {timeSlotType.label}
                      </option>
                    ))}
                  </select>
                </div>{" "}
                <div className="col-md-6 mb-1 mt-1">
                  <label htmlFor="is_timeslot_selected">
                    Time Slot Seletion
                  </label>
                  <select
                    className="form-select"
                    name="is_timeslot_selected"
                    value={slot.is_timeslot_selected}
                    onChange={(e) =>
                      handleTimeSlotChange(
                        slotIndex,
                        "is_timeslot_selected",
                        e.target.value
                      )
                    }
                  >
                    <option value="">Select</option>
                    {timeSlotSelectionTypes.map((timeSlotSelectionType) => (
                      <option
                        value={timeSlotSelectionType.value}
                        key={timeSlotSelectionType.value}
                      >
                        {timeSlotSelectionType.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="row">
                {slot.package_pricings.map((pricing, pricingIndex) => (
                  <div className="col-md-6 mb-3" key={pricingIndex}>
                    <label className="form-label">
                      {pricing.pax_type_id == 1 ? "Adult" : "Children"} - Base
                      Price
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      value={pricing.base_price}
                      onChange={(e) =>
                        handlePricingChange(
                          pkgIndex,
                          slotIndex,
                          pricingIndex,
                          "base_price",
                          e.target.value
                        )
                      }
                    />
                    <label className="form-label mt-2">Discount</label>
                    <input
                      type="number"
                      className="form-control"
                      value={pricing.discount}
                      onChange={(e) =>
                        handlePricingChange(
                          pkgIndex,
                          slotIndex,
                          pricingIndex,
                          "discount",
                          e.target.value
                        )
                      }
                    />
                    <label className="form-label mt-2">Label</label>
                    <input
                      type="text"
                      className="form-control"
                      value={pricing.label}
                      placeholder="Age Range"
                      onChange={(e) =>
                        handlePricingChange(
                          pkgIndex,
                          slotIndex,
                          pricingIndex,
                          "label",
                          e.target.value
                        )
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  })}
</div>;
