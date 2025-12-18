"use client";

import { useState } from "react";
import DocumentViewer from "./DocumentViewer";
import { DeliveryDocument, DeliveryRequest, DeliveryStatus } from "@/types/delivery";

function Badge({ status }: { status: DeliveryStatus }) {
  const colors = {
    pending: "bg-yellow-100 text-yellow-700",
    accepted: "bg-blue-100 text-blue-700",
    "en-route": "bg-purple-100 text-purple-700",
    delivered: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
  } as const;

  return (
    <span className={`px-3 py-1 rounded-xl text-sm ${colors[status]}`}>
      {status}
    </span>
  );
}

export default function DeliveryDetails({
  delivery,
  onClose,
}: {
  delivery: DeliveryRequest;
  onClose: () => void;
}) {
  const [viewingDoc, setViewingDoc] = useState<DeliveryDocument | null>(null);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[500] p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-2xl border border-primary">
        <h2 className="text-xl font-semibold">Delivery Details</h2>
        <p className="text-gray-600 text-sm mb-4">ID: {delivery.id}</p>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <p><strong>Sender:</strong> {delivery.sender}</p>
          <p><strong>Receiver:</strong> {delivery.receiver}</p>
          <p><strong>Pickup:</strong> {delivery.pickup}</p>
          <p><strong>Dropoff:</strong> {delivery.dropoff}</p>
          <p><strong>Item:</strong> {delivery.itemType}</p>
          <p><strong>Driver:</strong> {delivery.driver || "Not Assigned"}</p>
          <p><strong>Fee:</strong> ₦{delivery.fee.toLocaleString()}</p>
          <p><strong>Status:</strong> <Badge status={delivery.status} /></p>
        </div>

        <div className="mt-4">
          <h3 className="font-medium mb-2">Uploaded Documents</h3>
          {delivery.documents.length === 0 && (
            <p className="text-gray-500 text-sm">No documents uploaded</p>
          )}

          <div className="flex gap-3 flex-wrap">
            {delivery.documents.map((doc) => (
              <button
                key={doc.id}
                onClick={() => setViewingDoc(doc)}
                className="border border-primary px-3 py-2 rounded-xl text-sm bg-white hover:bg-gray-50"
              >
                {doc.name}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            className="px-4 py-2 bg-red-600 text-white rounded-xl"
            onClick={onClose}
          >
            Close
          </button>
        </div>

        {viewingDoc && (
          <DocumentViewer doc={viewingDoc} onClose={() => setViewingDoc(null)} />
        )}
      </div>
    </div>
  );
}
