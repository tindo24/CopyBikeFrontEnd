import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { ChevronDown, ChevronUp } from "lucide-react";
import "./Facilitator.css";
import "react-calendar/dist/Calendar.css";

const API = import.meta.env.VITE_API_URL;

export default function Facilitator() {
  const [facilitator, setFacilitator] = useState(null);
  const [events, setEvents] = useState([]);
  const [expandedEventId, setExpandedEventId] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Show/hide dropdown sections
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [showAddParent, setShowAddParent] = useState(false);
  const [showAddVolunteer, setShowAddVolunteer] = useState(false);

  // Event form
  const [newEvent, setNewEvent] = useState({
    title: "",
    type: "",
    start_location: "",
    end_location: "",
    date: "",
    start_time: "",
    end_time: "",
  });

  // Parent form
  const [newParent, setNewParent] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: "",
  });

  // Volunteer form
  const [newVolunteer, setNewVolunteer] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    interest: "repair",
    preferred_school: "",
  });

  // School dropdown list
  const schoolOptions = [
    "Blackhawk Middle School",
    "Pflugerville High School",
    "Park Crest Middle School",
    "Kelly Lane Middle School",
    "Cele Middle School",
    "Rowe Lane Elementary",
    "Murchison Elementary",
    "Hendrickson High School",
    "Westview Middle School",
    "Timmerman Elementary",
  ];

  // Load initial data
  useEffect(() => {
    setFacilitator({
      name: "Coach Daniels",
      email: "coach.d@example.com",
    });

    setEvents([
      {
        id: 1,
        title: "Community Ride",
        type: "Outdoor",
        start_location: "Blackhawk Park",
        end_location: "Enchanted Rock",
        date: "2025-11-15",
        start_time: "09:00 AM",
        end_time: "12:00 PM",
      },
      {
        id: 2,
        title: "River Side Loop",
        type: "Trail",
        start_location: "YMCA Gym",
        end_location: "YMCA Gym",
        date: "2025-12-02",
        start_time: "10:00 AM",
        end_time: "11:30 AM",
      },
    ]);
  }, []);

  if (!facilitator) return <p>Loading facilitator data...</p>;

  const selectedDateString = selectedDate.toISOString().split("T")[0];
  const eventDates = events.map((e) => e.date);

  const toggleExpand = (id) => {
    setExpandedEventId(expandedEventId === id ? null : id);
  };

  // ----- ADD EVENT -----
  const handleAddEvent = (e) => {
    e.preventDefault();

    const newId = Date.now();
    const eventObj = { id: newId, ...newEvent };

    setEvents([...events, eventObj]);

    setNewEvent({
      title: "",
      type: "",
      start_location: "",
      end_location: "",
      date: "",
      start_time: "",
      end_time: "",
    });

    alert("Event added!");
  };

  // ----- DELETE EVENT -----
  const deleteEvent = (id) => {
    setEvents(events.filter((e) => e.id !== id));
  };

  // ----- ADD PARENT -----
  const handleAddParent = (e) => {
    e.preventDefault();
    console.log("Parent added:", newParent);

    setNewParent({
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      address: "",
    });

    alert("Parent added!");
  };

  // ----- ADD VOLUNTEER -----
  const handleAddVolunteer = (e) => {
    e.preventDefault();
    console.log("Volunteer added:", newVolunteer);

    setNewVolunteer({
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      interest: "repair",
      preferred_school: "",
    });

    alert("Volunteer added!");
  };

  return (
    <div className="facilitator-container">
      {/* ------------ PROFILE -------------- */}
      <div className="facilitator-profile">
        <h2>Welcome, {facilitator.name}</h2>
        <p>{facilitator.email}</p>
      </div>

      {/* ------------ CALENDAR -------------- */}
      <div className="calendar-section">
        <h3>Event Calendar</h3>

        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          tileClassName={({ date }) => {
            const formatted = date.toISOString().split("T")[0];
            return eventDates.includes(formatted) ? "event-date" : null;
          }}
        />
      </div>

      {/* ------------ EVENT LIST (Cards) -------------- */}
      <div className="event-grid">
        <h3>All Events</h3>

        {events.map((event) => (
          <div
            key={event.id}
            className={`event-card ${
              expandedEventId === event.id ? "expanded" : ""
            }`}
            onClick={() => toggleExpand(event.id)}
          >
            <div className="event-header-row">
              <h4>{event.title}</h4>
              {expandedEventId === event.id ? <ChevronUp /> : <ChevronDown />}
            </div>

            <p className="event-type">{event.type}</p>
            <p>
              <strong>Start:</strong> {event.start_location}
            </p>

            {expandedEventId === event.id && (
              <div className="event-details">
                <p>
                  <strong>Date:</strong> {event.date}
                </p>
                <p>
                  <strong>Time:</strong> {event.start_time} – {event.end_time}
                </p>
                <p>
                  <strong>End Location:</strong> {event.end_location}
                </p>

                <button
                  className="delete-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteEvent(event.id);
                  }}
                >
                  Delete Event
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ------------ ADMIN ACTIONS -------------- */}
      <div className="admin-actions">
        {/* ADD EVENT */}
        <div className="action-card">
          <div
            className="action-header"
            onClick={() => setShowAddEvent(!showAddEvent)}
          >
            <h4>Add Event</h4>
            {showAddEvent ? <ChevronUp /> : <ChevronDown />}
          </div>

          {showAddEvent && (
            <form className="action-form" onSubmit={handleAddEvent}>
              <input
                placeholder="Title"
                required
                value={newEvent.title}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, title: e.target.value })
                }
              />
              <input
                placeholder="Type"
                required
                value={newEvent.type}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, type: e.target.value })
                }
              />
              <input
                placeholder="Start Location"
                required
                value={newEvent.start_location}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, start_location: e.target.value })
                }
              />
              <input
                placeholder="End Location"
                required
                value={newEvent.end_location}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, end_location: e.target.value })
                }
              />
              <input
                type="date"
                required
                value={newEvent.date}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, date: e.target.value })
                }
              />
              <input
                type="time"
                required
                value={newEvent.start_time}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, start_time: e.target.value })
                }
              />
              <input
                type="time"
                required
                value={newEvent.end_time}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, end_time: e.target.value })
                }
              />

              <button className="action-btn" type="submit">
                Add Event
              </button>
            </form>
          )}
        </div>

        {/* ADD PARENT */}
        <div className="action-card">
          <div
            className="action-header"
            onClick={() => setShowAddParent(!showAddParent)}
          >
            <h4>Add Parent</h4>
            {showAddParent ? <ChevronUp /> : <ChevronDown />}
          </div>

          {showAddParent && (
            <form className="action-form" onSubmit={handleAddParent}>
              {Object.keys(newParent).map((field) => (
                <input
                  key={field}
                  placeholder={field.replace("_", " ").toUpperCase()}
                  value={newParent[field]}
                  onChange={(e) =>
                    setNewParent({ ...newParent, [field]: e.target.value })
                  }
                  required
                />
              ))}
              <button className="action-btn">Add Parent</button>
            </form>
          )}
        </div>

        {/* ADD VOLUNTEER */}
        <div className="action-card">
          <div
            className="action-header"
            onClick={() => setShowAddVolunteer(!showAddVolunteer)}
          >
            <h4>Add Volunteer</h4>
            {showAddVolunteer ? <ChevronUp /> : <ChevronDown />}
          </div>

          {showAddVolunteer && (
            <form className="action-form" onSubmit={handleAddVolunteer}>
              <input
                placeholder="First Name"
                required
                value={newVolunteer.first_name}
                onChange={(e) =>
                  setNewVolunteer({
                    ...newVolunteer,
                    first_name: e.target.value,
                  })
                }
              />
              <input
                placeholder="Last Name"
                required
                value={newVolunteer.last_name}
                onChange={(e) =>
                  setNewVolunteer({
                    ...newVolunteer,
                    last_name: e.target.value,
                  })
                }
              />
              <input
                type="email"
                placeholder="Email"
                required
                value={newVolunteer.email}
                onChange={(e) =>
                  setNewVolunteer({ ...newVolunteer, email: e.target.value })
                }
              />
              <input
                placeholder="Phone"
                required
                value={newVolunteer.phone}
                onChange={(e) =>
                  setNewVolunteer({ ...newVolunteer, phone: e.target.value })
                }
              />

              {/* Interest Dropdown */}
              <select
                value={newVolunteer.interest}
                onChange={(e) =>
                  setNewVolunteer({
                    ...newVolunteer,
                    interest: e.target.value,
                  })
                }
              >
                <option value="repair">Repair</option>
                <option value="rider">Rider</option>
              </select>

              {/* SCHOOL DROPDOWN */}
              <select
                required
                value={newVolunteer.preferred_school}
                onChange={(e) =>
                  setNewVolunteer({
                    ...newVolunteer,
                    preferred_school: e.target.value,
                  })
                }
              >
                <option value="">Preferred School</option>
                {schoolOptions.map((school) => (
                  <option key={school} value={school}>
                    {school}
                  </option>
                ))}
              </select>

              <button className="action-btn">Add Volunteer</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
