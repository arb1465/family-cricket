
import { useNavigate } from "react-router-dom";

const PlayerCard = ({ player }) => {
  const navigate = useNavigate();
  
  return (
    <div
      onClick={() => navigate(`/player/${player._id}`)}
      className="bg-white p-3 rounded shadow cursor-pointer hover:bg-gray-100"
    >
      <p className="font-semibold">{player.name}</p>
    </div>
  );  
};
export default PlayerCard;