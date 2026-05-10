import { useState } from "react";
import Button from "../common/Button";

const PaymentForm = ({ players, onSubmit }) => {
  const [playerId, setPlayerId] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentDate, setPaymentDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  return (
    <div className="bg-white p-3 rounded-xl shadow">
      <select
        onChange={(e) => setPlayerId(e.target.value)}
        className="w-full mb-2 p-2 border rounded"
      >
        <option>Select Player</option>
        {players.map((p) => (
          <option key={p._id} value={p._id}>
            {p.name}
          </option>
        ))}
      </select>

      <input
        type="number"
        placeholder="Amount"
        className="w-full mb-2 p-2 border rounded"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <input
        type="date"
        value={paymentDate}
        onChange={(e) => setPaymentDate(e.target.value)}
        className="w-full border p-2 rounded mb-2"
      />

      <Button onClick={() => 
        onSubmit({
          playerId,
          amount,
          paymentDate,
        })
      }>
        Add Payment
      </Button>
    </div>
  );
};

export default PaymentForm;