"use client";

import React from "react";

import { ELKLayoutNavigation } from "@widgets/layouts/LKLayout/model/types";

import { TUser } from "@entities/User/model/types";
import { EBlockNavigation } from "@entities/Block/model/types";

import { TNullable } from "@shared/types/common";

interface TLKLayoutContextType {
  navigation: ELKLayoutNavigation;
  setNavigation: React.Dispatch<React.SetStateAction<ELKLayoutNavigation>>;

  subNavigation: EBlockNavigation;
  setSubNavigation: React.Dispatch<React.SetStateAction<EBlockNavigation>>;

  isDemo: boolean;
  setIsDemo: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LKLayoutContext = React.createContext<TLKLayoutContextType | undefined>(undefined);

export const useLKLayout = (): TLKLayoutContextType => {
  const context = React.useContext(LKLayoutContext);

  if (context === undefined) {
    throw new Error("useLKLayout must be used within a LKLayoutProvider");
  }
  return context;
};
