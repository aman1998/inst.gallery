// MobileHeader.tsx
"use client";

import React from "react";
import cn from "classnames";
import { useRouter } from "next/navigation";

import Button from "@shared/ui/Button";
import Logo from "@shared/ui/Logo";
import { ROUTES } from "@shared/config/routes";

import s from "./HeaderMobile.module.scss";

interface Props {
  links: { route: string; title: string }[];
  menuContent?: React.ReactNode;
  LogoComponent?: React.ReactNode;
}

const MobileHeader: React.FC<Props> = ({ links, menuContent, LogoComponent }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const router = useRouter();

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  React.useEffect(() => {
    const noScrollClass = "no-scroll";

    if (isMenuOpen) {
      document.body.classList.add(noScrollClass);
    } else {
      document.body.classList.remove(noScrollClass);
    }

    return () => {
      document.body.classList.remove(noScrollClass);
    };
  }, [isMenuOpen]);

  return (
    <div className={s.mobileHeader}>
      {LogoComponent ?? (
        <Logo
          style={{ zIndex: 1 }}
          onClick={() => {
            router.push(ROUTES.home);
            setIsMenuOpen(false);
          }}
        />
      )}
      <button className={cn(s.burger, isMenuOpen && s["burger--open"])} onClick={toggleMenu} aria-label="Toggle menu">
        <span />
        <span />
        <span />
      </button>

      <nav className={cn(s.menu, isMenuOpen && s["menu--open"])}>
        {links.map((link) => (
          <Button
            key={link.title}
            type="text"
            style={{ fontSize: 16 }}
            onClick={() => {
              router.push(link.route);
              setIsMenuOpen(false);
            }}
          >
            {link.title}
          </Button>
        ))}
        {menuContent}
      </nav>
    </div>
  );
};

export default MobileHeader;
