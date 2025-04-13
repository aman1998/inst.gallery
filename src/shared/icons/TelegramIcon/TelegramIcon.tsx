/* eslint-disable max-len */
import React from "react";

import { IconSvgProps } from "@shared/icons/types";

const TelegramIcon: React.FC<IconSvgProps> = ({ size, height = 16, width = 16, ...props }) => (
  <svg width={size || width} height={size || height} viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8.5" cy="8" r="8" fill="currentColor" />
    <path
      d="M4.84146 7.41892L11.3449 4.69995C11.6468 4.58171 11.9104 4.77979 11.8126 5.27471L11.8132 5.2741L10.7058 10.9309C10.6238 11.3319 10.404 11.4294 10.0965 11.2405L8.41022 9.89287L7.59686 10.7425C7.50693 10.84 7.43105 10.9223 7.25679 10.9223L7.37652 9.06152L10.5018 6.00001C10.6378 5.87019 10.4714 5.79705 10.2921 5.92626L6.42995 8.56295L4.76501 7.99977C4.40359 7.87543 4.39572 7.60786 4.84146 7.41892Z"
      fill="white"
    />
  </svg>
);

export default TelegramIcon;
