import React from "react";

import {
  GithubOutlined,
  GitlabOutlined,
  InstagramOutlined,
  TwitchOutlined,
  PhoneOutlined,
  MailOutlined,
  TwitterOutlined,
  LinkedinOutlined,
  YoutubeOutlined,
  WhatsAppOutlined,
  FacebookOutlined,
} from "@ant-design/icons";

export type TProjectLink =
  | "email"
  | "phone"
  | "twitch"
  | "linkedin"
  | "twitter"
  | "instagram"
  | "github"
  | "gitlab"
  | "youtube"
  | "facebook"
  | "whatsapp";

interface Props {
  type: TProjectLink;
}

const ContactsIcon: React.FC<Props> = ({ type }) => {
  switch (type) {
    case "linkedin":
      return <LinkedinOutlined />;
    case "twitch":
      return <TwitchOutlined />;
    case "email":
      return <MailOutlined />;
    case "phone":
      return <PhoneOutlined />;
    case "twitter":
      return <TwitterOutlined />;
    case "instagram":
      return <InstagramOutlined />;
    case "github":
      return <GithubOutlined />;
    case "gitlab":
      return <GitlabOutlined />;
    case "youtube":
      return <YoutubeOutlined />;
    case "facebook":
      return <FacebookOutlined />;
    case "whatsapp":
      return <WhatsAppOutlined />;
    default:
      return null;
  }
};

export default ContactsIcon;
