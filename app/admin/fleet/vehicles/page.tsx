import { getVehicles } from "@/app/actions/vehicles/vehiclesAction";
import VehicleCard from "@/components/fleet/vehicles/VehiclesCard";

export default async function VehiclesPage() {
  const items = await getVehicles();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[#FD5C63]">Vehicles</h1>
      <p className="text-neutral-600">View and update vehicle status.</p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {items.map(v => (
          <VehicleCard key={v.id} vehicle={v} />
        ))}
      </div>
    </div>
  );
}
