"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "antd";
import Link from "next/link";
import { GoogleCircleFilled, FacebookFilled } from "@ant-design/icons";
import { Turnstile } from "@marsidev/react-turnstile";
import { useRouter } from "next/navigation";

import { signInWithOAuth } from "@/app/(auth)/auth/actions";

import { signUpSchema, TSignUpSchema } from "@features/Auth/SignUp/lib/signUpSchema";

import Button from "@shared/ui/Button";
import InputControl from "@shared/controllers/InputControl";
import { ROUTES } from "@shared/config/routes";
import CheckboxControl from "@shared/controllers/CheckboxControl";
import { useMessage } from "@shared/hooks/useMessage";
import { PRIMARY_COLOR } from "@shared/providers/AntdProvider/AntdProvider";

import s from "./SignUp.module.scss";
import { getSiteUrl } from "@/shared/utils/urls";
import { createClient } from "@/shared/config/supabase/client";

const SignUp: React.FC = () => {
  const [loading, setLoading] = React.useState(false);
  const [captchaToken, setCaptchaToken] = React.useState<string | undefined>(undefined);

  const { successMessage, errorMessage } = useMessage();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TSignUpSchema>({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      agreement: false,
    },
    resolver: zodResolver(signUpSchema),
    mode: "onSubmit",
  });

  const handleClick = async (data: TSignUpSchema) => {
    try {
      if (!captchaToken) {
        errorMessage("Captcha error");
        return;
      }

      setLoading(true);
      const supabase = createClient();

      const { error } = await supabase.auth.signUp({
        ...data,
        options: {
          emailRedirectTo: getSiteUrl() + ROUTES.authConfirm,
          captchaToken,
        },
      });

      if (error) {
        errorMessage(error?.message);
      } else {
        successMessage("Check your email");
        router.push(ROUTES.signUpConfirm);
      }
    } catch {
      errorMessage("Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form className={s.form} onFinish={handleSubmit(handleClick)}>
      <h1 className={s.form__title}>Sign Up</h1>

      <div className={s.form__oauth}>
        <Button
          disabled={!captchaToken}
          onClick={() => signInWithOAuth("google", getSiteUrl() + ROUTES.callback)}
          type="default"
          icon={<GoogleCircleFilled style={{ color: PRIMARY_COLOR }} />}
          iconPosition="end"
        >
          Continue with Google
        </Button>

        {/*<Button*/}
        {/*  onClick={() => signInWithOAuth("facebook",  getSiteUrl() + ROUTES.callback)}*/}
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
        <InputControl<TSignUpSchema>
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
        <InputControl<TSignUpSchema>
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
        <InputControl<TSignUpSchema>
          isPassword
          control={control}
          name="confirmPassword"
          errorMessage={errors.confirmPassword?.message}
          placeholder="Repeat password"
        />
      </Form.Item>

      <Form.Item style={{ margin: 0 }}>
        <Button disabled={!captchaToken} loading={loading} className={s.form__btn} type="primary" htmlType="submit">
          Sign Up
        </Button>
      </Form.Item>

      <Form.Item
        style={{ margin: 0 }}
        validateStatus={errors.agreement?.message ? "error" : ""}
        help={errors.agreement?.message}
      >
        <CheckboxControl<TSignUpSchema>
          className={s.form__agreement}
          control={control}
          name="agreement"
          errorMessage={errors.agreement?.message}
        >
          I agree with the privacy policy
        </CheckboxControl>
      </Form.Item>

      <div className={s.form__footer}>
        <p>Already have an account?</p>
        <Link href={ROUTES.signIn}>Login</Link>
      </div>

      <Turnstile
        options={{ theme: "light", size: "flexible" }}
        siteKey={process.env.CAPTCHA_SITE_KEY as string}
        onSuccess={setCaptchaToken}
      />
    </Form>
  );
};

export default SignUp;
