import { Booking } from "@/types/mybookings";
import React from "react"; // make sure React is imported

interface StatusBadgeProps {
  status: Booking["status"];
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const base = "text-xs px-2 py-1 rounded font-medium";

  const styles: Record<Booking["status"], string> = {
    confirmed: "bg-primary text-success dark:bg-dark-primary dark:text-dark-success",
    completed: "bg-primary text-info dark:bg-dark-primary dark:text-dark-info",
    cancelled: "bg-red-900 text-danger dark:bg-dark-dangerBg dark:text-dark-danger",
  };

  return <span className={`${base} ${styles[status]}`}>{status}</span>;
};
