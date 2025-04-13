"use client";

import React from "react";
import { SupabaseClient } from "@supabase/supabase-js";

import { TUser } from "@entities/User/model/types";

import { TNullable } from "@shared/types/common";
import { UserContext } from "@shared/providers/UserProvider/lib/useUserInfo";

interface Props {
  children: React.ReactNode;
  user: TNullable<TUser>;
}
const UserProvider: React.FC<Props> = ({ children, user: userProp }) => {
  const [user, setUser] = React.useState<TNullable<TUser>>(userProp);

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

export default UserProvider;
