import React from "react";

import SignIn from "@features/Auth/SignIn";

import Transition from "@shared/ui/Transition";

const SignInPageContainer: React.FC = () => (
  <Transition>
    <SignIn />
  </Transition>
);

export default SignInPageContainer;
