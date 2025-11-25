"use client";

import React, { useEffect, useRef, useState } from "react";
import { FaCar, FaMapMarkerAlt } from "react-icons/fa";

/**
 * MapPreview is a mock visual - not a real map.
 * When you integrate a real map (Google/Mapbox), replace this component
 * and feed real coordinates / marker positions.
 */
export default function MapPreview({
  pickupLabel = "Pickup",
}: { pickupLabel?: string }) {
  // marker position as percentage coordinates inside the box
  const [carPos, setCarPos] = useState({ x: 5, y: 80 }); // start bottom-left
  const [tick, setTick] = useState(0);
  const animRef = useRef<number | null>(null);

  // simple path that moves the car toward the pickup at (80,20)
  useEffect(() => {
    const dest = { x: 80, y: 20 };
    animRef.current = window.setInterval(() => {
      setCarPos((p) => {
        const dx = (dest.x - p.x) * 0.05;
        const dy = (dest.y - p.y) * 0.05;
        const nx = Math.abs(dx) < 0.2 ? dest.x : p.x + dx;
        const ny = Math.abs(dy) < 0.2 ? dest.y : p.y + dy;
        return { x: nx, y: ny };
      });
      setTick((t) => t + 1);
    }, 150);

    return () => {
      if (animRef.current) window.clearInterval(animRef.current);
    };
  }, []);

  return (
    <div className="bg-cardBg dark:bg-dark-cardBg rounded-lg overflow-hidden shadow p-3">
      <div className="text-sm text-muted dark:text-dark-muted mb-2">Map (mock)</div>

      <div className="relative w-full h-56 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 rounded-lg overflow-hidden border border-muted dark:border-dark-muted">
        {/* pickup marker */}
        <div
          style={{ left: `${80}%`, top: `${20}%` }}
          className="absolute transform -translate-x-1/2 -translate-y-1/2"
          title={pickupLabel}
        >
          <div className="flex flex-col items-center">
            <div className="text-red-600 dark:text-red-400">
              <FaMapMarkerAlt className="w-6 h-6" />
            </div>
            <div className="text-xs text-muted dark:text-dark-muted">{pickupLabel}</div>
          </div>
        </div>

        {/* car marker */}
        <div
          style={{
            left: `${carPos.x}%`,
            top: `${carPos.y}%`,
            transition: "left 150ms linear, top 150ms linear",
          }}
          className="absolute transform -translate-x-1/2 -translate-y-1/2"
        >
          <div className="flex flex-col items-center">
            <div className="bg-primary text-white p-2 rounded-full shadow">
              <FaCar className="w-4 h-4" />
            </div>
            <div className="text-xs text-muted dark:text-dark-muted">Driver</div>
          </div>
        </div>
      </div>

      <div className="mt-3 text-xs text-muted dark:text-dark-muted">
        ETA: {Math.max(1, Math.round((100 - (carPos.x + (100 - carPos.y)) / 2) / 10))} mins (mock)
      </div>
    </div>
  );
}
