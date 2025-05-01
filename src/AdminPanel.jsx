import React, { useState } from "react";
import { bookings, rooms } from "./bookings";
import { users } from './users';

import "./AdminPanel.css";

function AdminPanel() {
  const [message, setMessage] = useState(""); // To show status updates

  const handleApproval = (bookingId, action) => {
    const booking = bookings.find((b) => b.id === bookingId);
    if (booking) {
      // Update the booking status based on the action
      if (action === "approve") {
        booking.status = "approved";
        setMessage("Booking approved successfully.");
      } else if (action === "disapprove") {
        booking.status = "disapproved";
        setMessage("Booking disapproved.");
      }
    }
  };

  return (
    <div className="admin-panel">
      <h2>Admin Panel</h2>
      <h3>Pending Bookings</h3>

      {message && <p style={{ color: "green", fontWeight: "bold" }}>{message}</p>}

      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        bookings.map((booking) => {
          const room = rooms.find((r) => r.id === booking.roomId);
          const user = users.find((u) => u.id === booking.userId);
          return (
            <div key={booking.id} className="booking-card">
              <p>
                <strong>{user?.email}</strong> requested{" "}
                <strong>{room?.name}</strong> (Status: {booking.status})
              </p>

              {/* Display the booking date */}
              <p><strong>Booking Date: </strong>{booking.date} at {booking.time}</p>

              {/* Approve and Disapprove buttons */}
              {booking.status === "pending" && (
                <div>
                  <button
                    onClick={() => handleApproval(booking.id, "approve")}
                    style={{ marginRight: 10, backgroundColor: "#4CAF50" }}
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleApproval(booking.id, "disapprove")}
                    style={{ backgroundColor: "#f44336" }}
                  >
                    Disapprove
                  </button>
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}

export default AdminPanel;
