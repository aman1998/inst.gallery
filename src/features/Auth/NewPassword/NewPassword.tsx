"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "antd";
import { useRouter } from "next/navigation";
import { Turnstile } from "@marsidev/react-turnstile";

import { newPasswordSchema, TNewPasswordSchema } from "@features/Auth/NewPassword/lib/newPasswordSchema";

import Button from "@shared/ui/Button";
import InputControl from "@shared/controllers/InputControl";
import { ROUTES } from "@shared/config/routes";
import { useUserInfo } from "@shared/providers/UserProvider/lib/useUserInfo";
import { useMessage } from "@shared/hooks/useMessage";

import s from "./NewPassword.module.scss";
import { createClient } from "@/shared/config/supabase/client";

const NewPassword: React.FC = () => {
  const [loading, setLoading] = React.useState(false);
  const [captchaToken, setCaptchaToken] = React.useState<string | undefined>(undefined);

  const router = useRouter();
  const { setUser } = useUserInfo();
  const { successMessage, errorMessage } = useMessage();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TNewPasswordSchema>({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(newPasswordSchema),
    mode: "onSubmit",
  });

  const handleClick = async (data: TNewPasswordSchema) => {
    try {
      if (!captchaToken) {
        errorMessage("Captcha error");
        return;
      }

      setLoading(true);
      const supabase = createClient();

      const {
        error,
        data: { user },
      } = await supabase.auth.updateUser({
        password: data.password,
      });

      if (error) {
        errorMessage(error.message || "Failed");
      } else {
        setUser(user);
        router.push(ROUTES.customize);
        successMessage("Welcome!");
      }
    } catch {
      errorMessage("Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form className={s.form} onFinish={handleSubmit(handleClick)} layout="vertical">
      <h1 className={s.form__title}>New password</h1>
      <Form.Item
        style={{ margin: 0 }}
        validateStatus={errors.password?.message ? "error" : ""}
        help={errors.password?.message}
        label={<label className={s.form__label}>Enter a new password</label>}
      >
        <InputControl<TNewPasswordSchema>
          isPassword
          control={control}
          name="password"
          errorMessage={errors.password?.message}
          placeholder="Password"
        />
      </Form.Item>

      <Form.Item
        style={{ margin: 0 }}
        validateStatus={errors.confirmPassword?.message ? "error" : ""}
        help={errors.confirmPassword?.message}
      >
        <InputControl<TNewPasswordSchema>
          isPassword
          control={control}
          name="confirmPassword"
          errorMessage={errors.confirmPassword?.message}
          placeholder="Repeat password"
        />
      </Form.Item>

      <Form.Item style={{ margin: 0 }}>
        <Button loading={loading} className={s.form__btn} type="primary" htmlType="submit">
          Change password
        </Button>
      </Form.Item>

      <Turnstile
        options={{ theme: "light", size: "flexible" }}
        siteKey={process.env.CAPTCHA_SITE_KEY as string}
        onSuccess={setCaptchaToken}
      />
    </Form>
  );
};

export default NewPassword;
