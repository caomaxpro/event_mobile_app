export const generateRandomArray = (): number[] => {
  return Array.from({length: 10}, () => Math.floor(Math.random() * 101));
};
