import { EBlockType } from "@entities/Block/model/types";

export const BLOCK_WITHOUT_POSTS = [EBlockType.type4];

export const checkIsBlockWithPosts = (type: EBlockType): type is EBlockType.type1 | EBlockType.type2 => !BLOCK_WITHOUT_POSTS.includes(type);
