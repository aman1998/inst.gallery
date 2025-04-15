import { IRequestCallbacks } from "../types/request";

export const copyToClipboard = (text: string, callbacks?: IRequestCallbacks) => {
  navigator.clipboard.writeText(text).then(() => {
    if (callbacks?.onSuccessCallback) {
      callbacks.onSuccessCallback();
    } else {
      alert("Link copied!");
    }
  }).catch(() => {
    if (callbacks?.onErrorCallback) {
      callbacks.onErrorCallback();
    }
  }).finally(() => {
    if (callbacks?.onFinallyCallback) {
      callbacks.onFinallyCallback();
    }
  });
};

export const capitalizeFirstLetter = (val: string) => {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}