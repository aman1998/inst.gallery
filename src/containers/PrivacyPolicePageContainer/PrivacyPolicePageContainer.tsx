import ContactsInfo from "@widgets/ContactsInfo";

import { EFFECTIVE_DATA, SITE_PAYMENT } from "@shared/config/appConfig";

import s from "./PrivacyPolicePageContainer.module.scss";

const PrivacyPolicyPageContainer = () => {
  const sections = [
    {
      title: "Information We Collect",
      content: (
        <ul>
          <li>
            <strong>Personal Information:</strong> Email address, payment details.
          </li>
          <li>
            <strong>Uploaded Files:</strong> Excel files you upload for processing.
          </li>
          <li>
            <strong>Automatically Collected Data:</strong> IP address, cookies, and usage data.
          </li>
        </ul>
      ),
    },
    {
      title: "How We Use Your Information",
      content: (
        <ul>
          <li>To provide and improve our services.</li>
          <li>To process payments and subscriptions.</li>
          <li>To enable third-party integrations (e.g., Google login).</li>
        </ul>
      ),
    },
    {
      title: "Data Retention",
      content: (
        <p>
          We retain your personal information for as long as necessary to provide our services, comply with legal
          obligations, resolve disputes, and enforce our agreements.
        </p>
      ),
    },
    {
      title: "Data Sharing and Third-Party Services",
      content: (
        <>
          <p>
            We may share your information with trusted third-party service providers to help us operate, improve, and
            secure our services. This includes payment processors, cloud storage providers, and analytics platforms.
            These providers are contractually obligated to safeguard your information and use it solely for the purposes
            specified by us.
          </p>
          <ul>
            <li>
              <strong>Payment Processing:</strong> {SITE_PAYMENT}
            </li>
            <li>
              <strong>Analytics:</strong> Google Analytics, etc.
            </li>
            <li>
              <strong>Authentication:</strong> Google Login, etc.
            </li>
          </ul>
        </>
      ),
    },
    {
      title: "Security Measures",
      content: (
        <p>
          We implement industry-standard security measures to protect your personal information, including encryption,
          secure servers, and regular security audits. However, no method of transmission or storage is completely
          secure, and we cannot guarantee absolute security.
        </p>
      ),
    },
    {
      title: "Cookies and Tracking Technologies",
      content: (
        <>
          <p>
            We use cookies and similar technologies to enhance your experience on our website, analyze usage patterns,
            and personalize content. You can manage your cookie preferences through your browser settings.
          </p>
          <ul>
            <li>
              <strong>Essential Cookies:</strong> Required for the website to function properly.
            </li>
            <li>
              <strong>Analytics Cookies:</strong> Help us understand how users interact with our website.
            </li>
            <li>
              <strong>Advertising Cookies:</strong> Used to deliver targeted ads.
            </li>
          </ul>
        </>
      ),
    },
  ];

  return (
    <div className={s.page}>
      <h1>Privacy Policy</h1>
      <p>Effective Date: {EFFECTIVE_DATA}</p>
      <p>
        This Privacy Policy explains how we collect, use, and protect your information when you use our website. By
        accessing or using our service, you agree to the terms of this Privacy Policy.
      </p>

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

export default PrivacyPolicyPageContainer;
