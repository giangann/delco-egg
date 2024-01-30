export const generateDealPrices = (originPrice: number, step: number) => {
  return [
    originPrice,
    originPrice - step,
    originPrice - step * 2,
    originPrice - step * 3,
  ];
};
