import React from "react";

type TInitialValuEDataType<T> = T | (() => T);

export const useHistoryState = <T>(initialValue?: TInitialValuEDataType<T>) => {
  const [state, _setState] = React.useState<T | undefined>(
    initialValue instanceof Function ? initialValue() : initialValue
  );
  const [history, setHistory] = React.useState<(T | undefined)[]>(
    initialValue !== undefined ? [initialValue instanceof Function ? initialValue() : initialValue] : []
  );
  const [pointer, setPointer] = React.useState<number>(initialValue !== undefined ? 0 : -1);

  const setState: (value: TInitialValuEDataType<T>) => void = React.useCallback(
    (value: TInitialValuEDataType<T>) => {
      const valueToAdd = typeof value === "function" ? (value as (prev?: T) => T)(state) : value;
      setHistory((prev) => [...prev.slice(0, pointer + 1), valueToAdd]);
      setPointer((prev) => prev + 1);
      _setState(valueToAdd);
    },
    [state, pointer]
  );

  const undo: () => void = React.useCallback(() => {
    if (pointer <= 0) return;
    setPointer((prev) => prev - 1);
    _setState(history[pointer - 1]);
  }, [pointer, history]);

  const redo: () => void = React.useCallback(() => {
    if (pointer + 1 >= history.length) return;
    setPointer((prev) => prev + 1);
    _setState(history[pointer + 1]);
  }, [pointer, history]);

  const reset: () => void = React.useCallback(() => {
    const initial = initialValue instanceof Function ? initialValue() : initialValue;
    setHistory(initial !== undefined ? [initial] : []);
    setPointer(initial !== undefined ? 0 : -1);
    _setState(initial);
  }, [initialValue]);

  return { state, setState, undo, redo, reset, history, pointer };
};

export default useHistoryState;
