"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import api from "@/lib/api";
import { useAuthStore } from "@/store/useAuthStore";
import { FaTruck, FaTimes, FaSyncAlt, FaLifeRing, FaMapMarkerAlt, FaReceipt, FaQuestionCircle } from "react-icons/fa";
import { FiTruck } from "react-icons/fi";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import Modal from "@/components/mybookings_page/Modal";
import MapPreview from "@/components/dashboard/MapPreview";

type TripStatus = 'upcoming' | 'past';

interface Trip {
  id: string;
  fromTown: string;
  toTown: string;
  travelDate: string;
  pickupTime: string;
  travelClass: string;
  status: string;
  driver?: string;
  vehicle?: string;
  destinationState: string;
  pickupState: string;
  seats?: number;
  tripPrice?: number;
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
  seats?: number;
  tripPrice?: number;
}

export default function TripsTab() {
  const [activeTab, setActiveTab] = useState<TripStatus>('upcoming');
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTrackingBooking, setActiveTrackingBooking] = useState<Trip | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const token = useAuthStore((state) => state.token);
  const router = useRouter();
  
  const tabs: { label: string; value: TripStatus }[] = [
    { label: 'Upcoming', value: 'upcoming' },
    { label: 'Past', value: 'past' },
  ];

  const fetchBookings = async () => {
    if (!token) return;
    setLoading(true);

    try {
      const res = await api.get('/bookings', {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      const bookings: BookingDTO[] = res.data.bookings;
      const mappedTrips = bookings.map(mapBookingToTrip);
      setTrips(mappedTrips);
    } catch (err) {
      console.error('Failed to fetch bookings', err);
      toast.error('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [token]);

  const filteredTrips = trips.filter((t) => {
    if (activeTab === 'upcoming') {
      return t.status !== 'cancelled' && t.status !== 'completed';
    } else {
      return t.status === 'cancelled' || t.status === 'completed';
    }
  });

  const handleNavigate = () => {
    router.push('/deliverieshistory');
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

  const rebookBooking = async (id: string) => {
    if (!token) return;
    const today = new Date().toISOString().split('T')[0];
    try {
      await api.post(
        `/${id}/rebook`,
        { travelDate: today },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Rebooked successfully for today!');
      fetchBookings();
    } catch (err) {
      toast.error('Failed to rebook');
    }
  };

  const handlePayNow = (id: string) => {
    router.push(`/payment/${id}`);
  };

  const getActionButton = (trip: Trip) => {
    const baseClasses = "flex items-center justify-center gap-2 py-2 px-4 rounded-lg font-medium transition-all duration-200";
    
    switch (trip.status) {
      case 'pricing':
        return (
          <button
            disabled
            className={`${baseClasses} bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed`}
          >
            <FaTimes /> Pay (Processing...)
          </button>
        );
      
      case 'awaiting_payment':
        return (
          <button
            onClick={() => handlePayNow(trip.id)}
            className={`${baseClasses} bg-primary hover:bg-red-600 text-white shadow-md hover:shadow-lg`}
          >
            💰 Pay Now
          </button>
        );
      
      case 'confirmed':
        return (
          <button
            onClick={() => {
              setActiveTrackingBooking(trip);
              setIsModalOpen(true);
            }}
            className={`${baseClasses} bg-primary hover:bg-red-600 text-white shadow-md hover:shadow-lg`}
          >
            <FaMapMarkerAlt /> Track
          </button>
        );
      
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="space-y-4 p-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-32 rounded-xl bg-cardBg dark:bg-dark-cardBg animate-pulse"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background dark:bg-dark-background">
      {/* Tabs */}
      <div className="sticky top-0 z-10 bg-background dark:bg-dark-background pt-4 pb-2 px-4">
        <div className="flex bg-gray-200 dark:bg-gray-800 rounded-full p-1">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === tab.value
                  ? 'bg-primary text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Trips List */}
      <div className="p-4 space-y-4">
        <AnimatePresence mode="wait">
          {filteredTrips.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                <FiTruck className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500 dark:text-gray-400 mb-2">No trips in this category yet.</p>
              <p className="text-sm text-gray-400 dark:text-gray-500">
                {activeTab === 'upcoming' 
                  ? 'Book your first trip to see it here!' 
                  : 'Completed trips will appear here'}
              </p>
            </motion.div>
          ) : (
            filteredTrips.map((trip, index) => (
              <motion.div
                key={trip.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
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
                      {trip.seats && (
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          • {trip.seats} seat{trip.seats > 1 ? 's' : ''}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-text dark:text-dark-text">
                      {trip.travelDate}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {trip.pickupTime}
                    </p>
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
                  {trip.tripPrice && (
                    <p className="text-sm font-medium text-green-600 dark:text-green-400">
                      <span className="text-gray-500 dark:text-gray-400">Price:</span> ₦{trip.tripPrice.toLocaleString()}
                    </p>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  {activeTab === 'upcoming' ? (
                    <>
                      <div className="flex gap-2">
                        {getActionButton(trip)}
                        <button
                          onClick={() => cancelBooking(trip.id)}
                          className="flex-1 py-2 px-4 rounded-lg border border-red-500 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200 font-medium flex items-center justify-center gap-2"
                        >
                          <FaTimes /> Cancel
                        </button>
                      </div>
                      <div className="flex gap-2">
                        <button className="flex-1 py-2 px-4 rounded-lg bg-accentBg dark:bg-dark-accentBg text-text dark:text-dark-text hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 font-medium">
                          View Details
                        </button>
                        <Link
                          href={{
                            pathname: `/support/${trip.id}`,
                            query: {
                              from: trip.fromTown,
                              to: trip.toTown,
                              date: trip.travelDate,
                            },
                          }}
                          className="flex-1 py-2 px-4 rounded-lg bg-link/10 text-link dark:text-dark-link hover:bg-link/20 transition-colors duration-200 font-medium flex items-center justify-center gap-2"
                        >
                          <FaLifeRing /> Get Help
                        </Link>
                      </div>
                    </>
                  ) : (
                    <div className="flex gap-2">
                      <button className="flex-1 py-2 px-4 rounded-lg bg-primary hover:bg-red-600 text-white shadow-md hover:shadow-lg transition-all duration-200 font-medium flex items-center justify-center gap-2">
                        <FaReceipt /> View Receipt
                      </button>
                      <button
                        onClick={() => rebookBooking(trip.id)}
                        className="flex-1 py-2 px-4 rounded-lg bg-gray-600 hover:bg-gray-700 text-white shadow-md hover:shadow-lg transition-all duration-200 font-medium flex items-center justify-center gap-2"
                      >
                        <FaSyncAlt /> Rebook
                      </button>
                      <Link
                        href={{
                          pathname: `/support/${trip.id}`,
                          query: {
                            from: trip.fromTown,
                            to: trip.toTown,
                            date: trip.travelDate,
                          },
                        }}
                        className="flex-1 py-2 px-4 rounded-lg bg-link/10 text-link dark:text-dark-link hover:bg-link/20 transition-colors duration-200 font-medium flex items-center justify-center gap-2"
                      >
                        <FaLifeRing /> Help
                      </Link>
                    </div>
                  )}
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Floating Action Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleNavigate}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-primary hover:bg-red-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center z-50"
      >
        <FaTruck className="w-6 h-6" />
      </motion.button>

      {/* Tracking Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Tracking Ride"
      >
        {activeTrackingBooking && (
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-text dark:text-dark-text">
                {activeTrackingBooking.fromTown} → {activeTrackingBooking.toTown}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {activeTrackingBooking.travelDate} • {activeTrackingBooking.pickupTime}
              </p>
            </div>
            
            <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
              <MapPreview 
                pickupLabel={`Pickup: ${activeTrackingBooking.toTown}`}
              />
            </div>
            
            <div className="flex gap-3 pt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-1 py-2 px-4 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
              >
                Close
              </button>
              <Link
                href={{
                  pathname: `/support/${activeTrackingBooking.id}`,
                  query: {
                    from: activeTrackingBooking.fromTown,
                    to: activeTrackingBooking.toTown,
                    date: activeTrackingBooking.travelDate,
                  },
                }}
                className="flex-1 py-2 px-4 rounded-lg bg-link text-white hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <FaLifeRing /> Get Help
              </Link>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

function mapBookingToTrip(booking: BookingDTO): Trip {
  const tripDate = new Date(booking.travelDate);
  const today = new Date();

  // Determine if it's upcoming or past based on date and status
  let status = booking.status;
  
  // If status is not explicitly set, determine based on date
  if (!status) {
    status = tripDate < today ? 'completed' : 'confirmed';
  }

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
    seats: booking.seats,
    tripPrice: booking.tripPrice
  };
}