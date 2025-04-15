"use client";
import React from "react";
import cn from "classnames";
import {
  ArrowRightOutlined,
  CreditCardOutlined,
  InstagramOutlined,
  ProfileOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { usePathname, useRouter } from "next/navigation";
import { Avatar, Badge, Dropdown, type MenuProps, Typography } from "antd";
import Link from "next/link";

import ProfileStatistics from "@widgets/layouts/ProfileLayout/components/ProfileStatistics";

import SignOut from "@features/Auth/SignOut";

import Logo from "@shared/ui/Logo";
import Button from "@shared/ui/Button";
import { ROUTES } from "@shared/config/routes";
import { useUserInfo } from "@shared/providers/UserProvider/lib/useUserInfo";
import { PRIMARY_COLOR } from "@shared/providers/AntdProvider/AntdProvider";

import s from "./ProfileNavigation.module.scss";

interface ILinks {
  icon: React.ReactNode;
  link: string;
  text: string;
  count?: number;
}

interface Props {
  className?: string;
}
const ProfileNavigation: React.FC<Props> = ({ className }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useUserInfo();

  const links: ILinks[] = [
    {
      icon: <InstagramOutlined />,
      link: ROUTES.works,
      text: "My works",
      // count: 0,
    },
    {
      icon: <CreditCardOutlined />,
      link: ROUTES.subscriptionPrices,
      text: "Subscription",
    },
  ];

  const items: MenuProps["items"] = [
    {
      label: (
        <Link prefetch={false} href={ROUTES.subscriptionPrices}>
          Upgrade plan
        </Link>
      ),
      key: "2",
    },
    {
      label: <SignOut className={s.layout__logout} />,
      key: "3",
    },
  ];

  return (
    <nav className={cn(s.navigation, className)}>
      <div className={s.navigation__content}>
        <div className={s.navigation__header}>
          <Logo />
          <Button onClick={() => router.push(ROUTES.customize)} size="small" type="primary">
            Go to Customize
          </Button>
        </div>
        <ul>
          {links.map((item) => (
            <li key={item.link}>
              <Button
                iconPosition="start"
                icon={item.icon}
                type="text"
                className={cn(s.navigation__link, pathname === item.link && s["navigation__link--active"])}
                size="large"
                onClick={() => router.push(item.link)}
              >
                {item.text}
                {typeof item?.count === "number" && (
                  <Badge
                    count={item.count}
                    showZero
                    style={{ backgroundColor: PRIMARY_COLOR, borderColor: PRIMARY_COLOR }}
                  />
                )}
              </Button>
            </li>
          ))}
        </ul>
      </div>
      <div className={s.navigation__footer}>
        {/* <div className={s.navigation__content}>
         <ProfileStatistics />
        </div> */}
        <Dropdown
          overlayStyle={{ minWidth: 100 }}
          menu={{ items }}
          trigger={["click"]}
          placement="topRight"
          destroyPopupOnHide
        >
          <Button
            iconPosition="end"
            icon={<ArrowRightOutlined className={s.navigation__arrow} />}
            type="text"
            size="large"
            className={s["navigation__profile-btn"]}
          >
            <Typography.Title level={5} style={{ marginBottom: 0 }}>
              {user?.email}
            </Typography.Title>
            {user?.user_metadata?.avatar_url ? (
              <Avatar
                size={48}
                style={{ minWidth: 48, width: 48, height: 48 }}
                alt="avatar"
                src={user.user_metadata.avatar_url}
              />
            ) : (
              <Avatar
                size={48}
                style={{ backgroundColor: PRIMARY_COLOR, minWidth: 48, width: 48, height: 48 }}
                alt="avatar"
                icon={<UserOutlined />}
              />
            )}
          </Button>
        </Dropdown>
      </div>
    </nav>
  );
};

export default ProfileNavigation;
