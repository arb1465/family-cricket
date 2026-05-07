import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { getMatch } from "../api/matchApi";
import { getPayments, addPayment } from "../api/paymentApi";

import MatchSummary from "../components/match/MatchSummary";
import PaymentForm from "../components/payment/PaymentForm";
import Modal from "../components/common/Modal";

const MatchDetail = () => {
  const { id } = useParams();
  
  const navigate = useNavigate(); // 🔥 NEW
  const [matchData, setMatchData] = useState(null);
  const [overs, setOvers] = useState([]);
  const [payments, setPayments] = useState([]);
  const [showPayment, setShowPayment] = useState(false);

  // 🔁 reusable refresh function
  const refreshData = async () => {
    try {
      const [matchRes, payRes] = await Promise.all([
        getMatch(id),
        getPayments(id),
      ]);

      setMatchData(matchRes.data.match);
      setOvers(matchRes.data.overs);
      setPayments(payRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ effect-safe version (no warning)
  useEffect(() => {
    let ignore = false;

    (async () => {
      try {
        const [matchRes, payRes] = await Promise.all([
          getMatch(id),
          getPayments(id),
        ]);

        if (ignore) return;

        setMatchData(matchRes.data.match);
        setOvers(matchRes.data.overs);
        setPayments(payRes.data);
      } catch (err) {
        console.error(err);
      }
    })();

    return () => {
      ignore = true;
    };
  }, [id]);

  // ✅ use refresh function elsewhere
  const handlePayment = async (data) => {
    try {
      await addPayment(id, data);
      setShowPayment(false);
      refreshData(); // safe reuse
    } catch (err) {
      console.error(err);
      alert("Failed ❌");
    }
  };

  if (!matchData) return <div>Loading...</div>;
  return (
    <div className="p-3 max-w-md mx-auto space-y-3">

      {/* 💰 Button */}
      <button
        onClick={() => setShowPayment(true)}
        className="w-full bg-green-600 text-white p-2 rounded"
      >
        Add Payment
      </button>

      {/* 🧾 Summary */}
      <MatchSummary
        match={matchData}
        overs={overs}
        payments={payments}
      />
      
      <button
        onClick={() => navigate("/")}
        className="w-full bg-red-600 text-white p-2 rounded"
      >
        Back
      </button>

      {/* Modal */}
      <Modal isOpen={showPayment}>
        <PaymentForm
          onSubmit={handlePayment}
          players={[
            ...matchData.teams[0].players,
            ...matchData.teams[1].players,
          ]}
        />
        <button
          onClick={() => setShowPayment(false)}
          className="mt-2 text-red-500"
        >
          Close
        </button>
      </Modal>
    </div>
  );
};

export default MatchDetail;