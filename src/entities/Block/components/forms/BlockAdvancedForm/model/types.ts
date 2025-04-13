import {
  IBlock,
  IBlock1,
  isBlock1,
} from "@entities/Block/model/types";

type TAdvancedBlock = IBlock1;

export const isAdvancedBlock = (block: IBlock): block is TAdvancedBlock =>
  isBlock1(block);
