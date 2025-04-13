import { SVGProps } from "react";

import { EColorVariables } from "@shared/types/colors";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
  color?: EColorVariables;
};
