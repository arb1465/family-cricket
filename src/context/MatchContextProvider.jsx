import { useState } from "react";
import { MatchContext } from "./matchContext";

const MatchContextProvider = ({ children }) => {
  const [currentMatch, setCurrentMatch] = useState(null);

  return (
    <MatchContext.Provider value={{ currentMatch, setCurrentMatch }}>
      {children}
    </MatchContext.Provider>
  );
};

export default MatchContextProvider;