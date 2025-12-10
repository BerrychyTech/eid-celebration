// app/wallet/page.tsx

import WalletBalanceCard from "@/components/wallet/WalletBalanceCard";
import FundingAccountCard from "@/components/wallet/FundingAccountCard";
import WalletNotice from "@/components/wallet/WalletNotice";
import QuickActions from "@/components/wallet/QuickActions";
import TransactionHistory from "@/components/wallet/TransactionHistory";
import Header from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function WalletPage() {
  const balance = 12450.89;

  const transactions = [
    {
      title: "Wallet Funding – Moniepoint",
      date: "Today • 11:42 AM",
      amount: "+₦10,000",
      type: "credit",
    },
    {
      title: "Ride Payment",
      date: "Today • 3:14 PM",
      amount: "-₦1,200",
      type: "debit",
    },
  ];

  return (
    <section className="px-5 py-8">
      <Header/>  
      <WalletBalanceCard balance={balance} />

      <FundingAccountCard
        accountNumber="1234567890"
        accountName="BerryGo – John Doe"
      />

      <WalletNotice />

      <QuickActions />

      <TransactionHistory transactions={transactions} />
      <Footer/>
    </section>
  );
}
