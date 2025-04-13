import { SITE_EMAIL } from "@shared/config/appConfig";

import s from "./ContactsInfo.module.scss";

const ContactsInfo = () => (
  <div className={s.widget}>
    <h2>Contact Us</h2>
    <address>
      If you have questions, contact us at <a href={`mailto:${SITE_EMAIL}`}>{SITE_EMAIL}</a>.
    </address>
  </div>
);

export default ContactsInfo;
