"use client";

interface VerificationModalProps {
  type: "submitted" | "verified" | "mismatch";
  setType: (value: null) => void;
  correctCategory?: string; // optional, used for mismatch
}

interface ContentItem {
  title: string;
  message: string;
  button: string;
  alt?: string;
}

export default function VerificationModal({ type, setType, correctCategory }: VerificationModalProps) {
  const content: Record<VerificationModalProps["type"], ContentItem> = {
    submitted: {
      title: "Delivery Request Submitted",
      message:
        "Your delivery request is under verification. We are reviewing your uploaded picture to confirm the correct category. Your request will be verified or rejected within 5 minutes.",
      button: "Okay",
    },
    verified: {
      title: "Request Verified",
      message:
        "Your delivery request has been verified and forwarded to our logistics team for pickup scheduling.",
      button: "Close",
    },
    mismatch: {
      title: "Category Mismatch",
      message: `The item you uploaded seems to belong to a different category. Please select the correct category${
        correctCategory ? `: ${correctCategory}` : ""
      } so we can calculate the right delivery price.`,
      button: "Select Correct Category",
      alt: "Cancel Request",
    },
  };

  const current = content[type];

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-dark-cardBg p-6 rounded-2xl w-full max-w-md text-center shadow-lg">
        <h2 className="text-xl font-semibold mb-2">{current.title}</h2>
        <p className="text-sm text-muted dark:text-dark-muted mb-4">{current.message}</p>
        <button
          onClick={() => setType(null)}
          className="bg-primary text-white px-4 py-2 rounded-lg w-full mb-2"
        >
          {current.button}
        </button>
        {current.alt && (
          <button
            className="text-primary w-full"
            onClick={() => setType(null)}
          >
            {current.alt}
          </button>
        )}
      </div>
    </div>
  );
}
