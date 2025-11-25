"use client";

import { useEffect, useState } from "react";
import { FaCar, FaMapMarkerAlt } from "react-icons/fa";

export default function MockMovingMap() {
  const [pos, setPos] = useState({ x: 10, y: 80 });

  useEffect(() => {
    const interval = setInterval(() => {
      setPos((prev) => {
        const target = { x: 80, y: 20 };
        const speed = 1.0;

        return {
          x:
            Math.abs(prev.x - target.x) < 1
              ? target.x
              : prev.x + (target.x > prev.x ? speed : -speed),

          y:
            Math.abs(prev.y - target.y) < 1
              ? target.y
              : prev.y + (target.y > prev.y ? speed : -speed),
        };
      });
    }, 120);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-48 rounded-md overflow-hidden bg-accentBg dark:bg-dark-accentBg border border-muted dark:border-dark-muted mt-3 font-poppins">

      {/* Fake background */}
      <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,#d1d5db,#d1d5db_10px,#e5e7eb_10px,#e5e7eb_20px)] dark:bg-[repeating-linear-gradient(0deg,#374151,#374151_10px,#1f2937_10px,#1f2937_20px)]" />

      {/* --------------------- DRIVER ICON --------------------- */}
      <FaCar
        className="absolute text-primary dark:text-dark-primary drop-shadow-md"
        size={22}
        style={{
          left: `${pos.x}%`,
          top: `${pos.y}%`,
          transform: "translate(-50%, -50%) rotate(90deg)", // rotate to face upward
        }}
      />

      {/* Driver label */}
      <span
        className="absolute text-xs font-semibold text-primary dark:text-dark-primary"
        style={{
          left: `${pos.x}%`,
          top: `${pos.y}%`,
          transform: "translate(-50%, -160%)",
        }}
      >
        Driver
      </span>

      {/* --------------------- PICKUP LOCATION ICON --------------------- */}
      <FaMapMarkerAlt
        className="absolute text-green-600 dark:text-green-400 drop-shadow-md"
        size={22}
        style={{
          left: "80%",
          top: "20%",
          transform: "translate(-50%, -90%)",
        }}
      />

      {/* Pickup label */}
      <span
        className="absolute text-xs font-semibold text-green-600 dark:text-green-400"
        style={{
          left: "80%",
          top: "20%",
          transform: "translate(-50%, -200%)",
        }}
      >
        Pickup
      </span>
    </div>
  );
}
