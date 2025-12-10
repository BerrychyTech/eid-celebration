// components/wallet/FundingAccountCard.tsx
"use client";

import { Copy, Share2 } from "lucide-react";

export default function FundingAccountCard({
  accountNumber,
  accountName,
}: {
  accountNumber: string;
  accountName: string;
}) {
  const shareDetails = () => {
    const text = `BerryGo Wallet Funding:\nBank: Moniepoint MFB\nAccount Name: ${accountName}\nAccount Number: ${accountNumber}`;
    navigator.share?.({ text });
  };

  return (
    <div className="bg-cardBg dark:bg-dark-cardBg p-5 rounded-2xl mt-6 shadow-sm">
      <h2 className="font-semibold text-lg mb-1 text-text dark:text-dark-text">
        Your Moniepoint Funding Account
      </h2>

      <p className="text-muted dark:text-dark-muted text-sm mb-4">
        Transfer here anytime to fund your wallet.
      </p>

      <div className="space-y-1 text-text dark:text-dark-text">
        <p><strong>Bank:</strong> Moniepoint MFB</p>
        <p><strong>Account Name:</strong> {accountName}</p>
        <p><strong>Account Number:</strong> {accountNumber}</p>
      </div>

      <div className="flex gap-3 mt-5">
        <button
          className="flex-1 flex items-center justify-center gap-2 bg-accentBg dark:bg-dark-accentBg rounded-xl py-2"
          onClick={() => navigator.clipboard.writeText(accountNumber)}
        >
          <Copy size={16} /> Copy
        </button>

        <button
          className="flex-1 flex items-center justify-center gap-2 bg-accentBg dark:bg-dark-accentBg rounded-xl py-2"
          onClick={shareDetails}
        >
          <Share2 size={16} /> Share
        </button>
      </div>
    </div>
  );
}
