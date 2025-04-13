"use client";
import React from "react";
import { useRouter } from "next/navigation";

import Transition from "@shared/ui/Transition";
import Button from "@shared/ui/Button";
import { ROUTES } from "@shared/config/routes";

import s from "./SignUpConfirmPageContainer.module.scss";
const SignUpConfirmPageContainer: React.FC = () => {
  const router = useRouter();

  return (
    <Transition>
      <div className={s.confirm}>
        <h1 className={s.confirm__title}>Confirm</h1>
        <p className={s.confirm__text}>
          Thank you for signing up! You just need to confirm your email address to complete the registration.
        </p>
        <Button type="primary" onClick={() => router.push(ROUTES.signUp)} className={s.confirm__btn}>
          Back
        </Button>
      </div>
    </Transition>
  );
};

export default SignUpConfirmPageContainer;
