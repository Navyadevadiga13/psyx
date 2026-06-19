import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import axios from "axios";
import getApiBaseUrl from "../utils/api";
import "react-datepicker/dist/react-datepicker.css";

function ToeflSpeaking({ initialDate, onDateChange }) {

  const [selectedDate, setSelectedDate] = useState(initialDate || null);
  const [loading, setLoading] = useState(false);
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
useEffect(() => {
  window.scrollTo(0, 0);
}, []);
  const handleChange = (date) => {
    setSelectedDate(date);
    if (onDateChange) onDateChange(date);
  };

  const handleBooking = async () => {

    if (!fullname || !email || !contact) {
      alert("❌ Please enter name, email and contact number.");
      return;
    }

    if (contact.length !== 10) {
      alert("❌ Contact number must be 10 digits.");
      return;
    }

    if (!selectedDate) {
      alert("❌ Please select a date first.");
      return;
    }

    try {

      setLoading(true);

      const res = await axios.post(
        `${getApiBaseUrl()}/appointment/request`,
        {
          fullname,
          email,
          contact,
          date: selectedDate.toISOString().split("T")[0]
        }
      );

      console.log("API RESPONSE:", res.data);

      alert(
`✅ Your appointment request for ${selectedDate.toDateString()} has been submitted.

Please wait for a confirmation call from the Wizdom Center team.
Your test slot will be confirmed during the call.`
      );

      setSelectedDate(null);
      setFullname("");
      setEmail("");
      setContact("");

    } catch (error) {

      console.error("API ERROR:", error.response?.data || error.message);

      alert("❌ Failed to send appointment request.");

    } finally {
      setLoading(false);
    }
  };

  const isWeekday = (date) => {
    const day = date.getDay();
    return day !== 0 && day !== 6;
  };

  const borderColor = "#19fd91";

  return (

    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        paddingTop: "170px",
        minHeight: "100vh",
        backgroundColor: "#121212",
        fontFamily: "Segoe UI, sans-serif"
      }}
    >

      <div
        style={{
          padding: "35px",
          borderRadius: "14px",
          border: `2px solid ${borderColor}`,
          boxShadow: "0 6px 18px rgba(25,253,145,0.25)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#1a1a1a",
          gap: "20px",
          minWidth: "340px",
          maxWidth: "420px"
        }}
      >

        <h2
          style={{
            color: "#ffffff",
            fontSize: "1.8rem",
            fontWeight: "700",
            margin: 0,
            textAlign: "center"
          }}
        >
          TOEFL Speaking Test Appointment
        </h2>

        {/* Instructions */}

        <div
          style={{
            background: "#0f0f0f",
            padding: "15px",
            borderRadius: "8px",
            borderLeft: `4px solid ${borderColor}`,
            color: "#d6d6d6",
            fontSize: "14px",
            lineHeight: "1.6"
          }}
        >
          <strong style={{ color: borderColor }}>
            Instructions:
          </strong>
          <br />

          • To take the TOEFL Speaking Test, you must visit the <b>WiZdom Center</b>.
          <br />
          • Select a preferred date using the calendar below.
          <br />
          • Weekend bookings are not available.
          <br />
          • After submitting your appointment request, please wait for a
          <b> confirmation call from the WiZdom team</b>.
          <br />
          • Your speaking test slot will be finalized during the confirmation call.
        </div>

        {/* Name */}

        <input
          type="text"
          placeholder="Enter your full name"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #333",
            backgroundColor: "#0f0f0f",
            color: "#fff"
          }}
        />

        {/* Email */}

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #333",
            backgroundColor: "#0f0f0f",
            color: "#fff"
          }}
        />

        {/* Contact */}

        <input
          type="tel"
          placeholder="Enter contact number"
          value={contact}
          maxLength={10}
          onChange={(e) =>
            setContact(e.target.value.replace(/\D/g, ""))
          }
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #333",
            backgroundColor: "#0f0f0f",
            color: "#fff"
          }}
        />

        {/* Date Picker */}

<div
  style={{
    width: "100%",
    display: "flex",
    justifyContent: "center"
  }}
>
  <DatePicker
    selected={selectedDate}
    onChange={handleChange}
    filterDate={isWeekday}
    minDate={new Date()}
    dateFormat="MMMM d, yyyy"
    popperPlacement="bottom"
    placeholderText="📅 Select a date"
    customInput={
      <input
        style={{
          width: "260px",
          padding: "14px",
          borderRadius: "10px",
          border: "2px solid #19fd91",
          background: "linear-gradient(135deg,#0f0f0f,#1a1a1a)",
          color: "#ffffff",
          fontSize: "15px",
          textAlign: "center",
          cursor: "pointer",
          outline: "none",
          boxShadow: "0 4px 10px rgba(25,253,145,0.2)",
          transition: "all 0.25s ease"
        }}
      />
    }
  />
</div>
        {/* Button */}
{fullname && email && contact && selectedDate && (

  <button
    onClick={handleBooking}
    disabled={loading}
    style={{
      padding: "12px 24px",
      backgroundColor: borderColor,
      color: "#121212",
      border: "none",
      borderRadius: "8px",
      fontWeight: "700",
      cursor: "pointer",
      boxShadow: "0 4px 12px rgba(25,253,145,0.35)",
      transition: "all 0.2s ease-in-out",
      opacity: loading ? 0.7 : 1,
      alignSelf: "center",   // ⭐ centers button
      marginTop: "10px"
    }}
    onMouseEnter={(e) =>
      (e.currentTarget.style.transform = "scale(1.05)")
    }
    onMouseLeave={(e) =>
      (e.currentTarget.style.transform = "scale(1)")
    }
  >
    {loading ? "Sending..." : "Request Appointment"}
  </button>

)}

      </div>
    </div>
  );
}

export default ToeflSpeaking;