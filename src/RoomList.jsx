import React, { useState } from "react";
import { rooms, bookings } from "./bookings";
import "./RoomList.css";

function RoomList({ user, texts }) {
  const [message, setMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("");


  const bookRoom = () => {
    if (!selectedDate || !selectedTime || !selectedDuration) {
      setMessage(texts.pleaseSelectDateTime);
      return;
    }

    const alreadyBooked = bookings.some(
      (b) =>
        b.roomId === selectedRoomId &&
        b.userId === user.id &&
        b.date === selectedDate &&
        b.time === selectedTime
    );

    if (alreadyBooked) {
      setMessage(texts.alreadyBookedMessage);
      return;
    }

    bookings.push({
      id: bookings.length + 1,
      roomId: selectedRoomId,
      userId: user.id,
      date: selectedDate,
      time: selectedTime,
      duration: selectedDuration,
      status: "pending",
    });

    setMessage(texts.bookingRequestedMessage);
    setSelectedRoomId(null);
    setSelectedDate("");
    setSelectedTime("");
    setSelectedDuration("");
  };

  const filteredRooms = rooms.filter((room) =>
    room.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="room-list-container">
      <h2 className="room-list-title">{texts.roomListTitle}</h2>

      <div className="search-container">
        <input
          type="text"
          placeholder={texts.searchPlaceholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {message && (
        <p className={`message ${message === texts.alreadyBookedMessage ? "error" : "success"}`}>
          {message}
        </p>
      )}

      <div className="rooms-grid">
        {filteredRooms.length > 0 ? (
          filteredRooms.map((room) => (
            <div 
              key={room.id} 
              className={`room-card ${selectedRoomId === room.id ? "selected" : ""}`}
            >
              <img src={room.image} alt={room.name} className="room-image" />
              <div className="room-header">
                <h3 className="room-name">{room.name}</h3>
                <span className="room-capacity">Capacity: {room.capacity}</span>
              </div>
              
              <div className="room-details">
                <p className="room-equipment">
                  <strong>Equipment:</strong> {room.equipment?.length > 0 ? room.equipment.join(", ") : "None"}
                </p>
              </div>

              {selectedRoomId === room.id ? (
                <div className="booking-form">
                  <div className="form-group">
                  <label htmlFor={`date-${room.id}`}>{texts.selectDate}</label>
                  <input id={`date-${room.id}`}
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="form-input"
                      min={new Date().toISOString().split('T')[0]} // Prevent past dates
                    />
                  </div>

                  <div className="form-group">
                  <label htmlFor={`duration-${room.id}`}>{texts.selectDuration || "Select Duration"}</label>
                  <select
                    value={selectedDuration}
                    onChange={(e) => setSelectedDuration(e.target.value)}
                    className="form-input"
                  >
                    <option value="">-- Choose duration --</option>
                    <option value="30">30 minutes</option>
                    <option value="60">1 hour</option>
                    <option value="90">1.5 hours</option>
                    <option value="120">2 hours</option>
                  </select>
                  <label htmlFor={`time-${room.id}`}>{texts.selectTime}</label>
                  <input id={`time-${room.id}`}
                      type="time"
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      className="form-input"
                    />
                  </div>

                  <div className="button-group">
                    <button 
                      onClick={bookRoom}
                      className="primary-button"
                      aria-label={`Book room ${rooms.find(r => r.id === selectedRoomId)?.name || ""}`}
                    >
                      {texts.bookRoomButton}
                    </button>
                    <button 
                      onClick={() => setSelectedRoomId(null)}
                      className="secondary-button"
                      aria-label="Cancel room selection"
                    >
                      {texts.cancelButton || "Cancel"}
                    </button>
                  </div>
                </div>
              ) : (
                <button 
                  onClick={() => setSelectedRoomId(room.id)}
                  className="primary-button"
                  aria-label={`Select room ${room.name} to book`}
                >
                  {texts.selectRoomButton || "Book this room"}
                </button>
              )}
            </div>
          ))
        ) : (
          <p className="no-rooms-message">{texts.noRoomsMessage}</p>
        )}
      </div>

          <div className="bookings-section">
      <h3>{texts.yourBookingsTitle || "Your Bookings"}</h3>
      {bookings.filter((b) => b.userId === user.id).length === 0 ? (
        <p>{texts.noBookingsMessage || "You have no bookings yet."}</p>
      ) : (
        <ul className="booking-list">
          {bookings
            .filter((b) => b.userId === user.id)
            .map((b) => {
              const room = rooms.find((r) => r.id === b.roomId);
              return (
                <li key={b.id} className="booking-item">
                  <strong>{room?.name}</strong> – {b.date} at {b.time} for {b.duration} min
                </li>
              );
            })}
        </ul>
      )}
    </div>

    </div>
    
  );
}

export default RoomList;