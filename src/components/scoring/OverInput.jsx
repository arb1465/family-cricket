import { useState } from "react";
import Button from "../common/Button";

const BALL_OPTIONS = ["0", "1", "2", "3", "4", "6", "W", "WD", "NB"];

const OverInput = ({ onSave }) => {
  const [balls, setBalls] = useState(["", "", "", "", "", ""]);

  const handleChange = (index, value) => {
    const updated = [...balls];
    const prevValue = updated[index];

    updated[index] = value;

    const isPrevExtra = prevValue === "WD" || prevValue === "NB";
    const isNowExtra = value === "WD" || value === "NB";

    // 🔥 CASE 1: Normal → Extra (WD/NB selected)
    if (!isPrevExtra && isNowExtra) {
      updated.push("");
    }

    // 🔥 CASE 2: Extra → Normal (user changed WD/NB to valid run)
    if (isPrevExtra && !isNowExtra) {
      // remove one extra slot from end (if exists)
      if (updated.length > 6) {
        updated.pop();
      }
    }

    setBalls(updated);
  };

  const countValidBalls = () => {
    return balls.filter(
      (b) => b && b !== "WD" && b !== "NB"
    ).length;
  };

  const handleSubmit = () => {
    const validBalls = countValidBalls();

    if (validBalls < 6) {
      alert("Complete 6 valid balls first");
      return;
    }

    onSave(balls);
    setBalls(["", "", "", "", "", ""]); // reset
  };

  return (
    <div className="bg-white p-3 rounded-xl shadow mt-3">
      <h3 className="text-center font-semibold mb-2">
        Enter Over
      </h3>

      <div className="grid grid-cols-3 gap-2">
        {balls.map((ball, i) => (
          <select
            key={i}
            value={ball}
            onChange={(e) => handleChange(i, e.target.value)}
            className="p-2 border rounded text-center"
          >
            <option value="">Ball {i + 1}</option>
            {BALL_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        ))}
      </div>

      <div className="mt-3 text-sm text-center">
        Valid Balls: {countValidBalls()} / 6
      </div>

      <div className="mt-3">
        <Button onClick={handleSubmit}>
          Save Over
        </Button>
      </div>
    </div>
  );
};

export default OverInput;