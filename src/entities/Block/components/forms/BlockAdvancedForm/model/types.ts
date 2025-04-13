import {
  IBlock,
  IBlock1,
  IBlock2,
  isBlock1,
  isBlock2
} from "@entities/Block/model/types";

type TAdvancedBlock = IBlock1 | IBlock2

export const isAdvancedBlock = (block: IBlock): block is TAdvancedBlock =>
  isBlock1(block) || isBlock2(block);
