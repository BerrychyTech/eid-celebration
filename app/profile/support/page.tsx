"use client";

import Header from "@/components/Navbar";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaCar,
  FaTruck,
  FaBus,
  FaCheckCircle,
  FaLifeRing,
  FaPhoneAlt,
  FaWhatsapp,
  FaBell,
  FaPaperclip,
} from "react-icons/fa";

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

const issueCategories: IssueCategory[] = [
  "Payment Issue",
  "Ride Problem",
  "Delivery Delay",
  "Safety Concern",
  "App Bug",
  "Other",
];

/* ================= ANIMATIONS ================= */

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

/* ================= COMPONENT ================= */

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
    context && linkedId && category && message.trim().length > 0;

  const relatedList =
    context === "ride"
      ? recentRides
      : context === "delivery"
      ? deliveries
      : fleetRequests;

  const handleSubmit = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSuccess(true);
  };

  return (
    <>
      <Header />

      <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text)]">
        <div className="px-4 pt-6 pb-40 max-w-xl mx-auto">

          {/* HEADER */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <FaLifeRing /> Contact Support
            </h1>
            <p className="text-sm text-[var(--color-muted)]">
              Tell us what went wrong. We’ll handle the rest.
            </p>
          </motion.div>

          {/* CONTEXT */}
          <motion.div
            className="mt-6 grid grid-cols-3 gap-3"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            {[
              { key: "ride", label: "Ride", icon: FaCar },
              { key: "delivery", label: "Delivery", icon: FaTruck },
              { key: "fleet", label: "Fleet", icon: FaBus },
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => {
                  setContext(key as ContextType);
                  setLinkedId("");
                }}
                className={`rounded-xl p-4 flex flex-col items-center gap-2 border transition-all
                  ${
                    context === key
                      ? "bg-white border-[var(--color-primary)] shadow-md scale-[1.02]"
                      : "bg-[var(--color-cardBg)] hover:shadow-sm"
                  }`}
              >
                <Icon className="text-lg" />
                <span className="text-sm">{label}</span>
              </button>
            ))}
          </motion.div>

          {/* RELATED ACTIVITY */}
          <AnimatePresence>
            {context && (
              <motion.div
                className="mt-8"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={fadeUp}
              >
                <h3 className="font-semibold mb-2">
                  Select Related Activity
                </h3>

                <div className="rounded-xl overflow-hidden border">
                  {relatedList.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setLinkedId(item.id)}
                      className={`w-full text-left p-4 border-b last:border-b-0 transition
                        ${
                          linkedId === item.id
                            ? "bg-white ring-2 ring-[var(--color-primary)]"
                            : "bg-[var(--color-cardBg)] hover:bg-white"
                        }`}
                    >
                      <p className="font-medium">{item.id}</p>
                      <p className="text-xs text-[var(--color-muted)]">
                        {item.label}
                      </p>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ISSUE CATEGORY */}
          <motion.div
            className="mt-8"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            <h3 className="font-semibold mb-2">Issue Category</h3>

            <div className="flex flex-wrap gap-2">
              {issueCategories.map((item) => (
                <button
                  key={item}
                  onClick={() => setCategory(item)}
                  className={`px-4 py-2 rounded-full text-sm transition
                    ${
                      category === item
                        ? "bg-[var(--color-primary)] text-white"
                        : "bg-[var(--color-cardBg)] hover:bg-white border"
                    }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </motion.div>

          {/* MESSAGE */}
          <motion.div
            className="mt-8"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            <h3 className="font-semibold mb-2">Describe the Issue</h3>
            <textarea
              value={message}
              maxLength={500}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Briefly explain what happened…"
              className="w-full h-28 p-4 rounded-xl border bg-[var(--color-formBg)]
                         focus:ring-2 focus:ring-[var(--color-primary)] outline-none"
            />
            <p className="text-right text-xs text-[var(--color-muted)]">
              {message.length} / 500
            </p>
          </motion.div>

          {/* ATTACHMENT */}
          <motion.div
            className="mt-8"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            <h3 className="font-semibold mb-2">
              Attach Evidence (Optional)
            </h3>

            <div className="border-2 border-dashed rounded-xl p-6 text-center text-sm text-[var(--color-muted)] hover:border-[var(--color-primary)] transition">
              <FaPaperclip className="mx-auto mb-2" />
              Drag & drop or tap to upload
            </div>
          </motion.div>

          {/* CONTACT METHOD */}
          <motion.div
            className="mt-8"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            <h3 className="font-semibold mb-2">Preferred Contact</h3>

            <div className="space-y-2 text-sm">
              {[
                { key: "inApp", label: "In-app notification", icon: FaBell },
                { key: "phone", label: "Phone call", icon: FaPhoneAlt },
                { key: "whatsapp", label: "WhatsApp", icon: FaWhatsapp },
              ].map(({ key, label, icon: Icon }) => (
                <label
                  key={key}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    checked={contactMethod === key}
                    onChange={() => setContactMethod(key as ContactMethod)}
                  />
                  <Icon /> {label}
                </label>
              ))}
            </div>

            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-3 w-full p-3 rounded-xl border bg-[var(--color-formBg)]"
            />
          </motion.div>
        </div>

        {/* ACTION BAR */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t px-4 py-4">
          <div className="max-w-xl mx-auto">
            <button
              disabled={!canSubmit || loading}
              onClick={handleSubmit}
              className={`w-full py-3 rounded-xl font-semibold transition active:scale-[0.98]
                ${
                  canSubmit
                    ? "bg-[var(--color-primary)] text-white shadow-lg"
                    : "bg-gray-300 text-white"
                }`}
            >
              {loading ? "Submitting..." : "Submit Support Request"}
            </button>
          </div>
        </div>
      </div>

      {/* SUCCESS MODAL */}
      <AnimatePresence>
        {success && (
          <motion.div
            className="fixed inset-0 bg-black/40 flex items-center justify-center px-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl p-6 max-w-sm w-full text-center"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              <FaCheckCircle className="text-green-500 text-4xl mx-auto mb-3" />
              <h2 className="text-lg font-bold mb-1">
                Request Submitted
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                Our support team will contact you shortly.
              </p>
              <button
                onClick={() => setSuccess(false)}
                className="w-full py-2 rounded-xl bg-[var(--color-primary)] text-white"
              >
                Done
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
