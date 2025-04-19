import { TProjectLink } from "@/shared/ui/ContactsIcon/ContactsIcon";
import { IBlock } from "@entities/Block/model/types";

import { TNullable } from "@shared/types/common";

export interface IProject {
  blocks: IBlock[];
  id: string;
  user_id: string;
  created_at: string;
  instagram_id: TNullable<string>;
  meta: TNullable<IProjectMetadata>;
  user_info: TNullable<IProjectUserInfo>;
  primary_color: TNullable<string>;
  link: string;
  isPublish: boolean;
  email: string;
}

export interface IProjectMetadata {
  title: string;
  description: string;
}

export interface IProjectUserInfo {
  name: string;
  description: string;
  profession: string;
  avatar: TNullable<string>;
  contacts?: Array<{
    type: TProjectLink;
    value: string;
  }>;
}
