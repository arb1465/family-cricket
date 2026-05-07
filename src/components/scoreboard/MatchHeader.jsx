const MatchHeader = ({ match }) => {
  return (
    <div className="bg-white p-3 rounded-xl shadow mb-3 text-center">
      <h2 className="font-semibold text-lg">
        {match.teams[0].name} vs {match.teams[1].name}
      </h2>

      <p className="text-sm text-gray-500">
        Innings: {match.currentInnings}
      </p>

      {match.status === "completed" && (
        <p className="text-green-600 font-semibold mt-1">
          Match Completed
        </p>
      )}
    </div>
  );
};

export default MatchHeader;