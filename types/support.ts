export type TicketStatus = "open" | "in_progress" | "resolved" | "closed";

export interface SupportTicket {
  id: string;
  userId?: string;
  driverId?: string;
  bookingCode?: string;
  contactEmail?: string;
  contactPhone?: string;
  category: "ride" | "delivery" | "wallet" | "marketplace" | "other";
  summary: string;
  details?: string;
  status: TicketStatus;
  createdAt: string;
  updatedAt?: string;
  adminNotes?: string[]; // internal notes
  compensationRequested?: number; // NGN
  attachments?: string[]; // image filenames or urls
}

export interface Complaint {
  id: string;
  against: "driver" | "passenger";
  againstId: string;
  reporterId: string;
  summary: string;
  details?: string;
  createdAt: string;
  attachments?: string[];
  status: "open" | "in_review" | "resolved";
}

export interface SafetyFlag {
  id: string;
  subjectId: string; // driverId or userId
  subjectType: "driver" | "user";
  reason: string;
  occurrences: number;
  lastReported: string;
  active: boolean;
}
