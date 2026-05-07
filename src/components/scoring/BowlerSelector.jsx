
const BowlerSelector = ({ players, onSelect }) => {
  return (
    <div className="bg-yellow-100 p-3 rounded-xl shadow mt-3 text-center">
      <p className="font-semibold mb-2">
        Select Bowler
      </p>

      <select
        onChange={(e) => onSelect(e.target.value)}
        className="w-full p-2 border rounded"
      >
        <option value="">-- Select Bowler --</option>

        {players.map((p) => (
          <option key={p._id} value={p._id}>
            {p.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default BowlerSelector;
