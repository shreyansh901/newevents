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
  const [openState, setOpenState] = useState(false);
  const [openCity, setOpenCity] = useState(false);
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

      {/* STATE DROPDOWN */}
      <div
        id="state"
        style={{
          border: "1px solid gray",
          padding: "8px",
          width: "200px",
          marginBottom: "10px",
          cursor: "pointer",
        }}
        onClick={() => setOpenState(!openState)}
      >
        {state || "Select State"}
        {openState && (
          <ul
            style={{
              listStyle: "none",
              margin: 0,
              padding: "5px",
              border: "1px solid #aaa",
            }}
          >
            {states.map((s) => (
              <li
                key={s}
                style={{ padding: "5px", cursor: "pointer" }}
                onClick={(e) => {
                  e.stopPropagation();
                  setState(s);
                  setOpenState(false);
                  setCity("");
                }}
              >
                {s}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* CITY DROPDOWN */}
      <div
        id="city"
        style={{
          border: "1px solid gray",
          padding: "8px",
          width: "200px",
          marginBottom: "10px",
          cursor: "pointer",
        }}
        onClick={() => {
          if (state) setOpenCity(!openCity);
        }}
      >
        {city || "Select City"}
        {openCity && state && (
          <ul
            style={{
              listStyle: "none",
              margin: 0,
              padding: "5px",
              border: "1px solid #aaa",
            }}
          >
            {citiesByState[state].map((c) => (
              <li
                key={c}
                style={{ padding: "5px", cursor: "pointer" }}
                onClick={(e) => {
                  e.stopPropagation();
                  setCity(c);
                  setOpenCity(false);
                }}
              >
                {c}
              </li>
            ))}
          </ul>
        )}
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
