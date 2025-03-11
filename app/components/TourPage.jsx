"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import ModalDatePicker from "./ModalDatePicker";
import { UserRound, Users } from "lucide-react";
import PassengerOption from "./PassengerOption";
import { Button } from "react-bootstrap";
import DateModal from "./DateModal";
import PicModal from "./PicModal";
import DatePicker from "./DatePicker";
import Example from "./Example";
import CustomeDatePicker from "./CustomeDatePicker";

const initialTourData = {
  id: 60,
  title: "Tour test 1",
  slug: "tour-test-1-1",
  description: "<p>Test Test</p>",
  price: 90,
  featured_image:
    "http://localhost/toursafaq/backend/public/uploads/tours/2_67ae11d015157.png",
  packages: [
    {
      id: 7,
      title: "Dubai City Tour Half Day Shared Basis",
      transport_option: 2,
      package_pricings: [
        { pax_type_id: 1, base_price: 90 },
        { pax_type_id: 2, base_price: 80 },
      ],
    },
    {
      id: 8,
      title: "Dubai City Tour Half Day Private Basis",
      transport_option: 1,
      package_pricings: [
        { pax_type_id: 1, base_price: 300 },
        { pax_type_id: 2, base_price: 250 },
      ],
    },
  ],
};

const TourPage = () => {
  const [errors, setErrors] = useState({});
  const wrapperRef = useRef(null);
  const [tourData, setTourData] = useState(() => {
    // Add selectedPackage key to each package
    const updatedPackages = initialTourData.packages.map((pkg) => ({
      ...pkg,
      selectedPackage: 0,
    }));
    return { ...initialTourData, packages: updatedPackages };
  });
  const [selectedPackage, setSelectedPackage] = useState(
    initialTourData.packages[0]
  );

  const [selectedDate, setSelectedDate] = useState("");
  const [showDateModal, setShowDateModal] = useState(false);
  const [showPicModal, setShowPicModal] = useState(false);
  const handleDateChange = (newDate) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      selectedDate: "",
    }));
    setSelectedDate(newDate);
  };

  const [totalPrice, setTotalPrice] = useState(0);

  const calculateTotalPrice = (selectedPkg) => {
    let total = 0;

    selectedPkg.package_pricings.forEach((pricing) => {
      switch (pricing.pax_type_id) {
        case 1: // Adults
          total += pricing.base_price * peopleOptions.adults;
          break;
        case 2: // Children
          total += pricing.base_price * peopleOptions.children;
          break;
        // Add a case for infants if needed
        default:
          break;
      }
    });

    setTotalPrice(total);
  };
  const [openOption, setOpenOption] = useState(false);
  const [peopleOptions, setPeopleOptions] = useState({
    adults: 1,
    children: 0,
    infants: 0,
  });

  const handleOption = (type, operation) => {
    setPeopleOptions((prev) => {
      return {
        ...prev,
        [type]:
          operation === "i"
            ? prev[type] + 1
            : prev[type] > 0
            ? prev[type] - 1
            : 0,
      };
    });
  };
  const handleSearch = () => {
    console.log("Updated Passenger Options: ", peopleOptions);
    setOpenOption(false); // Close the dropdown after updating
  };

  //   const handleOption = (name, operation) => {
  //     setPeopleOptions((prev) => {
  //       const newValue =
  //         operation === "i" ? peopleOptions[name] + 1 : peopleOptions[name] - 1;

  //       return {
  //         ...prev,
  //         [name]: newValue,
  //       };
  //     });

  //     // Recalculate price based on updated passenger count
  //     const selectedPkg = tourData.packages.find(
  //       (pkg) => pkg.selectedPackage === 1
  //     );
  //     if (selectedPkg) {
  //       calculateTotalPrice(selectedPkg);
  //     }
  //   };
  //   useEffect(() => {
  //     const handleClickOutside = (event) => {
  //       if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
  //         setOpenOption(false);
  //       }
  //     };
  //     document.addEventListener("mousedown", handleClickOutside);
  //     return () => {
  //       document.removeEventListener("mousedown", handleClickOutside);
  //     };
  //   }, []);

  //   const handleSearch = () => {
  //     console.log("Updated Passenger Options: ", peopleOptions);
  //     setOpenOption(false); // Close the dropdown after updating
  //   };

  useEffect(() => {
    handlePackageChange(initialTourData.packages[0].id);
  }, []);

  //   const handlePackageChange = (packageId) => {
  //     const selected = tourData.packages.find(
  //       (pkg) => pkg.id === parseInt(packageId)
  //     );
  //     setSelectedPackage(selected);
  //   };

  const handlePackageChange = (packageId) => {
    const updatedPackages = tourData.packages.map((pkg) => ({
      ...pkg,
      selectedPackage: pkg.id === packageId ? 1 : 0, // Toggle selection
    }));
    setTourData((prevData) => ({
      ...prevData,
      packages: updatedPackages,
    }));
    const selectedPkg = updatedPackages.find((pkg) => pkg.id === packageId);
    if (selectedPkg) {
      calculateTotalPrice(selectedPkg);
    }
  };

  console.log(tourData.packages);
  return (
    <div className="container mt-4">
      <div className="row mt-4">
        <div className="col-md-8 col-md-8">
          <img
            src={tourData?.featured_image}
            alt="tour image"
            className="img-fluid"
          />

          <div>
            {" "}
            <Button onClick={() => setShowDateModal(true)}>
              Open Date Modal
            </Button>
            <Button onClick={() => setShowPicModal(true)}>
              Open Pic Modal
            </Button>
          </div>
          <div>
            <DateModal
              show={showDateModal}
              onHide={() => setShowDateModal(false)}
            />{" "}
            {/* Pic Modal */}
            <PicModal
              show={showPicModal}
              onHide={() => setShowPicModal(false)}
            />
          </div>
        </div>
        <div className="col-md-4 col-md-4 mt-2">
          <div className="card py-3 px-2 mt-1 mb-2">
            <p className="text-bold">Starting from {tourData.price} AED</p>
            <p>Select date and travelers</p>

            <CustomeDatePicker />
            {/* <Example /> */}
            {/* <DatePicker /> */}
            {/* <ModalDatePicker
              selectedDate={selectedDate} // Here Passing selected date as a prop
              onDateChange={handleDateChange} // Here Passing the handler to update the date
              dateType={"Pickup Date"}
              datePosition={"sideBar"}
            /> */}

            <div>
              <PassengerOption
                peopleOptions={peopleOptions}
                handleOption={handleOption}
                handleSearch={handleSearch}
                openOption={openOption}
                setOpenOption={setOpenOption}
              />
            </div>
            {/* <div className="options-wrapper mt-2">
              <span className="option-top-text"> Passengers </span>
              <span
                className=" option-main-text"
                onClick={() => setOpenOption(!openOption)}
              >
                <Users />
                <span className="option-text-internal">{`${peopleOptions.adults} Adults ${peopleOptions.children} Childs ${peopleOptions.infants} Infants`}</span>
              </span>
              {openOption && (
                <div className="options">
                  <div className="option-item">
                    <span className="option-text">Adult</span>
                    <div className="option-counter">
                      <button
                        disabled={peopleOptions.adults <= 1}
                        className="option-counter-button"
                        onClick={() => handleOption("adults", "d")}
                      >
                        -
                      </button>
                      <span className="option-counter-number">
                        {peopleOptions.adults}
                      </span>
                      <button
                        className="option-counter-button"
                        onClick={() => handleOption("adults", "i")}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="option-item">
                    <span className="option-text">Children</span>
                    <div className="option-counter">
                      <button
                        disabled={peopleOptions.children < 1}
                        className="option-counter-button"
                        onClick={() => handleOption("children", "d")}
                      >
                        -
                      </button>
                      <span className="option-counter-number">
                        {peopleOptions.children}
                      </span>
                      <button
                        className="option-counter-button"
                        onClick={() => handleOption("children", "i")}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="option-item">
                    <span className="option-text">Infants</span>
                    <div className="option-counter">
                      <button
                        disabled={peopleOptions.infants < 1}
                        className="option-counter-button"
                        onClick={() => handleOption("infants", "d")}
                      >
                        -
                      </button>
                      <span className="option-counter-number">
                        {peopleOptions.infants}
                      </span>
                      <button
                        className="option-counter-button"
                        onClick={() => handleOption("infants", "i")}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div> */}
            {tourData.packages?.map((tourPackage) => (
              <div
                key={tourPackage.id}
                className="card p-4 mt-2"
                style={{
                  border: tourPackage.selectedPackage
                    ? "2px solid #007bff"
                    : "2px solid #ddd",
                  cursor: "pointer",
                }}
                onClick={() => handlePackageChange(tourPackage.id)}
              >
                <div className="d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-center">
                    <p className="me-2">{tourPackage.title}</p>
                    <input
                      type="radio"
                      className="form-check-input"
                      value={tourPackage.id}
                      checked={tourPackage.selectedPackage}
                      readOnly
                    />
                  </div>

                  <p className="text-bold">
                    {peopleOptions.adults} Adults x{" "}
                    {tourPackage.package_pricings[0].base_price}
                  </p>
                  <p className="text-bold">
                    {peopleOptions.children} Children x{" "}
                    {tourPackage.package_pricings[1].base_price}
                  </p>
                  <p className="text-bold">
                    Total Price:{" "}
                    {tourPackage.package_pricings[0].base_price *
                      peopleOptions.adults +
                      tourPackage.package_pricings[1].base_price *
                        peopleOptions.children}
                    AED
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/// calculate price might not like that to change original pricies it is  it should be just to provide like quantities

// Adult 2 x base_price = 180
// children 2 x base_price = 160

//  want to make it like that for it should be effective and production ready

// I want to clone tripadvisor like user design and experience for this package selection  how i manage properly things

export default TourPage;
