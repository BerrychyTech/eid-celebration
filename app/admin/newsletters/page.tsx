"use client";

import { useState } from "react";

/* ---------------- TYPES ---------------- */

type Subscriber = {
  id: string;
  email: string;
  town: string;
  state: string;
  townLive: boolean;
};

/* ---------------- MOCK DATA ---------------- */

const SUBSCRIBERS: Subscriber[] = [
  { id: "1", email: "ikeja1@mail.com", town: "Ikeja", state: "Lagos", townLive: true },
  { id: "2", email: "epe@mail.com", town: "Epe", state: "Lagos", townLive: false },
  { id: "3", email: "yaba@mail.com", town: "Yaba", state: "Lagos", townLive: true },

  { id: "4", email: "gwale@mail.com", town: "Gwale", state: "Kano", townLive: true },
  { id: "5", email: "tarauni@mail.com", town: "Tarauni", state: "Kano", townLive: false },

  { id: "6", email: "zaria@mail.com", town: "Zaria", state: "Kaduna", townLive: true },
];

/* ---------------- PAGE ---------------- */

export default function NewsletterDashboardPage() {
  const [activeSubscriber, setActiveSubscriber] = useState<Subscriber | null>(null);

  const states = Array.from(new Set(SUBSCRIBERS.map((s) => s.state)));

  return (
    <div className="p-6 space-y-10">
      <h1 className="text-2xl font-bold text-[#FD5C63]">
        Newsletter Dashboard
      </h1>

      {states.map((state) => {
        const subscribers = SUBSCRIBERS.filter((s) => s.state === state);

        return (
          <StateSection
            key={state}
            state={state}
            subscribers={subscribers}
            onSend={setActiveSubscriber}
          />
        );
      })}

      <SendEmailModal
        subscriber={activeSubscriber}
        onClose={() => setActiveSubscriber(null)}
      />
    </div>
  );
}

/* ---------------- STATE SECTION ---------------- */

function StateSection({
  state,
  subscribers,
  onSend,
}: {
  state: string;
  subscribers: Subscriber[];
  onSend: (s: Subscriber) => void;
}) {
  const [open, setOpen] = useState(true);

  return (
    <div className="border rounded-2xl bg-white shadow-sm">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center p-4 font-semibold text-left"
      >
        <span>{state} State</span>
        <span className="text-sm text-gray-500">
          {subscribers.length} subscribers
        </span>
      </button>

      {open && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#FFF0ED]">
              <tr>
                <th className="p-4 text-left">Town</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.map((s) => (
                <tr key={s.id} className="border-t">
                  <td className="p-4 flex items-center gap-2">
                    {s.town}
                    <TownStatusBadge live={s.townLive} />
                  </td>
                  <td className="p-4">{s.email}</td>
                  <td className="p-4 text-center">
                    <button
                      onClick={() => onSend(s)}
                      className="px-3 py-1.5 rounded-lg bg-[#FD5C63] text-white text-xs"
                    >
                      Send
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

/* ---------------- STATUS BADGE ---------------- */

function TownStatusBadge({ live }: { live: boolean }) {
  return (
    <span
      className={`px-2 py-0.5 rounded-full text-xs font-medium ${
        live
          ? "bg-red-100 text-red-700" // 🔴 LIVE (brand rule)
          : "bg-gray-100 text-gray-500"
      }`}
    >
      {live ? "LIVE" : "NOT LIVE"}
    </span>
  );
}

/* ---------------- SEND EMAIL MODAL ---------------- */

function SendEmailModal({
  subscriber,
  onClose,
}: {
  subscriber: Subscriber | null;
  onClose: () => void;
}) {
  if (!subscriber) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-[360px] space-y-4">
        <h3 className="text-lg font-semibold text-[#FD5C63]">
          Send Newsletter
        </h3>

        <Detail label="Email" value={subscriber.email} />
        <Detail label="State" value={subscriber.state} />
        <Detail label="Town" value={subscriber.town} />

        <input
          placeholder="Subject"
          className="w-full border rounded-lg p-2 text-sm"
        />

        <textarea
          placeholder="Message"
          rows={4}
          className="w-full border rounded-lg p-2 text-sm"
        />

        <div className="flex justify-end gap-2 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border text-sm"
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded-xl bg-[#FD5C63] text-white text-sm"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------------- HELPERS ---------------- */

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
