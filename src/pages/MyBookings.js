import React, { useEffect, useState } from "react";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("bookings") || "[]");
    setBookings(data);
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>My Bookings</h1>
      {bookings.length === 0 && <p>No bookings yet.</p>}
      {bookings.map((b, i) => (
        <div
          key={i}
          style={{
            border: "1px solid gray",
            marginTop: "10px",
            padding: "10px",
          }}
        >
          <h3>{b.eventName}</h3>
          <p>{b.address}</p>
          <p>
            {b.city}, {b.state}
          </p>
          <p>{b.bookingTime}</p>
        </div>
      ))}
    </div>
  );
}
