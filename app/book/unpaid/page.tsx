// File: src/app/book/unpaid/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import api from "@/lib/api";
import toast from "react-hot-toast";
import { 
  Clock, 
  CreditCard, 
  CheckCircle, 
  AlertCircle,
  RefreshCw,
  Calendar,
  MapPin,
  Car,
  Users
} from "lucide-react";

interface UnpaidRequest {
  id: string;
  requestId: string;
  pickupState: string;
  pickupTown: string;
  destinationState: string;
  destinationTown: string;
  eventDate: string;
  eventTime: string;
  eventType: string;
  vehicleType: string;
  quantity: number;
  tripFlow: string;
  tripPrice?: number;
  status: "new" | "awaiting_payment" | "pricing" | "confirmed" | "completed" | "cancelled";
  frontendStatus: "pending" | "priced" | "expired";
  createdAt: string;
}

export default function UnpaidPage() {
  const router = useRouter();
  const [requests, setRequests] = useState<UnpaidRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [pollingInterval, setPollingInterval] = useState<NodeJS.Timeout | null>(null);
  const token = useAuthStore.getState().token;

  useEffect(() => {
    if (!token) {
      router.push("/auth/login");
      return;
    }
    fetchUnpaidRequests();
    startPolling();
    
    return () => {
      if (pollingInterval) clearInterval(pollingInterval);
    };
  }, []);

  const fetchUnpaidRequests = async () => {
    try {
      const response = await api.get("/event-fleet/unpaid", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRequests(response.data);
    } catch (error) {
      console.error("Failed to fetch unpaid requests:", error);
      toast.error("Failed to load requests");
    } finally {
      setLoading(false);
    }
  };

  const startPolling = () => {
    const interval = setInterval(fetchUnpaidRequests, 30000);
    setPollingInterval(interval);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (timeString: string) => {
    return new Date(`1970-01-01T${timeString}`).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-5 h-5 text-amber-500" />;
      case "priced":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "expired":
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-muted" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Awaiting Price Calculation";
      case "priced":
        return "Ready for Payment";
      case "expired":
        return "Expired";
      default:
        return "Unknown";
    }
  };

  const handleMakePayment = (requestId: string) => {
    router.push(`/book/payment/${requestId}`);
  };

  const handleRefresh = () => {
    fetchUnpaidRequests();
    toast.success("Refreshing requests...");
  };

  const handleBookNew = () => {
    router.push("/book");
  };

  const getVehicleDisplayName = (vehicleType: string) => {
    const vehicleMap: Record<string, string> = {
      'bus': 'Rolls Royce',
      'suv': 'Ferrari',
      'car': 'Lamborghini',
      'hiace': 'Homa'
    };
    return vehicleMap[vehicleType] || vehicleType;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background dark:bg-dark-background flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
          <p className="text-text dark:text-dark-text">Loading your requests...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background dark:bg-dark-background py-8 px-4 font-poppins">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-text dark:text-dark-text mb-2">
            Pending Fleet Requests
          </h1>
          <p className="text-text/80 dark:text-dark-text/80">
            Manage and complete payment for your requested fleets
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-cardBg dark:bg-dark-cardBg rounded-xl p-6 shadow-lg border border-accentBg dark:border-dark-accentBg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text/70 dark:text-dark-text/70 text-sm">Total Requests</p>
                <p className="text-2xl font-bold text-text dark:text-dark-text mt-1">
                  {requests.length}
                </p>
              </div>
              <div className="p-3 bg-accentBg dark:bg-dark-accentBg rounded-lg">
                <CreditCard className="w-6 h-6 text-primary" />
              </div>
            </div>
          </div>

          <div className="bg-cardBg dark:bg-dark-cardBg rounded-xl p-6 shadow-lg border border-accentBg dark:border-dark-accentBg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text/70 dark:text-dark-text/70 text-sm">Ready for Payment</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-1">
                  {requests.filter(r => r.frontendStatus === "priced").length}
                </p>
              </div>
              <div className="p-3 bg-accentBg dark:bg-dark-accentBg rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-500" />
              </div>
            </div>
          </div>

          <div className="bg-cardBg dark:bg-dark-cardBg rounded-xl p-6 shadow-lg border border-accentBg dark:border-dark-accentBg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text/70 dark:text-dark-text/70 text-sm">Awaiting Price</p>
                <p className="text-2xl font-bold text-amber-600 dark:text-amber-400 mt-1">
                  {requests.filter(r => r.frontendStatus === "pending").length}
                </p>
              </div>
              <div className="p-3 bg-accentBg dark:bg-dark-accentBg rounded-lg">
                <Clock className="w-6 h-6 text-amber-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mb-8">
          <button
            onClick={handleRefresh}
            className="flex items-center gap-2 px-4 py-2 bg-accentBg dark:bg-dark-accentBg rounded-lg border border-cardBg dark:border-dark-cardBg text-text dark:text-dark-text hover:bg-cardBg dark:hover:bg-dark-cardBg transition"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
          <button
            onClick={handleBookNew}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
          >
            + New Fleet Request
          </button>
        </div>

        {/* Requests List */}
        {requests.length === 0 ? (
          <div className="text-center py-16 bg-cardBg dark:bg-dark-cardBg rounded-2xl shadow-lg border border-accentBg dark:border-dark-accentBg">
            <CreditCard className="w-16 h-16 text-muted dark:text-dark-muted mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-text dark:text-dark-text mb-2">
              No Pending Requests
            </h3>
            <p className="text-text/80 dark:text-dark-text/80 mb-6 max-w-md mx-auto">
              You don't have any unpaid fleet requests. Book a new fleet to get started.
            </p>
            <button
              onClick={handleBookNew}
              className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
            >
              Book Your First Fleet
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {requests.map((request) => (
              <div
                key={request.id}
                className="bg-cardBg dark:bg-dark-cardBg rounded-2xl shadow-lg border border-accentBg dark:border-dark-accentBg overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-4">
                      {getStatusIcon(request.frontendStatus)}
                      <div>
                        <h3 className="text-lg font-semibold text-text dark:text-dark-text">
                          {request.eventType} • {getVehicleDisplayName(request.vehicleType)}
                        </h3>
                        <p className="text-sm text-text/70 dark:text-dark-text/70">
                          Request ID: {request.requestId}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <span className={`px-4 py-1 rounded-full text-sm font-medium ${
                        request.frontendStatus === "priced" 
                          ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300"
                          : request.frontendStatus === "pending"
                          ? "bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300"
                          : "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300"
                      }`}>
                        {getStatusText(request.frontendStatus)}
                      </span>
                      
                      {request.frontendStatus === "priced" && request.tripPrice && (
                        <div className="text-right">
                          <p className="text-sm text-text/70 dark:text-dark-text/70">Total Amount</p>
                          <p className="text-2xl font-bold text-text dark:text-dark-text">
                            ₦{request.tripPrice.toLocaleString()}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Request Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-accentBg dark:bg-dark-accentBg rounded-lg">
                        <MapPin className="w-5 h-5 text-link dark:text-dark-link" />
                      </div>
                      <div>
                        <p className="text-sm text-text/70 dark:text-dark-text/70">Route</p>
                        <p className="font-medium text-text dark:text-dark-text">
                          {request.pickupTown} → {request.destinationTown}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-accentBg dark:bg-dark-accentBg rounded-lg">
                        <Calendar className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-text/70 dark:text-dark-text/70">Event Date & Time</p>
                        <p className="font-medium text-text dark:text-dark-text">
                          {formatDate(request.eventDate)} • {formatTime(request.eventTime)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-accentBg dark:bg-dark-accentBg rounded-lg">
                        <Car className="w-5 h-5 text-green-500" />
                      </div>
                      <div>
                        <p className="text-sm text-text/70 dark:text-dark-text/70">Vehicle & Quantity</p>
                        <p className="font-medium text-text dark:text-dark-text">
                          {getVehicleDisplayName(request.vehicleType)} × {request.quantity}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-accentBg dark:bg-dark-accentBg rounded-lg">
                        <Users className="w-5 h-5 text-amber-500" />
                      </div>
                      <div>
                        <p className="text-sm text-text/70 dark:text-dark-text/70">Trip Type</p>
                        <p className="font-medium text-text dark:text-dark-text">
                          {request.tripFlow === "one_way" ? "One-Way Voyage" : "Go & Return"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-accentBg dark:border-dark-accentBg">
                    {request.frontendStatus === "priced" ? (
                      <>
                        <button
                          onClick={() => handleMakePayment(request.id)}
                          className="flex-1 bg-primary text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary/90 transition flex items-center justify-center gap-2"
                        >
                          <CreditCard className="w-5 h-5" />
                          Proceed to Payment
                        </button>
                        <button
                          onClick={() => router.push(`/book/request/${request.requestId}`)}
                          className="flex-1 py-3 px-6 rounded-lg font-semibold border border-accentBg dark:border-dark-accentBg text-text dark:text-dark-text hover:bg-accentBg dark:hover:bg-dark-accentBg transition"
                        >
                          View Details
                        </button>
                      </>
                    ) : request.frontendStatus === "pending" ? (
                      <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-4">
                        <div className="flex items-center gap-3 text-amber-600 dark:text-amber-400">
                          <Clock className="w-5 h-5 animate-pulse" />
                          <p className="text-sm sm:text-base">Price calculation in progress. This page updates automatically.</p>
                        </div>
                        <button
                          onClick={() => router.push(`/book/request/${request.requestId}`)}
                          className="px-6 py-2 rounded-lg font-semibold border border-accentBg dark:border-dark-accentBg text-text dark:text-dark-text hover:bg-accentBg dark:hover:bg-dark-accentBg transition whitespace-nowrap"
                        >
                          View Details
                        </button>
                      </div>
                    ) : (
                      <div className="w-full text-center py-3 text-red-600 dark:text-red-400">
                        This request has expired. Please create a new one.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer Note */}
        <div className="mt-8 text-center text-sm text-text/70 dark:text-dark-text/70">
          <p>Need help? Contact our support team at support@fleetcompany.com</p>
          <p className="mt-1">Prices are typically calculated within 5 minutes of request</p>
        </div>
      </div>
    </div>
  );
}