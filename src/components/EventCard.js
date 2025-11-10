import React, { useState } from "react";
import BookingModal from "./BookingModal";

export default function EventCard({ event }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{ border: "1px solid gray", padding: "10px", marginTop: "10px" }}
    >
      <h3>{event.eventName}</h3>
      <p>{event.address}</p>
      <button onClick={() => setOpen(true)}>Book FREE Event</button>
      {open && <BookingModal event={event} onClose={() => setOpen(false)} />}
    </div>
  );
}
