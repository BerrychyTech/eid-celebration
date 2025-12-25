"use client";

import { useState } from "react";

/* ---------------- TYPES ---------------- */

type MessageStatus = "new" | "read" | "responded";

type ContactMessage = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  status: MessageStatus;
  internalNote?: string;
  history?: string[];
};

/* ---------------- MOCK DATA ---------------- */

const CONTACT_MESSAGES: ContactMessage[] = [
  {
    id: "C-001",
    name: "Amina Bello",
    email: "amina@mail.com",
    subject: "General Inquiry",
    message: "Hi, when will BerryGo be available in Gwarimpa?",
    date: "2025-12-22",
    status: "new",
    history: ["Asked about pricing last month"],
  },
  {
    id: "C-002",
    name: "Daniel Okeke",
    email: "daniel@mail.com",
    subject: "Driver Registration",
    message: "I want to know how to register as a driver.",
    date: "2025-12-21",
    status: "read",
  },
];

/* ---------------- PAGE ---------------- */

export default function ContactMessagesPage() {
  const [activeMessage, setActiveMessage] =
    useState<ContactMessage | null>(CONTACT_MESSAGES[0]);

  const [search, setSearch] = useState("");

  const filteredMessages = CONTACT_MESSAGES.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase()) ||
      m.subject.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 h-[calc(100vh-80px)] flex flex-col space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#FD5C63]">
          Contact Messages
        </h1>

        <input
          placeholder="Search name, email, subject"
          className="px-4 py-2 text-sm border rounded-xl w-[280px]"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Main Area */}
      <div className="flex flex-1 gap-6 overflow-hidden">
        {/* Left Panel */}
        <div className="w-[360px] bg-white border rounded-2xl overflow-y-auto">
          {filteredMessages.map((msg) => (
            <button
              key={msg.id}
              onClick={() => setActiveMessage(msg)}
              className={`w-full p-4 text-left border-b hover:bg-gray-50 ${
                activeMessage?.id === msg.id ? "bg-[#FFF0ED]" : ""
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{msg.name}</span>
                <StatusBadge status={msg.status} />
              </div>

              <p className="text-sm text-gray-600 truncate">
                {msg.subject}
              </p>

              <p className="text-xs text-gray-400">{msg.date}</p>
            </button>
          ))}
        </div>

        {/* Right Panel */}
        <div className="flex-1 bg-white border rounded-2xl p-6 overflow-y-auto">
          {activeMessage ? (
            <MessageDetail message={activeMessage} />
          ) : (
            <p className="text-gray-500">Select a message</p>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------------- MESSAGE DETAIL ---------------- */

function MessageDetail({ message }: { message: ContactMessage }) {
  const [status, setStatus] = useState<MessageStatus>(message.status);
  const [reply, setReply] = useState("");
  const [note, setNote] = useState(message.internalNote || "");

  return (
    <div className="space-y-6">
      {/* Meta */}
      <div>
        <h2 className="text-lg font-semibold">{message.subject}</h2>
        <p className="text-sm text-gray-500">
          {message.name} • {message.email}
        </p>
      </div>

      {/* Message */}
      <div className="bg-gray-50 rounded-xl p-4 text-sm">
        {message.message}
      </div>

      {/* Status */}
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium">Status</span>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as MessageStatus)}
          className="px-3 py-1.5 text-sm border rounded-lg"
        >
          <option value="new">New</option>
          <option value="read">Read</option>
          <option value="responded">Responded</option>
        </select>
      </div>

      {/* Reply */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Reply</h3>
        <textarea
          rows={4}
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          placeholder="Write your reply..."
          className="w-full border rounded-xl p-3 text-sm"
        />
        <button className="px-4 py-2 rounded-xl bg-[#FD5C63] text-white text-sm">
          Send Reply
        </button>
      </div>

      {/* Internal Notes */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium">
          Internal Notes (Admin Only)
        </h3>
        <textarea
          rows={3}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Add private notes..."
          className="w-full border rounded-xl p-3 text-sm"
        />
      </div>

      {/* Optional History */}
      {message.history && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Past Messages</h3>
          <ul className="list-disc list-inside text-sm text-gray-600">
            {message.history.map((h, i) => (
              <li key={i}>{h}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

/* ---------------- STATUS BADGE ---------------- */

function StatusBadge({ status }: { status: MessageStatus }) {
  const styles = {
    new: "bg-red-100 text-red-700",
    read: "bg-gray-100 text-gray-700",
    responded: "bg-green-100 text-green-700",
  };

  return (
    <span
      className={`px-2 py-0.5 rounded-full text-xs font-medium ${styles[status]}`}
    >
      {status}
    </span>
  );
}
