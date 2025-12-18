"use client";

import { useState } from "react";
import { DeliveryDocument } from "@/types/delivery";

export default function DocumentViewer({
  doc,
  onClose,
}: {
  doc: DeliveryDocument;
  onClose: () => void;
}) {
  const [zoom, setZoom] = useState(1);

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[999] p-4">
      <div className="bg-white rounded-2xl p-4 w-full max-w-3xl space-y-3">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold">{doc.name}</h2>
          <button
            className="px-3 py-1 rounded-lg bg-red-600 text-white"
            onClick={onClose}
          >
            Close
          </button>
        </div>

        <div className="flex gap-3">
          <button
            className="px-3 py-1 rounded bg-primary text-white"
            onClick={() => setZoom((z) => Math.min(z + 0.2, 3))}
          >
            Zoom In
          </button>
          <button
            className="px-3 py-1 rounded bg-primary text-white"
            onClick={() => setZoom((z) => Math.max(z - 0.2, 0.5))}
          >
            Zoom Out
          </button>
        </div>

        <div className="overflow-auto border rounded-xl p-3 max-h-[70vh]">
          <img
            src={doc.url}
            alt={doc.name}
            className="transition-transform"
            style={{ transform: `scale(${zoom})`, transformOrigin: "top left" }}
          />
        </div>
      </div>
    </div>
  );
}
