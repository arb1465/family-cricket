import API from "./axios";

export const addOver = (matchId, data) =>
  API.post(`/${matchId}/over`, data);
// undo ball (you can implement later in backend)
export const undoBall = (matchId) =>
  API.post(`/${matchId}/undo`);