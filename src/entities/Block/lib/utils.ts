import { EBlockType } from "@entities/Block/model/types";

export const BLOCK_WITHOUT_POSTS = [EBlockType.type4];

export const checkIsBlockWithPosts = (type: EBlockType) => !BLOCK_WITHOUT_POSTS.includes(type);
