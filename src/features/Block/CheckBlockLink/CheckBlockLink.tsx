import React from "react";
import type { Control, FieldValues, Path, UseFormClearErrors, UseFormSetError } from "react-hook-form";
import type { InputProps } from "antd";
import { useDebounce } from "use-debounce";

import { useLKLayout } from "@widgets/layouts/LKLayout/lib/useLKLayout";

import { ignoreLinks } from "@features/Block/BlockAdvancedSettings/lib/schema";

import { originalProjectSelector } from "@entities/Project/model/selectors";
import { useProjectStore } from "@entities/Project/model/store";

import InputControl from "@shared/controllers/InputControl";
import { SITE_URL } from "@shared/config/appConfig";
import { createClient } from "@shared/config/supabase/client";
import { ESupabaseDB } from "@shared/config/supabase/types";
import { useMessage } from "@shared/hooks/useMessage";

interface Props<T extends InputProps> extends InputProps {
  control: Control<T>;
  errorMessage?: string;
  name: Path<T>;
  setError: UseFormSetError<T>;
  clearErrors: UseFormClearErrors<T>;

  linkValue: string;
  setLinkValue: (val: string) => void;
}

const CheckBlockLink = <T extends FieldValues>({
  control,
  onChange: onChangeProp,
  name,
  errorMessage,
  setError,
  clearErrors,
  linkValue,
  setLinkValue,
  ...props
}: Props<T>) => {
  const originalProject = useProjectStore(originalProjectSelector);

  const [loading, setLoading] = React.useState(false);

  const [debouncedLink] = useDebounce(linkValue, 500);
  const { isDemo } = useLKLayout();

  const { errorMessage: errorMessagePopup, successMessage, loadingMessage, destroyMessage } = useMessage();

  const checkLinkExists = React.useCallback(
    async (link: string): Promise<boolean> => {
      setLoading(true);
      const supabase = createClient();

      const { data, error } = await supabase.from(ESupabaseDB.projects).select("link").eq("link", link);

      setLoading(false);

      if (error) {
        errorMessagePopup(error.message);
        return true;
      }

      return !!data?.length;
    },
    [errorMessagePopup]
  );

  React.useEffect(() => {
    if (debouncedLink === originalProject?.link) {
      clearErrors(name);
      return;
    }

    const validateLink = async () => {
      if (!debouncedLink) {
        clearErrors(name);
        return;
      }

      const linkValidationRegex = /^[a-z0-9][a-z0-9_-]{1,19}$/; // Длина проверяется: 2-20 символов
      if (!linkValidationRegex.test(debouncedLink)) {
        setError(name, {
          type: "manual",
          message:
            "Invalid link. It must start with a lowercase letter, " +
            "contain only Latin letters, numbers, underscores, or dashes, " +
            "and be 2-20 characters long.",
        });
        errorMessagePopup("Invalid link format. Use only lowercase Latin letters, numbers, _, or -.");
        return;
      }

      if (ignoreLinks.includes(debouncedLink)) {
        errorMessagePopup("Non-valid link");
        return;
      }

      if (isDemo) return;

      const exists = await checkLinkExists(debouncedLink);
      destroyMessage();
      if (exists) {
        setError(name, {
          type: "manual",
          message: "This link is already taken",
        });
        errorMessagePopup("This link is already taken");
      } else {
        clearErrors(name);
        successMessage("This link is available!");
      }
    };

    validateLink();
  }, [
    debouncedLink,
    setError,
    clearErrors,
    checkLinkExists,
    name,
    errorMessagePopup,
    loadingMessage,
    successMessage,
    destroyMessage,
    originalProject?.link,
    isDemo,
  ]);

  return (
    <InputControl
      disabled={loading}
      size="middle"
      addonBefore={<div>{SITE_URL}/</div>}
      addonAfter={<div>/</div>}
      control={control}
      name={name}
      errorMessage={errorMessage}
      onChange={(e) => {
        setLinkValue(e.target.value);
        onChangeProp?.(e);
      }}
      {...props}
    />
  );
};

export default CheckBlockLink;
