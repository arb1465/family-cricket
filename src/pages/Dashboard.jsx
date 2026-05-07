import { useEffect, useState } from "react";
import MatchCard from "../components/match/MatchCard";
import Button from "../components/common/Button";
import Modal from "../components/common/Modal";
import AddPlayerForm from "../components/player/AddPlayerForm";
import { getPlayers } from "../api/playerApi";
import PlayerCard from "../components/player/PlayerCard"

import { getMatches } from "../api/matchApi";
import { createPlayer } from "../api/playerApi";

import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [matches, setMatches] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showPlayers, setShowPlayers] = useState(false);
  const [players, setPlayers] = useState([]);
  const [addingPlayer, setAddingPlayer] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      const res = await getMatches();
      setMatches(res.data);
    };
    load();
  }, []);


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
    <div className="p-3 max-w-md mx-auto">

      {/* Top Buttons */}
      <div className="flex flex-col gap-2 mb-3">
        <Button onClick={() => navigate("/create")}
          className="flex-1 bg-blue-600 text-white p-2 rounded">
          Create Match
        </Button>

        <Button
          className="flex-1 bg-green-600 text-white p-2 rounded"
          onClick={() => setShowModal(true)}
        >
          Add Player
        </Button>


        <button
          onClick={handleTogglePlayers}
          className="flex-1 bg-gray-600 text-white p-2 rounded-lg"
        >
          {showPlayers ? "Hide Players" : "View Players"}
        </button>
      </div>

      {showPlayers && (
        <div className="mt-4 space-y-2">
          {players.length === 0 ? (
            <p className="text-center text-gray-500">
              No players found
            </p>
          ) : (
            players.map((player) => (
              <PlayerCard key={player._id} player={player} />
            ))
          )}
        </div>
      )}

      {/* Match List */}
      <div className="mt-2">
        {matches.length === 0 ? (
          <p className="text-center text-gray-500">
            No matches yet
          </p>
        ) : (
          matches.map((m) => (
            <MatchCard
              key={m._id}
              match={m}
              onClick={() => navigate(`/match/${m._id}`)}
            />
          ))
        )}
      </div>

      {/* Modal */}
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