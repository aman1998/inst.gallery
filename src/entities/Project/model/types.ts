import { IBlock } from "@entities/Block/model/types";

import { TNullable } from "@shared/types/common";

export interface IProject {
  blocks: IBlock[];
  id: string;
  user_id: string;
  created_at: string;
  instagram_id: TNullable<string>;
  meta: TNullable<IProjectMetadata>;
  primary_color: TNullable<string>;
  link: string;
  isPublish: boolean;
  email: string;
}

export type TProjectInfo = Omit<IProject, "blocks">;

export interface IProjectMetadata {
  title: string;
  description: string;
  favicon?: string;
}
