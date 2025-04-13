import React from "react";
import { Avatar, type SelectProps } from "antd";
import type { Control, FieldValues, Path } from "react-hook-form";
import Image from "next/image";

import { useLKLayout } from "@widgets/layouts/LKLayout/lib/useLKLayout";

import { IInstagramAccount } from "@entities/Instagram/model/types";
import { MOCK_INSTAGRAM_ACCOUNT } from "@entities/Instagram/lib/constants";

import { createClient } from "@shared/config/supabase/client";
import { ESupabaseDB } from "@shared/config/supabase/types";
import { useUserInfo } from "@shared/providers/UserProvider/lib/useUserInfo";
import { TNullable } from "@shared/types/common";
import SelectControl from "@shared/controllers/SelectControl";
import Spinner from "@shared/ui/Spinner";

interface Props<T extends SelectProps> extends SelectProps {
  control: Control<T>;
  errorMessage?: string;
  name: Path<T>;
}

const SelectProjectFavicon = <T extends FieldValues>({ control, errorMessage, name, ...props }: Props<T>) => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [accounts, setAccounts] = React.useState<TNullable<IInstagramAccount[]>>(null);

  const { user } = useUserInfo();
  const { isDemo } = useLKLayout();

  const getAccounts = React.useCallback(
    async (open: boolean) => {
      if (!user?.id || isDemo || !open || accounts?.length) return null;

      setLoading(true);
      const supabase = createClient();

      const { data } = await supabase.from(ESupabaseDB.instagramAccounts).select("*").eq("user_id", user.id);

      if (data) {
        setAccounts(data);
      }
      setLoading(false);
    },
    [user?.id, accounts?.length, isDemo]
  );

  const optionsList: TNullable<IInstagramAccount[]> = isDemo ? [MOCK_INSTAGRAM_ACCOUNT] : accounts;

  const options = optionsList?.map((account) => ({
    label: (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Image
          width={20}
          height={20}
          src={account.profile_picture_url}
          alt="favicon"
          style={{ borderRadius: 3, minWidth: 20, width: 20, height: 20 }}
        />
      </div>
    ),
    value: account.profile_picture_url,
  }));

  return (
    <SelectControl
      onDropdownVisibleChange={getAccounts}
      dropdownRender={(menu) => <>{loading ? <Spinner style={{ margin: "auto", width: "100%" }} /> : menu}</>}
      style={{ minWidth: 60, width: 60 }}
      allowClear
      control={control}
      name={name}
      options={options}
      {...props}
    />
  );
};

export default SelectProjectFavicon;
