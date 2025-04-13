"use client";
import React from "react";

import RestorePassword from "@features/Auth/RestorePassword";

import Transition from "@shared/ui/Transition";

const RestorePasswordPageContainer: React.FC = () => (
  <Transition>
    <RestorePassword />
  </Transition>
);

export default RestorePasswordPageContainer;
