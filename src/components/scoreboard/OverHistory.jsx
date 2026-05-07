const formatBall = (b) => {
  if (b.wicket) return "W";
  if (b.extraType === "wide") return "WD";
  if (b.extraType === "no-ball") return "NB";
  return b.runs;
};

const OverHistory = ({ overs }) => {
  return (
    <div className="bg-white p-3 rounded-xl shadow mt-3">
      <h3 className="text-sm font-semibold mb-2 text-center">
        Overs History
      </h3>

      <div className="space-y-2 max-h-40 overflow-y-auto">
        {overs.map((over) => (
          <div
            key={over._id}
            className="flex justify-between text-sm"
          >
            <span>Over {over.overNumber}</span>

            <div className="flex gap-1">
              {over.balls.map((b, i) => (
                <span
                  key={i}
                  className="px-2 py-1 bg-gray-200 rounded text-xs"
                >
                  {formatBall(b)}
                </span>
              ))}
            </div>

            <span>{over.totalRuns}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OverHistory;