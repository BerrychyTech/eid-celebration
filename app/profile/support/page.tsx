"use client";

import Header from "@/components/Navbar";
import { useState } from "react";

/* ================= TYPES ================= */

type ContextType = "ride" | "delivery" | "fleet" | null;

type IssueCategory =
  | "Payment Issue"
  | "Ride Problem"
  | "Delivery Delay"
  | "Safety Concern"
  | "App Bug"
  | "Other";

type ContactMethod = "inApp" | "phone" | "whatsapp";

/* ================= MOCK DATA ================= */

const recentRides = [
  { id: "BG-29301", label: "Today • Lagos → Ikeja" },
  { id: "BG-29277", label: "Yesterday • Surulere" },
];

const deliveries = [
  { id: "DL-88201", label: "Food Package • Ikeja" },
  { id: "DL-88177", label: "Parcel • Yaba" },
];

const fleetRequests = [
  { id: "FR-1902", label: "12 Aug • Ikeja" },
  { id: "FR-1889", label: "10 Aug • Lekki" },
];

export default function SupportPage() {
  const [context, setContext] = useState<ContextType>(null);
  const [linkedId, setLinkedId] = useState("");
  const [category, setCategory] = useState<IssueCategory | "">("");
  const [message, setMessage] = useState("");
  const [contactMethod, setContactMethod] =
    useState<ContactMethod>("inApp");
  const [phone, setPhone] = useState("08012345678");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const canSubmit =
    context &&
    linkedId &&
    category &&
    message.trim().length > 0;

  const handleSubmit = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSuccess(true);
  };

  const relatedList =
    context === "ride"
      ? recentRides
      : context === "delivery"
      ? deliveries
      : fleetRequests;

  return (
    <>
        <Header />
        <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text)] flex flex-col">
          {/* CONTENT */}
          <div className="flex-1 px-4 pt-6 pb-40 max-w-xl mx-auto w-full">
              {/* Header */}
              <h1 className="text-2xl font-bold mb-1">
                  🆘 Contact BerryGo Support
              </h1>
              <p className="text-sm text-[var(--color-muted)] mb-1">
                  Tell us what went wrong. We’ll take it from here.
              </p>
              <p className="text-xs text-[var(--color-muted)] mb-6">
                  ⏱ Average response time: under 2 hours
              </p>

              {/* Step 1 */}
              <h3 className="font-semibold mb-2">
                  What is this about?
              </h3>
              <div className="grid grid-cols-3 gap-2 mb-6">
                  {[
                      { key: "ride", label: "🚗 Ride" },
                      { key: "delivery", label: "🚚 Delivery" },
                      { key: "fleet", label: "🚐 Fleet Request" },
                  ].map((item) => (
                      <button
                          key={item.key}
                          onClick={() => {
                              setContext(item.key as ContextType);
                              setLinkedId("");
                          } }
                          className={`rounded-lg py-3 text-sm border transition ${context === item.key
                                  ? "border-[var(--color-primary)] bg-[var(--color-background)]"
                                  : "border-[var(--color-muted)] bg-[var(--color-formBg)]"}`}
                      >
                          {item.label}
                      </button>
                  ))}
              </div>

              {/* Step 2 */}
              {context && (
                  <>
                      <h3 className="font-semibold mb-2">
                          Select Related Activity
                      </h3>
                      <div className="rounded-lg overflow-hidden border border-[var(--color-muted)] mb-6">
                          {relatedList.map((item) => (
                              <button
                                  key={item.id}
                                  onClick={() => setLinkedId(item.id)}
                                  className={`w-full text-left p-3 border-b last:border-b-0 transition ${linkedId === item.id
                                          ? "bg-[var(--color-background)]"
                                          : "bg-[var(--color-cardBg)]"}`}
                              >
                                  <p className="font-medium">{item.id}</p>
                                  <p className="text-xs text-[var(--color-muted)]">
                                      {item.label}
                                  </p>
                              </button>
                          ))}
                      </div>
                  </>
              )}

              {/* Step 3 */}
              <h3 className="font-semibold mb-2">
                  Issue Category
              </h3>
              <div className="rounded-lg overflow-hidden border border-[var(--color-muted)] mb-3">
                  {[
                      "Payment Issue",
                      "Ride Problem",
                      "Delivery Delay",
                      "Safety Concern",
                      "App Bug",
                      "Other",
                  ].map((item) => (
                      <button
                          key={item}
                          onClick={() => setCategory(item as IssueCategory)}
                          className={`w-full text-left p-3 border-b last:border-b-0 transition ${category === item
                                  ? "bg-[var(--color-background)]"
                                  : "bg-[var(--color-cardBg)]"}`}
                      >
                          {item}
                      </button>
                  ))}
              </div>

              {category === "Safety Concern" && (
                  <div className="bg-yellow-50 border border-yellow-300 p-3 rounded-lg mb-4 text-sm text-yellow-800">
                      ⚠️ If this is urgent or unsafe, please contact
                      emergency services immediately.
                  </div>
              )}

              {/* Step 4 */}
              <h3 className="font-semibold mb-2">
                  Describe the Issue
              </h3>
              <textarea
                  value={message}
                  maxLength={500}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Briefly explain what happened…"
                  className="w-full h-28 p-3 rounded-lg border border-[var(--color-muted)] bg-[var(--color-formBg)] text-sm" />
              <p className="text-right text-xs text-[var(--color-muted)] mb-6">
                  {message.length} / 500
              </p>

              {/* Step 5 */}
              <h3 className="font-semibold mb-2">
                  Attach Evidence (Optional)
              </h3>
              <div className="border border-dashed border-[var(--color-muted)] rounded-lg p-4 mb-6 text-sm text-[var(--color-muted)]">
                  📎 Upload screenshots or photos (JPG, PNG, max 3)
              </div>

              {/* Step 6 */}
              <h3 className="font-semibold mb-2">
                  Location Context
              </h3>
              <div className="grid grid-cols-2 gap-3 mb-6">
                  {["State", "Town"].map((label, i) => (
                      <div
                          key={label}
                          className="rounded-lg p-3 border border-[var(--color-muted)] bg-[var(--color-cardBg)]"
                      >
                          <p className="text-xs text-[var(--color-muted)]">
                              {label}
                          </p>
                          <p>{i === 0 ? "Lagos" : "Ikeja"}</p>
                      </div>
                  ))}
              </div>

              {/* Step 7 */}
              <h3 className="font-semibold mb-2">
                  Preferred Contact Method
              </h3>
              <div className="space-y-2 mb-4">
                  {[
                      { key: "inApp", label: "In-app notification" },
                      { key: "phone", label: "Phone call" },
                      { key: "whatsapp", label: "WhatsApp" },
                  ].map((item) => (
                      <label
                          key={item.key}
                          className="flex items-center gap-2 cursor-pointer text-sm"
                      >
                          <input
                              type="radio"
                              checked={contactMethod === item.key}
                              onChange={() => setContactMethod(
                                  item.key as ContactMethod
                              )}
                              className="accent-[var(--color-primary)]" />
                          {item.label}
                      </label>
                  ))}
              </div>

              <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-3 rounded-lg border border-[var(--color-muted)] bg-[var(--color-formBg)]" />
          </div>

          {/* ACTION BAR */}
          <div className="fixed bottom-0 left-0 right-0 bg-[var(--color-accentBg)] border-t border-[var(--color-muted)] px-4 py-4">
              <div className="max-w-xl mx-auto">
                  <button
                      disabled={!canSubmit || loading}
                      onClick={handleSubmit}
                      className={`w-full py-3 rounded-lg font-semibold transition ${canSubmit
                              ? "bg-[var(--color-primary)] text-white"
                              : "bg-[var(--color-muted)] text-white"}`}
                  >
                      {loading ? "Submitting..." : "Submit Support Request"}
                  </button>
              </div>
          </div>
      </div>
    </>
  );
}
