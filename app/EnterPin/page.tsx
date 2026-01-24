// File: src/app/book/enter-pin/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import api from "@/lib/api";
import { useAuthStore } from "@/store/useAuthStore";

export default function EnterPinPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const total = searchParams.get("total");
  const requestId = searchParams.get("requestId");
  const bookingId = searchParams.get("bookingId");
  
  const numericTotal = total ? Number(total) : 0;
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const token = useAuthStore((state) => state.token);

  // Focus on PIN input on mount
  useEffect(() => {
    const pinInput = document.getElementById("pin-input");
    if (pinInput) {
      pinInput.focus();
    }
  }, []);

  const handlePay = async () => {
    if (pin.length !== 4) {
      toast.error("Please enter a 4-digit PIN");
      return;
    }

    if (!token) {
      toast.error("Please login to continue");
      router.push("/auth/login?redirect=/book/enter-pin");
      return;
    }

    setLoading(true);
    try {
      const response = await api.post(
        "/bookings/confirm",
        {
          requestId,
          bookingId,
          amount: numericTotal,
          pin,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(
        `Payment of ₦${numericTotal.toLocaleString()} confirmed successfully!`,
        { duration: 4000 }
      );
      
      // Redirect to payment confirmation page
      setTimeout(() => {
        router.push(`/book/confirmation?bookingId=${response.data.bookingId}`);
      }, 1500);
      
    } catch (err: any) {
      console.error("Payment error:", err);
      toast.error(
        err.response?.data?.message || "Payment failed. Please check your PIN and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Allow number keys, backspace, delete, tab, arrow keys
    if (
      !/^\d$/.test(e.key) &&
      e.key !== "Backspace" &&
      e.key !== "Delete" &&
      e.key !== "Tab" &&
      e.key !== "ArrowLeft" &&
      e.key !== "ArrowRight" &&
      e.key !== "ArrowUp" &&
      e.key !== "ArrowDown" &&
      e.key !== "Enter"
    ) {
      e.preventDefault();
    }

    if (e.key === "Enter" && pin.length === 4) {
      handlePay();
    }
  };

  const handlePinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 4);
    setPin(value);
    
    // Auto-submit when 4 digits are entered
    if (value.length === 4) {
      setTimeout(() => handlePay(), 300);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accentBg/30 dark:from-dark-background dark:to-dark-accentBg/30 flex flex-col items-center justify-center p-6 font-poppins">
      {/* Logo/Brand */}
      <div className="mb-8 text-center">
        <div className="text-2xl font-bold text-primary mb-2">
          🍓 Strawberry Fleet
        </div>
        <div className="text-text/70 dark:text-dark-text/70">
          Secure Payment Portal
        </div>
      </div>

      <div className="w-full max-w-md">
        {/* Payment Summary Card */}
        <div className="bg-cardBg dark:bg-dark-cardBg rounded-lg shadow-lg p-6 mb-6 border border-accentBg dark:border-dark-accentBg">
          <h2 className="text-lg font-semibold text-text dark:text-dark-text mb-4">
            Payment Summary
          </h2>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-text/70 dark:text-dark-text/70">Request ID</span>
              <span className="font-medium text-text dark:text-dark-text">
                {requestId || "N/A"}
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-text/70 dark:text-dark-text/70">Booking Reference</span>
              <span className="font-medium text-text dark:text-dark-text">
                {bookingId || "Pending"}
              </span>
            </div>
            
            <div className="pt-3 border-t border-accentBg dark:border-dark-accentBg">
              <div className="flex justify-between items-center">
                <span className="text-text/70 dark:text-dark-text/70">Total Amount</span>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">
                    ₦{numericTotal.toLocaleString()}
                  </div>
                  <div className="text-xs text-text/60 dark:text-dark-text/60 mt-1">
                    Including all taxes and fees
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* PIN Entry Card */}
        <div className="bg-cardBg dark:bg-dark-cardBg rounded-lg shadow-lg p-6 border border-accentBg dark:border-dark-accentBg">
          <h2 className="text-lg font-semibold text-text dark:text-dark-text mb-1">
            Enter Security PIN
          </h2>
          <p className="text-text/70 dark:text-dark-text/70 mb-6">
            Please enter your 4-digit PIN to authorize this payment
          </p>

          {/* PIN Input Container */}
          <div className="mb-8">
            <div className="relative">
              <input
                id="pin-input"
                type="password"
                value={pin}
                onChange={handlePinChange}
                onKeyDown={handleKeyDown}
                maxLength={4}
                className="w-full px-4 py-3 text-2xl text-center font-semibold tracking-[0.5em] bg-accentBg dark:bg-dark-accentBg border border-muted dark:border-dark-muted rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="••••"
                disabled={loading}
                autoComplete="off"
              />
              
              {/* Clear button */}
              {pin.length > 0 && (
                <button
                  onClick={() => setPin("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text/40 dark:text-dark-text/40 hover:text-text dark:hover:text-dark-text transition"
                  type="button"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
            
            {/* PIN length indicator */}
            <div className="mt-3 flex justify-center gap-2">
              {[0, 1, 2, 3].map((index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full ${
                    index < pin.length
                      ? "bg-primary"
                      : "bg-muted dark:bg-dark-muted"
                  }`}
                />
              ))}
            </div>
            
            <p className="text-center text-sm text-text/60 dark:text-dark-text/60 mt-2">
              {pin.length === 0 && "Enter 4 digits"}
              {pin.length > 0 && pin.length < 4 && `${4 - pin.length} digit${4 - pin.length !== 1 ? 's' : ''} remaining`}
              {pin.length === 4 && "PIN complete"}
            </p>
          </div>

          {/* Payment Action */}
          <div className="space-y-4">
            <button
              onClick={handlePay}
              disabled={loading || pin.length !== 4}
              className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
                loading || pin.length !== 4
                  ? "bg-primary/50 cursor-not-allowed text-white"
                  : "bg-primary hover:bg-primary/90 text-white shadow-md hover:shadow-lg active:scale-[0.98]"
              }`}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Processing Payment...
                </div>
              ) : (
                <>Confirm Payment of ₦{numericTotal.toLocaleString()}</>
              )}
            </button>
            
            <div className="flex gap-3">
              <button
                onClick={() => router.back()}
                className="flex-1 py-2.5 px-4 rounded-lg border border-muted dark:border-dark-muted text-text dark:text-dark-text hover:bg-accentBg dark:hover:bg-dark-accentBg transition"
              >
                Go Back
              </button>
              <button
                onClick={() => router.push("/book/unpaid")}
                className="flex-1 py-2.5 px-4 rounded-lg border border-muted dark:border-dark-muted text-text dark:text-dark-text hover:bg-accentBg dark:hover:bg-dark-accentBg transition"
              >
                View All Requests
              </button>
            </div>
          </div>

          {/* Security Information */}
          <div className="mt-8 pt-6 border-t border-accentBg dark:border-dark-accentBg">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 p-1.5 bg-green-100 dark:bg-green-900/30 rounded">
                <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h4 className="text-sm font-medium text-text dark:text-dark-text mb-1">
                  Secure Transaction
                </h4>
                <p className="text-xs text-text/70 dark:text-dark-text/70">
                  Your payment is protected with 256-bit SSL encryption. We never store your PIN.
                  This transaction will be processed by our secure payment gateway.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Help/Support */}
        <div className="mt-6 text-center">
          <p className="text-sm text-text/60 dark:text-dark-text/60">
            Need help?{" "}
            <button
              onClick={() => router.push("/support")}
              className="text-link dark:text-dark-link hover:underline"
            >
              Contact Support
            </button>{" "}
            or call +234 800 123 4567
          </p>
          
          {/* Demo mode notice */}
          {process.env.NODE_ENV === "development" && (
            <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
              <p className="text-xs text-amber-800 dark:text-amber-300">
                <span className="font-semibold">Demo Mode:</span> For testing, use PIN "1234"
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 pt-6 border-t border-accentBg dark:border-dark-accentBg w-full max-w-md text-center">
        <div className="flex justify-center items-center gap-6 text-xs text-text/50 dark:text-dark-text/50 mb-2">
          <span>Privacy Policy</span>
          <span>•</span>
          <span>Terms of Service</span>
          <span>•</span>
          <span>Refund Policy</span>
        </div>
        <p className="text-xs text-text/40 dark:text-dark-text/40">
          © {new Date().getFullYear()} Strawberry Fleet. All rights reserved.
        </p>
      </div>
    </div>
  );
}