"use client";
import React, { useEffect, useState, useCallback } from "react";
import ModalDatePicker from "./ModalDatePicker";
import PassengerOption from "./PassengerOption";
import PackagesModal from "./PackagesModal";
import OffCanvas from "./OffCanvas";

const initialTourData = {
  id: 60,
  title: "Tour test 1",
  slug: "tour-test-1-1",
  description: "<p>Test Test</p>",
  featured_image:
    "http://localhost/toursafaq/backend/public/uploads/tours/2_67ae11d015157.png",
  price: 90,
  packages: [
    {
      id: 5,
      title: "Dubai City Tour Half Day Shared Basis",
      is_default: 1,
      transport_option: 2,
      is_package_selected: 1,
      time_slots: [
        {
          id: 1,
          start_time: "09:00",
          end_time: "12:00",
          is_timeslot_selected: 1,
          pricing: [
            { pax_type_id: 1, base_price: 100 }, // Adult
            { pax_type_id: 2, base_price: 50 }, // Child
          ],
        },
        {
          id: 2,
          start_time: "17:00",
          end_time: "20:00",
          is_timeslot_selected: 0,
          pricing: [
            { pax_type_id: 1, base_price: 120 }, // Adult
            { pax_type_id: 2, base_price: 60 }, // Child
          ],
        },
        {
          id: 11,
          start_time: "17:00",
          end_time: "20:00",
          is_timeslot_selected: 0,
          pricing: [
            { pax_type_id: 1, base_price: 120 }, // Adult
            { pax_type_id: 2, base_price: 60 }, // Child
          ],
        },
        {
          id: 12,
          start_time: "17:00",
          end_time: "20:00",
          is_timeslot_selected: 0,
          pricing: [
            { pax_type_id: 1, base_price: 120 }, // Adult
            { pax_type_id: 2, base_price: 60 }, // Child
          ],
        },
      ],
    },
    {
      id: 6,
      title: "Dubai City Tour Half Day Private Basis",
      is_default: 0,
      transport_option: 2,
      is_package_selected: 0,
      time_slots: [
        {
          id: 3,
          start_time: "09:00",
          end_time: "12:00",
          is_timeslot_selected: 0,
          pricing: [
            { pax_type_id: 1, base_price: 200 }, // Adult
            { pax_type_id: 2, base_price: 100 }, // Child
          ],
        },
        {
          id: 4,
          start_time: "17:00",
          end_time: "20:00",
          is_timeslot_selected: 0,
          pricing: [
            { pax_type_id: 1, base_price: 250 }, // Adult
            { pax_type_id: 2, base_price: 120 }, // Child
          ],
        },
      ],
    },
    {
      id: 7,
      title: "Dubai City Tour Half Day Private Basis",
      is_default: 0,
      transport_option: 2,
      is_package_selected: 0,
      time_slots: [
        {
          id: 3,
          start_time: "09:00",
          end_time: "12:00",
          is_timeslot_selected: 0,
          pricing: [
            { pax_type_id: 1, base_price: 200 }, // Adult
            { pax_type_id: 2, base_price: 100 }, // Child
          ],
        },
        {
          id: 4,
          start_time: "17:00",
          end_time: "20:00",
          is_timeslot_selected: 0,
          pricing: [
            { pax_type_id: 1, base_price: 250 }, // Adult
            { pax_type_id: 2, base_price: 120 }, // Child
          ],
        },
      ],
    },
  ],
};

const TourPage2 = () => {
  const [tourData, setTourData] = useState(initialTourData);
  const [selectedDate, setSelectedDate] = useState(Date() + 1);
  const [openOption, setOpenOption] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [buttonText, setButtonText] = useState("Check Availability");
  const [peopleOptions, setPeopleOptions] = useState({
    adults: 1,
    children: 0,
    infants: 0,
  });
  const [totalPrice, setTotalPrice] = useState(0);

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  const handleSearch = () => {
    console.log("Updated Passenger Options: ", peopleOptions);
    setOpenOption(false);
  };
  const handleClose = () => {};
  const handleShow = () => {};
  const handlePackageChange = useCallback((packageId) => {
    setTourData((prev) => ({
      ...prev,
      packages: prev.packages.map((pkg) => ({
        ...pkg,
        is_package_selected: pkg.id === packageId ? 1 : 0,
        time_slots: pkg.time_slots.map((slot, index) => ({
          ...slot,
          is_timeslot_selected: pkg.id === packageId && index === 0 ? 1 : 0,
        })),
      })),
    }));
  }, []);

  const handleTimeSlotChange = useCallback((packageId, timeSlotId, e) => {
    e.stopPropagation(); // Stop event bubbling

    setTourData((prevTourData) => ({
      ...prevTourData,
      packages: prevTourData.packages.map((pkg) => {
        if (pkg.id === packageId) {
          return {
            ...pkg,
            time_slots: pkg.time_slots.map((slot) => ({
              ...slot,
              is_timeslot_selected: slot.id === timeSlotId ? 1 : 0,
            })),
          };
        }
        return pkg;
      }),
    }));
  }, []);

  const handleOption = (type, operation) => {
    setPeopleOptions((prev) => ({
      ...prev,
      [type]:
        operation === "i"
          ? prev[type] + 1
          : prev[type] > 0
          ? prev[type] - 1
          : 0,
    }));
  };
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowOffcanvas(true);
      } else {
        setShowOffcanvas(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAddToCart = () => {
    // localStorage.setItem()

    const cart = {
      item: tourData.packages.find((pkg) => pkg.is_package_selected === 1),
      //   .time_slots.find((slot) => slot.is_timeslot_selected),
      travellers: {
        adults: peopleOptions.adults,
        children: peopleOptions.children,
      },
      travelDate: selectedDate,
    };

    console.log(cart);
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  useEffect(() => {
    let total = 0;
    tourData.packages.forEach((pkg) => {
      if (pkg.is_package_selected === 1) {
        pkg.time_slots.forEach((slot) => {
          if (slot.is_timeslot_selected === 1) {
            slot.pricing?.forEach((price) => {
              switch (price.pax_type_id) {
                case 1:
                  total += price.base_price * peopleOptions.adults;
                  break;
                case 2:
                  total += price.base_price * peopleOptions.children;
                  break;
                default:
                  break;
              }
            });
          }
        });
      }
    });
    setTotalPrice(total);
  }, [tourData, peopleOptions]);

  return (
    <div className="container mt-4">
      <div className="row mt-4">
        <div className="col-md-8">
          <img
            src={tourData?.featured_image}
            alt="tour image"
            className="img-fluid"
          />
        </div>
        <div className="col-md-4 mt-2" style={{ marginBottom: "200px" }}>
          <div className="card px-2 py-3">
            <div className="card py-3 px-2 mt-1 mb-2">
              <p className="text-bold">Starting from {tourData.price} AED</p>
              <p>Select date and travelers</p>
              <ModalDatePicker
                selectedDate={selectedDate}
                onDateChange={handleDateChange}
                dateType={"Pickup Date"}
                datePosition={"sideBar"}
              />

              <PassengerOption
                peopleOptions={peopleOptions}
                handleOption={handleOption}
                handleSearch={handleSearch}
                openOption={openOption}
                setOpenOption={setOpenOption}
              />
            </div>
            {tourData.packages?.slice(0, 2)?.map((tourPackage) => (
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
                {/* Price Calculation Display */}
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
                <div className="row mt-3 mb-2">
                  {tourPackage.time_slots.slice(0, 3).map((slot) => (
                    <span className="col-4">
                      {" "}
                      <span
                        key={slot.id}
                        className={` badge rounded-pill p-2 me-2 ${
                          slot.is_timeslot_selected === 1
                            ? "bg-primary text-white"
                            : "bg-light text-dark border"
                        }`}
                        style={{ cursor: "pointer" }}
                        onClick={(e) =>
                          handleTimeSlotChange(tourPackage.id, slot.id, e)
                        }
                      >
                        {slot.start_time} - {slot.end_time}
                      </span>
                    </span>
                  ))}
                  <span>
                    {tourPackage?.time_slots.length > 3 ? (
                      <span
                        onClick={() => setShowModal(true)}
                        style={{ textDecoration: "underline" }}
                      >
                        See More Options
                      </span>
                    ) : (
                      ""
                    )}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div onClick={() => setShowModal(true)}>
            See All {tourData.packages.length} Options
          </div>
          <div className="card p-4 mt-2">
            <button className="btn btn-secondary" onClick={handleAddToCart}>
              Reserve Now
            </button>
          </div>
        </div>
      </div>
      <PackagesModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        tourData={tourData}
        handlePackageChange={handlePackageChange}
        handleTimeSlotChange={handleTimeSlotChange}
        peopleOptions={peopleOptions}
        totalPrice={totalPrice}
        handleAddToCart={handleAddToCart}
      />

      <OffCanvas
        show={showOffcanvas}
        setShow={setShowOffcanvas}
        handleClose={handleClose}
        handleShow={handleShow}
        setShowModal={setShowModal}
        price={tourData.price}
        title={tourData.title}
      />
    </div>
  );
};

export default TourPage2;
