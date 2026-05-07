const PlayerStats = ({ player }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <p>Matches: {player.stats.matches}</p>
      <p>Runs: {player.stats.runs}</p>
      <p>Wickets: {player.stats.wickets}</p>
    </div>
  );
};

export default PlayerStats;