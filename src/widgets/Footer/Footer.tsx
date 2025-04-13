import React from "react";
import cn from "classnames";
import Link from "next/link";
import { InstagramOutlined, MailOutlined } from "@ant-design/icons";

import { ROUTES } from "@shared/config/routes";
import { INSTAGRAM_URL, SITE_EMAIL, SITE_URL } from "@shared/config/appConfig";

import s from "./Footer.module.scss";

interface Props {
  className?: string;
}

const Footer: React.FC<Props> = ({ className }) => (
  <footer className={cn(s.footer, className)}>
    <span>&copy; {new Date().getFullYear()} All rights reserved</span>
    <span>-</span>
    <span>
      <Link prefetch={false} href={ROUTES.prices} className={s.footer__link}>
        Pricing
      </Link>
    </span>
    <span>-</span>
    <span>
      <Link prefetch={false} href={ROUTES.termsUse} className={s.footer__link}>
        Terms of Use
      </Link>
    </span>
    <span>-</span>
    <span>
      <Link prefetch={false} href={ROUTES.privacyPolicy} className={s.footer__link}>
        Privacy policy
      </Link>
    </span>
    <span>-</span>
    <span>
      <a href={INSTAGRAM_URL} target="_blank">
        <InstagramOutlined />
      </a>
    </span>
    <span>
      <a href={`mailto:${SITE_EMAIL}`} target="_blank">
        <MailOutlined />
      </a>
    </span>
  </footer>
);

export default Footer;
