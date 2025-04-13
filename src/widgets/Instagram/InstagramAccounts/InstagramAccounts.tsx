"use client";

import React from "react";
import { ArrowRightOutlined, PlusCircleFilled } from "@ant-design/icons";
import { Avatar, Empty, Skeleton, Typography } from "antd";
import { useRouter } from "next/navigation";
import cn from "classnames";

import AddInstagramAccountLink from "@features/Instagram/AddInstagramAccountLink";

import { IInstagramAccount } from "@entities/Instagram/model/types";

import { ROUTES } from "@shared/config/routes";
import Button from "@shared/ui/Button";
import { useUserInfo } from "@shared/providers/UserProvider/lib/useUserInfo";
import { createClient } from "@shared/config/supabase/client";
import { ESupabaseDB } from "@shared/config/supabase/types";
import { TNullable } from "@shared/types/common";

import s from "./InstagramAccounts.module.scss";

const InstagramAccounts = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [accounts, setAccounts] = React.useState<TNullable<IInstagramAccount[]>>(null);

  const router = useRouter();

  const { user } = useUserInfo();

  const getAccounts = React.useCallback(async () => {
    if (!user?.id) return null;

    const supabase = createClient();

    setIsLoading(true);

    const { data } = await supabase.from(ESupabaseDB.instagramAccounts).select("*").eq("user_id", user.id);

    if (data) {
      setAccounts(data);
    }
    setIsLoading(false);
  }, [user?.id]);

  React.useEffect(() => {
    if (!accounts?.length) {
      getAccounts();
    }
  }, [accounts?.length, getAccounts]);

  if (isLoading)
    return (
      <div className={s.accounts__list}>
        {Array.from({ length: 5 }, (_, i) => (
          <div key={i} className={s.accounts__skeleton} />
        ))}
      </div>
    );

  if (accounts?.length === 0)
    return (
      <Empty description="No accounts found.">
        <AddInstagramAccountLink />
      </Empty>
    );

  return (
    <div className={s.accounts}>
      <div className={s.accounts__list}>
        {accounts?.map((account) => (
          <Button
            key={account.id}
            className={s.accounts__btn}
            size="large"
            type="text"
            onClick={() => router.push(ROUTES.instagramId(account.instagram_user_id))}
          >
            <div className={s["accounts__btn-content"]}>
              <Avatar src={account.profile_picture_url} alt="account-avatar" size={32} style={{ objectFit: "cover" }} />
              <p>{account.username}</p>
              <ArrowRightOutlined className={s["accounts__btn-arrow"]} />
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default InstagramAccounts;
