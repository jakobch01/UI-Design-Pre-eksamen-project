import { useState, useEffect } from "react";
import LoginForm from "./LoginForm";
import RoomList from "./RoomList";
import AdminPanel from "./AdminPanel";
import './App.css';
import logo from './images/EAMV_logo.jpg'; 

function App() {
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [language, setLanguage] = useState("en"); // Default language is English

 
// Load settings from localStorage on mount
useEffect(() => {
  const storedMode = localStorage.getItem("darkMode");
  if (storedMode) setDarkMode(storedMode === "true");

  const storedLanguage = localStorage.getItem("language");
  if (storedLanguage) setLanguage(storedLanguage);
}, []);

// Add/remove dark class when darkMode changes
useEffect(() => {
  if (darkMode) {
    document.body.classList.add('dark');
  } else {
    document.body.classList.remove('dark');
  }
}, [darkMode]);


  // Toggle between Danish and English
  const toggleLanguage = () => {
    const newLanguage = language === "en" ? "da" : "en";
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage); 
  };


  const texts = {
    en: {
      welcome: `Welcome, ${user?.email || 'Guest'}`,
      logout: "Logout",
      roomListTitle: "Available Rooms",
      searchPlaceholder: "Search rooms by name",
      noRoomsMessage: "No rooms match your search.",
      roomSelected: "Select Room",
      bookRoomButton: "Book Room",
      bookingRequestedMessage: "Room booking requested and pending approval.",
      alreadyBookedMessage: "You have already requested this room for the selected date and time.",
      pleaseSelectDateTime: "Please select both a date and a time.",
      adminPanel: "Admin Panel",
      pendingBookings: "Pending Bookings",
      noBookings: "No bookings yet.",
      approve: "Approve",
      disapprove: "Disapprove"
    },
    da: {
      welcome: `Velkommen, ${user?.email || 'Gæst'}`,
      logout: "Log ud",
      roomListTitle: "Ledige Lokaler",
      searchPlaceholder: "Søg lokaler efter navn",
      noRoomsMessage: "Ingen lokaler matcher din søgning.",
      roomSelected: "Vælg lokale",
      bookRoomButton: "Book lokale",
      bookingRequestedMessage: "Lokale booking anmodning og ventende godkendelse.",
      alreadyBookedMessage: "Du har allerede anmodet om dette lokale til den valgte dato og tid.",
      pleaseSelectDateTime: "Vælg både en dato og et tidspunkt.",
      adminPanel: "Admin Panel",
      pendingBookings: "Ventende bookinger",
      noBookings: "Ingen bookinger endnu.",
      approve: "Godkend",
      disapprove: "Afvis"
    }
  };

  return (
    <div style={{ padding: 20 }}>
      {/* Banner Section - Using Image */}
      <div
        style={{
          width: "100%",
          height: "200px", // Adjust height as needed
          marginBottom: "20px"
        }}
      >
        <img
          src={logo} // Use the imported logo variable
          alt="Banner"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover", // Ensures the image covers the area without stretching
          }}
        />
      </div>

      {/* Buttons Section under the Banner */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end", // Align buttons to the right
          gap: 10,
          marginBottom: 20, // Space between the buttons and the content below
        }}
      >
        {/* Dark Mode Toggle */}
        <button
          onClick={() => {
            setDarkMode((prev) => {
              const newMode = !prev;
              localStorage.setItem("darkMode", newMode);
              return newMode;
            });
          }}
          style={{ padding: 8, fontSize: "18px" }}
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          aria-pressed={darkMode}
        >
          {darkMode ? "🌞" : "🌙"}
        </button>

        {/* Language Toggle */}
        <button
          onClick={toggleLanguage}
          style={{ padding: 8, fontSize: "16px" }}
          title={language === "en" ? "Switch to Danish" : "Skift til Engelsk"}
          aria-label={language === "en" ? "Switch to Danish" : "Switch to English"}
          aria-pressed={language}
        >
          {language === "en" ? "DA 🇩🇰" : "EN 🇬🇧"}
        </button>

        {/* Logout Button */}
        {user && (
          <button
            onClick={() => setUser(null)}
            style={{ padding: 8, fontSize: "16px" }}
            aria-label="Log out"
          >
            {texts[language].logout}
          </button>
        )}
      </div>

      {!user ? (
        <LoginForm onLogin={setUser} />
      ) : (
        <div>
          <h2 className="welcome-message">{texts[language].welcome}</h2>
          {user.isAdmin ? (
            <AdminPanel texts={texts[language]} />
          ) : (
            <RoomList
              user={user}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              texts={texts[language]} // Passing texts for the selected language
            />
          )}
        </div>
      )}
    </div>
  );
}

export default App;
