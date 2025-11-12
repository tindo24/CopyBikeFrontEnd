import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "./Parent.css";
import "react-calendar/dist/Calendar.css";

export default function Parent() {
  const [parent, setParent] = useState(null);
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    // Mock parent info
    setParent({
      name: "Jane Doe",
      email: "jane.doe@email.com",
      phone: "512-555-1212",
    });

    // Mock events (later fetch these via API)
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
        student_name: "Ethan Doe",
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
        student_name: "Ethan Doe",
      },
      {
        id: 3,
        title: "Down Town Trail",
        type: "Trail",
        start_location: "Train Station",
        end_location: "Costco Lot",
        date: "2025-12-08",
        start_time: "10:00 AM",
        end_time: "11:30 AM",
        student_name: "Ethan Doe",
      },
    ]);
  }, []);

  if (!parent) return <p>Loading parent data...</p>;

  const eventDates = events.map((event) => event.date);
  const selectedDateString = selectedDate.toISOString().split("T")[0];

  // Filter events for selected day
  const eventsForSelectedDate = events.filter(
    (event) => event.date === selectedDateString
  );

  // ❌ Remove event handler
  const handleRemoveEvent = (eventId) => {
    const updatedEvents = events.filter((event) => event.id !== eventId);
    setEvents(updatedEvents);
    alert("Your child has been removed from this event.");
    // In real app, also send DELETE/PUT request to backend
  };

  return (
    <div className="parent-container">
      {/* 🧑 Parent Profile */}
      <div className="parent-profile">
        <h2>Welcome, {parent.name}</h2>
        <p>{parent.email}</p>
        <p>{parent.phone}</p>
      </div>

      {/* 🗓 Calendar Section */}
      <div className="calendar-section">
        <h3>Your Child’s Event Calendar</h3>
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          tileClassName={({ date }) => {
            const formatted = date.toISOString().split("T")[0];
            if (eventDates.includes(formatted)) {
              return "event-date";
            }
            return null;
          }}
        />
      </div>

      {/* 📅 Events Section */}
      <div className="parent-events">
        <h3>
          {eventsForSelectedDate.length > 0
            ? `Events on ${selectedDate.toDateString()}`
            : "Your Child’s Upcoming Events"}
        </h3>

        <table className="events-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Type</th>
              <th>Start Location</th>
              <th>End Location</th>
              <th>Date</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Student Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {(eventsForSelectedDate.length > 0
              ? eventsForSelectedDate
              : events
            ).map((event) => (
              <tr key={event.id}>
                <td>{event.title}</td>
                <td>{event.type}</td>
                <td>{event.start_location}</td>
                <td>{event.end_location}</td>
                <td>{event.date}</td>
                <td>{event.start_time}</td>
                <td>{event.end_time}</td>
                <td>{event.student_name}</td>
                <td>
                  <button
                    className="remove-btn"
                    onClick={() => handleRemoveEvent(event.id)}
                  >
                    Remove student
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
