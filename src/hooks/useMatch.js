import { useState } from "react";
import { getMatch } from "../api/matchApi";

const useMatch = (matchId) => {
  const [match, setMatch] = useState(null);
  const [overs, setOvers] = useState([]);
  const fetchMatch = async () => {
    try {
      const res = await getMatch(matchId);
      console.log("MATCH:", res.data.match);

      // 🔥 IMPORTANT CHANGE
      setMatch(res.data.match);
      setOvers(res.data.overs);
    } catch (err) {
      console.error("Error fetching match:", err);
    }
  };

  return { match, overs, fetchMatch };
};

export default useMatch;