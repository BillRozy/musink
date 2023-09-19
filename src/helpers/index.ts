const addZeroToSmallInteger = (integer: number) => {
  return integer < 10 ? `0${integer}` : integer;
};

export const durationMsToMinutes = (ms: number) => {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const remainder = seconds - minutes * 60;
  return `${addZeroToSmallInteger(minutes)}:${addZeroToSmallInteger(
    remainder
  )}`;
};
