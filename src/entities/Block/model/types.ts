import {
  ICustomizeBlock1,
  ICustomizeBlock4,
  TCustomizeBlock,
} from "@entities/Block/model/customizeTypes";

/* TODO: Надо все именнованные название блоков сделать нумерованными,
    потому что часто может меняться название и суть блоков.
    Сейчас они сделаны так например в widgets, надо сделать рефакторинг.
    */

export const enum EBlockType {
  type1 = "type1", // Hero
  type4 = "type4", // Collapse

}

export interface IBlock {
  block_id: string;
  created_at: string | Date;
  type: EBlockType;
  customization: TCustomizeBlock;
}

export interface IBlock1 extends IBlock {
  type: EBlockType.type1;
  customization: ICustomizeBlock1;
}

export interface IBlock4 extends IBlock {
  type: EBlockType.type4;
  customization: ICustomizeBlock4;
}


export const enum EBlockNavigation {
  blocks = "blocks",
  customize = "customize",
  posts = "posts",
  advanced = "advanced",
}

export const isBlock1 = (widget: IBlock): widget is IBlock1 => widget.type === EBlockType.type1;

export const isBlock4 = (widget: IBlock): widget is IBlock4 => widget.type === EBlockType.type4;
