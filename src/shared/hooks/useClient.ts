import React from "react";

export const useClient = () => {
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    if (!isClient) setIsClient(true);
  }, [isClient]);

  return isClient;
};
