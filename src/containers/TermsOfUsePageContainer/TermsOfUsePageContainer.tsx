import ContactsInfo from "@widgets/ContactsInfo";

import { EFFECTIVE_DATA, SITE_NAME } from "@shared/config/appConfig";

import s from "./TermsOfUsePageContainer.module.scss";

const TermsOfUsePageContainer = () => {
  const sections = [
    {
      title: "Introduction",
      content: (
        <p>
          Welcome to <>{SITE_NAME}</>. These Terms of Use govern your access to and use of our website and services. By
          using our website, you agree to comply with these Terms. If you do not agree, please do not use our services.
        </p>
      ),
    },
    {
      title: "User Responsibilities",
      content: (
        <ul>
          <li>You must provide accurate and up-to-date information when creating an account.</li>
          <li>
            You are responsible for maintaining the confidentiality of your login credentials and all activities
            conducted under your account.
          </li>
          <li>
            You agree not to use our services for any illegal or unauthorized purpose, including violating intellectual
            property rights.
          </li>
        </ul>
      ),
    },
    {
      title: "Prohibited Activities",
      content: (
        <ul>
          <li>Attempting to hack, disrupt, or compromise the functionality of our website.</li>
          <li>Uploading harmful or malicious files, such as viruses or malware.</li>
          <li>Using automated systems to scrape or copy data from our website.</li>
        </ul>
      ),
    },
    {
      title: "Intellectual Property",
      content: (
        <p>
          All content, including text, images, and code, is owned by or licensed to <>{SITE_NAME}</>. You may not copy,
          modify, distribute, or use this content without prior written permission.
        </p>
      ),
    },
    {
      title: "Limitation of Liability",
      content: (
        <p>
          We are not responsible for any direct, indirect, incidental, or consequential damages arising from your use of
          our services. Your use of our services is at your sole risk.
        </p>
      ),
    },
    {
      title: "Changes to Terms",
      content: (
        <p>
          We reserve the right to update or modify these Terms at any time. Changes will be effective upon posting. It
          is your responsibility to review the Terms periodically.
        </p>
      ),
    },
  ];

  return (
    <div className={s.page}>
      <h1>Terms of Use</h1>
      <p>Effective Date: {EFFECTIVE_DATA}</p>

      {sections.map(({ title, content }) => (
        <div key={title}>
          <h2>{title}</h2>
          {content}
        </div>
      ))}

      <ContactsInfo />
    </div>
  );
};

export default TermsOfUsePageContainer;
