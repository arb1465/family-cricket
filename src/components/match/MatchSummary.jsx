const MatchSummary = ({ match, payments = [] }) => {
  const teamA = match.teams[0];
  const teamB = match.teams[1];

  const formatOvers = (balls) =>
    `${Math.floor(balls / 6)}.${balls % 6}`;

  return (
    <div className="bg-white p-4 rounded-xl shadow mt-3">
      <h2 className="text-center font-semibold text-lg mb-3">
        Match Summary
      </h2>

      {/* Result */}
      <div className="text-center text-green-600 font-bold mb-4">
        {match.result?.margin}
      </div>

      {/* Team A */}
      <div className="mb-3">
        <h3 className="font-semibold">{teamA.name}</h3>
        <p>
          {teamA.totalRuns}/{teamA.wickets} (
          {formatOvers(teamA.ballsPlayed)} overs)
        </p>
      </div>

      {/* Team B */}
      <div>
        <h3 className="font-semibold">{teamB.name}</h3>
        <p>
          {teamB.totalRuns}/{teamB.wickets} (
          {formatOvers(teamB.ballsPlayed)} overs)
        </p>
      </div>

      {/* 💰 Payments */}
      {payments.length > 0 && (
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Payments</h3>

          <div className="space-y-1 text-sm">
            {payments.map((p) => (
              <div
                key={p._id}
                className="flex justify-between bg-gray-100 p-2 rounded"
              >
                <span>{p.playerId?.name}</span>
                <span>₹ {p.amount}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>


  );
};

export default MatchSummary;