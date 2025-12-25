export type TripStatus = "scheduled" | "ongoing" | "completed" | "delayed";

export type FleetTrip = {
  id: string;
  company: string;
  route: string;
  vehicles: number;
  driverLead: string;
  startTime: string;
  status: TripStatus;
};

export const todaysFleetTrips: FleetTrip[] = [
  {
    id: "FT-3001",
    company: "Zenith Events",
    route: "Lekki → Eko Hotel",
    vehicles: 10,
    driverLead: "—",
    startTime: "08:30 AM",
    status: "delayed",
  },
  {
    id: "FT-3002",
    company: "GreenLine Logistics",
    route: "Ikeja → VI",
    vehicles: 4,
    driverLead: "—",
    startTime: "08:30 AM",
    status: "delayed",
  },
  {
    id: "FT-3003",
    company: "BlueWave Ltd",
    route: "Yaba → Apapa",
    vehicles: 6,
    driverLead: "Tunde Balogun",
    startTime: "07:00 AM",
    status: "completed",
  },
  {
    id: "FT-3004",
    company: "Metro Works",
    route: "Ojota → Ikorodu",
    vehicles: 3,
    driverLead: "Sadiq Lawal",
    startTime: "09:15 AM",
    status: "ongoing",
  },
  {
    id: "FT-3010",
    company: "Metro Works",
    route: "Ojota → Ikorodu",
    vehicles: 3,
    driverLead: "—",
    startTime: "12:15 AM",
    status: "scheduled",
  },
];
