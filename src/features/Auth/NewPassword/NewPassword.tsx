"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "antd";
import { useRouter } from "next/navigation";

import { newPasswordSchema, TNewPasswordSchema } from "@features/Auth/NewPassword/lib/newPasswordSchema";
import { newPasswordEmailServer } from "@features/Auth/NewPassword/model/actions";

import Button from "@shared/ui/Button";
import InputControl from "@shared/controllers/InputControl";
import { ROUTES } from "@shared/config/routes";
import { useUserInfo } from "@shared/providers/UserProvider/lib/useUserInfo";
import { useMessage } from "@shared/hooks/useMessage";

import s from "./NewPassword.module.scss";

const NewPassword: React.FC = () => {
  const [isPending, startTransition] = React.useTransition();
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

  const handleClick = (data: TNewPasswordSchema) => {
    startTransition(async () => {
      try {
        const user = await newPasswordEmailServer(data.password);
        if (user) {
          setUser(user);
          router.push(ROUTES.customize);
          successMessage("Welcome!");
        }
      } catch (e: any) {
        errorMessage(e?.message || "Failed to login");
      }
    });
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
        <Button loading={isPending} className={s.form__btn} type="primary" htmlType="submit">
          Change password
        </Button>
      </Form.Item>
    </Form>
  );
};

export default NewPassword;
