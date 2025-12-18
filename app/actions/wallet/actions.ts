import { mockUsers } from "@/mock/mockUsers";
import { mockTransactions } from "@/mock/mockTransactions";

export async function getWalletAnalytics() {
  const totalWalletBalance = mockUsers.reduce((acc, u) => acc + u.walletBalance, 0);

  // Mock weekly transactions
  const weeklyTransactions = [12000, 15000, 18000, 14000];

  const topUsers = [...mockUsers].sort((a,b)=>b.walletBalance - a.walletBalance).slice(0,3);

  return {
    totalWalletBalance,
    weeklyTransactions,
    topUsers
  };
}
