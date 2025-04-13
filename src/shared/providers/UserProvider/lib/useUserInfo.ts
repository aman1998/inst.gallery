"use client";

import React from "react";

import { TUser } from "@entities/User/model/types";

import { TNullable } from "@shared/types/common";

interface TUserContextType {
  user: TNullable<TUser>;
  setUser: React.Dispatch<React.SetStateAction<TNullable<TUser>>>;
}

export const UserContext = React.createContext<TUserContextType | undefined>(undefined);

export const useUserInfo = (): TUserContextType => {
  const context = React.useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUserInfo must be used within a UserProvider");
  }
  return context;
};
