import * as React from "react";

type HandlerType = (...args: any[]) => void;

type UseClickOutsideParams<H extends HandlerType = HandlerType> = {
  ref: React.RefObject<any>;
  handler: H | undefined;
  ignoreClass?: string;
  ignoreId?: string;
  events?: string[];
};

export const useClickOutside = <H extends HandlerType = HandlerType>({
  ref,
  handler,
  ignoreId,
  ignoreClass,
  events = ["mousedown", "touchstart", "click"],
}: UseClickOutsideParams<H>) => {
  const listener = React.useCallback(
    (event: any) => {
      if (!handler || !ref.current) {
        return;
      }

      if (ignoreClass) {
        // @ts-ignore
        const elements = [...document.querySelectorAll(`.${ignoreClass}`)];

        for (let i = 0; i < elements.length; i += 1) {
          if (elements[i].contains(event.target)) {
            return;
          }
        }
      }

      if (ignoreId) {
        const element = document.getElementById(ignoreId);

        if (element?.contains(event.target)) {
          return;
        }
      }

      if (!ref.current?.contains(event.target)) {
        handler();
      }
    },
    [handler, ignoreId, ignoreClass, ref]
  );

  React.useEffect(() => {
    events.forEach((type) => document.addEventListener(type, listener));

    return () => events.forEach((type) => document.removeEventListener(type, listener));
  }, [events, listener]);
};
