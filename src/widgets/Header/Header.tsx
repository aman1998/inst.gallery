"use client";

import React from "react";
import cn from "classnames";
import { useRouter } from "next/navigation";

import Logo from "@shared/ui/Logo";
import { ROUTES } from "@shared/config/routes";
import Button from "@shared/ui/Button";
import { useHeaderScroll } from "@shared/hooks/useHeaderScroll";

import HeaderMobile from "./components/HeaderMobile";
import s from "./Header.module.scss";

const HEADER_HEIGHT = 82;

interface Props {
  className?: string;
}

const Header: React.FC<Props> = ({ className }) => {
  const router = useRouter();
  const { lastScrollY, isVisible } = useHeaderScroll();

  const links = [
    {
      route: ROUTES.prices,
      title: "Pricing",
    },
    {
      route: ROUTES.demoCustomize,
      title: "DEMO",
    },
  ];

  const rightContent = (
    <Button type="primary" size="middle" onClick={() => window.open(ROUTES.customize)}>
      Start
    </Button>
  );

  return (
    <header
      className={cn(
        s["header-wrapper"],
        !isVisible && s["header-wrapper--hide"],
        lastScrollY > HEADER_HEIGHT && s["header-wrapper--shadow"]
      )}
    >
      <div className={cn(s.header, className)}>
        <Logo href={ROUTES.home} />
        <nav className={s.header__links}>
          {links.map((link) => (
            <Button
              // href={link.route}
              // target="_blank"
              onClick={() => router.push(link.route)}
              key={link.route}
              type="text"
              style={{ fontSize: 16, height: 40, padding: "0 20px" }}
            >
              {link.title}
            </Button>
          ))}
        </nav>
        {rightContent}
      </div>

      <HeaderMobile links={links} menuContent={rightContent} />
    </header>
  );
};

export default Header;
