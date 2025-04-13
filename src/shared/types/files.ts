import { RcFile } from "antd/lib/upload";

export const isExcel = (file: RcFile) =>
  file.type === "application/vnd.ms-upload" || // Custom Excel MIME type
  file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || // .xlsx
  file.type === "application/vnd.ms-excel"; // .xls

export const isText = (file: RcFile) => file.type === "text/plain";

export const isCSV = (file: RcFile) => file.type === "text/csv" || file.name.endsWith(".csv");

export const isSQL = (file: RcFile) => file.type === "application/sql" || file.name.endsWith(".sql");

export const isCronos = (file: RcFile) => file.name.endsWith(".cronos");

export const fileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file); // Преобразование файла в Base64
  });

export const base64ToFile = (base64: string, fileName: string): File => {
  const [metadata, data] = base64.split(",");
  const mime = metadata.match(/:(.*?);/)?.[1] || "";
  const binary = atob(data);
  const array = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    array[i] = binary.charCodeAt(i);
  }
  return new File([array], fileName, { type: mime });
};
