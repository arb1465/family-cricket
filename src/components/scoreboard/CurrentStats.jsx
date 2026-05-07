const CurrentStats = ({ match }) => {
  const team = match.teams[match.currentInnings - 1];

  return (
    <div className="bg-white p-3 rounded-xl shadow mt-3 text-sm">
      <p>Runs: {team.totalRuns}</p>
      <p>Wickets: {team.wickets}</p>
      <p>Balls: {team.ballsPlayed}</p>
    </div>
  );
};

export default CurrentStats;