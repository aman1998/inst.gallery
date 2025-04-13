"use client";
import React from "react";
import cn from "classnames";

import s from "./Transition.module.scss";

interface Props extends React.PropsWithChildren {
  startIn?: boolean;
  delay?: number;
  offset?: number;
  animation?: "bounceInUp" | "bounceOutUp";
  className?: string;
  style?: React.CSSProperties;
}

const Transition: React.ForwardRefRenderFunction<HTMLDivElement, Props> = (
  { children, animation = "bounceInUp", offset = 40, delay = 250, startIn = true, className, style },
  ref
) => {
  const [mounted, setMounted] = React.useState<boolean>(false);

  React.useEffect(() => {
    setTimeout(() => {
      setMounted(startIn);
    }, delay);
  }, [startIn, delay]);

  return (
    <div
      ref={ref}
      style={
        {
          "--offset": `${offset}px`,
          "--delay": `${delay}s`,
          ...style,
        } as React.CSSProperties
      }
      className={cn(startIn && s[animation], mounted && s.mounted, className)}
    >
      {children}
    </div>
  );
};

export default React.forwardRef(Transition);
