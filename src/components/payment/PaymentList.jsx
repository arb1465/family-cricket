const PaymentList = ({ payments, players }) => {
  const getName = (id) =>
    players.find((p) => p._id === id)?.name || "Unknown";

  const total = payments.reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="bg-white p-3 rounded-xl shadow mt-3">
      {payments.map((p, i) => (
        <div key={i} className="flex justify-between text-sm mb-1">
          <span>{getName(p.playerId)}</span>
          <span>₹{p.amount}</span>
        </div>
      ))}

      <div className="mt-2 font-semibold text-right">
        Total: ₹{total}
      </div>
    </div>
  );
};

export default PaymentList;