import React from "react";

import s from "./PageLayout.module.scss";

interface Props {
  children: React.ReactNode;
}
const PageLayout: React.FC<Props> = ({ children }) => <div className={s.container}>{children}</div>;

export default PageLayout;
