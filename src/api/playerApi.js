import API from "./axios";

// create player
export const createPlayer = (data) =>
  API.post("/players", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

// get all players
export const getPlayers = () =>
  API.get("/players");

// get single player
export const getPlayer = (id) =>
  API.get(`/players/${id}`);