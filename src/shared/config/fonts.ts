import { Unbounded as Font, Fredoka } from "next/font/google";

export const blocksFontFamily = Font({
  weight: ["400"],
  subsets: ["latin"],
});

export const mainFontFamily = Fredoka({
  weight: ["400"],
  subsets: ["latin"],
});
