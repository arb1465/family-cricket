const ScoreBoard = ({ match }) => {
  const teamIndex = match.currentInnings - 1;
  const team = match.teams[teamIndex];

  const opponent = match.teams[teamIndex === 0 ? 1 : 0];

  const balls = team.ballsPlayed;
  const overs = `${Math.floor(balls / 6)}.${balls % 6}`;

  let target = null;
  let runsNeeded = null;
  let ballsLeft = null;

  if (match.currentInnings === 2) {
    target = opponent.totalRuns + 1;
    runsNeeded = target - team.totalRuns;
    ballsLeft = match.formatOvers * 6 - balls;
  }

  return (
    <div className="bg-black text-white rounded-2xl p-5 text-center shadow">
      <h2 className="text-lg mb-2">{team.name}</h2>

      <div className="text-5xl font-bold text-green-400">
        {team.totalRuns}/{team.wickets}
      </div>

      <div className="text-sm mt-2">Overs: {overs}</div>

      {/* 🎯 Target Info */}
      {match.currentInnings === 2 && (
        <div className="mt-3 text-sm text-yellow-400">
          <p>Target: {target}</p>
          <p>
            Need {runsNeeded} runs in {ballsLeft} balls
          </p>
        </div>
      )}

      {/* 🏆 Result */}
      {match.status === "completed" && (
        <div className="mt-3 text-green-400 font-semibold">
          {match.result?.margin}
        </div>
      )}
    </div>
  );
};

export default ScoreBoard;