import React, { useState } from "react";
import EventCard from "../components/EventCard";

const states = ["Texas", "California", "Florida"];
const citiesByState = {
  Texas: ["Austin", "Dallas"],
  California: ["Los Angeles", "San Francisco"],
  Florida: ["Miami", "Orlando"],
};

export default function Home() {
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [events, setEvents] = useState([]);

  const handleSearch = async () => {
    const url = `https://eventdata.onrender.com/events?state=${state}&city=${city}`;
    const res = await fetch(url);
    const data = await res.json();
    setEvents(data);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Find Events</h2>

      <div style={{ marginBottom: "10px" }}>
        <div
          id="state"
          className="dropdown"
          onClick={(e) => e.stopPropagation()}
        >
          <label>State:</label>
          <select onChange={(e) => setState(e.target.value)} value={state}>
            <option value="">Select State</option>
            {states.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      <div style={{ marginBottom: "10px" }}>
        <div id="city" className="dropdown">
          <label>City:</label>
          <select onChange={(e) => setCity(e.target.value)} value={city}>
            <option value="">Select City</option>
            {state &&
              citiesByState[state].map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
      </div>

      <button id="searchBtn" disabled={!state || !city} onClick={handleSearch}>
        Search
      </button>

      {events.length > 0 && (
        <div>
          <h1>
            {events.length} events available in {city}
          </h1>
          {events.map((event, i) => (
            <EventCard key={i} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}
