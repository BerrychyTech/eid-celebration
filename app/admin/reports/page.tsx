"use client";

import { useState } from "react";
import {
  mockRideReports,
  mockDeliveryReports,
  mockWalletReports,
  mockComplaintsReports,
} from "@/mock/mockReports";

export default function ReportDashboard() {
  const [selectedTab, setSelectedTab] = useState<"rides" | "deliveries" | "wallet" | "complaints">("rides");

  const renderTable = () => {
    switch (selectedTab) {
      case "rides":
        return (
          <ReportTable
            title="Ride Reports"
            columns={["Date", "Total Rides", "Completed", "Cancelled"]}
            data={mockRideReports.map(r => [r.date, r.rides, r.completed, r.cancelled])}
          />
        );
      case "deliveries":
        return (
          <ReportTable
            title="Delivery Reports"
            columns={["Date", "Total Deliveries", "Delivered", "Failed"]}
            data={mockDeliveryReports.map(r => [r.date, r.deliveries, r.delivered, r.failed])}
          />
        );
      case "wallet":
        return (
          <ReportTable
            title="Wallet Transactions"
            columns={["Date", "Total Top-Ups (₦)", "Total Withdrawals (₦)"]}
            data={mockWalletReports.map(r => [r.date, r.totalTopUps.toLocaleString(), r.totalWithdrawals.toLocaleString()])}
          />
        );
      case "complaints":
        return (
          <ReportTable
            title="Complaints Reports"
            columns={["Date", "Passenger Complaints", "Driver Complaints"]}
            data={mockComplaintsReports.map(r => [r.date, r.passengerComplaints, r.driverComplaints])}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-[#FD5C63]">Reports Dashboard</h1>

      {/* Tabs */}
      <div className="flex gap-3">
        {["rides", "deliveries", "wallet", "complaints"].map(tab => (
          <button
            key={tab}
            className={`px-4 py-2 rounded-xl font-medium ${
              selectedTab === tab ? "bg-[#FD5C63] text-white" : "bg-gray-100 text-gray-700"
            }`}
            onClick={() => setSelectedTab(tab as any)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Table */}
      <div>{renderTable()}</div>
    </div>
  );
}

/* ----------------- Report Table Component ----------------- */
function ReportTable({ title, columns, data }: { title: string; columns: string[]; data: any[][] }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-[#FFEDE9] shadow">
      <h2 className="text-lg font-semibold text-neutral-700 mb-4">{title}</h2>
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-gray-100">
            {columns.map(col => (
              <th key={col} className="py-2 px-3 text-left">{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx} className="border-b hover:bg-gray-50">
              {row.map((cell, i) => (
                <td key={i} className="py-2 px-3">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
