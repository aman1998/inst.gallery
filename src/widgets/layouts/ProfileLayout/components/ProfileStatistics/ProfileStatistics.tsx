"use client";
import React from "react";
import { motion } from "framer-motion";

import { useUserStore } from "@entities/User/model/store";
import { setUserStatsSelector } from "@entities/User/model/selectors";

import { createClient } from "@shared/config/supabase/client";
import { ESupabaseDB } from "@shared/config/supabase/types";
import { useUserInfo } from "@shared/providers/UserProvider/lib/useUserInfo";

import s from "./ProfileStatistics.module.scss";

const ProfileStatistics = () => {
  const setUserStats = useUserStore(setUserStatsSelector);

  const supabase = createClient();
  const { user } = useUserInfo();

  // const getStats = React.useCallback(async () => {
  //   if (!user) return;
  //
  //   const { count: postsCount, error: postsCountError } = await supabase
  //     .from(ESupabaseDB.instagramPosts)
  //     .select("*", { count: "exact", head: true })
  //     .eq("user_id", user.id);
  //
  //   const { count: accountsCount, error: accountsCountError } = await supabase
  //     .from(ESupabaseDB.instagramAccounts)
  //     .select("*", { count: "exact", head: true })
  //     .eq("user_id", user.id);
  // }, [supabase, user]);
  //
  // React.useEffect(() => {
  //   getStats();
  // }, [getStats]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={s.stats}
    >
      <div className={s.stat}>
        <p className={s.stat__title}>Plan</p>
        <p className={s.stat__text}>Free</p>
      </div>
      <div className={s.stat}>
        <p className={s.stat__title}>Works</p>
        <p className={s.stat__text}>1/10</p>
      </div>
    </motion.div>
  );
};

export default ProfileStatistics;
