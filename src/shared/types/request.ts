import { AxiosError } from "axios";

import { TNullable } from "@shared/types/common";

export interface IListConfig {
  count: number;
  next: TNullable<string>;
  prev: TNullable<string>;
  current: TNullable<number>;
}
export interface IListRequestResult<T extends Array<object>> extends IListConfig {
  results: T;
}

export interface IDataDefault<T> {
  isLoading: boolean;
  data: TNullable<T>;
  // data: T extends Array<unknown> ? T : T | null;
  error: string | null;
}

export interface IRequestCallbacks<T = unknown> {
  onSuccessCallback?: (data?: T) => void;
  onErrorCallback?: (error?: AxiosError | string) => void;
  onFinallyCallback?: (data?: T) => void;
}

export interface IUploadProgress {
  percent: number;
  speed: number;
  timeLeft: number;
  uploadedBytes: number;
  totalBytes: number;
}
