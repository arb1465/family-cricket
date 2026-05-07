import MatchForm from "../components/match/MatchForm";
import { useNavigate } from "react-router-dom";
import { createMatch } from "../api/matchApi";
import { useEffect, useState } from "react";
import { getPlayers } from "../api/playerApi";

const CreateMatch = () => {
  const [players, setPlayers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getPlayers().then((res) => setPlayers(res.data));
  }, []);

  const handleCreate = async (data) => {
    try {
      const res = await createMatch(data);
      navigate(`/match/${res.data._id}/live`);
    } catch (err) {
      console.error(err);
      alert("Failed to create match");
    }
  };

  return (
    <div className="p-3 max-w-md mx-auto">
      <MatchForm players={players} onCreate={handleCreate} />
    </div>
  );
};

export default CreateMatch;