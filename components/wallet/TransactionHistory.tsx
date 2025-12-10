// components/wallet/TransactionHistory.tsx

export default function TransactionHistory({ transactions }: { transactions: any[] }) {
  return (
    <div className="mt-8">
      <h2 className="font-semibold text-lg mb-3 text-text dark:text-dark-text">
        Recent Transactions
      </h2>

      {transactions.map((tx, i) => (
        <div
          key={i}
          className="bg-accentBg dark:bg-dark-accentBg p-4 rounded-xl shadow-sm mb-3 flex justify-between items-center"
        >
          <div>
            <p className="font-medium text-text dark:text-dark-text">{tx.title}</p>
            <p className="text-muted dark:text-dark-muted text-sm">{tx.date}</p>
          </div>

          <p
            className={`font-semibold ${
              tx.type === "credit" ? "text-link" : "text-primary"
            }`}
          >
            {tx.amount}
          </p>
        </div>
      ))}
    </div>
  );
}
