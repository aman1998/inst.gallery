"use client";
import React from "react";

import RestorePasswordConfirm from "@features/Auth/RestorePassword/components/RestorePasswordConfirm";

import Transition from "@shared/ui/Transition";

const RestorePasswordConfirmPageContainer: React.FC = () => (
  <Transition>
    <RestorePasswordConfirm />
  </Transition>
);

export default RestorePasswordConfirmPageContainer;
