import { SupportTicket, Complaint, SafetyFlag } from "@/types/support";

export const mockTickets: SupportTicket[] = [
  {
    id: "TKT-1001",
    userId: "USR-001",
    bookingCode: "BK-8901",
    contactEmail: "aliyu@example.com",
    contactPhone: "+234800000001",
    category: "ride",
    summary: "Driver arrived late and was rude",
    details: "Driver arrived 25 minutes late, refused to help with luggage.",
    status: "open",
    createdAt: "2025-12-01T09:20:00Z",
    adminNotes: [],
    compensationRequested: 500,
    attachments: ["photo1.jpg"],
  },
  {
    id: "TKT-1002",
    userId: "USR-002",
    contactPhone: "+234800000002",
    category: "wallet",
    summary: "Wallet top-up missing",
    details: "Topped up via card but wallet not credited.",
    status: "in_progress",
    createdAt: "2025-12-02T11:00:00Z",
    adminNotes: ["Investigating with payment gateway"],
  },
];

export const mockComplaints: Complaint[] = [
  {
    id: "CMP-5001",
    against: "driver",
    againstId: "DRV-101",
    reporterId: "USR-003",
    summary: "Driver drove dangerously on highway",
    details: "Speeding and harsh braking. Passenger felt unsafe.",
    createdAt: "2025-12-03T14:11:00Z",
    attachments: ["dashcam1.png"],
    status: "in_review",
  },
];

export const mockSafetyFlags: SafetyFlag[] = [
  {
    id: "FLAG-1",
    subjectId: "DRV-101",
    subjectType: "driver",
    reason: "Multiple complaints of rude behaviour",
    occurrences: 3,
    lastReported: "2025-12-03T14:11:00Z",
    active: true,
  },
];
