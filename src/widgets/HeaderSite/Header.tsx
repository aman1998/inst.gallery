"use client";

import React from "react";
import cn from "classnames";
import { usePathname } from "next/navigation";

import HeaderMobile from "@widgets/Header/components/HeaderMobile/HeaderMobile";

import Logo from "@shared/ui/Logo";
import { ROUTES } from "@shared/config/routes";
import Button from "@shared/ui/Button";
import { useHeaderScroll } from "@shared/hooks/useHeaderScroll";

import s from "./Header.module.scss";

const HEADER_HEIGHT = 82;

interface Props {
  className?: string;
  name?: string;
  color?: string;
}

const Header: React.FC<Props> = ({ className, name, color }) => {
  const { lastScrollY, isVisible } = useHeaderScroll();

  const pathname = usePathname();

  const links = [
    {
      route: ROUTES.home,
      title: "Want a page like this?",
    },
  ];

  return (
    <header
      className={cn(
        s["header-wrapper"],
        !isVisible && s["header-wrapper--hide"],
        lastScrollY > HEADER_HEIGHT && s["header-wrapper--shadow"]
      )}
    >
      <div className={cn(s.header, className)}>
        <Logo href={pathname} name={name} color={color} />
        <nav className={s.header__links}>
          {links.map((link) => (
            <Button
              href={link.route}
              target="_blank"
              key={link.route}
              type="text"
              style={{ fontSize: 16, height: 40, padding: "0 20px" }}
            >
              {link.title}
            </Button>
          ))}
        </nav>
      </div>
      <HeaderMobile
        LogoComponent={<Logo className={s.header__logo} href={pathname} name={name} color={color} />}
        links={links}
      />
    </header>
  );
};

export default Header;
