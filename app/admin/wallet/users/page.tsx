"use client";

import { useState } from "react";
import { mockUsers, User } from "@/mock/mockUsers";

export default function UserWalletManagement() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [adjustAmount, setAdjustAmount] = useState<number>(0);

  const handleAdjustBalance = () => {
    if (!selectedUser) return;

    setUsers(prev =>
      prev.map(u =>
        u.id === selectedUser.id
          ? { ...u, walletBalance: u.walletBalance + adjustAmount }
          : u
      )
    );
    setAdjustAmount(0);
  };

  const handleToggleFreeze = (userId: string) => {
    setUsers(prev =>
      prev.map(u =>
        u.id === userId
          ? { ...u, status: u.status === "frozen" ? "active" : "frozen" }
          : u
      )
    );
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-[#FD5C63]">User Wallet Management</h1>

      <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
        <thead className="bg-gray-50">
          <tr>
            <th className="py-2 px-4 text-left">User</th>
            <th className="py-2 px-4 text-left">Wallet Balance (₦)</th>
            <th className="py-2 px-4 text-left">Status</th>
            <th className="py-2 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} className="border-b hover:bg-gray-50">
              <td className="py-2 px-4">{user.name}</td>
              <td className="py-2 px-4">₦{user.walletBalance.toLocaleString()}</td>
              <td className="py-2 px-4">
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    user.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}
                >
                  {user.status}
                </span>
              </td>
              <td className="py-2 px-4 space-x-2">
                <button
                  className="px-3 py-1 bg-blue-600 text-white rounded-xl text-sm"
                  onClick={() => setSelectedUser(user)}
                >
                  Adjust Balance
                </button>
                <button
                  className="px-3 py-1 bg-red-600 text-white rounded-xl text-sm"
                  onClick={() => handleToggleFreeze(user.id)}
                >
                  {user.status === "frozen" ? "Unfreeze" : "Freeze"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ADJUST BALANCE MODAL */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[500] p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md border border-[#FFEDE9] space-y-4">
            <h2 className="text-lg font-semibold">Adjust Wallet for {selectedUser.name}</h2>

            <div className="flex flex-col space-y-2">
              <label>Amount (+/-)</label>
              <input
                type="number"
                value={adjustAmount}
                onChange={e => setAdjustAmount(Number(e.target.value))}
                className="border px-3 py-2 rounded-xl w-full"
              />
            </div>

            <div className="flex justify-end space-x-2 mt-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded-xl"
                onClick={() => setSelectedUser(null)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-[#FD5C63] text-white rounded-xl"
                onClick={handleAdjustBalance}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
