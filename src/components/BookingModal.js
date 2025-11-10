import React, { useState } from "react";

export default function BookingModal({ event, onClose }) {
  const [email, setEmail] = useState("");

  const handleBook = () => {
    const booking = {
      ...event,
      bookingDate: new Date().toISOString(),
      bookingTime: "07:00 PM",
      bookingEmail: email,
    };

    const prev = JSON.parse(localStorage.getItem("bookings") || "[]");
    localStorage.setItem("bookings", JSON.stringify([...prev, booking]));
    alert("Booking saved!");
    onClose();
  };

  return (
    <div style={{ background: "#fafafa", padding: "10px", marginTop: "10px" }}>
      <p>Today</p>
      <p>Morning</p>
      <p>Afternoon</p>
      <p>Evening</p>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <button onClick={handleBook}>Confirm Booking</button>
      <button onClick={onClose}>Close</button>
    </div>
  );
}
