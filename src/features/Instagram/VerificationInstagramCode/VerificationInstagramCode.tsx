"use client";

import React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Alert, Flex, Typography } from "antd";

import { TNullable } from "@shared/types/common";
import { ROUTES } from "@shared/config/routes";
import Spinner from "@shared/ui/Spinner";
import Button from "@shared/ui/Button";
import { useMessage } from "@shared/hooks/useMessage";
import { createClient } from "@shared/config/supabase/client";
import { ESupabaseBucket, ESupabaseDB } from "@shared/config/supabase/types";
import { useUserInfo } from "@shared/providers/UserProvider/lib/useUserInfo";

interface Props {
  isMultiple?: boolean;
}

const VerificationInstagramCode: React.FC<Props> = ({ isMultiple = true }) => {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<TNullable<string>>(null);
  const [success, setSuccess] = React.useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();
  const code = searchParams.get("code");
  const instagramError = searchParams.get("error");
  const errorDescription = searchParams.get("error_description");
  const error_reason = searchParams.get("error_reason");

  const { loadingMessage, destroyMessage, successMessage } = useMessage();
  const [isPending, startTransition] = React.useTransition();

  const supabase = createClient();
  const { user } = useUserInfo();

  const saveInstagramInfoToSupabase = React.useCallback(
    async (userInfo: any) => {
      try {
        const { error } = await supabase
          .from(ESupabaseDB.instagramAccounts)
          .upsert(userInfo, { onConflict: "account_id" })
          .select();

        if (error) {
          throw new Error(`Supabase DB error: ${error?.message}`);
        }
      } catch (err: any) {
        throw new Error(`Failed to save Instagram info: ${err?.message}`);
      }
    },
    [supabase]
  );

  const uploadAvatarToSupabase = React.useCallback(
    async (avatarUrl: string, instagramUserId: string) => {
      try {
        const response = await fetch(avatarUrl);

        if (!response.ok) {
          throw new Error(`Failed to fetch avatar image: ${response.statusText}`);
        }

        const blob = await response.blob();
        const filePath = `${instagramUserId}.jpg`;
        const fullPath = `${user?.id}/${filePath}`;

        const { error } = await supabase.storage
          .from(ESupabaseBucket.instagramAvatar)
          .upload(fullPath, blob, { upsert: true });

        if (error) {
          throw new Error(`Failed to upload avatar to Supabase: ${error.message}`);
        }

        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
        return `${supabaseUrl}/storage/v1/object/public/${ESupabaseBucket.instagramAvatar}/${user?.id}/${filePath}`;
      } catch (err: any) {
        console.error(err);
        return null;
      }
    },
    [supabase.storage, user?.id]
  );

  const fetchInstagramUserInfo = React.useCallback(async (userId: string) => {
    try {
      const response = await fetch(ROUTES.apiInstagramInfoId(userId));

      if (!response.ok) {
        throw new Error(`Failed to fetch Instagram user info: ${response?.statusText}`);
      }

      return await response.json();
    } catch (err: any) {
      throw new Error(`Error fetching Instagram user info: ${err?.message}`);
    }
  }, []);

  const handleMultipleInstagramAccounts = React.useCallback(
    async (instagramUserId: string) => {
      try {
        const userInfo = await fetchInstagramUserInfo(instagramUserId);
        const instagramUser = {
          profile_picture_url: null,
          instagram_user_id: instagramUserId,
          account_id: instagramUserId + user?.id,
          username: userInfo?.username,
        };

        if (userInfo.profile_picture_url) {
          const profile_picture_url = await uploadAvatarToSupabase(userInfo.profile_picture_url, instagramUserId);
          await saveInstagramInfoToSupabase({ ...instagramUser, profile_picture_url });
        } else {
          await saveInstagramInfoToSupabase(instagramUser);
        }
      } catch (err: any) {
        throw new Error(`Error handling multiple Instagram accounts: ${err.message}`);
      }
    },
    [saveInstagramInfoToSupabase, uploadAvatarToSupabase, fetchInstagramUserInfo]
  );

  const fetchLongLivedToken = React.useCallback(
    async (code: string) => {
      try {
        setLoading(true);
        loadingMessage("Checking verification code...");

        const response = await fetch(
          `${isMultiple ? ROUTES.apiInstagramMultipleCode : ROUTES.apiInstagramCode}?code=${code}`,
          { cache: "no-store" }
        );

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to fetch long-lived token: ${errorText}`);
        }

        const data = await response.json();

        if (!data.user_id) {
          throw new Error(data.error || "Failed to get user ID from Instagram API");
        }

        if (isMultiple) {
          await handleMultipleInstagramAccounts(data.user_id);
        }

        setSuccess(true);
        startTransition(() => {
          router.push(ROUTES.profile);
        });
        successMessage("Instagram account successfully connected!");
      } catch (err: any) {
        console.error("Authorization error:", err);
        setError(err?.message || "An unexpected error occurred");
      } finally {
        setLoading(false);
        destroyMessage();
      }
    },
    [destroyMessage, loadingMessage, successMessage, router, isMultiple]
  );

  React.useEffect(() => {
    if (instagramError) {
      setError(`${errorDescription || "Unknown error"}`);
      setLoading(false);
      return;
    }

    if (code) {
      fetchLongLivedToken(code);
    } else {
      setLoading(false);
      setError("Not authorization code");
    }
  }, [code, instagramError, errorDescription, fetchLongLivedToken]);

  if (loading || isPending) {
    return <Spinner />;
  }

  if (error) {
    return (
      <Alert
        style={{ width: 240 }}
        message={error_reason ? error_reason : "Error during verification"}
        description={
          <Flex gap={8}>
            <Typography.Text>{error}</Typography.Text>
            <Button size="small" danger href={ROUTES.profile}>
              Back
            </Button>
          </Flex>
        }
        type="error"
      />
    );
  }

  if (success) {
    return (
      <Alert
        style={{ width: 240 }}
        message="Verification successful"
        description={
          <Flex gap={8}>
            <Typography.Text>Your Instagram account has been connected!</Typography.Text>
            <Button type="primary" size="small" href={ROUTES.profile}>
              Back
            </Button>
          </Flex>
        }
        type="success"
      />
    );
  }

  return <Alert message="Something went wrong" type="warning" />;
};

export default VerificationInstagramCode;
