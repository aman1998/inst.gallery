export const isNumberString = (value: string) => !(value.trim() === "" || isNaN(Number(value)));

export const adaptiveNumber = (num: number) => {
  if (!num) return 0;
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "m";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, "") + "к";
  } else {
    return num?.toString();
  }
};

export const checkIsAdaptiveNumbers = (num: number) => {
  if (!num) return true;
  return num.toString() === adaptiveNumber(num);
};
