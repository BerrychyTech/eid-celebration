import { DeliveryRequest } from "@/types/delivery";
import { DeliveryStatus } from "@/types/delivery";

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

export default function DeliveryTable({
  deliveries,
  onSelect,
}: {
  deliveries: DeliveryRequest[];
  onSelect: (d: DeliveryRequest) => void;
}) {
  return (
    <div className="border border-primary rounded-2xl p-4 bg-white shadow-sm">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b text-gray-700">
            <th className="py-2 text-left">ID</th>
            <th className="py-2 text-left">Sender</th>
            <th className="py-2 text-left">Pickup</th>
            <th className="py-2 text-left">Dropoff</th>
            <th className="py-2 text-left">Item</th>
            <th className="py-2 text-left">Fee</th>
            <th className="py-2 text-left">Status</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {deliveries.map((d) => (
            <tr key={d.id} className="border-b hover:bg-gray-50 cursor-pointer">
              <td className="py-3 font-medium">{d.id}</td>
              <td>{d.sender}</td>
              <td>{d.pickup}</td>
              <td>{d.dropoff}</td>
              <td>{d.itemType}</td>
              <td>₦{d.fee.toLocaleString()}</td>
              <td><Badge status={d.status} /></td>
              <td>
                <button
                  className="text-blue-600 hover:underline"
                  onClick={() => onSelect(d)}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
