"use client";
import React from "react";

import NewPassword from "@features/Auth/NewPassword";

import Transition from "@shared/ui/Transition";

const NewPasswordPageContainer: React.FC = () => (
  <Transition>
    <NewPassword />
  </Transition>
);

export default NewPasswordPageContainer;
