"use client";

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { FaMapMarkerAlt, FaTimes, FaLifeRing, FaTruck, FaCar } from 'react-icons/fa';
import { MdDeliveryDining } from 'react-icons/md';
import { useAuthStore } from '@/store/useAuthStore';
import MapPreview from '@/components/dashboard/MapPreview';
import Header from '@/components/Navbar';

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
  vehicle?: string;
  destinationState: string;
  pickupState: string;
}

interface BookingDTO {
  destinationState: string;
  pickupState: string;
  id: number;
  fromTown: string;
  toTown: string;
  travelDate: string;
  pickupTime: string;
  travelClass: 'economy' | 'business';
  status: string;
  driver?: string;
  vehicle?: string;
}

export default function TripsTab() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TripStatus>('upcoming');
  const [activeTrackingBooking, setActiveTrackingBooking] = useState<Trip | null>(null);
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);

  const tabs: { label: string; value: TripStatus }[] = [
    { label: 'Upcoming', value: 'upcoming' },
    { label: 'Past', value: 'past' },
  ];

  const filteredTrips = trips.filter((t) => t.status === activeTab);

  useEffect(() => {
    async function fetchBookings() {
      if (!token) return;

      try {
        // Replace with your actual API call
        // const res = await api.get('/bookings', {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        // });
        // const bookings: BookingDTO[] = res.data.bookings;
        // const mappedTrips = bookings.map(mapBookingToTrip);
        // setTrips(mappedTrips);

        // Mock data for demonstration
        const mockBookings: BookingDTO[] = [
          {
            id: 1,
            fromTown: 'Lagos',
            toTown: 'Abuja',
            travelDate: '2024-12-15',
            pickupTime: '08:00 AM',
            travelClass: 'economy',
            status: 'confirmed',
            driver: 'John Doe',
            vehicle: 'Toyota Camry',
            destinationState: 'FCT',
            pickupState: 'Lagos'
          },
          {
            id: 2,
            fromTown: 'Port Harcourt',
            toTown: 'Enugu',
            travelDate: '2024-11-20',
            pickupTime: '10:30 AM',
            travelClass: 'business',
            status: 'completed',
            driver: 'Jane Smith',
            vehicle: 'Mercedes Benz',
            destinationState: 'Enugu',
            pickupState: 'Rivers'
          },
        ];

        const mappedTrips = mockBookings.map(mapBookingToTrip);
        setTrips(mappedTrips);
      } catch (err) {
        console.error('Failed to fetch bookings', err);
      } finally {
        setLoading(false);
      }
    }

    fetchBookings();
  }, [token]);

  const handleNavigate = () => {
    console.log('Navigating to deliveries...');
    router.push('/deliveries-history');
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
        {filteredTrips.map((trip) => (
          <div
            key={trip.id}
            className="bg-cardBg dark:bg-dark-cardBg p-4 rounded-2xl shadow-md mt-4"
          >
            <div className="flex justify-between mb-2">
              <h3 className="font-bold text-text dark:text-dark-text">
                {trip.fromTown} → {trip.toTown}
              </h3>
              <span className="text-muted dark:text-dark-muted">
                {trip.travelDate} {trip.pickupTime}
              </span>
            </div>

            <p className="text-text dark:text-dark-text mb-1">Class: {trip.travelClass}</p>
            {trip.vehicle && (
              <p className="text-text dark:text-dark-text mb-1">Vehicle: {trip.vehicle}</p>
            )}
            {trip.driver && (
              <p className="text-text dark:text-dark-text mb-2">Driver: {trip.driver}</p>
            )}

            {/* Actions */}
            <div className="mt-2">
              {trip.status === 'upcoming' && (
                <>
                  <div className="flex justify-between gap-2">
                    <button
                      onClick={() => setActiveTrackingBooking(trip)}
                      className="bg-primary dark:bg-dark-primary text-white py-2 rounded-lg flex-1 flex items-center justify-center gap-2"
                    >
                      <FaMapMarkerAlt className="w-3.5 h-3.5" />
                      <span className="font-medium text-sm">Track</span>
                    </button>

                    <button className="border border-red-600 dark:border-red-500 py-2 rounded-lg flex-[2] flex items-center justify-center gap-2">
                      <FaTimes className="w-3.5 h-3.5 text-red-600 dark:text-red-500" />
                      <span className="font-medium text-sm text-red-600 dark:text-red-500">Cancel</span>
                    </button>
                  </div>

                  <div className="flex justify-between gap-2 mt-2">
                    <button className="bg-primary dark:bg-dark-primary text-white py-2 rounded-lg flex-[2]">
                      <span className="text-center">View Details</span>
                    </button>
                    <button
                      onClick={() =>
                        router.push(`/support/${trip.id}?from=${trip.fromTown}&to=${trip.toTown}&date=${trip.travelDate}`)
                      }
                      className="flex-1 py-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center gap-2"
                    >
                      <FaLifeRing className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                      <span className="font-medium text-sm text-blue-600 dark:text-blue-400">
                        Get Help
                      </span>
                    </button>
                  </div>
                </>
              )}
              {trip.status === 'past' && (
                <div className="flex justify-between gap-2">
                  <button className="bg-primary dark:bg-dark-primary text-white py-2 rounded-lg flex-1">
                    <span className="text-center">View Receipt</span>
                  </button>
                  <button className="bg-gray-600 dark:bg-gray-700 text-white py-2 rounded-lg flex-1">
                    <span className="text-center">Rebook</span>
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
            <MdDeliveryDining className="w-7 h-7 text-white" />
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

function mapBookingToTrip(booking: BookingDTO): Trip {
  const tripDate = new Date(booking.travelDate);
  const today = new Date();
  
  // Adjust for timezone if needed
  tripDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const status: TripStatus =
    booking.status === 'cancelled' || tripDate < today
      ? 'past'
      : 'upcoming';

  return {
    id: String(booking.id),
    fromTown: booking.fromTown,
    toTown: booking.toTown,
    travelDate: tripDate.toISOString().split('T')[0],
    pickupTime: booking.pickupTime,
    travelClass: booking.travelClass.charAt(0).toUpperCase() + booking.travelClass.slice(1),
    status,
    driver: booking.driver,
    vehicle: booking.vehicle,
    destinationState: booking.destinationState,
    pickupState: booking.pickupState,
  };
}