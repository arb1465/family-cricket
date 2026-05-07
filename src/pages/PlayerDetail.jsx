import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getPlayer } from "../api/playerApi";
import PlayerStats from "../components/player/PlayerStats";

const PlayerDetail = () => {
  const { id } = useParams();

  const [player, setPlayer] = useState(null);

  useEffect(() => {
    const fetchPlayer = async () => {
      try {
        const res = await getPlayer(id);
        setPlayer(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPlayer();
  }, [id]);

  const getImageUrl = (url) => {
    if (!url) {
      return "https://via.placeholder.com/120";
    }

    if (url.includes("drive.google.com")) {
      const match = url.match(/\/d\/(.*?)\//);

      if (match && match[1]) {
        return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w1000`;
      }
    }

    return url;
  };

  if (!player)
    return <div className="p-4">Loading...</div>;

  return (
    <div className="p-3 max-w-md mx-auto space-y-4">

      {/* 👤 Profile */}
      <div className="bg-white rounded-xl shadow p-4 text-center">

        <img
          src={getImageUrl(player.photoUrl)}
          alt={player.name}
          className="w-28 h-28 rounded-full mx-auto object-cover border-4 border-blue-500"
        />

        <h2 className="text-2xl font-bold mt-3">
          {player.name}
        </h2>

        {player.role && (
          <p className="text-gray-500 mt-1">
            {player.role}
          </p>
        )}
      </div>

      {/* 📊 Stats */}
      <PlayerStats player={player} />

      {/* 💰 Payments */}
      <div className="bg-white rounded-xl shadow p-4">
        <h3 className="text-lg font-semibold mb-3">
          Payment History
        </h3>

        {player.payments?.length > 0 ? (
          <div className="space-y-2">
            {player.payments.map((pay) => (
              <div
                key={pay._id}
                className="flex justify-between items-center bg-gray-100 p-2 rounded"
              >
                <div>
                  <p className="font-medium">
                    ₹ {pay.amount}
                  </p>

                  <p className="text-xs text-gray-500">
                    {pay.matchId?.date
                      ? new Date(
                          pay.matchId.date
                        ).toLocaleDateString()
                      : "Match"}
                  </p>
                </div>

                <span className="text-green-600 font-semibold">
                  Paid
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm">
            No payments yet
          </p>
        )}
      </div>
    </div>
  );
};

export default PlayerDetail;