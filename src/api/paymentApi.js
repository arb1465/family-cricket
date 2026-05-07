import API from "./axios";

// add payment
export const addPayment = (matchId, data) =>
  API.post(`/${matchId}/payment`, data);

// get payments
export const getPayments = (matchId) =>
  API.get(`/${matchId}/payment`);