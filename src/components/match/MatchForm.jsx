import { useState } from "react";
import Button from "../common/Button";
import { useNavigate } from "react-router-dom";

const MatchForm = ({ players, onCreate }) => {
  const navi =  useNavigate()
  const [teamA, setTeamA] = useState("");
  const [teamB, setTeamB] = useState("");
  const [formatOvers, setFormatOvers] = useState(10);

  const [teamAPlayers, setTeamAPlayers] = useState([]);
  const [teamBPlayers, setTeamBPlayers] = useState([]);

  const togglePlayer = (id, team) => {
    if (team === "A") {
      if (teamBPlayers.includes(id)) return;

      setTeamAPlayers((prev) =>
        prev.includes(id)
          ? prev.filter((p) => p !== id)
          : [...prev, id]
      );
    } else {
      if (teamAPlayers.includes(id)) return;

      setTeamBPlayers((prev) =>
        prev.includes(id)
          ? prev.filter((p) => p !== id)
          : [...prev, id]
      );
    }
  };

  const handleSubmit = () => {
    if (!teamA || !teamB) {
      alert("Enter team names");
      return;
    }

    if (teamAPlayers.length === 0 || teamBPlayers.length === 0) {
      alert("Select players for both teams");
      return;
    }

    onCreate({
      teamA,
      teamB,
      teamAPlayers,
      teamBPlayers,
      formatOvers,
    });
  };

  return (
    <div className="p-3 bg-white rounded-xl shadow">
      {/* Team Names */}
      <input
        placeholder="Team A Name"
        className="w-full mb-2 p-2 border rounded"
        onChange={(e) => setTeamA(e.target.value)}
      />

      <input
        placeholder="Team B Name"
        className="w-full mb-2 p-2 border rounded"
        onChange={(e) => setTeamB(e.target.value)}
      />

      {/* Overs */}
      <input
        type="number"
        placeholder="Overs"
        className="w-full mb-3 p-2 border rounded"
        value={formatOvers}
        onChange={(e) => setFormatOvers(Number(e.target.value))}
      />

      {/* Players */}
      <div className="grid grid-cols-2 gap-3">
        {/* Team A */}
        <div>
          <h3 className="font-semibold mb-2 text-center">Team A</h3>
          {players.map((p) => (
            <label key={p._id} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={teamAPlayers.includes(p._id)}
                onChange={() => togglePlayer(p._id, "A")}
              />
              {p.name}
            </label>
          ))}
        </div>

        {/* Team B */}
        <div>
          <h3 className="font-semibold mb-2 text-center">Team B</h3>
          {players.map((p) => (
            <label key={p._id} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={teamBPlayers.includes(p._id)}
                onChange={() => togglePlayer(p._id, "B")}
              />
              {p.name}
            </label>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <Button onClick={handleSubmit}>Start Match</Button>

        
        <Button
          onClick={() => {navi("/")}}
          className=" bg-gray-600 text-white p-2 rounded-lg mt-2"
        >
          Back
        </Button>
      </div>

      
    </div>
  );
};

export default MatchForm;