const OverDisplay = ({ balls }) => {
  return (
    <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
      {balls.map((b, i) => (
        <div
          key={i}
          className="min-w-10 h-10 flex items-center justify-center bg-gray-200 rounded-full text-sm font-semibold"
        >
          {b.wicket ? "W" : b.extras ? "E" : b.runs}
        </div>
      ))}
    </div>
  );
};

export default OverDisplay;