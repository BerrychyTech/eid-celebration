"use client";

import { useState } from "react";
import { mockFleetPartners } from "@/mock/mockFleet";
import FleetPartnersTable from "@/components/fleet/FleetPartnersTable";
import FleetPartnerModal from "@/components/fleet/FleetPartnerModal";
import { FleetPartner } from "@/types/fleet";

export default function FleetPartnersPage() {
const [active, setActive] = useState<FleetPartner | null>(null);

  return (
    <div className="p-6">
      <FleetPartnersTable
        partners={mockFleetPartners}
        onSelect={(p) => setActive(p)}
      />

      {active && (
        <FleetPartnerModal partner={active} onClose={() => setActive(null)} />
      )}
    </div>
  );
}
