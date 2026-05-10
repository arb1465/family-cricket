import { useEffect, useState } from "react";
import MatchCard from "../components/match/MatchCard";
import Button from "../components/common/Button";
import Modal from "../components/common/Modal";
import AddPlayerForm from "../components/player/AddPlayerForm";
import { getPlayers } from "../api/playerApi";
import PlayerCard from "../components/player/PlayerCard"

import { getMatches } from "../api/matchApi";
import { getPaymentsByDate } from "../api/paymentApi";
import { createPlayer } from "../api/playerApi";

import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [matches, setMatches] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showPlayers, setShowPlayers] = useState(false);
  const [players, setPlayers] = useState([]);
  const [addingPlayer, setAddingPlayer] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [payments, setPayments] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      const res = await getMatches();
      setMatches(res.data);
    };
    load();
  }, []);

  const fetchPayments = async () => {
    try {
      const res = await getPaymentsByDate(
        selectedDate
      );

      setPayments(res.data);

    } catch (err) {
      console.error(err);
    }
  };


  const fetchPlayers = async () => {
    try {
      const res = await getPlayers();
      setPlayers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleTogglePlayers = async () => {
    if (!showPlayers) {
      await fetchPlayers();
    }
    setShowPlayers(!showPlayers);
  };

  const handleAddPlayer = async (data) => {
    try {
      setAddingPlayer(true);

      const res = await createPlayer(data);

      setPlayers((prev) => [res.data, ...prev]);

      setShowPlayers(true);

    }
    catch (err) {
      console.error(err);
      alert("Failed to add player");
    }
    finally {
      setAddingPlayer(false);
    }
  };
  
  return (
    <div className="p-3 max-w-md mx-auto space-y-4">

      {/* 🔥 Top Action Buttons */}
      <div className="grid grid-cols-3 gap-2">

        <Button
          onClick={() => navigate("/create")}
          className="bg-blue-600 text-white p-2 rounded-xl"
        >
          Match
        </Button>

        <Button
          onClick={() => setShowModal(true)}
          className="bg-green-600 text-white p-2 rounded-xl"
        >
          Player
        </Button>

        <Button
          onClick={handleTogglePlayers}
          className="bg-gray-700 text-white p-2 rounded-xl"
        >
          {showPlayers ? "Hide" : "Players"}
        </Button>
      </div>

      {/* 💰 PAYMENT SECTION */}
      <div className="bg-white rounded-2xl shadow p-4">

        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold">
            Payments
          </h2>

          <div className="text-sm text-gray-500">
            {payments.length} Entries
          </div>
        </div>

        {/* Date + Button */}
        <div className="flex gap-2 mb-4">

          <input
            type="date"
            value={selectedDate}
            onChange={(e) =>
              setSelectedDate(e.target.value)
            }
            className="flex-1 border p-2 rounded-xl"
          />

          <button
            onClick={fetchPayments}
            className="bg-blue-600 text-white px-4 rounded-xl"
          >
            View
          </button>
        </div>

        {/* Payments */}
        {payments.length === 0 ? (
          <div className="text-center text-gray-500 text-sm py-3">
            No payments found
          </div>
        ) : (
          <>
            <div className="space-y-2 max-h-64 overflow-y-auto">

              {payments.map((p) => (
                <div
                  key={p._id}
                  className="flex items-center justify-between bg-gray-100 p-3 rounded-xl"
                >

                  {/* Left */}
                  <div className="flex items-center gap-3">

                    <img
                      src={
                        p.playerId?.photoUrl ||
                        "https://via.placeholder.com/40"
                      }
                      alt={p.playerId?.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />

                    <div>
                      <p className="font-semibold text-sm">
                        {p.playerId?.name}
                      </p>

                      {p.note && (
                        <p className="text-xs text-gray-500">
                          {p.note}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Right */}
                  <div className="text-right">
                    <p className="font-bold text-green-600">
                      ₹ {p.amount}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="mt-4 border-t pt-3 flex justify-between items-center">

              <span className="font-semibold">
                Total Collection
              </span>

              <span className="text-xl font-bold text-green-600">
                ₹{" "}
                {payments.reduce(
                  (sum, p) => sum + p.amount,
                  0
                )}
              </span>
            </div>
          </>
        )}
      </div>

      {/* 👥 Players */}
      {showPlayers && (
        <div className="space-y-2">
          {players.length === 0 ? (
            <p className="text-center text-gray-500">
              No players found
            </p>
          ) : (
            players.map((player) => (
              <PlayerCard
                key={player._id}
                player={player}
              />
            ))
          )}
        </div>
      )}

      {/* 🏏 Match List */}
      <div>
        <h2 className="text-lg font-bold mb-2">
          Matches
        </h2>

        {matches.length === 0 ? (
          <p className="text-center text-gray-500">
            No matches yet
          </p>
        ) : (
          <div className="space-y-2">
            {matches.map((m) => (
              <MatchCard
                key={m._id}
                match={m}
                onClick={() =>
                  navigate(`/match/${m._id}`)
                }
              />
            ))}
          </div>
        )}
      </div>

      {/* ➕ Add Player Modal */}
      <Modal isOpen={showModal}>
        <AddPlayerForm
          onAdd={handleAddPlayer}
          loading={addingPlayer}
        />

        <button
          onClick={() => setShowModal(false)}
          className="mt-2 w-full text-sm text-red-500"
        >
          Close
        </button>
      </Modal>
    </div>
  );
};

export default Dashboard;