import React from "react";

interface Props {
  form: any;
  fromOptions: string[];
  toOptions: string[];
  dropdownClass: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export default function TripFormFields({
  form,
  fromOptions,
  toOptions,
  dropdownClass,
  handleChange,
}: Props) {

  // Helper function to calculate exact pickup time
  const getExactPickupTime = () => {
    if (!form.pickupLocation || !form.pickupTime) return "";

    const baseTimes: Record<string, string> = {
      "06:00": "06:00",
      "08:00": "08:00",
      "10:00": "10:00",
      "12:00": "12:00",
      "14:00": "14:00",
    };

    const baseTime = baseTimes[form.pickupTime];
    if (!baseTime) return "";

    const [hours, minutes] = baseTime.split(":").map(Number);

    const totalMinutes =
      hours * 60 +
      minutes +
      (Number(form.pickupLocation) - 1) * 5;

    const finalHours = Math.floor(totalMinutes / 60);
    const finalMinutes = totalMinutes % 60;

    const formattedHours = String(finalHours).padStart(2, "0");
    const formattedMinutes = String(finalMinutes).padStart(2, "0");

    return `${formattedHours}:${formattedMinutes}`;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* Current State */}
      <div>
        <label className="text-sm font-medium block mb-1">Current State</label>
        <select
          name="currentState"
          value={form.currentState}
          onChange={handleChange}
          className={dropdownClass}
        >
          <option value="">Select State</option>
          <option value="jigawa">Jigawa</option>
          <option value="kano">Kano</option>
        </select>
      </div>

      {/* Destination State */}
      <div>
        <label className="text-sm font-medium block mb-1">Destination State</label>
        <select
          name="destinationState"
          value={form.destinationState}
          onChange={handleChange}
          className={dropdownClass}
        >
          <option value="">Select Destination State</option>
          <option value="jigawa">Jigawa</option>
          <option value="kano">Kano</option>
        </select>
      </div>

      {/* FROM */}
      <div>
        <label className="text-sm font-medium block mb-1">From</label>
        <select
          name="from"
          value={form.from}
          onChange={handleChange}
          disabled={!form.currentState}
          className={dropdownClass}
        >
          <option value="">Select From</option>
          {fromOptions.map((city) => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
      </div>

      {/* TO */}
      <div>
        <label className="text-sm font-medium block mb-1">To</label>
        <select
          name="to"
          value={form.to}
          onChange={handleChange}
          disabled={!form.destinationState}
          className={dropdownClass}
        >
          <option value="">Select To</option>
          {toOptions.map((city) => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
      </div>

      {/* Date */}
      <div>
        <label className="text-sm font-medium block mb-1">Travel Date</label>
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className={dropdownClass}
        />
      </div>

      {/* Pickup Location */}
      <div>
        <label className="text-sm font-medium block mb-1">Pickup Location</label>
        <select
          name="pickupLocation"
          value={form.pickupLocation}
          onChange={handleChange}
          className={dropdownClass}
        >
          <option value="">Select Pickup Location</option>
          {[1, 2, 3, 4, 5].map((loc) => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>
      </div>

      {/* Pickup Time */}
      <div>
        <label className="text-sm font-medium block mb-1">Travel Time Window</label>
        <select
          name="pickupTime"
          value={form.pickupTime}
          onChange={handleChange}
          className={dropdownClass}
        >
          <option value="">Select Time</option>
          <option value="06:00">Early Dispatch (8:00 AM – 5:59 AM)</option>
          <option value="08:00">Morning Rush (6:00 AM – 8:59 AM)</option>
          <option value="10:00">Mid-Morning Rollout (9:00 AM – 11:59 AM)</option>
          <option value="12:00">Afternoon Dispatch (12:00 PM – 3:59 PM)</option>
          <option value="14:00">Evening Wind-Down (4:00 PM – 7:59 PM)</option>
        </select>
      </div>

      {/* Bag Count */}
      <div>
        <label className="text-sm font-medium block mb-1">Luggage (bags)</label>
        <select
          name="bagCount"
          value={form.bagCount}
          onChange={handleChange}
          className={dropdownClass}
        >
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>{num}</option>
          ))}
        </select>
      </div>

      {/* Seats */}
      <div>
        <label className="text-sm font-medium block mb-1">Seats</label>
        <select
          name="seats"
          value={form.seats}
          onChange={handleChange}
          className={dropdownClass}
        >
          <option value="1">1 Seat</option>
          <option value="2">2 Seats</option>
          <option value="3">3 Seats</option>
          <option value="4">4 Seats</option>
          <option value="full-car">Full Car</option>
        </select>
      </div>

      {/* Exact Pickup Time (Read-only) */}
      <div className="sm:col-span-2 mt-2">
        <p className="text-sm font-medium text-gray-700">
          Exact Pickup Time
        </p>
        <div className="mt-1 p-3 rounded-md bg-gray-100 text-gray-800 text-sm">
          {getExactPickupTime()
            ? `Your pickup time is exactly ${getExactPickupTime()}`
            : "Select a travel time window and pickup location to see your exact pickup time"}
        </div>
      </div>
    </div>
  );
}
