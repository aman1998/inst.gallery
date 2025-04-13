import { IUserStore } from "@entities/User/model/store";

export const setUserStatsSelector = (state: IUserStore) => state.setUserStats;
export const userStatsSelector = (state: IUserStore) => state.userStats;
export const userStatsPlanSelector = (state: IUserStore) => state.userStats?.plan;
export const userStatsAccountsCountSelector = (state: IUserStore) => state.userStats?.accountsCount;
export const userStatsBlocksCountSelector = (state: IUserStore) => state.userStats?.blocksCount;
export const userStatsPostsCountSelector = (state: IUserStore) => state.userStats?.postsCount;
