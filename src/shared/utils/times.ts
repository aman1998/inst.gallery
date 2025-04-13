import { format } from "date-fns";

export interface IDateSettings {
  format?: "date" | "string";
}

export const getToday = (settings?: IDateSettings) => {
  const today = new Date();

  if (settings?.format === "string") return today.toISOString();

  return today;
};

export const getDateOneWeekAgo = (settings?: IDateSettings) => {
  const today = new Date();
  const oneWeekAgo = new Date(today);
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  if (settings?.format === "string") return oneWeekAgo.toISOString();

  return oneWeekAgo;
};

export const getDateOneMonthAgo = (settings?: IDateSettings) => {
  const today = new Date();
  const oneMonthAgo = new Date(today);
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

  if (settings?.format === "string") return oneMonthAgo.toISOString();

  return oneMonthAgo;
};

export const getDateSixMonthsAgo = (settings?: IDateSettings) => {
  const today = new Date();
  const sixMonthsAgo = new Date(today);
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  if (settings?.format === "string") return sixMonthsAgo.toISOString();

  return sixMonthsAgo;
};

export const getDateOneYearAgo = (settings?: IDateSettings) => {
  const today = new Date();
  const oneYearAgo = new Date(today);
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

  if (settings?.format === "string") return oneYearAgo.toISOString();

  return oneYearAgo;
};

export const formatLastModified = (timestamp: number): string => format(new Date(timestamp), "PPpp");

export const formattedDate = (date: string | Date, formatDate: string = "d MMMM yyyy | HH:mm") =>
  format(new Date(date), formatDate);

export const formattedLocaleDate = (date: string, locale: string = navigator.language) =>
  new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true, // автоматически подстроится под локаль
  }).format(new Date(date));
