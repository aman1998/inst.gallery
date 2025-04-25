"use client";

import { Router } from "next/router";
import React from "react";
import ym, { YMInitializer } from "react-yandex-metrika";

export const enableYM = !process.env.IS_DEV;

interface Props {
  id: number;
}

const YandexMetrica: React.FC<Props> = ({ id }) => {
  const hit = React.useCallback((url: string) => {
    if (enableYM) {
      ym("hit", url);
    } else {
      console.log(`%c[YandexMetrika](HIT)`, `color: orange`, url);
    }
  }, []);

  React.useEffect(() => {
    hit(window.location.pathname + window.location.search);
    Router.events.on("routeChangeComplete", (url: string) => hit(url));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{enableYM && <YMInitializer accounts={[id]} options={{ defer: true }} version="2" />}</>;
};

export default YandexMetrica;
