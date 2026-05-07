export const formatOvers = (balls) => {
  if (!balls) return "0.0";
  return `${Math.floor(balls / 6)}.${balls % 6}`;
};