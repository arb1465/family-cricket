const MatchCard = ({ match, onClick }) => {
  const teamA = match.teams[0];
  const teamB = match.teams[1];

  return (
    <div
      onClick={onClick}
      className="bg-white p-4 rounded-xl shadow mb-3 cursor-pointer"
    >
      <h3 className="font-semibold text-center">
        {teamA.name} vs {teamB.name}
      </h3>

      <p className="text-center text-sm mt-1">
        {teamA.totalRuns}/{teamA.wickets} vs {teamB.totalRuns}/{teamB.wickets}
      </p>

      <p className="text-center text-xs text-gray-500 mt-1">
        {match.status}
      </p>
    </div>
  );
};

export default MatchCard;