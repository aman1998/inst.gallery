"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "antd";
import { useRouter } from "next/navigation";
import { Turnstile } from "@marsidev/react-turnstile";

import {
  restorePasswordSchema,
  TRestorePasswordSchema,
} from "@features/Auth/RestorePassword/lib/restorePasswordSchema";

import Button from "@shared/ui/Button";
import InputControl from "@shared/controllers/InputControl";
import { ROUTES } from "@shared/config/routes";
import { useMessage } from "@shared/hooks/useMessage";
import { getSiteUrl } from "@shared/utils/urls";
import { createClient } from "@shared/config/supabase/client";

import s from "./RestorePassword.module.scss";

const RestorePassword: React.FC = () => {
  const [loading, setLoading] = React.useState(false);
  const [captchaToken, setCaptchaToken] = React.useState<string | undefined>(undefined);

  const router = useRouter();
  const { successMessage, errorMessage } = useMessage();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TRestorePasswordSchema>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(restorePasswordSchema),
    mode: "onSubmit",
  });

  const handleClick = async (data: TRestorePasswordSchema) => {
    try {
      if (!captchaToken) {
        errorMessage("Captcha error");
        return;
      }

      setLoading(true);
      const supabase = createClient();

      const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
        redirectTo: getSiteUrl() + ROUTES.newPassword,
        captchaToken,
      });

      if (error) {
        errorMessage(error.message || "Failed to login");
      } else {
        router.push(ROUTES.restoreAuthConfirm);
        successMessage("Confirm please");
      }
    } catch {
      errorMessage("Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form className={s.form} onFinish={handleSubmit(handleClick)} layout="vertical">
      <h1 className={s.form__title}>Reset Password</h1>

      <Form.Item
        style={{ margin: 0 }}
        validateStatus={errors.email?.message ? "error" : ""}
        help={errors.email?.message}
        label={<label className={s.form__label}>Enter the email you used during registration</label>}
      >
        <InputControl<TRestorePasswordSchema>
          control={control}
          name="email"
          errorMessage={errors.email?.message}
          placeholder="E-mail"
        />
      </Form.Item>

      <Form.Item style={{ margin: 0 }}>
        <Button loading={loading} className={s.form__btn} type="primary" htmlType="submit">
          Reset Password
        </Button>
      </Form.Item>

      <Button type="link" onClick={() => router.push(ROUTES.signIn)}>
        Go Back
      </Button>

      <Turnstile
        options={{ theme: "light", size: "flexible" }}
        siteKey={process.env.CAPTCHA_SITE_KEY as string}
        onSuccess={setCaptchaToken}
      />
    </Form>
  );
};

export default RestorePassword;
