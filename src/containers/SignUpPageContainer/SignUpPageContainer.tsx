import React from "react";

import SignUp from "@features/Auth/SignUp/SignUp";

import Transition from "@shared/ui/Transition";

const SignUpPageContainer: React.FC = () => (
  <Transition>
    <SignUp />
  </Transition>
);

export default SignUpPageContainer;
