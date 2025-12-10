// components/wallet/WalletNotice.tsx

export default function WalletNotice() {
  return (
    <div className="bg-accentBg dark:bg-dark-accentBg text-muted dark:text-dark-muted text-xs p-4 rounded-xl mt-6">
      <p>
        ⚠️ Wallet funds cannot be withdrawn or transferred.  
        They can only be used for purchases and payments within BerryGo.
      </p>
    </div>
  );
}
