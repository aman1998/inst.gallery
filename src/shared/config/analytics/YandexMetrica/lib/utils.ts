import ym from "react-yandex-metrika";

export const pointYandexGoal = (goal: string) => {
  if (!!process.env.IS_DEV) {
    console.log(`%c[YandexMetrika](GOAL)`, `color: orange`, goal);
    return;
  }
  ym("reachGoal", goal);
};
