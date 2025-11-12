// src/pages/Volunteer.jsx
import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "./Volunteer.css";
import "react-calendar/dist/Calendar.css";

export default function Volunteer() {
  const [volunteer, setVolunteer] = useState(null);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    // Mock volunteer data
    setVolunteer({
      first_name: "John",
      last_name: "Smith",
      email: "john.smith@email.com",
    });

    // Mock assigned events with student + parent info
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
        participants: [
          {
            student_name: "Alex Johnson",
            parent_name: "Mark Johnson",
            parent_email: "mark.johnson@email.com",
            parent_phone: "512-555-9834",
          },
          {
            student_name: "Ethan Kim",
            parent_name: "Sarah Kim",
            parent_email: "sarah.kim@email.com",
            parent_phone: "512-555-6578",
          },
          {
            student_name: "Jeff Curtis",
            parent_name: "Mark Curtis",
            parent_email: "mark.johnson@email.com",
            parent_phone: "512-555-9834",
          },
          {
            student_name: "Fred Warner",
            parent_name: "Sarah Warner",
            parent_email: "sarah.kim@email.com",
            parent_phone: "512-555-6578",
          },
          {
            student_name: "Joe Austin",
            parent_name: "Steve Austin",
            parent_email: "mark.johnson@email.com",
            parent_phone: "512-555-9834",
          },
          {
            student_name: "Michale Chen",
            parent_name: "Humphrey chen",
            parent_email: "sarah.kim@email.com",
            parent_phone: "512-555-6578",
          },
        ],
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
        participants: [
          {
            student_name: "Lucas Brown",
            parent_name: "Emma Brown",
            parent_email: "emma.brown@email.com",
            parent_phone: "512-555-7321",
          },
        ],
      },
    ]);
  }, []);

  const selectedDateString = selectedDate.toISOString().split("T")[0];
  const eventsOnSelectedDate = events.filter(
    (e) => e.date === selectedDateString
  );

  if (!volunteer) return <p>Loading volunteer data...</p>;

  return (
    <div className="volunteer-container">
      {/* Volunteer Profile */}
      <div className="volunteer-profile">
        <h2>
          Welcome, {volunteer.first_name} {volunteer.last_name}
        </h2>
        <p className="volunteer-email">{volunteer.email}</p>
      </div>

      {/* Calendar */}
      <div className="volunteer-calendar">
        <h3>Event Calendar</h3>
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          tileClassName={({ date }) => {
            const dateStr = date.toISOString().split("T")[0];
            return events.some((event) => event.date === dateStr)
              ? "has-event"
              : "";
          }}
        />
      </div>

      {/* Events Table */}
      <div className="volunteer-events">
        <h3>Click event to see more details</h3>
        {events.length > 0 ? (
          <table className="events-table">
            <thead>
              <tr>
                <th>Event Name</th>
                <th>Start Date</th>
                <th>Start Time</th>
                <th>Start Location</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr
                  key={event.id}
                  className="clickable-row"
                  onClick={() => setSelectedEvent(event)}
                >
                  <td>{event.title}</td>
                  <td>{event.date}</td>
                  <td>{event.start_time}</td>
                  <td>{event.start_location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No assigned events yet.</p>
        )}
      </div>

      {/* Event Details Section */}
      {selectedEvent && (
        <div className="event-details">
          <h3>Event Details</h3>
          <p>
            <strong>Title:</strong> {selectedEvent.title}
          </p>
          <p>
            <strong>Type:</strong> {selectedEvent.type}
          </p>
          <p>
            <strong>Start Location:</strong> {selectedEvent.start_location}
          </p>
          <p>
            <strong>End Location:</strong> {selectedEvent.end_location}
          </p>
          <p>
            <strong>Date:</strong> {selectedEvent.date}
          </p>
          <p>
            <strong>Time:</strong> {selectedEvent.start_time} -{" "}
            {selectedEvent.end_time}
          </p>

          <h4>Students Signed Up:</h4>
          {selectedEvent.participants.length > 0 ? (
            <table className="events-table">
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Parent Name</th>
                  <th>Parent Email</th>
                  <th>Parent Phone</th>
                </tr>
              </thead>
              <tbody>
                {selectedEvent.participants.map((p, index) => (
                  <tr key={index}>
                    <td>{p.student_name}</td>
                    <td>{p.parent_name}</td>
                    <td>{p.parent_email}</td>
                    <td>{p.parent_phone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No students signed up yet.</p>
          )}

          <button className="close-btn" onClick={() => setSelectedEvent(null)}>
            Close
          </button>
        </div>
      )}
    </div>
  );
}
