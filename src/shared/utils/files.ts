import { getFileFromSupabase } from "@shared/config/supabase/actions";
import { EStorageKey } from "@shared/types/storage";
import { ISupabaseFileData } from "@shared/config/supabase/types";

export const formatFileSize = (sizeInBytes: number): string => {
  if (sizeInBytes >= 1e9) {
    return `${(sizeInBytes / 1e9).toFixed(2)} GB`;
  } else if (sizeInBytes >= 1e6) {
    return `${(sizeInBytes / 1e6).toFixed(2)} MB`;
  } else if (sizeInBytes >= 1e3) {
    return `${(sizeInBytes / 1e3).toFixed(2)} KB`;
  } else {
    return `${sizeInBytes} Bytes`;
  }
};

export const downloadBlob = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();

  URL.revokeObjectURL(url);
};

export const getFileById = async (settings: ISupabaseFileData): Promise<File> => {
  const fileBlob = await getFileFromSupabase(settings);
  return new File([fileBlob], settings.fileName ?? "File Name", { type: fileBlob.type });
};

import imageCompression, { Options } from "browser-image-compression";
import { TNullable } from "../types/common";

export const getFileBlobId = async (filePath: string): Promise<Blob> =>
  await getFileFromSupabase({ filePath, bucket: EStorageKey.excel });

export const downloadFileById = async (filePath: string, fileName: string) => {
  const blob = await getFileBlobId(filePath);
  downloadBlob(blob, fileName);
};
