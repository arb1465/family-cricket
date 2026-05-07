import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import ScoreBoard from "../components/scoreboard/ScoreBoard";
import MatchHeader from "../components/scoreboard/MatchHeader";
import OverHistory from "../components/scoreboard/OverHistory";
import BowlerSelector from "../components/scoring/BowlerSelector";
import OverInput from "../components/scoring/OverInput";

import useMatch from "../hooks/useMatch";
import usePolling from "../hooks/usePolling";

import { addOver } from "../api/scoringApi";
const LiveMatch = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // 🔥 NEW

  const { match: matchData, overs, fetchMatch } = useMatch(id);

  const [currentBowler, setCurrentBowler] = useState(null);

  usePolling(fetchMatch, 2000);

  useEffect(() => {
    fetchMatch();
  }, []);

  // 🔥 AUTO REDIRECT WHEN MATCH COMPLETES
  useEffect(() => {
    if (matchData?.status === "completed") {
      setTimeout(() => {
        navigate(`/match/${id}`); // ✅ go to summary page
      }, 1000);
    }
  }, [matchData]);


  const handleSaveOver = async (balls) => {
    if (!currentBowler) {
      alert("Select bowler first");
      return;
    }

    try {
      await addOver(id, {
        bowlerId: currentBowler._id,
        balls,
      });

      setCurrentBowler(null);
      fetchMatch();
    } catch (err) {
      console.error(err);
      alert("Failed to save over");
    }
  };

  if (!matchData) return <div className="p-4">Loading...</div>;

  const bowlingTeamIndex =
    matchData.currentInnings === 1 ? 1 : 0;

  return (
    <div className="p-3 max-w-md mx-auto space-y-3">

      <MatchHeader match={matchData} />
      <ScoreBoard match={matchData} />

      {/* 🏏 LIVE MATCH ONLY */}
      {!currentBowler && (
        <BowlerSelector
          players={matchData.teams[bowlingTeamIndex].players}
          onSelect={(id) => {
            const player = matchData.teams[bowlingTeamIndex].players.find(
              (p) => p._id === id
            );
            setCurrentBowler(player);
          }}
        />
      )}

      {currentBowler && (
        <div className="bg-blue-100 p-2 rounded text-center font-semibold">
          🎯 Current Bowler: {currentBowler.name}
        </div>
      )}

      {currentBowler && (
        <OverInput onSave={handleSaveOver} />
      )}

      {/* Overs */}
      {overs && overs.length > 0 && (
        <OverHistory overs={overs} />
      )}

    </div>
  );
};

export default LiveMatch;