import React from "react";

import DemoLayout from "@widgets/layouts/DemoLayout/DemoLayout";

import { MOCK_USER } from "@entities/User/lib/constants";

import UserProvider from "@shared/providers/UserProvider";

interface Props {
  children: React.ReactNode;
}
const Layout: React.FC<Props> = ({ children }) => (
  <UserProvider user={MOCK_USER}>
    <DemoLayout>{children}</DemoLayout>
  </UserProvider>
);
export default Layout;
