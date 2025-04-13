import React from "react";

import Header from "@widgets/Header";

import Footer from "../../Footer";

import s from "./MainLayout.module.scss";

interface Props {
  children: React.ReactNode;
}

const MainLayout: React.FC<Props> = ({ children }) => (
  <div className={s.layout}>
    <Header className={s.layout__header} />
    <main className={s.layout__main}>{children}</main>
    <Footer className={s.layout__footer} />
  </div>
);

export default MainLayout;
