"use client";
import React from "react";
import Lenis from "lenis";

interface Props {
  children: React.ReactNode;
}

const SmoothScrollProvider: React.FC<Props> = ({ children }) => {
  React.useEffect(() => {
    const lenis = new Lenis();
    let animationFrameId: number;

    const raf = (time: number) => {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    };

    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
    };
  }, []);

  return children;
};

export default SmoothScrollProvider;
