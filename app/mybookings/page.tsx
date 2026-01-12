"use client";

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { FaMapMarkerAlt, FaTimes, FaLifeRing, FaTruck, } from 'react-icons/fa';
import { useAuthStore } from '@/store/useAuthStore';
import MapPreview from '@/components/dashboard/MapPreview';
import Header from '@/components/Navbar';
import api from '@/lib/api';
import toast from 'react-hot-toast';


type TripStatus = 'upcoming' | 'past';

interface Trip {
  id: string;
  fromTown: string;
  toTown: string;
  travelDate: string;
  pickupTime: string;
  travelClass: string;
  status: TripStatus;
  driver?: string;
  vehicle?: string; // corresponds to vehicleType or vehicle
  seats?: number;   // corresponds to seats (regular) or quantity (event fleet)
  destinationState: string;
  pickupState: string;
}



interface BookingDTO {
  id: number;
  status: string;

  // regular booking
  fromTown?: string;
  toTown?: string;
  travelDate?: string;
  pickupTime?: string;
  travelClass?: 'economy' | 'business';

  // event fleet booking
  pickupTown?: string;
  destinationTown?: string;
  eventDate?: string;
  eventTime?: string;
  vehicle?: string;

  destinationState: string;
  pickupState: string;
  driver?: string;
}


export default function TripsTab() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TripStatus>('upcoming');
  const [activeTrackingBooking, setActiveTrackingBooking] = useState<Trip | null>(null);
const [bookings, setBookings] = useState<{
  regular: BookingDTO[];
  eventFleet: BookingDTO[];
}>({ regular: [], eventFleet: [] });
  const [loading, setLoading] = useState(true);
  
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);

  const tabs: { label: string; value: TripStatus }[] = [
    { label: 'Upcoming', value: 'upcoming' },
    { label: 'Past', value: 'past' },
  ];

const trips: Trip[] = [...bookings.regular, ...bookings.eventFleet].map(
  mapBookingToTrip
);

const filteredTrips = trips.filter((t) => t.status === activeTab);


const fetchBookings = async () => {
  if (!token) return;
  setLoading(true);

  try {
    const regularEndpoint =
      activeTab === 'upcoming'
        ? '/upcoming'
        : '/past?page=1&limit=20';

    const eventFleetEndpoint =
      activeTab === 'upcoming'
        ? '/event-fleet/my/upcoming'
        : '/event-fleet/my/past?page=1&limit=20';

    const [regularRes, eventRes] = await Promise.all([
      api.get(regularEndpoint, {
        headers: { Authorization: `Bearer ${token}` },
      }),
      api.get(eventFleetEndpoint, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    ]);


       console.log('Regular bookings response:', JSON.stringify(regularRes.data, null, 2));
    console.log('Event fleet bookings response:', JSON.stringify(eventRes.data, null, 2));

    const regularBookings =
      activeTab === 'upcoming'
        ? regularRes.data.upcoming
        : regularRes.data.bookings;

    const eventFleetBookings =
      activeTab === 'upcoming'
        ? eventRes.data.upcoming
        : eventRes.data.past;

    setBookings({
      regular: regularBookings || [],
      eventFleet: eventFleetBookings || [],
    });
  } catch (err) {
    toast.error('❌ Failed to load trips.');
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchBookings();
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [activeTab, token]);


  const handleNavigate = () => {
    console.log('Navigating to deliveries...');
    router.push('/deliveries-history');
  };

    const cancelBooking = async (id: string) => {
      if (!token) return;
      try {
        await api.delete(`/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success('Booking cancelled successfully');
        fetchBookings();
      } catch (err) {
        toast.error('Failed to cancel booking');
      }
    };
  // Animation refs
  const buttonRef = useRef<HTMLDivElement>(null);

  const handleButtonPress = () => {
    if (buttonRef.current) {
      buttonRef.current.classList.add('scale-95');
      setTimeout(() => {
        if (buttonRef.current) {
          buttonRef.current.classList.remove('scale-95');
          buttonRef.current.classList.add('rotate-180');
          setTimeout(() => {
            if (buttonRef.current) {
              buttonRef.current.classList.remove('rotate-180');
            }
            handleNavigate();
          }, 400);
        }
      }, 200);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-muted dark:text-dark-muted">Loading trips...</div>
      </div>
    );
  }

  return (
    <>
    <Header/>
    <div className="flex-1 bg-background dark:bg-dark-background min-h-screen">
      {/* Tabs */}
      <div className="flex justify-around p-2 bg-gray-200 dark:bg-gray-800 rounded-full m-4">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`flex-1 py-2 mx-1 rounded-full transition-colors ${
              activeTab === tab.value
                ? 'bg-primary dark:bg-dark-primary text-white'
                : 'bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            <span className="text-center font-semibold">
              {tab.label}
            </span>
          </button>
        ))}
      </div>

      <div className="p-4 space-y-4">
{filteredTrips.map((trip, index) => (
  <div
    key={trip.id}
    className="bg-cardBg dark:bg-dark-cardBg rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 dark:border-gray-800"
  >
    {/* Trip Header */}
    <div className="flex justify-between items-start mb-3">
      <div>
        <h3 className="font-semibold text-lg text-text dark:text-dark-text">
          {trip.fromTown} → {trip.toTown}
        </h3>
<div className="flex items-center gap-2 mt-1">
  <span className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary font-medium">
    {trip.travelClass}
  </span>
  {trip.seats && trip.seats > 0 && (
    <span className="text-sm text-gray-500 dark:text-gray-400">
      • {trip.seats} seat{trip.seats > 1 ? 's' : ''}
    </span>
  )}
</div>

      </div>
      <div className="text-right">
        <p className="font-medium text-text dark:text-dark-text">{trip.travelDate}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{trip.pickupTime}</p>
      </div>
    </div>

    {/* Trip Details */}
    <div className="space-y-2 mb-4">
      {trip.vehicle && (
        <p className="text-sm text-text dark:text-dark-text">
          <span className="text-gray-500 dark:text-gray-400">Vehicle:</span> {trip.vehicle}
        </p>
      )}
      {trip.driver && (
        <p className="text-sm text-text dark:text-dark-text">
          <span className="text-gray-500 dark:text-gray-400">Driver:</span> {trip.driver}
        </p>
      )}
    </div>

    {/* Action Buttons */}
    <div className="space-y-3">
      {trip.status === 'upcoming' ? (
        <>
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTrackingBooking(trip)}
              className="flex-1 py-2 px-4 rounded-lg bg-primary dark:bg-dark-primary text-white font-medium flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors duration-200"
            >
              <FaMapMarkerAlt /> Track
            </button>
            <button
              onClick={() => cancelBooking(trip.id)}
              className="flex-1 py-2 px-4 rounded-lg border border-red-500 text-red-600 dark:text-red-400 font-medium flex items-center justify-center gap-2 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200"
            >
              <FaTimes /> Cancel
            </button>
          </div>
          <div className="flex gap-2">
            <button className="flex-1 py-2 px-4 rounded-lg bg-accentBg dark:bg-dark-accentBg text-text dark:text-dark-text font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200">
              View Details
            </button>
            <button
              onClick={() =>
router.push(
  `/mybookings/${trip.id}?type=ride&from=${encodeURIComponent(trip.fromTown)}&to=${encodeURIComponent(trip.toTown)}&date=${encodeURIComponent(trip.travelDate)}`

)              }
              className="flex-1 py-2 px-4 rounded-lg bg-link/10 text-link dark:text-dark-link font-medium flex items-center justify-center gap-2 hover:bg-link/20 transition-colors duration-200"
            >
              <FaLifeRing /> Get Help
            </button>
          </div>
        </>
      ) : (
        <div className="flex gap-2">
          <button className="flex-1 py-2 px-4 rounded-lg bg-primary dark:bg-dark-primary text-white font-medium flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors duration-200">
            View Receipt
          </button>
          <button className="flex-1 py-2 px-4 rounded-lg bg-gray-600 dark:bg-gray-700 text-white font-medium flex items-center justify-center gap-2 hover:bg-gray-700 transition-colors duration-200">
            Rebook
          </button>
        </div>
      )}
    </div>
  </div>
))}


        {filteredTrips.length === 0 && (
          <div className="text-center mt-8">
            <p className="text-muted dark:text-dark-muted">No trips in this category yet.</p>
          </div>
        )}
      </div>

      {/* Floating Action Button with Animation */}
      <div className="fixed bottom-6 right-5">
        <div
          ref={buttonRef}
          className="animate-bounce-slow transition-all duration-300"
        >
          <button
            onClick={handleButtonPress}
            className="bg-primary dark:bg-dark-primary w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300"
            aria-label="View deliveries"
          >
            <FaTruck className="w-7 h-7 text-white" />
          </button>
        </div>
      </div>

      {/* Modal */}
      {activeTrackingBooking && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-cardBg dark:bg-dark-cardBg w-full max-w-md rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-text dark:text-dark-text">
                Tracking Ride
              </h3>
              <button
                onClick={() => setActiveTrackingBooking(null)}
                className="text-text dark:text-dark-text text-2xl hover:opacity-70"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <p className="text-center font-medium text-text dark:text-dark-text">
                {activeTrackingBooking.fromTown} → {activeTrackingBooking.toTown}
              </p>
              <MapPreview pickupLabel={`Pickup: ${activeTrackingBooking.toTown}`} />
            </div>
          </div>
        </div>
      )}
    </div>

    </>
  );
}

function mapBookingToTrip(booking: BookingDTO & Record<string, any>): Trip {
  // Determine the correct date and time
  const rawDate = booking.travelDate ?? booking.eventDate;
  const rawTime = booking.pickupTime ?? booking.eventTime ?? '--:--';

  if (!rawDate) {
    throw new Error(`Missing date for booking ${booking.id}`);
  }

  const tripDate = new Date(rawDate);
  const today = new Date();
  tripDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const status: TripStatus =
    booking.status === 'cancelled' || tripDate < today ? 'past' : 'upcoming';

  return {
    id: String(booking.id),
    fromTown: booking.fromTown ?? booking.pickupTown ?? '—',
    toTown: booking.toTown ?? booking.destinationTown ?? '—',
    travelDate: tripDate.toISOString().split('T')[0],
    pickupTime: rawTime,
    travelClass: booking.travelClass
      ? booking.travelClass.charAt(0).toUpperCase() + booking.travelClass.slice(1)
      : 'Standard',
    status,
    driver: booking.driver ?? '—', // driver field may not exist, fallback to —
    vehicle: booking.vehicleType ?? booking.vehicle ?? '—', // event fleet uses vehicleType
    seats: booking.seats ?? booking.quantity ?? 0, // regular has seats, event fleet has quantity
    destinationState: booking.destinationState,
    pickupState: booking.pickupState ?? booking.currentState ?? '—', // regular uses currentState
  };
}


