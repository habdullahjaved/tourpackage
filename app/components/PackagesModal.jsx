"use client";
import React from "react";
import { Modal, Button } from "react-bootstrap";

const PackagesModal = ({
  show,
  handleClose,
  tourData,
  handlePackageChange,
  handleTimeSlotChange,
  peopleOptions,
  totalPrice,
  handleAddToCart,
}) => {
  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Choose a Package</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {tourData.packages.map((tourPackage) => (
          <div
            key={tourPackage.id}
            className={`card p-4 mt-2 ${
              tourPackage.is_package_selected === 1
                ? "border-primary"
                : "border-secondary"
            }`}
            style={{ cursor: "pointer" }}
            onClick={() => handlePackageChange(tourPackage.id)}
          >
            <div className="d-flex justify-content-between">
              <h5>{tourPackage.title}</h5>
              <input
                type="radio"
                className="form-check-input"
                value={tourPackage.id}
                checked={tourPackage.is_package_selected}
                readOnly
              />
            </div>
            {
              //tourPackage.is_package_selected === 1 &&
              tourPackage.time_slots.map((slot) => {
                if (slot.is_timeslot_selected === 1) {
                  return (
                    <div key={slot.id} className="mt-3">
                      <p className="text-bold">
                        {peopleOptions.adults} Adults x{" "}
                        {slot.pricing[0].base_price} AED
                      </p>
                      <p className="text-bold">
                        {peopleOptions.children > 0
                          ? `${peopleOptions.children} Children x  ${slot.pricing[1].base_price} AED`
                          : ""}
                        {/* {peopleOptions.children} Children x{" "}
                            {slot.pricing[1].base_price} AED */}
                      </p>
                      <p className="text-bold">
                        Total Price:{" "}
                        {slot.pricing[0].base_price * peopleOptions.adults +
                          slot.pricing[1].base_price *
                            peopleOptions.children}{" "}
                        AED
                      </p>
                    </div>
                  );
                }
                return null;
              })
            }
            <div className="mt-3">
              {tourPackage.time_slots.map((slot) => (
                <span
                  key={slot.id}
                  className={`badge rounded-pill p-2 me-2 ${
                    slot.is_timeslot_selected === 1
                      ? "bg-primary text-white"
                      : "bg-light text-dark"
                  }`}
                  style={{ cursor: "pointer" }}
                  onClick={(e) =>
                    handleTimeSlotChange(tourPackage.id, slot.id, e)
                  }
                >
                  {slot.start_time} - {slot.end_time}
                </span>
              ))}
            </div>
          </div>
        ))}
      </Modal.Body>
      <Modal.Footer>
        <h5>Total Price: {totalPrice} AED</h5>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleAddToCart}>
          Reserve Now
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PackagesModal;
