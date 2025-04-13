"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "antd";
import { useRouter } from "next/navigation";

import {
  restorePasswordSchema,
  TRestorePasswordSchema,
} from "@features/Auth/RestorePassword/lib/restorePasswordSchema";
import { restoreEmailServer } from "@features/Auth/RestorePassword/model/actions";

import Button from "@shared/ui/Button";
import InputControl from "@shared/controllers/InputControl";
import { ROUTES } from "@shared/config/routes";
import { useUserInfo } from "@shared/providers/UserProvider/lib/useUserInfo";
import { useMessage } from "@shared/hooks/useMessage";

import s from "./RestorePassword.module.scss";

const RestorePassword: React.FC = () => {
  const [isPending, startTransition] = React.useTransition();
  const router = useRouter();
  const { setUser } = useUserInfo();
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

  const handleClick = (data: TRestorePasswordSchema) => {
    startTransition(async () => {
      try {
        const user = await restoreEmailServer(data.email, window.location.origin + ROUTES.newPassword);
        if (user) {
          setUser(user);
          router.push(ROUTES.restoreAuthConfirm);
          successMessage("Welcome!");
        }
      } catch {
        errorMessage("Failed to login");
      }
    });
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
        <Button loading={isPending} className={s.form__btn} type="primary" htmlType="submit">
          Reset Password
        </Button>
      </Form.Item>

      <Button type="link" onClick={() => router.push(ROUTES.signIn)}>
        Go Back
      </Button>
    </Form>
  );
};

export default RestorePassword;
