"use client";

import { FleetApplication, FleetDocument } from "@/types/fleet";
import DocumentViewer from "../deliveries/DocumentViewer";

import { useState } from "react";

export default function FleetApplicationModal({
  application,
  onClose,
}: {
  application: FleetApplication;
  onClose: () => void;
}) {
const [viewDoc, setViewDoc] = useState<FleetDocument | null>(null);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-[900]">
      <div className="bg-white w-full max-w-lg rounded-2xl p-6 border border-primary">
        <h2 className="text-xl font-semibold">Application Details</h2>

        <p className="text-sm mt-1 text-gray-500">
          ID: {application.id}
        </p>

        <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <p><strong>Name:</strong> {application.partnerName}</p>
          <p><strong>Company:</strong> {application.companyName}</p>
          <p><strong>Phone:</strong> {application.phone}</p>
          <p><strong>Email:</strong> {application.email}</p>
          <p><strong>Status:</strong> {application.status}</p>
        </div>

        <div className="mt-4">
          <h3 className="font-medium mb-2">Documents</h3>
          {application.documents.length === 0 && (
            <p className="text-gray-500 text-sm">No documents uploaded</p>
          )}

          <div className="flex gap-2 flex-wrap">
            {application.documents.map((doc) => (
              <button
                key={doc.id}
                onClick={() => setViewDoc(doc)}
                className="px-3 py-2 border border-primary rounded-xl text-sm hover:bg-gray-50"
              >
                {doc.name}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button className="px-4 py-2 bg-gray-200 rounded-xl" onClick={onClose}>
            Close
          </button>

          <button className="px-4 py-2 bg-red-600 text-white rounded-xl">
            Reject
          </button>

          <button className="px-4 py-2 bg-green-600 text-white rounded-xl">
            Approve
          </button>
        </div>

        {viewDoc && (
          <DocumentViewer doc={viewDoc} onClose={() => setViewDoc(null)} />
        )}
      </div>
    </div>
  );
}
