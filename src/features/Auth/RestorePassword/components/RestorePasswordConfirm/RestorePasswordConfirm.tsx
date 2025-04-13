"use client";

import React from "react";
import { useRouter } from "next/navigation";

import Transition from "@shared/ui/Transition";
import Button from "@shared/ui/Button";
import { ROUTES } from "@shared/config/routes";

import s from "./RestorePasswordConfirm.module.scss";

const RestorePasswordConfirm: React.FC = () => {
  const router = useRouter();

  return (
    <Transition className={s.confirm}>
      <h1 className={s.confirm__title}>Confirm</h1>
      <p className={s.confirm__text}>You need to confirm your email address to complete the reset password. </p>
      <Button type="primary" className={s.confirm__btn} onClick={() => router.push(ROUTES.restoreAuth)}>
        Back
      </Button>
    </Transition>
  );
};

export default RestorePasswordConfirm;
