// /mock/fleetApplications.ts
export type FleetApplication = {
  id: string;
  partnerName: string;
  company: string;
  status: "pending" | "approved" | "rejected";
  submittedAt: string;
  documents: {
    id: string;
    name: string;
    url: string;
  }[];
};

export const fleetApplications: FleetApplication[] = [
  {
    id: "FPA-001",
    partnerName: "Suleiman Ahmed",
    company: "SA Transport Ltd",
    status: "pending",
    submittedAt: "2025-01-10",
    documents: [
      {
        id: "DOC1",
        name: "CAC Certificate",
        url: "https://via.placeholder.com/600x400",
      },
      {
        id: "DOC2",
        name: "Tax Clearance",
        url: "https://via.placeholder.com/600x400",
      },
    ],
  },
  {
    id: "FPA-002",
    partnerName: "Joy Fleet Rentals",
    company: "JoyRide Group",
    status: "approved",
    submittedAt: "2025-01-05",
    documents: [],
  },
  {
    id: "FPA-003",
    partnerName: "Kano Fleet Solutions",
    company: "KFS Ltd",
    status: "pending",
    submittedAt: "2025-01-12",
    documents: [],
  },
];

