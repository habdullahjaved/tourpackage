"use client";

import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { isValidPhoneNumber } from "libphonenumber-js";

const MyPhoneInput = () => {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const handlePhoneChange = (value) => {
    // react-phone-input-2 returns the number without a plus,
    // so we add one for validation purposes.
    const formattedPhone = value.startsWith("+") ? value : `+${value}`;
    setPhone(value);
    if (isValidPhoneNumber(formattedPhone)) {
      setError("");
    } else {
      setError("Invalid phone number");
    }
  };

  return (
    <div>
      <PhoneInput
        // "ae" sets the default country; users can search and select any country.
        country={"ae"}
        value={phone}
        onChange={handlePhoneChange}
        enableSearch={true}
        placeholder="Enter phone number"
        inputStyle={{ width: "100%" }}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Displaying the phone number with a plus sign */}
      <p>{phone ? `+${phone}` : ""}</p>
    </div>
  );
};

export default MyPhoneInput;
