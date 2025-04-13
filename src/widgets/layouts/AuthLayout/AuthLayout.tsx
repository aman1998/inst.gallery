"use client";
import React from "react";
import { usePathname } from "next/navigation";
import cn from "classnames";

import Logo from "@shared/ui/Logo";
import { ROUTES } from "@shared/config/routes";
import UserProvider from "@shared/providers/UserProvider";

import Footer from "../../Footer";

import s from "./AuthLayout.module.scss";

interface Props {
  children: React.ReactNode;
}
const AuthLayout: React.FC<Props> = ({ children }) => {
  const pathname = usePathname();

  return (
    <UserProvider user={null}>
      <div className={s.layout}>
        <Logo className={s.layout__logo} href={ROUTES.home} />
        <div className={cn(s.layout__content, pathname === ROUTES.signUpConfirm && s["layout__content--centered"])}>
          {children}
        </div>
        <Footer />
      </div>
    </UserProvider>
  );
};

export default AuthLayout;
