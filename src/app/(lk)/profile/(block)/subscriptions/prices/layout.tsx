import React from "react";

import SubscriptionsPricesPageContainer from "@containers/SubscriptionsPricesPageContainer";

const Layout = ({ children }: { children: React.ReactNode }) => (
  <>
    <SubscriptionsPricesPageContainer />
    {children}
  </>
);

export default Layout;
