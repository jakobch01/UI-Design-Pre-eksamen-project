import room101Image from './images/classroom 1.jpg';
import room102Image from './images/classroom 2.jpg';
import room103Image from './images/classroom 3.jpg';
import room104Image from './images/classroom 4.jpg';
import room201Image from './images/classroom 5.jpg';
import room202Image from './images/classroom 6.jpg';
import room203Image from './images/classroom 7.jpg';
import room204Image from './images/classroom 8.jpg';
import room301Image from './images/classroom 9.jpg';
import room302Image from './images/classroom 10.jpg';


export const rooms = [
  {
    id: 1,
    name: "Room 101",
    capacity: 30,
    equipment: ["Projector", "Whiteboard"],
    image: room101Image
  },
  {
    id: 2,
    name: "Room 102",
    capacity: 25,
    equipment: ["Smart Board"],
    image: room102Image
  },
  {
    id: 3,
    name: "Room 103",
    capacity: 40,
    equipment: ["Projector", "Audio system"],
    image: room103Image
  },
  {
    id: 4,
    name: "Room 104",
    capacity: 20,
    equipment: ["Whiteboard"],
    image: room104Image
  },
  {
    id: 5,
    name: "Room 201",
    capacity: 35,
    equipment: ["Projector", "Whiteboard"],
    image: room201Image
  },
  {
    id: 6,
    name: "Room 202",
    capacity: 30,
    equipment: ["Smart Board"],
    image: room202Image
  },
  {
    id: 7,
    name: "Room 203",
    capacity: 45,
    equipment: ["Full AV System"],
    image: room203Image
  },
  {
    id: 8,
    name: "Room 204",
    capacity: 25,
    equipment: ["Whiteboard"],
    image: room204Image
  },
  {
    id: 9,
    name: "Room 301",
    capacity: 50,
    equipment: ["Full Conference Setup"],
    image: room301Image
  },
  {
    id: 10,
    name: "Room 302",
    capacity: 30,
    equipment: ["Projector", "Whiteboard"],
    image: room302Image
  }
];

  
  // Sample bookings
  export const bookings = [
    {
      id: 1,
      roomId: 1,
      userId: 2,
      date: "2025-04-25",
      time: "10:00",
      status: "pending" // pending status to be approved by teacher/admin
    },
    {
      id: 2,
      roomId: 2,
      userId: 3,
      date: "2025-04-26",
      time: "14:00",
      status: "pending"
    },
    {
      id: 3,
      roomId: 5,
      userId: 4,
      date: "2025-04-27",
      time: "09:00",
      status: "pending"
    },
    {
      id: 4,
      roomId: 7,
      userId: 5,
      date: "2025-04-28",
      time: "13:00",
      status: "approved" // Example of an approved booking
    },
    {
      id: 5,
      roomId: 9,
      userId: 6,
      date: "2025-04-29",
      time: "15:00",
      status: "disapproved" // Example of a disapproved booking
    }
  ];
  