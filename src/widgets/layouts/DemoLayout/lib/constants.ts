import { MOCK_BLOCK_2_CUSTOMIZATION } from "@entities/Block/lib/MOCK";
import { EBlockType, IBlock } from "@entities/Block/model/types";
import { MOCK_INSTAGRAM_POSTS } from "@entities/Instagram/lib/constants";
import { IProject } from "@entities/Project/model/types";

import { PRIMARY_COLOR } from "@shared/providers/AntdProvider/AntdProvider";
import { ROUTES } from "@shared/config/routes";
import { SITE_DESCRIPTION, SITE_EMAIL } from "@shared/config/appConfig";

export const DEMO_BLOCKS: IBlock[] = [
  {
    type: EBlockType.type2,
    created_at: new Date(),
    block_id: "1",
    customization: { ...MOCK_BLOCK_2_CUSTOMIZATION, posts: MOCK_INSTAGRAM_POSTS.slice(0, 9) },
  },
];

export const DEMO_PROJECT: Omit<IProject, "blocks"> = {
  id: "1",
  primary_color: PRIMARY_COLOR,
  link: ROUTES.demoSite.slice(1, ROUTES.demoSite.length),
  isPublish: true,
  created_at: "2024-12-25T09:00:00+0000",
  user_id: "1",
  instagram_id: "1",
  email: SITE_EMAIL,
  user_info: {
    name: "John Doe",
    profession: "FullStack Developer",
    description:
      "Hello and welcome to my portfolio! I’m a passionate full-stack developer with a love for crafting elegant, modern web experiences. My journey through the ever-evolving world of web development has been both dynamic and deeply rewarding. I thrive on learning new technologies, embracing innovation, and continuously refining my skills to stay at the forefront of the digital landscape.",
  },
  meta: {
    title: "Demo",
    description: SITE_DESCRIPTION,
  },
};
