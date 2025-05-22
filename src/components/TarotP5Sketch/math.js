export const gaussian = (x, sigma = 1) => {
  return Math.exp(-(x * x) / (2 * sigma * sigma));
};
