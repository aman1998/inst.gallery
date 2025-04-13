// import Dexie from "dexie";
//
// import { TNullable } from "@shared/types/common";
//
// export enum EDbType {
//   excels = "excels",
//   demo = "demo",
// }
// // Define a Dexie database for storing files
// const db = new Dexie("Database");
// db.version(1).stores({
//   [EDbType.excels]: "key, files",
//   [EDbType.demo]: "key, files", // `key` is the primary key
// });
//
// export const getAllFromDB = async <T extends Array<unknown>>(type: EDbType): Promise<T> => {
//   const records = await db.table(type).toArray();
//   return records as T;
// };
//
// export const saveToDB = async <T>(type: EDbType, key: string, value: T) => {
//   await db.table(type).put({ key, value });
// };
//
// export const getFromDB = async <T>(type: EDbType, key: string): Promise<TNullable<T>> => {
//   const record = await db.table(type).get({ key });
//   return record?.value || null;
// };
//
// export const removeFileFromDB = async (type: EDbType, key: string) => {
//   await db.table(type).delete(key);
// };
