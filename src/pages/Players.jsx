import { useEffect, useState } from "react";
import { getPlayers, createPlayer } from "../api/playerApi";
import PlayerCard from "../components/player/PlayerCard";
import AddPlayerForm from "../components/player/AddPlayerForm";
import Loader from "../components/common/Loader";

const Players = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPlayers = async () => {
    try {
      setLoading(true);
      const res = await getPlayers();
      setPlayers(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load players");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const load = async () => {
      const res = await getPlayers();
      setPlayers(res.data);
    };
    load();
  }, []);

  const handleAddPlayer = async (data) => {
    try {
      await createPlayer(data);
      fetchPlayers(); // refresh list
    } catch (err) {
      console.error(err);
      alert("Failed to add player");
    }
  };

  return (
    <div className="p-3 max-w-md mx-auto">
      <AddPlayerForm onAdd={handleAddPlayer} />

      {loading ? (
        <Loader />
      ) : (
        <div className="space-y-2">
          {players.length === 0 ? (
            <p className="text-center text-gray-500">
              No players yet
            </p>
          ) : (
            players.map((p) => (
              <PlayerCard key={p._id} player={p} />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Players;