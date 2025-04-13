import { EColorVariables } from "@shared/types/colors";

export const getColor = (color?: EColorVariables): string => (color ? `var(--${color})` : "currentColor");

export const lightenColor = (color: string, percent: number): string => {
  const num = parseInt(color.slice(1), 16);
  const r = Math.min(255, Math.floor((num >> 16) * (1 + percent / 100)));
  const g = Math.min(255, Math.floor(((num >> 8) & 0x00ff) * (1 + percent / 100)));
  const b = Math.min(255, Math.floor((num & 0x0000ff) * (1 + percent / 100)));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
};

export const darkenColor = (color: string, percent: number): string => {
  const num = parseInt(color.slice(1), 16);
  const r = Math.max(0, Math.floor((num >> 16) * (1 - percent / 100)));
  const g = Math.max(0, Math.floor(((num >> 8) & 0x00ff) * (1 - percent / 100)));
  const b = Math.max(0, Math.floor((num & 0x0000ff) * (1 - percent / 100)));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
};
