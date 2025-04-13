import React from "react";

// когда нужно, чтобы isLoading был по-умолчанию true.
export const useLoading = (isLoading: boolean | boolean[]): boolean => {
  const [loading, setLoading] = React.useState(true);
  const [rendered, setRendered] = React.useState(false);

  React.useEffect(() => {
    if (!rendered) setRendered(true);
  }, [rendered]);

  React.useEffect(() => {
    if (!rendered) return;
    if (Array.isArray(isLoading)) {
      setLoading(isLoading.some(Boolean));
    } else {
      setLoading(isLoading);
    }
  }, [isLoading, rendered]);

  return loading;
};
