import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { useShallow } from "zustand/react/shallow";

import { IUserStats } from "@entities/User/model/types";
import { ESubscriptionPlan } from "@entities/Subscription/model/types";

import { TNullable } from "@shared/types/common";

export interface IUserStore {
  userStats: TNullable<IUserStats>;
  setUserStats: (userStats: IUserStats) => void;
}

const useUserStoreBase = create<IUserStore>()(
  immer((set) => ({
    userStats: null as TNullable<IUserStats>,
    setUserStats: (userStats) => {
      set((state) => {
        state.userStats = userStats;
      });
    },
  }))
);

export const useUserStore = <T>(selector: (state: IUserStore) => T) => useUserStoreBase(useShallow(selector));
