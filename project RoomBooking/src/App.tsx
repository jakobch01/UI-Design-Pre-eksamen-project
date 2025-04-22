import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Users, MapPin, List, Search, LogIn, LogOut, User, Shield, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

// Types
interface Room {
  id: string;
  name: string;
  capacity: number;
  location: string;
  amenities: string[];
  image: string;
  available: boolean;
}

interface Booking {
  id: string;
  roomId: string;
  userId: string;
  userName: string;
  date: string;
  startTime: string;
  endTime: string;
  purpose: string;
  status: 'confirmed' | 'pending' | 'cancelled';
}

interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'admin';
}

function App() {
  // State
  const [rooms, setRooms] = useState<Room[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [startTime, setStartTime] = useState<string>('09:00');
  const [endTime, setEndTime] = useState<string>('10:00');
  const [purpose, setPurpose] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<'rooms' | 'bookings'>('rooms');
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [loginEmail, setLoginEmail] = useState<string>('');
  const [loginPassword, setLoginPassword] = useState<string>('');
  const [loginError, setLoginError] = useState<string>('');
  const [filterLocation, setFilterLocation] = useState<string>('');
  const [filterCapacity, setFilterCapacity] = useState<number>(0);
  const [showBookingModal, setShowBookingModal] = useState<boolean>(false);
  const [showBookingSuccess, setShowBookingSuccess] = useState<boolean>(false);
  const [bookingError, setBookingError] = useState<string>('');

  // Mock data initialization
  useEffect(() => {
    // Mock rooms data
    const mockRooms: Room[] = [
      {
        id: '1',
        name: 'Lecture Hall A',
        capacity: 100,
        location: 'Main Building, Floor 1',
        amenities: ['Projector', 'Whiteboard', 'Air Conditioning'],
        image: 'https://images.unsplash.com/photo-1517164850305-99a27ae571fe?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        available: true
      },
      {
        id: '2',
        name: 'Computer Lab B',
        capacity: 30,
        location: 'Science Building, Floor 2',
        amenities: ['Computers', 'Projector', 'Whiteboard'],
        image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        available: true
      },
      {
        id: '3',
        name: 'Study Room C',
        capacity: 10,
        location: 'Library, Floor 3',
        amenities: ['Whiteboard', 'Quiet Space'],
        image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        available: true
      },
      {
        id: '4',
        name: 'Conference Room D',
        capacity: 20,
        location: 'Admin Building, Floor 1',
        amenities: ['Projector', 'Video Conference', 'Whiteboard'],
        image: 'https://images.unsplash.com/photo-1517502884422-41eaec5c4047?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        available: true
      },
      {
        id: '5',
        name: 'Seminar Room E',
        capacity: 50,
        location: 'Arts Building, Floor 2',
        amenities: ['Projector', 'Sound System', 'Whiteboard'],
        image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        available: true
      }
    ];

    // Mock bookings data
    const mockBookings: Booking[] = [
      {
        id: '1',
        roomId: '1',
        userId: '1',
        userName: 'John Doe',
        date: '2025-06-15',
        startTime: '09:00',
        endTime: '11:00',
        purpose: 'Physics Lecture',
        status: 'confirmed'
      },
      {
        id: '2',
        roomId: '2',
        userId: '2',
        userName: 'Jane Smith',
        date: '2025-06-16',
        startTime: '13:00',
        endTime: '15:00',
        purpose: 'Computer Science Lab',
        status: 'confirmed'
      },
      {
        id: '3',
        roomId: '3',
        userId: '3',
        userName: 'Mike Johnson',
        date: '2025-06-17',
        startTime: '10:00',
        endTime: '12:00',
        purpose: 'Study Group',
        status: 'pending'
      }
    ];

    setRooms(mockRooms);
    setBookings(mockBookings);
  }, []);

  // Mock login function
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    // Simple validation
    if (!loginEmail || !loginPassword) {
      setLoginError('Please enter both email and password');
      return;
    }

    // Mock authentication
    if (loginEmail === 'student@school.edu' && loginPassword === 'student123') {
      const user: User = {
        id: '1',
        name: 'Student User',
        email: 'student@school.edu',
        role: 'student'
      };
      setCurrentUser(user);
      setIsLoggedIn(true);
      setShowLoginModal(false);
      setLoginEmail('');
      setLoginPassword('');
    } else if (loginEmail === 'admin@school.edu' && loginPassword === 'admin123') {
      const user: User = {
        id: '2',
        name: 'Admin User',
        email: 'admin@school.edu',
        role: 'admin'
      };
      setCurrentUser(user);
      setIsLoggedIn(true);
      setShowLoginModal(false);
      setLoginEmail('');
      setLoginPassword('');
    } else {
      setLoginError('Invalid email or password');
    }
  };

  // Logout function
  const handleLogout = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
    setActiveTab('rooms');
  };

  // Filter rooms based on search query and filters
  const filteredRooms = rooms.filter(room => {
    const matchesSearch = room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         room.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = filterLocation ? room.location.includes(filterLocation) : true;
    const matchesCapacity = filterCapacity > 0 ? room.capacity >= filterCapacity : true;
    
    return matchesSearch && matchesLocation && matchesCapacity;
  });

  // Check if a room is available for the selected time slot
  const isRoomAvailable = (roomId: string, date: string, start: string, end: string) => {
    const conflictingBookings = bookings.filter(booking => 
      booking.roomId === roomId && 
      booking.date === date && 
      booking.status !== 'cancelled' &&
      ((booking.startTime <= start && booking.endTime > start) || 
       (booking.startTime < end && booking.endTime >= end) ||
       (booking.startTime >= start && booking.endTime <= end))
    );
    
    return conflictingBookings.length === 0;
  };

  // Handle room booking
  const handleBookRoom = () => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }

    if (!selectedRoom) {
      setBookingError('Please select a room');
      return;
    }

    if (!purpose.trim()) {
      setBookingError('Please enter a purpose for booking');
      return;
    }

    if (startTime >= endTime) {
      setBookingError('End time must be after start time');
      return;
    }

    // Check if room is available for the selected time slot
    if (!isRoomAvailable(selectedRoom.id, selectedDate, startTime, endTime)) {
      setBookingError('Room is not available for the selected time slot');
      return;
    }

    // Create new booking
    const newBooking: Booking = {
      id: (bookings.length + 1).toString(),
      roomId: selectedRoom.id,
      userId: currentUser?.id || '',
      userName: currentUser?.name || '',
      date: selectedDate,
      startTime,
      endTime,
      purpose,
      status: currentUser?.role === 'admin' ? 'confirmed' : 'pending'
    };

    setBookings([...bookings, newBooking]);
    setShowBookingModal(false);
    setShowBookingSuccess(true);
    setPurpose('');
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      setShowBookingSuccess(false);
    }, 3000);
  };

  // Handle booking status change (admin only)
  const handleBookingStatusChange = (bookingId: string, newStatus: 'confirmed' | 'pending' | 'cancelled') => {
    if (currentUser?.role !== 'admin') return;

    const updatedBookings = bookings.map(booking => 
      booking.id === bookingId ? { ...booking, status: newStatus } : booking
    );
    
    setBookings(updatedBookings);
  };

  // Get user's bookings
  const userBookings = bookings.filter(booking => 
    currentUser && booking.userId === currentUser.id
  );

  // Get room details by ID
  const getRoomById = (roomId: string) => {
    return rooms.find(room => room.id === roomId);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Calendar className="h-6 w-6" />
            <h1 className="text-2xl font-bold">School Room Booking System</h1>
          </div>
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  {currentUser?.role === 'admin' ? (
                    <Shield className="h-5 w-5 text-yellow-300" />
                  ) : (
                    <User className="h-5 w-5" />
                  )}
                  <span>{currentUser?.name}</span>
                </div>
                <button 
                  onClick={handleLogout}
                  className="flex items-center space-x-1 bg-red-500 hover:bg-red-600 px-3 py-1 rounded-md transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setShowLoginModal(true)}
                className="flex items-center space-x-1 bg-white text-blue-600 hover:bg-blue-50 px-3 py-1 rounded-md transition-colors"
              >
                <LogIn className="h-4 w-4" />
                <span>Login</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === 'rooms'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('rooms')}
          >
            Available Rooms
          </button>
          {isLoggedIn && (
            <button
              className={`px-4 py-2 font-medium ${
                activeTab === 'bookings'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('bookings')}
            >
              My Bookings
            </button>
          )}
        </div>

        {/* Success Message */}
        {showBookingSuccess && (
          <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded flex items-center">
            <CheckCircle className="h-5 w-5 mr-2" />
            <span>Room booked successfully! {currentUser?.role === 'student' ? 'Your booking is pending approval.' : ''}</span>
          </div>
        )}

        {/* Rooms Tab */}
        {activeTab === 'rooms' && (
          <>
            {/* Search and Filters */}
            <div className="mb-6 bg-white p-4 rounded-lg shadow-md">
              <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
                <div className="flex-1 mb-4 md:mb-0">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search rooms..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>
                <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
                  <div className="mb-4 md:mb-0">
                    <select
                      value={filterLocation}
                      onChange={(e) => setFilterLocation(e.target.value)}
                      className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">All Locations</option>
                      <option value="Main Building">Main Building</option>
                      <option value="Science Building">Science Building</option>
                      <option value="Library">Library</option>
                      <option value="Admin Building">Admin Building</option>
                      <option value="Arts Building">Arts Building</option>
                    </select>
                  </div>
                  <div>
                    <select
                      value={filterCapacity}
                      onChange={(e) => setFilterCapacity(Number(e.target.value))}
                      className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="0">Any Capacity</option>
                      <option value="10">10+ People</option>
                      <option value="20">20+ People</option>
                      <option value="50">50+ People</option>
                      <option value="100">100+ People</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Room Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRooms.map((room) => (
                <div key={room.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <img
                    src={room.image}
                    alt={room.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold mb-2">{room.name}</h3>
                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{room.location}</span>
                    </div>
                    <div className="flex items-center text-gray-600 mb-3">
                      <Users className="h-4 w-4 mr-1" />
                      <span>Capacity: {room.capacity}</span>
                    </div>
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-700 mb-1">Amenities:</h4>
                      <div className="flex flex-wrap gap-1">
                        {room.amenities.map((amenity, index) => (
                          <span
                            key={index}
                            className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                          >
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedRoom(room);
                        setShowBookingModal(true);
                        setBookingError('');
                      }}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition-colors"
                    >
                      Book This Room
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredRooms.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">No rooms match your search criteria.</p>
              </div>
            )}
          </>
        )}

        {/* Bookings Tab */}
        {activeTab === 'bookings' && isLoggedIn && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 bg-gray-50 border-b border-gray-200">
              <h2 className="text-xl font-semibold">
                {currentUser?.role === 'admin' ? 'All Bookings' : 'My Bookings'}
              </h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Room
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Purpose
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    {currentUser?.role === 'admin' && (
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {(currentUser?.role === 'admin' ? bookings : userBookings).map((booking) => {
                    const room = getRoomById(booking.roomId);
                    return (
                      <tr key={booking.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-gray-900">{room?.name}</div>
                          <div className="text-sm text-gray-500">{room?.location}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {booking.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {booking.startTime} - {booking.endTime}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {booking.purpose}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              booking.status === 'confirmed'
                                ? 'bg-green-100 text-green-800'
                                : booking.status === 'pending'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </span>
                        </td>
                        {currentUser?.role === 'admin' && (
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              {booking.status !== 'confirmed' && (
                                <button
                                  onClick={() => handleBookingStatusChange(booking.id, 'confirmed')}
                                  className="text-green-600 hover:text-green-900"
                                >
                                  Approve
                                </button>
                              )}
                              {booking.status !== 'cancelled' && (
                                <button
                                  onClick={() => handleBookingStatusChange(booking.id, 'cancelled')}
                                  className="text-red-600 hover:text-red-900"
                                >
                                  Cancel
                                </button>
                              )}
                            </div>
                          </td>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            
            {(currentUser?.role === 'admin' ? bookings.length === 0 : userBookings.length === 0) && (
              <div className="text-center py-8">
                <p className="text-gray-500">No bookings found.</p>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Login</h2>
              <button
                onClick={() => setShowLoginModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <XCircle className="h-6 w-6" />
              </button>
            </div>
            
            {loginError && (
              <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {loginError}
              </div>
            )}
            
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your password"
                />
              </div>
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  <p>Student: student@school.edu / student123</p>
                  <p>Admin: admin@school.edu / admin123</p>
                </div>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Booking Modal */}
      {showBookingModal && selectedRoom && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Book {selectedRoom.name}</h2>
              <button
                onClick={() => setShowBookingModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <XCircle className="h-6 w-6" />
              </button>
            </div>
            
            {bookingError && (
              <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2" />
                {bookingError}
              </div>
            )}
            
            <div className="mb-4">
              <label htmlFor="date" className="block text-gray-700 font-medium mb-2">
                Date
              </label>
              <input
                type="date"
                id="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="startTime" className="block text-gray-700 font-medium mb-2">
                  Start Time
                </label>
                <select
                  id="startTime"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="08:00">8:00 AM</option>
                  <option value="09:00">9:00 AM</option>
                  <option value="10:00">10:00 AM</option>
                  <option value="11:00">11:00 AM</option>
                  <option value="12:00">12:00 PM</option>
                  <option value="13:00">1:00 PM</option>
                  <option value="14:00">2:00 PM</option>
                  <option value="15:00">3:00 PM</option>
                  <option value="16:00">4:00 PM</option>
                  <option value="17:00">5:00 PM</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="endTime" className="block text-gray-700 font-medium mb-2">
                  End Time
                </label>
                <select
                  id="endTime"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="09:00">9:00 AM</option>
                  <option value="10:00">10:00 AM</option>
                  <option value="11:00">11:00 AM</option>
                  <option value="12:00">12:00 PM</option>
                  <option value="13:00">1:00 PM</option>
                  <option value="14:00">2:00 PM</option>
                  <option value="15:00">3:00 PM</option>
                  <option value="16:00">4:00 PM</option>
                  <option value="17:00">5:00 PM</option>
                  <option value="18:00">6:00 PM</option>
                </select>
              </div>
            </div>
            
            <div className="mb-6">
              <label htmlFor="purpose" className="block text-gray-700 font-medium mb-2">
                Purpose
              </label>
              <textarea
                id="purpose"
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                placeholder="Enter the purpose of booking"
              ></textarea>
            </div>
            
            <div className="flex justify-end">
              <button
                onClick={handleBookRoom}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
              >
                Book Room
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span className="font-bold text-lg">School Room Booking System</span>
              </div>
              <p className="text-gray-400 text-sm mt-1">© 2025 All rights reserved</p>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Help
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;