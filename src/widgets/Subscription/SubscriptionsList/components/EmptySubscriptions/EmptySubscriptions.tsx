import Link from "next/link";

import { ROUTES } from "@shared/config/routes";

import s from "./EmptySubscriptions.module.scss";

const EmptySubscriptions = () => (
  <div className={s.block}>
    <p className={s.block__text}>No active subscriptions</p>
    <Link href={ROUTES.subscriptions} className={s.block__link}>
      Start
    </Link>
  </div>
);

export default EmptySubscriptions;
