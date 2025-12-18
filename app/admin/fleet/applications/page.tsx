"use client";

import { useState } from "react";
import { mockFleetApplications } from "@/mock/mockFleet";
import FleetApplicationsTable from "@/components/fleet/FleetApplicationsTable";
import FleetApplicationModal from "@/components/fleet/FleetApplicationModal";
import { FleetApplication } from "@/types/fleet";

export default function FleetApplicationsPage() {
const [active, setActive] = useState<FleetApplication | null>(null);

  return (
    <div className="p-6">
      <FleetApplicationsTable
        applications={mockFleetApplications}
        onSelect={(app) => setActive(app)}
      />

      {active && (
        <FleetApplicationModal
          application={active}
          onClose={() => setActive(null)}
        />
      )}
    </div>
  );
}
