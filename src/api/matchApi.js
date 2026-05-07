import API from "./axios";

// create match
export const createMatch = (data) =>
  API.post("/matches", data);

// get all matches
export const getMatches = () =>
  API.get("/matches");

// get single match
export const getMatch = (id) =>
  API.get(`/matches/${id}`);