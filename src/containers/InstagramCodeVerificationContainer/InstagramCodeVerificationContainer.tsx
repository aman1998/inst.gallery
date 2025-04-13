import React from "react";

import VerificationInstagramCode from "../../features/Instagram/VerificationInstagramCode";

import s from "./InstagramCodeVerificationContainer.module.scss";

const InstagramCodeVerificationContainer: React.FC = () => (
  <div className={s.page}>
    <VerificationInstagramCode />
  </div>
);

export default InstagramCodeVerificationContainer;
