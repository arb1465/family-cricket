import { createContext, useContext } from "react";

export const MatchContext = createContext();

export const useMatchContext = () => {
  const context = useContext(MatchContext);

  if (!context) {
    throw new Error("useMatchContext must be used within MatchContextProvider");
  }

  return context;
};