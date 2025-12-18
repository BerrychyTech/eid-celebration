"use client"

import { mockDrivers } from "@/mock/fleetDrivers";
import { mockFleetVehicles } from "@/mock/mockFleet";
import DriverList from "./DriverList";
import DriverAssignmentCard from "./DriverAssignmentCard";
import VehicleSelector from "./VehicleSelector";
import { assignVehicle, removeVehicle } from "./actions";

export default function DriverAssignmentCenter() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-[#FD5C63]">
        Driver Assignment Center
      </h1>

      <DriverManager />
    </div>
  );
}

import { useState } from "react";
import { FleetDriver } from "@/types/fleet";

function DriverManager() {
  const [drivers, setDrivers] = useState([...mockDrivers]);
  const [vehicles, setVehicles] = useState([...mockFleetVehicles]);
const [selected, setSelected] = useState<FleetDriver | null>(null);

  async function handleAssign(vehicleId: string) {
    if (!selected) return;

    await assignVehicle(selected.id, vehicleId);

    setDrivers([...mockDrivers]);
    setVehicles([...mockFleetVehicles]);
  }

  async function handleRemove() {
    if (!selected) return;

    await removeVehicle(selected.id);

    setDrivers([...mockDrivers]);
    setVehicles([...mockFleetVehicles]);
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">

      <DriverList drivers={drivers} onSelect={setSelected} />

      {selected && (
        <div className="space-y-6">
          <DriverAssignmentCard
            driver={selected}
            onRemoveVehicle={handleRemove}
          />

          <VehicleSelector
            vehicles={vehicles}
            onAssign={handleAssign}
          />
        </div>
      )}

    </div>
  );
}
