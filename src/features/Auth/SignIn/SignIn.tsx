"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GoogleCircleFilled, FacebookFilled } from "@ant-design/icons";

import { signInWithOAuth } from "@/app/(auth)/auth/actions";

import { signInSchema, TSignInSchema } from "@features/Auth/SignIn/lib/signInSchema";
import { loginServer } from "@features/Auth/SignIn/model/actions";

import Button from "@shared/ui/Button";
import InputControl from "@shared/controllers/InputControl";
import { ROUTES } from "@shared/config/routes";
import { useUserInfo } from "@shared/providers/UserProvider/lib/useUserInfo";
import { useMessage } from "@shared/hooks/useMessage";
import { PRIMARY_COLOR } from "@shared/providers/AntdProvider/AntdProvider";

import s from "./SignIn.module.scss";
import { getSiteUrl } from "@/shared/utils/urls";

const SignIn: React.FC = () => {
  const [isPending, startTransition] = React.useTransition();
  const router = useRouter();
  const { setUser } = useUserInfo();
  const { successMessage, errorMessage } = useMessage();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TSignInSchema>({
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
    resolver: zodResolver(signInSchema),
    mode: "onSubmit",
  });

  const handleClick = (data: TSignInSchema) => {
    startTransition(async () => {
      try {
        const user = await loginServer({ email: data.email, password: data.password });
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
    <Form className={s.form} onFinish={handleSubmit(handleClick)}>
      <h1 className={s.form__title}>Login</h1>

      <div className={s.form__oauth}>
        <Button
          onClick={() => signInWithOAuth("google", getSiteUrl() + ROUTES.callback)}
          type="default"
          icon={<GoogleCircleFilled style={{ color: PRIMARY_COLOR }} />}
          iconPosition="end"
        >
          Continue with Google
        </Button>

        {/*<Button*/}
        {/*  onClick={() => signInWithOAuth("facebook", getSiteUrl() + ROUTES.callback)}*/}
        {/*  type="outlined"*/}
        {/*  icon={<FacebookFilled />}*/}
        {/*  iconPosition="end"*/}
        {/*>*/}
        {/*  Continue with Facebook*/}
        {/*</Button>*/}
      </div>

      <p className={s.form__text}>or</p>

      <Form.Item
        style={{ margin: 0 }}
        validateStatus={errors.email?.message ? "error" : ""}
        help={errors.email?.message}
      >
        <InputControl<TSignInSchema>
          control={control}
          name="email"
          errorMessage={errors.email?.message}
          placeholder="E-mail"
        />
      </Form.Item>

      <Form.Item
        style={{ margin: 0 }}
        validateStatus={errors.password?.message ? "error" : ""}
        help={errors.password?.message}
      >
        <InputControl<TSignInSchema>
          isPassword
          control={control}
          name="password"
          errorMessage={errors.password?.message}
          placeholder="Password"
        />
      </Form.Item>

      <Link href={ROUTES.restoreAuth} className={s.form__restore}>
        Forgot your password?
      </Link>

      <Form.Item style={{ margin: 0 }}>
        <Button loading={isPending} className={s.form__btn} type="primary" htmlType="submit">
          Sign in
        </Button>
      </Form.Item>

      {/*<Form.Item*/}
      {/*  style={{ margin: 0 }}*/}
      {/*  validateStatus={errors.remember?.message ? "error" : ""}*/}
      {/*  help={errors.remember?.message}*/}
      {/*>*/}
      {/*  <CheckboxControl<TSignInSchema>*/}
      {/*    className={s.form__remember}*/}
      {/*    control={control}*/}
      {/*    name="remember"*/}
      {/*    errorMessage={errors.remember?.message}*/}
      {/*  >*/}
      {/*    Запомнить меня*/}
      {/*  </CheckboxControl>*/}
      {/*</Form.Item>*/}

      <div className={s.form__footer}>
        <p>Don&#39;t have an account?</p>
        <Link href={ROUTES.signUp}>Sign up</Link>
      </div>
    </Form>
  );
};

export default SignIn;
